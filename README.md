# TODO Master

A modern, feature-rich Todo application built with Next.js 15, React 19, and TypeScript. This application provides a clean and intuitive interface for managing your tasks with advanced features like drag-and-drop functionality and user authentication.

## Features

- ✅ **Todo Management**: Create, edit, delete, and organize your todos
- 🔐 **User Authentication**: Secure login and signup with JWT tokens
- 🎯 **Drag & Drop**: Intuitive task reordering with react-dnd
- 📱 **Responsive Design**: Beautiful UI with Tailwind CSS
- 🚀 **Modern Stack**: Built with Next.js 15 and React 19
- 📊 **Database**: MongoDB

## Tech Stack

- **Framework**: Next.js 15.5.0 with Turbopack
- **Frontend**: React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose 8.17.2
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcryptjs for hashing
- **Drag & Drop**: react-dnd with HTML5 backend
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- MongoDB database

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd itask
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server

## Project Structure

```
itask/
├── src/
│   ├── app/
│   │   ├── signup/          # User registration page
│   │   └── ...              # Other app routes
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions and configurations
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── package.json
└── README.md
```

## Key Dependencies

### Production Dependencies

- **next**: React framework for production
- **react & react-dom**: Core React libraries
- **mongoose**: MongoDB object modeling
- **jsonwebtoken**: JWT implementation
- **bcryptjs**: Password hashing library
- **react-dnd**: Drag and drop functionality
- **lucide-react**: Beautiful icon library

### Development Dependencies

- **typescript**: Type safety
- **tailwindcss**: Utility-first CSS framework
- **@types/**: TypeScript definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**TODO Master** - Organize your life, one task at a time! 🚀
