Here is the complete, combined `README.md` file. You can copy this entire block and paste it into your file.

```markdown
# UniSys - FYP Management System

**Description:** A comprehensive Final Year Project (FYP) management system featuring dedicated portals for Admins, Students, and Supervisors. Built with Next.js 15, Supabase, and Cloudinary.

UniSys is a robust web-based platform designed to streamline the management of Final Year Projects (FYP) for universities. It facilitates seamless interaction between administrators, students, and supervisors through three dedicated portals.

## 🚀 Project Structure

This repository is organized as a monorepo containing three distinct applications:

- **`/admin-portal`**: For administrators to manage users (students/supervisors), configure system settings, view dashboards, and archive past projects.
- **`/student-portal`** *(In Development)*: For students to register, select supervisors, submit project milestones, and view feedback.
- **`/supervisor-portal`** *(In Development)*: For supervisors to manage assigned students, review submissions, and track progress.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **File Storage:** [Cloudinary](https://cloudinary.com/) (for PDF archives)
- **Icons:** React Icons (Remix Icon set)

## ⚡ Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase project setup
- A Cloudinary account (for file uploads)

### 1. Setup the Admin Portal

Navigate to the admin directory:
```bash
cd admin-portal

```

Install dependencies:

```bash
npm install

```

### 2. Configure Environment Variables

Create a `.env.local` file inside `admin-portal/` and add your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Configuration (For Archives)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset

```

### 3. Run the Development Server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 🗄️ Database Schema (Key Tables)

The system relies on the following key tables in Supabase:

* **users** (Managed by Supabase Auth)
* **students**: Stores student profiles and supervisor assignments.
* **supervisors**: Stores supervisor details and capacity limits.
* **archives**: Stores past project metadata and PDF URLs.
* **settings**: A singleton table for global system configurations (e.g., max students per supervisor).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

```

```