# 🔷 NextFlow

**NextFlow** is a visual page builder built with **Next.js** and inspired by the ideas behind Webflow — but with full control over components, styles, and logic.

At its core, it features a custom WYSIWYG editor built with **Tiptap**, enabling users to create pages using **React components** and control attributes like margin, padding, classes, and more using a real-time visual interface.

---

## 🚀 Tech Stack

- **Next.js 15** (App Router)
- **Tiptap** – Headless WYSIWYG editor
- **Prisma** – ORM and schema for the database
- **TailwindCSS** – Utility-first styling
- **shadcn/ui** – Accessible and reusable components
- **NextAuth.js** – Auth with `CredentialsProvider` (email + password)
- **TypeScript**
- **React Hook Form** – For form handling

---

## 📁 Scripts

| Command                  | Description                             |
| ------------------------ | --------------------------------------- |
| `npm run dev`            | Start the development server            |
| `npm run build`          | Create a production build               |
| `npm run start`          | Start the production server             |
| `npm run lint`           | Run ESLint                              |
| `npx prisma generate`    | Generate the Prisma client              |
| `npx prisma studio`      | Open Prisma Studio UI                   |
| `npx prisma db push`     | Sync models to the database             |
| `npx prisma db pull`     | Introspect an existing database         |
| `npx prisma migrate dev` | Create and apply a migration (dev only) |

---

## 🧪 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-user/nextflow.git
cd nextflow
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```env
DATABASE_URL=""        # Prisma Database URL
NEXTAUTH_SECRET=""     # Secret key for NextAuth session encryption
```

4. **Generate Prisma client**

```bash
npx prisma generate
```

5. **Run the development server**

```bash
npm run dev
```

Go to [`http://localhost:3000`](http://localhost:3000) to see the app running.

---

## 🔐 Authentication

The authentication system is powered by **NextAuth.js** using the **CredentialsProvider**, where users sign in using **email and password**. Registration is not available — only authorized users can log in.

Access to `/editor` is protected and requires a valid session.

---

## ✨ Features

- ⚡ Build pages visually using a custom Tiptap WYSIWYG editor
- 🧱 Render React components based on structured JSON content
- 🎨 Modify and apply Tailwind classes like `mt-4`, `p-6`, `text-center` dynamically
- 🔐 Protected dashboard using credential-based auth
- 💾 Pages are saved with versioned JSON content via Prisma
- 📚 Editor context allows for dynamic state management of page + content

---

## 🔄 Roadmap

- [x] Node rendering with live component updates
- [x] Margin & padding visual controls
- [x] Class attribute editing
- [x] Authentication with credentials
- [ ] Public preview URLs
- [ ] Drag & drop layout building
- [ ] Component library integration
- [ ] Per-page SEO configuration 🔍
- [ ] Custom body styles per page 🎨
- [ ] Drag & drop components/modules into the editor 🧩

---

## 🤝 Contributing

Pull requests and issues are welcome. If you have an idea or improvement, feel free to open a discussion or PR. 🙌

---

## 🧾 License

MIT — © 2025 Daniel Marquez
