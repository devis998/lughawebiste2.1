This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Mail / Contact form setup

The contact form on this site sends messages using SMTP via `nodemailer`. To enable sending from your environment, set the following environment variables (create a `.env.local` in development or set them in your deployment provider):

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASS=your-email-password-or-api-key
# Optional: set true if using port 465
EMAIL_SECURE=false
```

- If you're using a provider like Gmail, Outlook, or a hosting mail service, confirm the correct `HOST`, `PORT`, and whether the connection uses `secure` (port 465) or STARTTLS (port 587).
- For local testing you can use Ethereal (https://ethereal.email/) or a service test account.

If messages are not sent:
- Check server logs for errors (auth/connection failure). The API now verifies the transporter and will log connection problems.
- Ensure the environment variables are available at runtime (in Vercel, Railway, Render, etc. add them in project settings).
- For debugging locally, run the app and POST to `/api/contact` with JSON payload and inspect the console for error details.

