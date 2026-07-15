# Bhavya Gupta - Developer Portfolio

Welcome to my personal developer portfolio! This is a modern, full-stack portfolio website built to showcase my projects, skills, experience, and professional journey.

## 🚀 Live Demo
You can view the live portfolio here: [Insert Vercel Link Here]

## ✨ Features
- **Dynamic Content:** All projects, skills, and experiences are loaded dynamically from a cloud database.
- **Admin Portal:** Includes a secure, authenticated admin dashboard to easily add, edit, or remove portfolio content without touching the code.
- **Modern Design:** Built with a sleek, responsive design using Tailwind CSS and Framer Motion for smooth animations.
- **Resume Integration:** Seamlessly embeds a viewable resume using Google Drive/Dropbox links.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), React 19, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Next.js Route Handlers (API)
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** Custom JWT-based authentication (jose) for the Admin panel
- **Deployment:** Vercel

## 💻 Running Locally

If you want to clone this repository and run it locally:

1. **Clone the repo**
   ```bash
   git clone https://github.com/bhavyagupta-5/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_USERNAME=your_chosen_admin_username
   ADMIN_PASSWORD=your_chosen_admin_password
   JWT_SECRET=any_long_random_string_for_security
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
