# Jasil KJ — Modern AI & CSE Portfolio Website

A modern, minimal, single-page portfolio website built for **Jasil KJ**, a first-year B.Tech CSE (Artificial Intelligence) student at **Thejus Engineering College, Thrissur**.

## 🎨 Design Features
- **Dark Theme Palette**: Near-black navy base (`#05030F`) layered with ambient deep purple and violet radial glows.
- **Interactive 3D Glass Hero Shape**: An interactive WebGL Three.js glass torus knot at the bottom of the hero, featuring transmission optics, dynamic specular reflections, smooth floating physics, and mouse tilt reactivity.
- **Typography & Aesthetics**: Clean Inter font with tight tracking, radiant lavender-to-violet gradient text treatments, and pill badges.
- **Pill-shaped CTA Buttons**: High-contrast solid white primary button with ambient glow + dark translucent secondary button with subtle glass border.
- **Glassmorphism Components**: Translucent cards (`backdrop-blur-xl`), 1px borders, rounded corners (16–24px), and mouse spotlight hover effects.
- **Sections**:
  1. **Hero**: Headline, pill badge, call-to-actions, and interactive 3D WebGL glass torus knot.
  2. **About**: Portrait photo in a rounded glass frame with soft purple glow, bio, and quick facts grid.
  3. **Skills**: Glass cards for Python, C, HTML/CSS, JavaScript, Git, and Machine Learning basics + "Currently Learning" row.
  4. **Projects**: 3 glass cards with mock previews, descriptions, tech tags, and code/live links.
  5. **Education & Timeline**: Academic milestones at Thejus Engineering College and Higher Secondary.
  6. **Contact**: Quick-copy email button, social profile links, and an interactive contact form.
  7. **Footer**: Clean branding with quick navigation and back-to-top shortcut.

---

## 🛠️ How to Customize Your Portfolio

All personal information, links, projects, and skills are maintained in **one single file** for effortless editing:

👉 **[`js/data.js`](js/data.js)**

### 1. Updating Your Portrait Photo
- Replace the file `assets/avatar.svg` with your own picture (e.g. `assets/my-photo.jpg`).
- In `js/data.js`, update:
  ```javascript
  avatar: "assets/my-photo.jpg",
  ```

### 2. Linking Your Resume PDF
- Place your resume PDF in the root or `assets/` folder (e.g. `assets/Jasil_KJ_Resume.pdf`).
- In `js/data.js`, update:
  ```javascript
  resumeUrl: "assets/Jasil_KJ_Resume.pdf",
  ```

### 3. Adding or Modifying Projects
- In `js/data.js`, find the `projects` array and edit or add items:
  ```javascript
  {
    id: "my-new-project",
    title: "Project Title",
    tagline: "Short Subtitle",
    description: "Detailed description of the problem solved.",
    image: "assets/project-1.svg",
    tags: ["Python", "TensorFlow", "FastAPI"],
    github: "https://github.com/jasilkj/my-repo",
    live: "https://my-demo-link.com",
    featured: true
  }
  ```

### 4. Updating Social Profiles & Email
- In `js/data.js`, find `personal.email` and `contact.socials` to update your LinkedIn, GitHub, Instagram, or email.

---

## 🚀 Live Preview
Open the live preview link provided by the environment to view the site as it updates in real time.
