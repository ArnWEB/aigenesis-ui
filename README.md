# Aigenesis - AI-Powered Insurance Risk Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-4-purple?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-8-yellow?style=for-the-badge&logo=vite" alt="Vite">
</p>

Aigenesis is a production-ready React application for the insurance and risk management industry. It provides role-based authentication, theming system, and role-specific dashboards with AI-powered chat capabilities.

## Features

### Authentication & Authorization
- **Persona-based Login**: Users select their assigned persona (role) at login
- **Role Validation**: System validates user role matches selected persona
- **Session Management**: Persistent sessions with "Remember Me" option
- **Keycloak Ready**: TODO markers for future Keycloak integration

### Role-Based Dashboards
- **Administrator**: System overview, user management, knowledge ingestion, platform settings
- **Executive**: Enterprise overview with financial metrics (GWP, Combined Ratio, etc.)
- **Underwriter**: Risk assessment and policy management
- **Claim Adjudicator**: Claims review and legal validation
- **Customer Service**: Support desk and ticket management
- **Operations**: System monitoring and agent management
- **Customer Agent**: Field operations and mobile workflow

### Knowledge Ingestion System (Admin)
- Select target AI persona for knowledge sync
- Configure data sources (SharePoint, Google Drive, Azure Blob, Internal SQL, Local Files)
- Source-specific configuration forms
- Real-time ingestion pipeline metrics
- Active jobs tracking table

### Theme System
- **Dark Theme** (default): Deep purple/blue tones
- **Light Theme**: Clean white interface
- **Green Theme**: Eco-friendly green accent
- Persistent theme preference

### UI Components
- Custom Button, Input, Checkbox components
- Glassmorphism panels
- Persona tiles for selection
- Collapsible sidebar navigation
- Floating chat widget/drawer

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **React Router v7** for routing
- **Lucide React** for icons
- **Manrope** font family

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Project Structure

```
implementation/src/
├── components/
│   ├── auth/           # Login page
│   ├── chat/           # Chat drawer & widget
│   ├── layout/         # Dashboard layout, sidebar
│   ├── pages/          # Dashboard, Claims pages
│   └── ui/             # Reusable UI components
├── config/             # Theme configuration
├── context/            # Auth & Theme contexts
├── data/               # User data, persona maps
├── hooks/              # Custom hooks (useAuth)
├── pages/              # Page components
└── routes/             # Router configuration
```

## Demo Users

| Email | Password | Role | Persona |
|-------|----------|------|---------|
| admin@aegis.ai | any | Administrator | admin |
| alex.thompson@aegis.ai | any | Executor | executors |
| sarah.chen@aegis.ai | any | Underwriter | underwriter |
| marcus.thorne@aegis.ai | any | Adjudicator | adjudicator |
| elena.jorgensen@aegis.ai | any | Customer Service | customer-service |
| david.kim@aegis.ai | any | Operations | operations |
| james.wilson@aegis.ai | any | Customer Agent | customer-agent |

## Configuration

### User Data
All user data is stored in `src/data/users.ts` for easy modification:
- User profiles
- Role-persona mappings
- Persona labels and descriptions

### Theme Colors
Theme configuration is in `src/index.css` and can be customized via CSS variables.

## Known Limitations

- Authentication is demo-mode (no actual password verification)
- Keycloak integration marked as TODO
- Chat AI responses are simulated

## License

MIT
