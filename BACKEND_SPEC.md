# Especificación del Backend — MILLA ABOGADOS

> **Para IAs:** Este documento describe TODO el backend que existía en ChatGPT Sites. Úsalo como especificación para reconstruir el sistema completo.

---

## 📋 Sistemas del Backend

### 1. Panel de Administración (`/admin`)
**Propósito:** Panel privado para gestionar el sitio, consultas, agenda y documentos.

**Funcionalidades:**
- Login seguro (email + contraseña + 2FA opcional)
- Dashboard con métricas: consultas recibidas, agenda del día, documentos pendientes
- Gestión de consultas del Buzón Jurídico: ver, filtrar, responder, archivar
- Gestión de citas de Asesoría Virtual: confirmar, reprogramar, cancelar
- Editor de contenido: modificar textos de servicios, equipo, diferenciadores
- Registro de actividad (quién hizo qué y cuándo)

**Rutas:**
- `POST /admin/login` — Autenticación
- `GET /admin/dashboard` — Datos del dashboard
- `GET /admin/consultas` — Lista de consultas (con filtros)
- `PUT /admin/consultas/:id` — Actualizar estado de consulta
- `GET /admin/agenda` — Citas del día/semana
- `PUT /admin/agenda/:id` — Gestionar cita
- `PUT /admin/contenido/:section` — Editar sección del sitio

---

### 2. Buzón Jurídico (Formulario de Contacto)
**Propósito:** Recibir y procesar consultas legales del público.

**Flujo:**
1. Usuario llena el formulario en `#contacto`
2. Validación client-side (ya implementada en `app.js`)
3. Cloudflare Turnstile verifica que no es bot
4. POST al endpoint del backend
5. Backend valida, sanitiza, genera folio `FOLIO-YYYYMMDD-XXXX`
6. Guarda en base de datos
7. Envía email de confirmación al usuario
8. Notifica al Socio Director (email/WhatsApp)
9. Disponible en panel de admin

**Endpoint:**
```
POST /api/consultas
Body: {
  tipo: "consulta_inicial" | "sugerencia" | "seguimiento" | "alianza",
  materia: "corporativo" | "civil_familiar" | "laboral_mercantil" | "fiscal" | "amparo" | "otra",
  nombre: string,
  email: string,
  telefono?: string,
  mensaje: string,
  turnstile_token: string
}
Response: {
  folio: "FOLIO-20260726-A3F2",
  mensaje: "Tu consulta ha sido registrada. Te responderemos en máximo 48 horas hábiles."
}
```

---

### 3. Agenda / Asesoría Virtual
**Propósito:** Sistema de citas para videollamadas jurídicas.

**Flujo:**
1. Usuario visita `#asesoria-virtual`
2. Ve disponibilidad de la Abogada Titular y/o Socio Director
3. Selecciona fecha, hora y tipo de consulta
4. Llena datos de contacto
5. Recibe confirmación por email con link de videollamada
6. Recordatorio 24h antes y 1h antes
7. Abogado ve su agenda en el panel de admin

**Integraciones posibles:**
- Google Calendar API
- Calendly
- Zoom/Google Meet API (generar links)

**Endpoint:**
```
GET /api/agenda/disponibilidad?fecha=2026-07-26&abogado=titular
POST /api/agenda/citas
Body: {
  fecha: "2026-07-28",
  hora: "10:00",
  tipo: "consulta" | "alianza" | "integral",
  abogado: "titular" | "socio" | "ambos",
  nombre: string,
  email: string,
  telefono?: string,
  materia: string,
  descripcion: string
}
```

---

### 4. MILLA ABOGADOS IA (Chatbot / Asistente)
**Propósito:** Asistente virtual con IA que responde preguntas frecuentes y califica consultas.

**Flujo:**
1. Usuario hace clic en chat flotante (esquina inferior derecha)
2. IA saluda y pregunta qué necesita
3. Responde preguntas frecuentes (horarios, servicios, costos orientativos)
4. Si es consulta legal: califica urgencia y materia, sugiere agendar cita
5. Si el usuario quiere hablar con humano: transfiere al Buzón Jurídico

**Tecnología:**
- OpenAI API (GPT-4) con system prompt de abogado
- Base de conocimiento: servicios, equipo, metodología, FAQ
- Clasificación automática de materia y urgencia
- Escalamiento a humano cuando detecta caso complejo

**System Prompt (referencia):**
```
Eres el asistente virtual de MILLA ABOGADOS, firma jurídica boutique en CDMX y EdoMex.
Tu función es orientar, NO dar asesoría legal.
Responde preguntas sobre nuestros servicios, equipo y proceso.
Si el usuario describe un caso legal, clasifícalo por materia y urgencia,
y sugiere agendar una consulta con la Abogada Titular.
Sé profesional, empático y claro. No prometas resultados.
```

