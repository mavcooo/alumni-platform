# 🎓 Alumni-Platform

> Piattaforma digitale che connette ex studenti (alumni) con studenti attuali per facilitare l'ingresso nel mondo del lavoro attraverso mentoring e networking professionale.

## 🚀 Funzionalità Principali

- ✅ **Sistema di Matching Intelligente** - Algoritmo che collega studenti e alumni basato su settore, competenze e interessi
- 💬 **Messaggistica Real-time** - Chat privata con WebSocket e videochiamate integrate
- 📋 **Bacheca Opportunità** - Pubblicazione e candidatura a stage, tirocini e posizioni lavorative
- 🎯 **Mentorship System** - Gestione richieste e sessioni di mentoring con calendario
- 💼 **Portfolio & Showcase** - Spazio personale per progetti e certificazioni
- 🏆 **Sistema Endorsement** - Validazione competenze tra utenti
- 📱 **Forum Q&A Settoriale** - Community per ogni indirizzo professionale
- 📅 **Eventi & Networking** - Calendario con workshop, masterclass e visite aziendali

## 🏗️ Architettura

### Tech Stack

**Backend**
- Node.js 20+ (LTS)
- Express.js + TypeScript
- PostgreSQL 14+ (Database principale)
- Redis (Caching & Session storage)
- Socket.io (Real-time messaging)
- Prisma ORM
- JWT + OAuth 2.0 (Authentication)
- Winston (Logging)
- Jest + Supertest (Testing)

**Frontend**
- Next.js 14+ (React Framework)
- TypeScript
- Tailwind CSS
- Zustand (State management)
- React Query (Data fetching)
- Socket.io-client

**Infrastructure**
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- PostgreSQL + Redis containers

## 📦 Struttura Progetto

```
alumni-platform/
├── backend/                 # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── config/         # Configurazioni (database, auth, env)
│   │   ├── controllers/    # Business logic per endpoint
│   │   ├── models/         # Prisma models & types
│   │   ├── routes/         # Route definitions
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── services/       # Business services (matching, notifications)
│   │   ├── utils/          # Helper functions
│   │   └── tests/          # Unit & integration tests
│   ├── prisma/             # Database schema & migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/               # Frontend (Next.js)
│   ├── src/
│   │   ├── app/           # Next.js 14 App Router
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities & API client
│   │   └── styles/        # Global styles
│   ├── public/            # Static assets
│   └── package.json
├── docs/                   # Documentazione
├── .github/
│   └── workflows/         # CI/CD pipelines
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisiti

- Node.js 20+ ([Download](https://nodejs.org/))
- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop))
- Git

### 1. Clone Repository

```bash
git clone https://github.com/mavcooo/alumni-platform.git
cd alumni-platform
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env
# Modifica .env con le tue configurazioni
npm install
npm run db:generate  # Genera Prisma Client
npm run db:push      # Crea database schema
```

### 3. Setup Frontend

```bash
cd ../frontend
cp .env.local.example .env.local
npm install
```

### 4. Avvia con Docker (Raccomandato)

```bash
# Dalla root del progetto
docker-compose up -d
```

Questo avvierà:
- Backend API → `http://localhost:3001`
- Frontend → `http://localhost:3000`
- PostgreSQL → `localhost:5432`
- Redis → `localhost:6379`

### 5. Sviluppo Locale (senza Docker)

**Terminal 1 - Database**
```bash
docker-compose up postgres redis -d
```

**Terminal 2 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend**
```bash
cd frontend
npm run dev
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report

# Frontend tests
cd frontend
npm test
```

## 📚 Documentazione API

Dopo aver avviato il backend, la documentazione Swagger è disponibile su:

```
http://localhost:3001/api-docs
```

### Endpoint Principali

