# 🌌 Francoverse — Portfolio

Mi portfolio personal como desarrollador fullstack con foco en ciberseguridad. Construido con un stack moderno, animaciones fluidas y diseño minimalista.

🔗 **[francoverse.vercel.app](https://francoverse.vercel.app)**

---

## ✨ Secciones

- **Hero** — Presentación con descarga de CV
- **Sobre mí** — Estadísticas y experiencia
- **Proyectos** — Cards de proyectos con imagen, stack y links
- **Skills** — Stack tecnológico con marquee animado
- **Contacto** — Formulario y redes sociales

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| **Next.js 16** | Framework fullstack con App Router |
| **React 19** | UI con hooks y componentes funcionales |
| **TypeScript** | Tipado estático en todo el proyecto |
| **Tailwind CSS 3** | Estilos utilitarios y diseño responsivo |
| **Framer Motion** | Animaciones declarativas y transiciones |
| **Lucide React** | Íconos SVG |
| **React Icons** | Íconos adicionales |
| **next-themes** | Soporte de tema claro/oscuro |
| **React Intersection Observer** | Animaciones al entrar en viewport |
| **Vercel** | Deploy y hosting en producción |

---

## 💻 Correr localmente

### Prerequisitos

- Node.js 18+
- yarn

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/francovillagra/Francoverse.git
cd Francoverse

# 2. Instalar dependencias
yarn install

# 3. Correr en modo desarrollo
yarn dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu browser.

### Build de producción

```bash
yarn build
yarn start
```

---

## 📁 Estructura del proyecto

```
Francoverse/
├── app/
│   ├── page.tsx                  # Página principal
│   └── layout.tsx                # Layout global
├── components/
│   ├── sections/
│   │   ├── About/                # Sección "Sobre mí"
│   │   ├── Projects/             # Sección de proyectos
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── ProjectCard.tsx
│   │   ├── Skills/               # Sección de skills
│   │   └── Contact/              # Sección de contacto
│   └── ui/                       # Componentes reutilizables
├── data/
│   └── projects.ts               # Lista de proyectos y tipo Project
├── lib/                          # Utilidades y helpers
├── public/                       # Assets estáticos
└── types/                        # Tipos TypeScript globales
```

---

## 📈 Proyectos destacados

| Proyecto | Stack | Demo |
|----------|-------|------|
| **API REST Securizada** | Node.js, Express, JWT, bcrypt | [Ver](https://auth-api-production.vercel.app) |
| **Web Vulnerability Scanner** | Next.js, TypeScript, Axios, Recharts | [Ver](https://web-vulnerability-scanner-red.vercel.app) |

---

## 👨‍💻 Autor

**Franco Villagra** — Desarrollador Fullstack · Ciberseguridad

- Portfolio: [francoverse.vercel.app](https://francoverse.vercel.app)
- GitHub: [@francovillagra](https://github.com/francovillagra)

---

## 📄 Licencia

MIT — libre para usar, modificar y distribuir.
