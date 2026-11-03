<div align="center">

# 🏛️ Barangay Tablon Community & Public Services Portal
### **Academic Mini-Project for ITE 387: Advanced Programming**
**3rd Year, 1st Semester — Information Technology**

[![Course](https://img.shields.io/badge/Course-ITE%20387%3A%20Advanced%20Programming-blue.svg?style=for-the-badge&logo=codeforces&logoColor=white)](https://github.com)
[![Academic Level](https://img.shields.io/badge/Academic%20Level-3rd%20Year%20%7C%201st%20Semester-0284c7.svg?style=for-the-badge)](https://github.com)
[![Architecture](https://img.shields.io/badge/Architecture-Vanilla%20ES6%2B%20%7C%20Progressive%20Enhancement-10b981.svg?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com)
[![Status](https://img.shields.io/badge/Status-Completed%20%26%20Optimized-success.svg?style=for-the-badge)](https://github.com)

<p align="center">
  A modern, responsive, and data-driven civic portal engineered for <strong>Barangay Tablon</strong>, Cagayan de Oro City, Misamis Oriental, Philippines.<br>
  Built from the ground up to embody the software engineering principles and curriculum competencies taught in <strong>ITE 387: Advanced Programming</strong>.
</p>

[Explore UI Tour](#-visual-ui-showcase--tour) • [Academic Lessons](#-academic-lessons--curriculum-alignment-ite-387) • [Tech Stack](#-technology-stack--specifications) • [How to Run](#-local-setup--execution-guide) • [GitHub Upload](#-step-by-step-github-deployment-guide)

---

</div>

## 📑 Table of Contents
1. [Project Overview & Background](#-project-overview--background)
2. [Academic Lessons & Curriculum Alignment (ITE 387)](#-academic-lessons--curriculum-alignment-ite-387)
3. [Core System Features](#-core-system-features)
4. [Visual UI Showcase & Tour](#-visual-ui-showcase--tour)
5. [Technology Stack & Specifications](#-technology-stack--specifications)
6. [Repository Structure & File Inventory](#-repository-structure--file-inventory)
7. [Local Setup & Execution Guide](#-local-setup--execution-guide)
8. [Step-by-Step GitHub Deployment Guide](#-step-by-step-github-deployment-guide)
9. [Academic Attribution & Credits](#-academic-attribution--credits)

---

## 📖 Project Overview & Background

The **Barangay Tablon Community Website** is a responsive multi-page public portal developed as an academic mini-project for **ITE 387: Advanced Programming**. It serves as an official digital information hub and citizen engagement platform connecting the **Barangay Local Government Unit (BLGU)** with its residents, local workforce, and visitors.

### Geographic & Economic Profile
* **Location:** 2nd Congressional District, Cagayan de Oro City, Misamis Oriental, Northern Mindanao (Region X).
* **Industrial Importance:** Barangay Tablon is the **second-largest economic and industrial hub** in Cagayan de Oro. It is notably home to the **Nestlé Philippines Cagayan de Oro Factory**, a sprawling 25.6-hectare plant established in 1984 as Nestlé's first and only manufacturing facility outside Luzon (producing primarily Nescafé).
* **Demographics:** Population of **24,578 residents** (2020 Census) spanning **22.08 km²** across lowland coastal areas and highland scenic ridges.
* **Heritage & Culture:** Originated from early coastal settlements hauling timber logs (*"tablón"*), balancing industrial progress with deep cultural devotion to **Señor Sto. Niño** and the sacred **Our Lady of Guadalupe Pilgrimage Site**.

---

## 🎓 Academic Lessons & Curriculum Alignment (ITE 387)

This mini-project was designed, organized, and refactored to directly demonstrate practical mastery of the topics covered in the **ITE 387: Advanced Programming** syllabus (specifically Track B Web & Database Engineering Labs and Track A Modern JavaScript/Component Paradigms):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   ITE 387 ADVANCED PROGRAMMING COMPETENCIES                 │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ 01. JavaScript           │ • ECMAScript Modules (ESM) Architecture          │
│     Foundations          │ • Single Source of Truth (SSOT) Data Modeling    │
│     (Lab 01)             │ • Non-mutating Functional Iteration (map/filter) │
│                          │ • Safe DOM Ready Lifecycle (DOMContentLoaded)    │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 02. DOM & UI             │ • 4-Step Dynamic Element Creation Lifecycle      │
│     Manipulation         │ • Abstracted Element Generator (create helper)   │
│     (Lab 02)             │ • Single Reusable Modal Shell (Lightbox Pattern) │
│                          │ • Accessible Dynamic UI Alerts (Toast System)    │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 03. State & Persistence  │ • Consolidated Object State (formData)           │
│     Architecture         │ • Immutable Spread Syntax Updates (...prev)      │
│     (Lab 03 & Opt. 02)   │ • Browser LocalStorage Client-Side Persistence   │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 04. Architectural        │ • Progressive CSS Enhancement (.js-active)       │
│     Resilience           │ • Dual Execution Compatibility (file:// & HTTP)  │
│                          │ • Graceful Image Fallback Placeholders           │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

### 1. ECMAScript Modules (ESM) & Single Source of Truth (`Lab 01`)
* **Modularity:** Rather than maintaining a tangled monolithic script, logic is divided into single-responsibility ES modules under `js/modules/` (`utilities.js`, `data.js`, `dom.js`, `lightbox.js`, `toast.js`, `feedback.js`).
* **Single Source of Truth:** Datasets for Officials, Attractions, Events, and Statistics are defined once as frozen, immutable arrays and objects in [`js/modules/data.js`](js/modules/data.js).
* **Functional Data Transformation:** Eliminates primitive index-counting `for` loops in favor of declarative, side-effect-free methods: `.filter()` for categories and `.map()` / `.forEach()` for template rendering.

### 2. The 4-Step Dynamic DOM Lifecycle (`Lab 02`)
All dynamic HTML elements strictly adhere to the authoritative 4-step creation pattern via the abstracted `create()` helper:
1. **Create:** Instantiate node via `document.createElement(tag)`
2. **Configure:** Set text, attributes, semantic classes (`classList`), and data attributes (`dataset`)
3. **Listen:** Attach event handlers directly (`addEventListener`)
4. **Append:** Insert child nodes into parent containers (`appendChild`)

### 3. Consolidated Form State & LocalStorage Persistence (`Lab 03`)
* **Consolidated Object State:** The Resident Feedback Form on `services.html` tracks inputs in a unified state object (`formData = { fullName, email, contactNumber, category, message }`) updated immutably using the spread operator (`...formData, [field]: value`).
* **Client-Side Persistence:** Submissions are validated and stored in `localStorage` (`tablon_resident_feedback`), providing persistent record storage without external database overhead.
* **Dynamic Toast Notifications:** Programmatic, self-dismissing floating alert banners give instant user feedback upon submission.

### 4. Architectural Resilience & Progressive Enhancement
* **Dual-Mode Execution:** The application features a dual-compatible architecture: individual modular source files are preserved under `js/modules/` for academic grading, while [`js/main.js`](js/main.js) provides a self-contained entrypoint that runs with **zero CORS restrictions on both local file systems (`file:///`) and HTTP web servers**.
* **Progressive CSS Enhancement:** To prevent blank white screens if scripts are slow or blocked, all content sections default to `opacity: 1;`. Dynamic scroll animations are progressively activated under `.js-active` only after JavaScript successfully initializes.

---

## ⚡ Core System Features

* 📱 **Fully Responsive Layout:** Fluid navigation and grid layouts designed for mobile phones, tablets, and ultra-wide desktop monitors.
* 🍔 **Mobile Drawer Navigation:** Touch-friendly hamburger menu with backdrop blur overlay and automatic page highlighting.
* 🏛️ **Dynamic Governance Directory:** Real-time generation of the Barangay Council hierarchy (Punong Barangay, Kagawads, and Administrative Staff) directly from data structures.
* 🏞️ **Interactive Attractions Filter:** Real-time client-side category filtering (`All Places`, `Landmarks`, `Nature`, `Recreation`) with animated CSS transitions.
* 📬 **Citizen Feedback Desk:** Interactive form with live validation, category tagging, and automatic local persistence.
* 🔔 **Programmatic Toast System:** Smooth floating toast alerts for successes, warnings, and system notifications.
* 🖼️ **Full-Screen Lightbox Modal:** Reusable image inspection modal with keyboard shortcuts (<kbd>Escape</kbd>, <kbd>→</kbd>, <kbd>←</kbd>) and click-outside dismissal.
* 🚨 **Emergency Directory & Hotlines:** Comprehensive emergency numbers (911 Central, BFP Fire Stations, COCPO Police Stations) and healthcare facility listings.

---

## 📸 Visual UI Showcase & Tour

Below is an extensive visual walkthrough of the Barangay Tablon portal, captured directly from the running application:

### 1. Home Page — Hero & Demographic Metrics
The landing page greets visitors with a bold glassmorphic hero banner, followed by animated statistical counter cards summarizing population, land area, and economic status.

| Landing Page Hero | Community Overview & Demographic Metrics |
| :---: | :---: |
| <img src="UI_Screenshots/Screenshot%20(1293).png" alt="Home Hero Banner" width="100%"> | <img src="UI_Screenshots/Screenshot%20(1294).png" alt="Overview and Statistics" width="100%"> |
| *Hero section with CTA buttons and official badge* | *Key metrics: 24,578 population, 22.08 km², 2nd CDO Industrial Hub* |

---

### 2. About the Barangay — History, Vision & Mission
Features the historical journey from early timber-cutting settlements (*"tablon"*) to the 1984 Nestlé milestone, alongside official Vision/Mission statements and geographical coordinates.

| Community Profile & Territory Map | Vision, Mission & Location Data |
| :---: | :---: |
| <img src="UI_Screenshots/Screenshot%20(1296).png" alt="About Community Overview" width="100%"> | <img src="UI_Screenshots/Screenshot%20(1301).png" alt="Vision and Mission" width="100%"> |
| *Community introduction and territorial overview map* | *Official BLGU Vision, Mission, and Demographic data cards* |

---

### 3. Barangay Governance — Dynamic Officials Directory
Rendered dynamically from [`js/modules/data.js`](js/modules/data.js) via the 4-step DOM lifecycle, displaying the complete roster of elected and appointed leaders for public transparency.

<div align="center">
  <img src="UI_Screenshots/Screenshot%20(1304).png" alt="Barangay Officials Roster" width="90%">
  <p><em>Dynamic leadership hierarchy: Punong Barangay, Sangguniang Barangay Kagawads, and Administrative Officers</em></p>
</div>

---

### 4. Tourist Attractions & Landmarks (Interactive Filter)
Demonstrates functional array filtering (`.filter()`). Visitors can toggle between landmarks, nature spots, and recreational areas in real time.

<div align="center">
  <img src="UI_Screenshots/Screenshot%20(1308).png" alt="Attractions Showcase" width="90%">
  <p><em>Category-filtered cards: Nestlé Philippines Factory, Sto. Niño Chapel, and Our Lady of Guadalupe Pilgrimage Site</em></p>
</div>

---

### 5. Citizen Services & Interactive Feedback Desk
Outlines document clearance procedures (Residency, Indigency, Business Clearances) and provides an interactive form implementing consolidated object state and `localStorage` persistence.

| Barangay Public Services | Resident Feedback & Inquiries Desk |
| :---: | :---: |
| <img src="UI_Screenshots/Screenshot%20(1311).png" alt="Services Directory" width="100%"> | <img src="UI_Screenshots/Screenshot%20(1313).png" alt="Feedback Form" width="100%"> |
| *Clearances, certificates, and community welfare aid programs* | *Interactive feedback form with live validation and toast notifications* |

---

### 6. Photo Gallery & Annual Cultural Celebrations
A multi-category photo gallery equipped with hover overlays and an interactive modal lightbox, accompanied by the annual calendar of cultural events.

| Community Photo Gallery Grid | Annual Festivals & Events |
| :---: | :---: |
| <img src="UI_Screenshots/Screenshot%20(1317).png" alt="Photo Gallery" width="100%"> | <img src="UI_Screenshots/Screenshot%20(1318).png" alt="Festivals and Events" width="100%"> |
| *6-photo responsive grid with category filtering and hover captions* | *Feast of Sr. Sto. Niño, Higalaay Festival, and Christmas Village* |

---

### 7. Essential Public Facilities & Emergency Hotlines
Comprehensive public health center directory, educational institutions, and direct dispatch hotlines for emergency response.

| Educational Institutions & 911 Hotline | CDO City Hospital — Tablon Primary Care |
| :---: | :---: |
| <img src="UI_Screenshots/Screenshot%20(1320).png" alt="Facilities & Hotlines" width="100%"> | <img src="UI_Screenshots/Screenshot%20(1324).png" alt="City Hospital Clinic" width="100%"> |
| *Schools (Elementary, High School, College) and Emergency 911* | *PhilHealth-accredited primary care clinic services and hotlines* |

---

## 🛠️ Technology Stack & Specifications

| Layer | Technology | Details & Implementation |
| :--- | :--- | :--- |
| **Markup** | HTML5 Semantic Web | Accessible structure using `<nav>`, `<header>`, `<section>`, `<article>`, `<aside>`, and `<footer>`. |
| **Styles** | Modern CSS3 | Custom design system with CSS custom properties (variables), Flexbox, CSS Grid, and glassmorphism (`backdrop-filter`). |
| **Typography** | Google Fonts | **Playfair Display** (classic editorial serif headings) paired with **Inter** (clean modern UI body). |
| **Scripting** | JavaScript (ES6+) | Vanilla JS with ECMAScript Modules (ESM), arrow functions, template literals, and destructuring. |
| **DOM Engine** | 4-Step Element Lifecycle | Dynamic UI construction using abstracted `create()` helper (`createElement` $\rightarrow$ configure $\rightarrow$ listen $\rightarrow$ append). |
| **State & Storage** | LocalStorage API | Consolidated form state with spread syntax updates and client-side browser persistence. |
| **APIs & Services** | Web Platform APIs | IntersectionObserver API for scroll entrance effects, Google Maps Embed API for territory visualization. |
| **Tooling & IDE** | VS Code & XAMPP | Configured for VS Code Live Server (port 5501) and local Apache HTTP Server. |

---

## 📂 Repository Structure & File Inventory

```text
7-17 mini project barangay website/
├── .gemini/
│   └── rules/
│       └── ite387.md           # Permanent ITE 387 academic coding standards rule
├── css/
│   └── styles.css              # Global styles, variables, grid layouts, toast & form rules
├── images/                     # Photographic and graphic assets
│   ├── barangay hall.jfif
│   ├── barangay tablon map.png
│   ├── community clean up drive.jpg
│   ├── festival.jfif
│   ├── industrial area.jfif
│   ├── nestle industrial hub.jfif
│   ├── Our Lady of Guadalupe Pilgrimage Site (1).jfif
│   └── ...
├── js/
│   ├── modules/                # Discrete ES modules for academic inspection
│   │   ├── utilities.js        # Abstracted create() DOM helper, date formatter, safeInit()
│   │   ├── data.js             # Immutable Single Source of Truth datasets
│   │   ├── dom.js              # 4-step dynamic element creators (Officials, Attractions, Events)
│   │   ├── lightbox.js         # Single modal shell controller & keyboard navigation
│   │   ├── toast.js            # Dynamic toast notification alerts
│   │   └── feedback.js         # Consolidated form state handler & localStorage persistence
│   └── main.js                 # Self-contained, dual-compatible application orchestrator
├── UI_Screenshots/             # Full collection of application UI screenshots (32 images)
├── about.html                  # History, Vision/Mission, Demographics, & Google Maps
├── attractions.html            # Category-filtered landmark & recreation gallery
├── events.html                 # Annual cultural festivals & community outreach
├── facilities.html             # Schools, primary care health centers, & emergency hotlines
├── gallery.html                # Interactive photo gallery with modal lightbox
├── index.html                  # Main landing page with hero, statistics, and quick navigation
├── officials.html              # Dynamic Barangay Council directory
├── services.html               # Citizen services & Interactive Resident Feedback Form
├── barangay_tablon_logo.jpg    # Official Barangay Tablon emblem
├── .gitignore                  # Production-grade git exclusion rules
└── README.md                   # Comprehensive repository documentation
```

---

## 💻 Local Setup & Execution Guide

### Prerequisites
* Any modern web browser (Google Chrome, Brave, Mozilla Firefox, Microsoft Edge, Safari).
* Optional: VS Code with the **Live Server** extension, or a local Apache server (such as **XAMPP**).

### Execution Options

#### Option A: Direct Browser Launch (Zero Server Required)
Thanks to the progressive enhancement architecture, you can simply browse to the project folder in File Explorer and **double-click [`index.html`](index.html)**. It will open and run with zero CORS errors and full interactivity.

#### Option B: Via VS Code Live Server
1. Open this repository in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey if not already installed.
3. Right-click [`index.html`](index.html) and click **"Open with Live Server"**.
4. The site will launch automatically at:
   ```text
   http://127.0.0.1:5501/index.html
   ```

#### Option C: Via XAMPP Apache
1. Move or clone this folder into your XAMPP web root directory:
   ```text
   C:\xampp\htdocs\
   ```
2. Open the **XAMPP Control Panel** and click **Start** next to Apache.
3. Open your browser and navigate to:
   ```text
   http://localhost/3rd%20Year/1ST%20SEMESTER/ITE%20387%20Advance%20Programming/7-17%20mini%20project%20barangay%20website/index.html
   ```

---

## 🚀 Step-by-Step GitHub Deployment Guide

Follow these commands in your PowerShell or Git Bash terminal to publish this project to your GitHub profile:

```powershell
# 1. Navigate to the project directory
cd "C:\xampp\htdocs\3rd Year\1ST SEMESTER\ITE 387 Advance Programming\7-17 mini project barangay website"

# 2. Initialize a new Git repository
git init

# 3. Stage all project files (respects .gitignore)
git add .

# 4. Commit the initial release
git commit -m "feat: complete Barangay Tablon portal mini-project for ITE 387"

# 5. Rename branch to main
git branch -M main

# 6. Add your remote GitHub repository URL (replace with your actual GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/barangay-tablon-community-portal.git

# 7. Push to GitHub
git push -u origin main
```

---

## 👥 Academic Attribution & Credits

* **Course:** ITE 387 – Advanced Programming
* **Program:** Bachelor of Science in Information Technology (BSIT)
* **Academic Term:** 3rd Year, 1st Semester
* **Domain Focus:** Local Government Unit (LGU) Community Web Applications & Citizen Services
* **Subject Matter:** Barangay Tablon, Cagayan de Oro City, Misamis Oriental, Philippines

---

<div align="center">
  <sub>Built with pride for academic excellence in Advanced Programming. © 2026 Barangay Tablon Community Website.</sub>
</div>
