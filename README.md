# Newsletter Project

Faculty newsletter app: an Express/MongoDB REST API with a Vite + React + Tailwind frontend. The repo also holds small practice projects.

## Layout

| Folder | What |
|---|---|
| `newsletter-backend/` | Main API (auth, newsletters, subscriptions, email via Nodemailer, Swagger docs) |
| `newsletter-backend/newsletter-frontend/` | React frontend |
| `auth-app/`, `book api/`, `book matrix/`, `college api/` | Earlier practice APIs |
| `Variable/` | JS variable/module exercises |

## Run the backend

```bash
cd newsletter-backend
npm install
npm run dev      # or: npm start
npm test         # jest + supertest
```

Create `newsletter-backend/.env`:

```
PORT=5000
MONGO_URI=<mongodb connection string>
JWT_SECRET=<random string>
EMAIL_USER=<smtp user>
EMAIL_PASS=<smtp password>
```

### API routes

- `/api/auth`
- `/api/newsletters`
- `/api/subscriptions`

## Run the frontend

```bash
cd newsletter-backend/newsletter-frontend
npm install
npm run dev
```
