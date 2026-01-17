# Orbit CLI

Orbit CLI is a comprehensive AI-powered tool that combines a command-line interface (CLI) with a web-based user interface. It provides secure authentication, device management, and interactive AI chat capabilities in multiple modes.

## Features

### CLI Features
- **Authentication**: Secure login/logout with device flow authentication
- **AI Chat Modes**:
  - **Simple Chat**: Basic conversational AI interactions
  - **Tool Calling**: Enhanced chat with access to tools like Google Search and code execution
  - **Agentic Mode**: Advanced AI agent capabilities (coming soon)
- **User Management**: View current user information and session status

### Web Interface Features
- **User Authentication**: Secure sign-in and sign-out functionality
- **Device Management**:
  - Device authorization using user codes
  - Device approval workflow
- **User Profile**: View and manage user information
- **Responsive Design**: Modern UI built with Next.js and shadcn/ui components

### Database Features
- **User Management**: Store user profiles, sessions, and accounts
- **Conversation History**: Persistent chat conversations and messages
- **Device Codes**: Handle device flow authentication codes
- **Verification**: Email and device verification support

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Better Auth with device flow
- **AI Integration**: Google AI SDK, Vercel AI SDK
- **CLI Framework**: Commander.js

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Orbit CLI"
   ```

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the `server` directory with the following variables:
   ```env
   # AI Configuration
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
   ORBITAI_MODEL=gemini-1.5-pro

   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name

   # Auth Configuration
   BACKEND_URL=http://localhost:3005
   TRUSTED_ORIGINS=http://localhost:3000
   CORS_ORIGIN=true
   CORS_CREDENTIALS=true
   DEVICE_EXPIRES_IN=30m
   DEVICE_INTERVAL=5s
   ```

   For the client, create a `.env.local` file in the `client` directory:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3005"
   NEXT_PUBLIC_CLIENT_URL="http://localhost:3000"
   ```

5. **Set up the database**:
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma generate
   ```

## Usage

### Running the Application

1. **Start the server**:
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:3005`

2. **Start the client** (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```
   The web app will be available at `http://localhost:3000`

### Using the CLI

The CLI tool is available as `orbit` command after installation.

1. **Install the CLI globally** (optional):
   ```bash
   cd server
   npm link
   ```

2. **Authentication**:
   - Login: `orbit login`
   - Logout: `orbit logout`
   - Check current user: `orbit whoami`

3. **AI Interaction**:
   - Start AI session: `orbit wakeup`
   - Choose from chat modes: Simple Chat, Tool Calling, or Agentic Mode

### Web Interface

- **Sign In**: Navigate to `/sign-in` to authenticate
- **Device Authorization**: Use `/device` to enter device codes
- **Device Approval**: Approve devices at `/approve`
- **User Profile**: View profile information on the home page

## Database Schema

The application uses Prisma ORM with the following main models:

- **User**: User accounts with authentication details
- **Session**: User sessions and tokens
- **Account**: OAuth and social login accounts
- **Conversation**: Chat conversations with different modes
- **Message**: Individual messages within conversations
- **DeviceCode**: Device flow authentication codes
- **Verification**: Email and device verification records

## Development

### Building for Production

1. **Build the client**:
   ```bash
   cd client
   npm run build
   npm start
   ```

2. **Build the server**:
   ```bash
   cd server
   npm run cli  # For CLI usage
   ```

### Linting

- Client: `npm run lint` in the client directory
- Server: ESLint configuration in server directory

## Deployment

### Render Deployment

1. **Connect your repository** to Render
2. **Set build settings**:
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `npm run dev`
3. **Add environment variables** in Render dashboard:
   ```env
   # AI Configuration
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
   ORBITAI_MODEL=gemini-1.5-pro

   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   # Database (Supabase or other PostgreSQL)
   DATABASE_URL=postgresql://username:password@host:5432/database?sslmode=require&pgbouncer=true&connection_limit=1

   # Auth Configuration
   BACKEND_URL=https://your-render-app.onrender.com
   TRUSTED_ORIGINS=https://your-frontend-domain.com
   CORS_ORIGIN=true
   CORS_CREDENTIALS=true
   DEVICE_EXPIRES_IN=30m
   DEVICE_INTERVAL=5s

   # Render specific
   NODE_ENV=production
   ```
4. **Database setup**:
   - Use Supabase, Neon, or another PostgreSQL provider
   - Ensure the database allows connections from Render's IP ranges
   - Use connection pooling for better performance: `?pgbouncer=true&connection_limit=1`

### Troubleshooting Database Issues

If you encounter database connection errors on Render:

1. **Check DATABASE_URL**: Ensure it's correct and accessible from external connections
2. **SSL Mode**: Use `sslmode=require` for Supabase
3. **Connection Pooling**: Add `pgbouncer=true&connection_limit=1` for serverless environments
4. **Database Permissions**: Ensure your database user has proper permissions
5. **Firewall**: Make sure your database allows connections from Render's servers

### Common Render Issues

- **Database Connection Timeout**: Use a database with better connection pooling
- **Memory Limits**: Monitor your app's memory usage
- **Cold Starts**: Expected for free tier, consider upgrading for better performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

ISC License

## Support

For issues and questions, please create an issue in the repository.