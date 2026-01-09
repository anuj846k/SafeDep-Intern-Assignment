# SafeDep Package Insight Viewer

A Next.js application for viewing package insights using the SafeDep API.

## Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd my-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory with the following variables:

```env
SAFEDEP_API_KEY=your_api_key_here
SAFEDEP_TENANT_ID=your_tenant_id_here
```

| Variable            | Description                             |
| ------------------- | --------------------------------------- |
| `SAFEDEP_API_KEY`   | Your SafeDep API key for authentication |
| `SAFEDEP_TENANT_ID` | Your SafeDep tenant identifier          |

> [!NOTE]
> Contact SafeDep to obtain your API credentials.

## Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Viewing Package Insights

Navigate to a package insight page using this URL pattern:

```
http://localhost:3000/p/{ecosystem}/{package-name}/{version}
```

**Examples:**

- NPM: `http://localhost:3000/p/npm/express/4.18.2`
- PyPI: `http://localhost:3000/p/pypi/requests/2.31.0`

## Project Structure

- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable React components
- `lib/` - Utility functions and SafeDep API client

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [SafeDep Documentation](https://docs.safedep.io)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
