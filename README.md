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
   DATABASE_URL="postgresql://username:password@localhost:5432/orbit_cli"
   GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-api-key"
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3001"
   ```

   For the client, create a `.env.local` file in the `client` directory:
   ```env
   NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3001"
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
   The server will run on `http://localhost:3001`

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