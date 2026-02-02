# 🎓 Alumni-Platform

> Piattaforma digitale che connette ex studenti (alumni) con studenti attuali per facilitare l'ingresso nel mondo del lavoro attraverso mentoring e networking professionale.

## 📋 Indice

- [Caratteristiche](#caratteristiche)
- [Stack Tecnologico](#stack-tecnologico)
- [Prerequisiti](#prerequisiti)
- [Installazione](#installazione)
- [Configurazione](#configurazione)
- [Avvio](#avvio)
- [Testing](#testing)
- [Deployment](#deployment)
- [Struttura Progetto](#struttura-progetto)
- [API Documentation](#api-documentation)
- [Contribuire](#contribuire)

## ✨ Caratteristiche

### Core Features

- 🔐 **Autenticazione sicura**: OAuth 2.0, JWT, 2FA
- 👥 **Sistema di Matching Intelligente**: Algoritmo che connette studenti e alumni basato su settore, competenze e interessi
- 💬 **Messaggistica Real-time**: WebSocket per chat istantanea
- 📢 **Bacheca Opportunità**: Stage, tirocini, posizioni lavorative
- 🎯 **Mentorship System**: Richieste, sessioni programmate, feedback
- 📅 **Eventi & Webinar**: Calendario integrato con RSVP
- 💼 **Portfolio Showcase**: Galleria progetti e competenze
- 🏆 **Sistema Endorsement**: Validazione competenze tra utenti
- 📊 **Analytics Dashboard**: Metriche e KPI per amministratori
- 🔒 **GDPR Compliant**: Gestione consensi, audit logs, data export

## 🛠 Stack Tecnologico

### Backend

- **Runtime**: Node.js 20+ con TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **Cache**: Redis
- **ORM**: Sequelize TypeScript
- **Authentication**: Passport.js + JWT + OAuth 2.0
- **Real-time**: Socket.IO
- **Validation**: Zod
- **File Upload**: Multer + AWS S3
- **Email**: SendGrid / Nodemailer
- **Logging**: Winston
- **Testing**: Jest + Supertest

### DevOps

- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: AWS / DigitalOcean / Railway
- **Monitoring**: Datadog / New Relic

## 📦 Prerequisiti

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL >= 14
- Redis >= 7
- Docker & Docker Compose (opzionale, per sviluppo locale)

## 🚀 Installazione

### Metodo 1: Setup Manuale

```bash
# Clone repository
git clone https://github.com/your-org/alumni-platform.git
cd alumni-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Metodo 2: Docker (Raccomandato)

```bash
# Clone repository
git clone https://github.com/your-org/alumni-platform.git
cd alumni-platform

# Start all services
docker-compose up -d
```

## ⚙️ Configurazione

### 1. Variabili d'ambiente

```bash
# Backend
cd backend
cp .env.example .env
```

Variabili chiave da configurare:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_secure_password
DATABASE_URL=postgresql://user:password@localhost:5432/alumni_platform

# JWT Secrets (genera con: openssl rand -hex 32)
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# OAuth Google
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# SendGrid
SENDGRID_API_KEY=your_sendgrid_key

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name

# Redis
REDIS_URL=redis://localhost:6379

# Environment
NODE_ENV=development
```

### 2. Database Setup

```bash
# Con Docker (automatico)
docker-compose up -d postgres

# Manuale
psql -U postgres
CREATE DATABASE alumni_platform;
```

### 3. Migrazioni e Seed

```bash
cd backend

# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed database (opzionale)
npm run seed
```

## 🏃 Avvio

### Development Mode

```bash
# Backend
cd backend
npm run dev  # Runs on http://localhost:5000

# Frontend
cd frontend
npm run dev  # Runs on http://localhost:3000
```

### Con Docker

```bash
docker-compose up

# Access services:
# Backend API: http://localhost:5000
# Frontend: http://localhost:3000
# PostgreSQL: localhost:5432
# Redis: localhost:6379
```

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 🧪 Testing

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm test -- --coverage
```

### Test Categories

- **Unit Tests**: `src/**/*.test.ts`
- **Integration Tests**: `src/tests/integration/*.test.ts`
- **E2E Tests**: `src/tests/e2e/*.test.ts`

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api/v1
Production: https://api.alumni-platform.it/api/v1
```

### Endpoints Principali

#### Authentication

```
POST   /api/v1/auth/register          # Registrazione
POST   /api/v1/auth/login             # Login
POST   /api/v1/auth/refresh           # Refresh token
POST   /api/v1/auth/logout            # Logout
GET    /api/v1/auth/google            # OAuth Google
POST   /api/v1/auth/2fa/enable        # Abilita 2FA
POST   /api/v1/auth/2fa/verify        # Verifica 2FA
```

#### Users & Profiles

```
GET    /api/v1/users/me               # Profilo utente corrente
PATCH  /api/v1/users/me               # Aggiorna profilo
GET    /api/v1/users/:id              # Profilo pubblico
DELETE /api/v1/users/me               # Elimina account
```

#### Mentorship

```
POST   /api/v1/mentorship/request     # Richiesta mentoring
GET    /api/v1/mentorship/matches     # Alumni suggeriti
GET    /api/v1/mentorship/requests    # Mie richieste
PATCH  /api/v1/mentorship/:id/accept  # Accetta richiesta
POST   /api/v1/mentorship/:id/session # Programma sessione
```

#### Opportunities

```
GET    /api/v1/opportunities           # Lista opportunità
POST   /api/v1/opportunities           # Pubblica opportunità (alumni)
GET    /api/v1/opportunities/:id       # Dettaglio opportunità
PATCH  /api/v1/opportunities/:id       # Aggiorna opportunità
DELETE /api/v1/opportunities/:id       # Elimina opportunità
POST   /api/v1/opportunities/:id/apply # Candidatura
```

#### Messages

```
GET    /api/v1/conversations           # Lista conversazioni
GET    /api/v1/conversations/:id       # Dettaglio conversazione
POST   /api/v1/conversations           # Nuova conversazione
GET    /api/v1/messages/:conversationId # Messaggi
POST   /api/v1/messages                # Invia messaggio (via WebSocket)
```

#### Events

```
GET    /api/v1/events                  # Lista eventi
POST   /api/v1/events                  # Crea evento (admin)
GET    /api/v1/events/:id              # Dettaglio evento
POST   /api/v1/events/:id/register     # RSVP evento
DELETE /api/v1/events/:id/register     # Annulla RSVP
```

#### Forum

```
GET    /api/v1/forum/categories        # Categorie forum
GET    /api/v1/forum/:category         # Post per categoria
POST   /api/v1/forum/posts             # Nuovo post
POST   /api/v1/forum/posts/:id/reply   # Risposta
POST   /api/v1/forum/posts/:id/vote    # Upvote/downvote
```

### Autenticazione API

Tutte le richieste protette richiedono header:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## 📁 Struttura Progetto

```
alumni-platform/
├── backend/
│   ├── src/
│   │   ├── config/           # Configurazioni (DB, Redis, Auth)
│   │   ├── controllers/      # Logic layer
│   │   ├── models/           # Prisma models
│   │   ├── routes/           # Express routes
│   │   ├── middleware/       # Auth, validation, error handling
│   │   ├── services/         # Business logic (matching, email, etc.)
│   │   ├── utils/            # Helpers, logger, errors
│   │   ├── tests/            # Test suites
│   │   └── index.ts          # App entry point
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── uploads/              # Temporary uploads
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Next.js pages
│   │   ├── hooks/            # Custom hooks
│   │   ├── context/          # Global state
│   │   ├── utils/            # API client, helpers
│   │   └── styles/           # CSS/Tailwind
│   └── package.json
├── docs/
│   ├── api.md                # API documentation
│   ├── architecture.md       # System architecture
│   └── deployment.md         # Deployment guide
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions
├── docker-compose.yml
└── README.md
```

## 🚢 Deployment

### DigitalOcean App Platform

```bash
# 1. Create app from GitHub repo
# 2. Configure environment variables
# 3. Set build command: npm run build
# 4. Set run command: npm start
# 5. Deploy
```

### AWS EC2

```bash
# 1. Launch EC2 instance (t3.medium)
# 2. Install Docker & Docker Compose
# 3. Clone repository
# 4. Configure .env
# 5. Run docker-compose up -d
# 6. Setup Nginx reverse proxy
# 7. Configure SSL with Let's Encrypt
```

### Railway

```bash
# 1. Connect GitHub repository
# 2. Add PostgreSQL and Redis services
# 3. Configure environment variables
# 4. Deploy automatically on push
```

## 📊 Metriche di Successo

| KPI                          | Target Anno 1 | Target Anno 3 |
| ---------------------------- | ------------- | ------------- |
| Tasso registrazione studenti | 60%           | 85%           |
| Utenti attivi mensili        | 350           | 943           |
| Matching mentorship/mese     | 25            | 80            |
| Placement lavorativo         | 15%           | 35%           |
| NPS Score                    | 30+           | 60+           |

## 🤝 Contribuire

1. Fork il progetto
2. Crea branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri Pull Request

### Coding Standards

- TypeScript strict mode
- ESLint + Prettier
- Test coverage > 80%
- Commit messages: Conventional Commits

## 📄 Licenza

Questo progetto è proprietario dell'Istituto Professionale.

## 👥 Team

- **Project Manager**: @mavcooo
- **Lead Developer**: TBD
- **Frontend Developer**: TBD
- **DevOps Engineer**: TBD

## 📞 Supporto

- Email: support@alumni-platform.it
- Documentation: docs.alumni-platform.it
- Issues: GitHub Issues

---

Made with ❤️ for students and alumni

