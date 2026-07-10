# Mailbox

A messaging web app — direct messages, group chats, contacts, and more.

🔗 **Live app:** [mailbox-xi.vercel.app](https://mailbox-xi.vercel.app)

## Features

- Direct messages and group chats
- Add and manage contacts
- Block contacts
- Archive chats
- Reply to specific messages
- Send images
- Auth-protected sessions

## Tech Stack

**Frontend**
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) for components
- [Lucide](https://lucide.dev/) for icons
- [Redux Toolkit](https://redux-toolkit.js.org/) for auth state

**Backend**
- [Express](https://expressjs.com/) (TypeScript)
- [Prisma ORM](https://www.prisma.io/) with PostgreSQL
- Plain REST API (no WebSockets)

Backend repo: [MailboxAPI](https://github.com/nimbusphagia/MailboxAPI)

## Usage

Mailbox is fully deployed — no local setup is required. Just visit the live app and sign up to start messaging:

👉 [mailbox-xi.vercel.app](https://mailbox-xi.vercel.app)

## Architecture

The frontend is a single-page React app that communicates with the [MailboxAPI](https://github.com/nimbusphagia/MailboxAPI) backend over REST (no real-time sockets — messages are fetched via standard HTTP requests). Both the frontend and backend are deployed independently on Vercel.