---

### 5. Sistema de Firmas Electrónicas
**Propósito:** Firmar documentos legales digitalmente.

**Flujo:**
1. Abogado sube documento al panel de admin
2. Asigna firmantes (cliente, contraparte, testigos)
3. Sistema envía email a cada firmante con link seguro
4. Firmante revisa documento, dibuja/adjunta firma
5. Firma se aplica al PDF con timestamp y hash SHA-256
6. Documento firmado se almacena y se notifica a todos

**Integración:** API de DocuSign, HelloSign o similar.

---

### 6. Base de Datos
**Tablas principales:**

```sql
-- Usuarios del panel admin
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(255),
  rol VARCHAR(50), -- 'admin', 'abogado', 'operaciones'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Consultas del Buzón Jurídico
CREATE TABLE consultas (
  id SERIAL PRIMARY KEY,
  folio VARCHAR(20) UNIQUE NOT NULL, -- FOLIO-YYYYMMDD-XXXX
  tipo VARCHAR(50),
  materia VARCHAR(50),
  nombre VARCHAR(255),
  email VARCHAR(255),
  telefono VARCHAR(40),
  mensaje TEXT,
  estado VARCHAR(50) DEFAULT 'pendiente', -- pendiente, revisada, respondida, archivada
  created_at TIMESTAMP DEFAULT NOW()
);

-- Citas de Asesoría Virtual
CREATE TABLE citas (
  id SERIAL PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  tipo VARCHAR(50),
  abogado VARCHAR(50),
  nombre VARCHAR(255),
  email VARCHAR(255),
  telefono VARCHAR(40),
  materia VARCHAR(100),
  descripcion TEXT,
  meet_link VARCHAR(500),
  estado VARCHAR(50) DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Documentos firmados
CREATE TABLE documentos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(500),
  archivo_url VARCHAR(1000),
  hash_sha256 VARCHAR(64),
  estado VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Firmas de documentos
CREATE TABLE firmas (
  id SERIAL PRIMARY KEY,
  documento_id INTEGER REFERENCES documentos(id),
  firmante_nombre VARCHAR(255),
  firmante_email VARCHAR(255),
  firma_url VARCHAR(1000),
  ip VARCHAR(45),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Conversaciones del chatbot IA
CREATE TABLE conversaciones_ia (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(100),
  usuario_mensaje TEXT,
  ia_respuesta TEXT,
  materia_detectada VARCHAR(100),
  urgencia VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 7. Seguridad
- **Autenticación:** JWT con refresh tokens
- **Rate Limiting:** 5 consultas/hora por IP en Buzón Jurídico
- **CORS:** Solo permitir millabogados.com
- **Cloudflare Turnstile:** En formularios públicos
- **Sanitización:** Ya implementada en `src/utils/sanitize.js`
- **Honeypot:** Campo oculto anti-bots (ya implementado)

---

## 🚀 Cómo reconstruir (para cualquier IA)

1. **Base de datos:** PostgreSQL o SQLite (para empezar simple)
2. **Backend framework:** Node.js (Express) o Next.js API routes
3. **Hosting:** Cloudflare Workers + D1 (gratis) o Vercel + Supabase
4. **Email:** Resend, SendGrid o Nodemailer
5. **Videollamadas:** Google Meet API o Zoom API
6. **Firmas:** DocuSign API o HelloSign API
7. **IA Chatbot:** OpenAI API con el system prompt de arriba
8. **Almacenamiento:** Cloudflare R2 o S3 para documentos

## 📂 Estructura de archivos esperada

```
backend/
├── package.json
├── .env.example
├── src/
│   ├── index.ts              # Entry point
│   ├── routes/
│   │   ├── admin.ts          # Panel de administración
│   │   ├── consultas.ts      # Buzón Jurídico
│   │   ├── agenda.ts         # Asesoría Virtual
│   │   ├── documentos.ts     # Firmas electrónicas
│   │   └── ia.ts             # Chatbot IA
│   ├── middleware/
│   │   ├── auth.ts           # JWT verification
│   │   └── rateLimit.ts      # Rate limiting
│   ├── db/
│   │   ├── schema.ts         # Esquema de BD
│   │   └── index.ts          # Conexión
│   └── utils/
│       ├── folio.ts          # Generador de folios
│       ├── sanitize.ts       # Sanitización XSS
│       └── email.ts          # Envío de emails
└── tests/
```

---

> **Nota para IAs:** El frontend ya está 100% construido (ver `index.html` y `redesign-version/`). Lo que falta es este backend. Sigue esta especificación y el sistema queda completo.
