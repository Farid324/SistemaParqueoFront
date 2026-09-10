<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" width="120" alt="Next.js Logo" /></a>
</p>

<h1 align="center">SistemaParqueoFront 🖥️🅿️</h1>

<p align="center">
  <b>Panel Web de Administración para el Sistema de Parqueos SaaS</b><br/>
  Construido con Next.js 16, React 19, TypeScript, Tailwind CSS y pnpm.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
</p>

---

## 📋 Tabla de Contenidos
- [Arquitectura General del Sistema](#-arquitectura-general-del-sistema)
- [Conexión con el Backend](#-conexión-con-el-backend)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Ejecución](#-ejecución)
- [Despliegue en Producción (Vercel)](#-despliegue-en-producción-vercel)

---

## 🌐 Arquitectura General del Sistema

Este frontend es el **panel de administración web** del Sistema de Parqueos SaaS. Se conecta al backend (NestJS) para consumir datos y no tiene conexión directa con la base de datos.

```text
┌──────────────────────────┐
│  SistemaParqueoFront     │        ┌──────────────────────────┐
│  (Este proyecto)         │───────▶│                          │       ┌─────────────────┐
│  Next.js — Puerto: 3000  │        │  SistemaParqueoBack      │──────▶│  Supabase        │
│                          │        │  NestJS — Puerto: 4000   │       │  PostgreSQL      │
│                          │        │                          │       └─────────────────┘
└──────────────────────────┘        └──────────────────────────┘

┌──────────────────────────┐                    ▲
│  SistemaParqueoApp       │────────────────────┘
│  Expo — Puerto: 8081     │
└──────────────────────────┘
```

### Puertos en Desarrollo Local

| Proyecto | Puerto | Descripción |
|---|---|---|
| **SistemaParqueoBack** | `4000` | API REST (NestJS) — servidor central |
| **SistemaParqueoFront** (este proyecto) | `3000` | Panel web (Next.js) |
| **SistemaParqueoApp** | `8081` | App móvil (Expo) |

---

## 🔌 Conexión con el Backend

### Estrategia: Variable de entorno centralizada

Toda la comunicación con el backend pasa por un **cliente API centralizado** ubicado en `app/services/api.ts`. Este archivo:

1. Lee la URL del backend desde `process.env.NEXT_PUBLIC_API_URL`
2. Agrega automáticamente el prefijo `/api`
3. Configura headers (`Content-Type`, `Authorization`)
4. Maneja errores de forma estandarizada

> 🚫 **Nunca** escribas `localhost` o una URL directa en tus componentes. Siempre importa las funciones del cliente API.

### Cómo usar los servicios

```typescript
// ✅ CORRECTO — Usar los servicios centralizados
import { healthService } from '@/app/services/health.service';
import { usersService } from '@/app/services/users.service';

// Health check
const status = await healthService.check();

// Obtener usuarios
const users = await usersService.getAll();

// Crear usuario
const newUser = await usersService.create({
  email: 'admin@parqueo.com',
  name: 'Admin',
  password: 'Pass1234!',
});
```

```typescript
// ❌ INCORRECTO — Nunca hagas esto
const res = await fetch('http://localhost:4000/api/users');
```

### Desarrollo → Producción (sin cambiar código)

| Entorno | `.env` |
|---|---|
| Desarrollo | `NEXT_PUBLIC_API_URL=http://localhost:4000` |
| Producción | `NEXT_PUBLIC_API_URL=https://tu-backend.render.com` |

Solo cambias **1 valor** en el `.env` (o en el dashboard de Vercel) y todo funciona.

### Archivos de conexión

| Archivo | Descripción |
|---|---|
| `app/services/api.ts` | Cliente HTTP centralizado (apiFetch, apiGet, apiPost, etc.) |
| `app/services/health.service.ts` | Servicio de health check (`GET /api/health`) |
| `app/services/users.service.ts` | Servicio de usuarios (`GET /api/users`, `POST /api/users`) |
| `app/types/types.ts` | Interfaces TypeScript que reflejan las entidades del backend |

---

## 🏗️ Estructura del Proyecto

```text
SistemaParqueoFront/my-app/
├── app/
│   ├── components/          # Componentes reutilizables de React
│   ├── context/             # Contextos globales (auth, theme, etc.)
│   ├── hooks/               # Hooks personalizados
│   ├── services/            # 🔌 Conexión con el backend
│   │   ├── api.ts           # Cliente HTTP centralizado
│   │   ├── health.service.ts
│   │   └── users.service.ts
│   ├── types/               # Interfaces TypeScript compartidas
│   │   └── types.ts
│   ├── utils/               # Funciones auxiliares
│   ├── globals.css          # Estilos globales (Tailwind)
│   ├── layout.tsx           # Layout raíz
│   └── page.tsx             # Página principal
│
├── public/                  # Archivos estáticos
├── .env                     # Variables de entorno (NO se sube a Git)
├── .env.example             # Plantilla de variables de entorno
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🛠️ Requisitos Previos

- **Node.js**: `v22.x` o superior (LTS)
- **pnpm**: `v10.x` o superior (`npm install -g pnpm`)
- **Git**

---

## 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/SistemaParqueoFront.git
   cd SistemaParqueoFront/my-app
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   Editar el archivo `.env` con la URL del backend (ver siguiente sección).

---

## 🔑 Variables de Entorno

Crea un archivo `.env` basándote en `.env.example`:

```env
# URL base del Backend (SistemaParqueoBack)
# - Desarrollo local:  http://localhost:4000
# - Producción (Vercel): https://tu-backend-en-produccion.com
NEXT_PUBLIC_API_URL=http://localhost:4000
```

> 💡 **¿Por qué `NEXT_PUBLIC_`?** Next.js solo expone al navegador las variables que empiezan con este prefijo. Las demás solo están disponibles en el servidor.

> ⚠️ El archivo `.env` está en `.gitignore` — nunca se sube al repositorio. El archivo `.env.example` sí se sube como referencia para otros desarrolladores.

---

## 🚀 Ejecución

```bash
# Iniciar en modo desarrollo (con hot reload)
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

> 📌 **Asegúrate** de que el backend (SistemaParqueoBack) esté corriendo en el puerto `4000` antes de intentar consumir datos.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo en `http://localhost:3000` |
| `pnpm build` | Genera el bundle de producción |
| `pnpm start` | Sirve el bundle de producción |
| `pnpm lint` | Ejecuta ESLint |

---

## 🚀 Despliegue en Producción (Vercel)

1. Conecta el repositorio a [Vercel](https://vercel.com)
2. En **Settings → Environment Variables**, agrega:
   ```
   NEXT_PUBLIC_API_URL = https://tu-backend-en-produccion.com
   ```
3. Deploy automático en cada push a `main`

> ✅ No necesitas cambiar ningún archivo de código. Solo la variable de entorno.

---

<p align="center">
  Desarrollado con ❤️ por el equipo de <b>SistemaParqueo SaaS</b>
</p>