#### Autenticazione
- `POST /api/auth/register` - Registrazione utente
- `POST /api/auth/login` - Login (JWT)
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/oauth/google` - OAuth Google

#### Utenti
- `GET /api/users/me` - Profilo utente autenticato
- `PATCH /api/users/me` - Aggiorna profilo
- `GET /api/users/:id` - Profilo pubblico

#### Mentorship
- `POST /api/mentorship/request` - Richiesta mentoring
- `GET /api/mentorship/matches` - Alumni suggeriti
- `PATCH /api/mentorship/:id/accept` - Accetta richiesta

#### Opportunità
- `GET /api/opportunities` - Lista opportunità
- `POST /api/opportunities` - Pubblica (alumni only)
- `POST /api/opportunities/:id/apply` - Candidatura

#### Messaggi
- `GET /api/messages/:conversationId` - Storico chat
- `POST /api/messages` - Invia messaggio
- `WS /ws/messages` - WebSocket real-time

## 🔐 Variabili d'Ambiente

### Backend (.env)

```env
# Server
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://alumni:password@localhost:5432/alumni_platform

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/oauth/google/callback

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@alumni-platform.it

# File Upload (AWS S3 / Cloudflare R2)
AWS_REGION=eu-south-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=alumni-platform-uploads

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 🐳 Docker Commands

```bash
# Avvia tutti i servizi
docker-compose up -d

# Stop servizi
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild after code changes
docker-compose up -d --build

# Database migrations
docker-compose exec backend npm run db:migrate

# Seed database
docker-compose exec backend npm run db:seed
```

## 📊 Database Schema

Lo schema completo PostgreSQL è disponibile in `backend/prisma/schema.prisma`.

### Tabelle Principali

- **users** - Autenticazione e ruoli (student, alumni, admin)
- **profiles** - Dati anagrafici comuni
- **student_profiles** - Estensione studenti
- **alumni_profiles** - Estensione alumni
- **opportunities** - Annunci lavoro
- **applications** - Candidature
- **mentorship_requests** - Richieste mentoring
- **messages** - Messaggistica
- **events** - Calendario eventi
- **forum_posts** - Forum community
- **skills** & **endorsements** - Sistema competenze

## 🔄 CI/CD Pipeline

GitHub Actions automatizza:

1. **Lint & Test** - Su ogni push/PR
2. **Build** - Verifica compilazione TypeScript
3. **Deploy Staging** - Auto-deploy su push a `develop`
4. **Deploy Production** - Manual approval per push a `main`

## 🛡️ Security Features

- ✅ Password hashing con bcrypt (cost factor 12)
- ✅ JWT con refresh token rotation
- ✅ Rate limiting (100 req/15min per IP)
- ✅ Helmet.js security headers
- ✅ CORS configurato
- ✅ Input validation con Zod
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection
- ✅ GDPR compliance (data export, soft delete)
- ✅ 2FA optional (TOTP)

## 📈 Performance

- Connection pooling PostgreSQL (max 20 connections)
- Redis caching per query frequenti
- Database indexes ottimizzati
- Lazy loading frontend components
- Image optimization (Next.js Image)

## 🤝 Contributing

1. Fork il progetto
2. Crea feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Apri Pull Request

### Code Style

- ESLint + Prettier configurati
- Segui convenzioni TypeScript
- Scrivi test per nuove features
- Documenta funzioni complesse

## 📝 License

Questo progetto è licenziato sotto MIT License - vedi [LICENSE](LICENSE) per dettagli.

## 👥 Team

- **Product Owner** - Direzione Istituto
- **Tech Lead** - Marco Gastaldello
- **Backend** - [Team Backend]
- **Frontend** - [Team Frontend]
- **UX/UI** - [Designer]

## 📞 Support

- 📧 Email: support@alumni-platform.it
- 📚 Docs: [Wiki](https://github.com/mavcooo/alumni-platform/wiki)
- 🐛 Issues: [GitHub Issues](https://github.com/mavcooo/alumni-platform/issues)

## 🗺️ Roadmap

### ✅ Phase 1 - MVP (Completata)
- [x] Sistema autenticazione
- [x] Profili studenti/alumni
- [x] Matching base
- [x] Messaggistica
- [x] Bacheca opportunità

### 🚧 Phase 2 - Community (In corso)
- [ ] Forum Q&A
- [ ] Eventi & calendario
- [ ] Sistema notifiche
- [ ] Dashboard admin

### 📅 Phase 3 - Advanced (Q2 2026)
- [ ] Portfolio showcase
- [ ] Videochiamate integrate
- [ ] Analytics avanzati
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)

---

**Made with ❤️ for Italian Vocational Education**
