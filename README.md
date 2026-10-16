# C3Tech

A Vite + React landing page for C3Tech with a separate Express API for contact form submissions.

## Project structure

- Frontend: `frontend/`
- Backend: `server/`
- Vercel deploy: `frontend/`
- Render deploy: `server/`

## Local development

1. Install frontend dependencies:
   cd frontend
   npm install

2. Install backend dependencies:
   cd server
   npm install

3. Create environment files:
   - Copy `frontend/.env.example` to `frontend/.env`
   - Copy `server/.env.example` to `server/.env`

4. Start the frontend:
   cd frontend
   npm run dev

5. Start the backend:
   cd server
   npm run dev

## Environment variables

Frontend `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Server `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_sending_email@gmail.com
SMTP_PASS=your_email_app_password
EMAIL_FROM="C3Tech <your_sending_email@gmail.com>"
ADMIN_EMAIL=your_admin_email@gmail.com
RESEND_API_KEY=re_your_resend_api_key
```

The contact form sends new inquiries to `ADMIN_EMAIL` and sends a confirmation to the visitor. Local development uses SMTP by default. For Gmail, use an App Password for `SMTP_PASS`; do not use your regular account password.

## Deployment

### Vercel
- Import the `frontend/` folder as the app root in Vercel
- Set environment variable:
  - `VITE_API_URL=https://your-render-app.onrender.com`
- Build command: `npm run build`
- Output directory: `dist`

### Render
- Create a new Web Service
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Set environment variables:
  - `PORT=5000`
  - `MONGO_URI=your_mongodb_connection_string`
  - `CLIENT_URL=https://your-vercel-app.vercel.app`
  - `ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:5173`
  - `EMAIL_PROVIDER=resend`
  - `RESEND_API_KEY=re_your_resend_api_key`
  - `EMAIL_FROM="C3Tech <verified-sender@your-domain.com>"`
  - `ADMIN_EMAIL=your_admin_email@gmail.com`

For Render, create a Resend API key and verify the sending domain used by `EMAIL_FROM` in Resend. Set `EMAIL_PROVIDER=resend` in the Render service and redeploy; the Resend API sends over HTTPS instead of SMTP. Keep `EMAIL_PROVIDER=smtp` in local `server/.env` if you want to continue using your existing local SMTP setup.

## Notes

- Keep the frontend app inside the `frontend/` folder.
- The backend must stay under the `server/` folder for Render.
- Use the deployed Render URL inside `VITE_API_URL` for production.
- A `vercel.json` file is included in `frontend/` for SPA routing fallback.
