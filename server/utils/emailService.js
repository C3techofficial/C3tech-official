const path = require("path");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatProjectDetails = (service, budget, message) => {
  const safeService = escapeHtml(service || "Not specified");
  const safeBudget = escapeHtml(budget || "Not specified");
  const safeMessage = escapeHtml(message || "No additional details provided.");

  return `
    <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:18px 20px;margin-top:20px;">
      <p style="margin:0 0 12px;font-size:14px;color:#475569;line-height:1.6;"><strong style="color:#0f172a;">Service:</strong> ${safeService}</p>
      <p style="margin:0 0 12px;font-size:14px;color:#475569;line-height:1.6;"><strong style="color:#0f172a;">Budget:</strong> ${safeBudget}</p>
      <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;"><strong style="color:#0f172a;">Project details:</strong> ${safeMessage}</p>
    </div>
  `;
};

const getEmailProvider = () => (process.env.EMAIL_PROVIDER || "smtp").trim().toLowerCase();

const getFromAddress = () => {
  const address =
    process.env.EMAIL_FROM ||
    (getEmailProvider() === "smtp" ? process.env.SMTP_USER : "");
  if (!address) {
    return "";
  }
  return address.includes("<") ? address : `C3Tech <${address}>`;
};

const getConfigurationError = () => {
  const provider = getEmailProvider();
  if (provider === "resend") {
    if (!process.env.RESEND_API_KEY) {
      return "missing_resend_api_key";
    }
    if (!process.env.EMAIL_FROM) {
      return "missing_email_from";
    }
    return null;
  }

  if (provider === "smtp") {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return "missing_smtp_credentials";
    }
    if (!getFromAddress()) {
      return "missing_email_from";
    }
    return null;
  }

  return "unsupported_email_provider";
};

async function sendEmail({ to, replyTo, subject, text, html }) {
  if (getEmailProvider() === "resend") {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getFromAddress(),
        to,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
        html,
      }),
    });
    const responseText = await response.text();
    let responseBody;
    try {
      responseBody = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(`Resend returned an invalid response (HTTP ${response.status})`);
    }
    if (!response.ok) {
      throw new Error(
        responseBody?.message || `Resend request failed (HTTP ${response.status})`
      );
    }
    return;
  }

  await transporter.sendMail({
    from: getFromAddress(),
    to,
    replyTo,
    subject,
    text,
    html,
  });
}

async function sendAdminNotificationEmail({ name, phone, email, service, budget, message }) {
  if (!process.env.ADMIN_EMAIL) {
    return { sent: false, reason: "missing_admin_email" };
  }

  const configurationError = getConfigurationError();
  if (configurationError) {
    return { sent: false, reason: configurationError };
  }

  const safeName = escapeHtml(name || "Not provided");
  const safePhone = escapeHtml(phone || "Not provided");
  const safeEmail = escapeHtml(email || "Not provided");
  const safeService = escapeHtml(service || "Not specified");
  const safeBudget = escapeHtml(budget || "Not specified");
  const safeMessage = escapeHtml(message || "No additional details provided.");

  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      replyTo: email || undefined,
      subject: `New C3Tech contact inquiry from ${name || "website visitor"}`,
      text: [
        "A new contact inquiry was submitted on the C3Tech website.",
        "",
        `Name: ${name || "Not provided"}`,
        `Phone: ${phone || "Not provided"}`,
        `Email: ${email || "Not provided"}`,
        `Service: ${service || "Not specified"}`,
        `Budget: ${budget || "Not specified"}`,
        `Project details: ${message || "No additional details provided."}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;line-height:1.6;">
          <h2>New C3Tech contact inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${formatProjectDetails(service, budget, message)}
        </div>
      `,
    });
    return { sent: true };
  } catch (error) {
    console.error(`${getEmailProvider()} admin notification email send failed:`, error);
    return { sent: false, reason: `${getEmailProvider()}_error` };
  }
}

async function sendConfirmationEmail({ name, email, service, budget, message }) {
  if (!email) {
    return { sent: false, reason: "missing_email" };
  }

  const configurationError = getConfigurationError();
  if (configurationError) {
    return { sent: false, reason: configurationError };
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || process.env.SMTP_USER;
  const safeName = escapeHtml(name || "there");
  const subject = "Thanks for contacting C3Tech — we’ve received your project inquiry";

  const html = `
    <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0f172a 0%,#111827 100%);padding:32px 28px;">
          <div style="font-size:12px;letter-spacing:2px;color:#cbd5e1;text-transform:uppercase;font-weight:700;">C3Tech</div>
          <h1 style="margin:14px 0 0;font-size:32px;line-height:1.2;color:#ffffff;font-weight:700;">Thank you, ${safeName}!</h1>
        </div>

        <div style="padding:32px 28px 24px;">
          <p style="margin:0 0 18px;font-size:16px;line-height:1.8;color:#1f2937;">Hi ${safeName},</p>

          <p style="margin:0 0 18px;font-size:16px;line-height:1.8;color:#374151;">
            Thank you for reaching out to C3Tech. We’ve successfully received your project inquiry and our team is reviewing the details you shared.
          </p>

          <p style="margin:0 0 18px;font-size:16px;line-height:1.8;color:#374151;">
            Your project is important to us, and we’ll get back to you shortly with the next steps, pricing guidance, or a recommended growth plan tailored to your goals.
          </p>

          ${formatProjectDetails(service, budget, message)}

          <p style="margin:22px 0 0;font-size:15px;line-height:1.8;color:#475569;">
            For a faster response, you can also chat with us directly on WhatsApp at <a href="https://wa.me/918505960012?text=Hi%20C3Tech" style="color:#0f172a;font-weight:700;text-decoration:none;">+91 8505960012</a>.
          </p>

          <p style="margin:24px 0 0;font-size:16px;line-height:1.8;color:#374151;">
            Warm regards,<br>
            <strong style="color:#0f172a;">C3Tech Team</strong><br>
            <span style="color:#64748b;">Website Design • Branding • Growth Strategy</span>
          </p>
        </div>
      </div>
    </div>
  `;

  const text = `Hi ${name || "there"},\n\nThank you for contacting C3Tech. We have received your project inquiry and our team will get back to you shortly.\n\nService: ${service || "Not specified"}\nBudget: ${budget || "Not specified"}\nProject details: ${message || "No additional details provided."}\n\nWarm regards,\nC3Tech Team`;

  try {
    await sendEmail({
      to: email,
      replyTo: adminEmail,
      subject,
      text,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error(`${getEmailProvider()} confirmation email send failed:`, error);
    return { sent: false, reason: `${getEmailProvider()}_error`, error: error.message };
  }
}

module.exports = {
  sendAdminNotificationEmail,
  sendConfirmationEmail,
};
