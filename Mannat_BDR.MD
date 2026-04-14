# Business Requirements Document: Mannat Caterers Management Platform

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to explicitly define the software requirements for the Mannat Caterers web application. This specification covers the functional, structural, and technical scope of the product, detailing the architecture from the client-facing web interface to the backend logic that drives the event planning and catering operations.

### 1.2 Intended Audience
The intended audience for this document includes software developers, UI/UX designers, and business stakeholders (specifically the management of Mannat Caterers). It is organized to transition from high-level business goals to granular system features and technical specifications.

### 1.3 Product Scope
The Mannat Caterers platform is a centralized full-stack web application designed to streamline the workflow of an active event planning business in Goa. Its primary objective is to replace fragmented booking processes and manual cost estimations with a unified digital solution. By bridging a highly responsive frontend with robust database management, the application directly addresses the business goals of reducing booking conflicts, providing transparent real-time pricing to clients, and maintaining accurate logistical inventory.

## 2. Recommended Tech Stack & Architecture
To ensure high performance, maintainability, and seamless user experience, the system will be built on a modern full-stack architecture:
* **Frontend:** React.js (utilizing Vite for fast build times and Tailwind CSS for responsive, custom styling).
* **Backend:** Node.js for server-side logic and API routing.
* **Database:** Relational or NoSQL database (e.g., PostgreSQL or MongoDB) for scalable menu catalogs, inventory, and user profiles.
* **State Management:** Context API or Redux for handling complex cart states and real-time calculations.

## 3. Overall Description
### 3.1 Product Perspective
The software operates on a robust client-server architecture. The frontend web application acts as the presentation and interaction layer for customers requesting catering services, while the backend serves as the authoritative engine, enforcing inventory constraints, pricing rules, and schedule availability.

### 3.2 User Classes and Characteristics
* **Customers/Clients:** Require an intuitive, mobile-friendly interface to browse catering menus, check date availability, and view dynamic cost estimates for their events.
* **Administrators/Business Owners:** Require a secure dashboard to manage live inventory, confirm or adjust bookings, update menu item pricing, and track overall business metrics.

## 4. System Features
### 4.1 Interactive Booking Calendar
This core feature handles the foundation of event scheduling.
* **Logic:** Patients interact with a dynamic web calendar that visually maps out available dates.
* **Conflict Prevention:** The logic determining date availability is managed by the backend engine. When a customer selects a date, the system programmatically checks for overlapping schedules or capacity limits before permitting the inquiry, guaranteeing that the business does not overbook its resources.

### 4.2 Real-Time Price Calculation Sidebar
To resolve the real-world complexity of custom event quoting, this feature bridges interactive web design with immediate financial feedback.
* **Functionality:** As users select menu items, guest counts, and service tiers, a persistent sidebar dynamically recalculates the estimated total cost.
* **Business Logic:** The calculator must account for base fees, per-head costs, variable taxes, and potential bulk-order discounts without requiring a page refresh.

### 4.3 Dynamic Inventory Management
This feature manages the physical resources required for catering operations.
* **Tracking:** The system tracks available equipment (e.g., chafing dishes, tables, specific decor) and ties them to active bookings.
* **Automation:** When an event is confirmed, the required inventory is automatically deducted from the available pool for that specific date. The admin dashboard will trigger alerts for low-stock items or conflicting equipment requests.

## 5. Nonfunctional Requirements
### 5.1 UI/UX and Design Constraints
The application must present a premium, appetizing visual aesthetic suited for the hospitality industry. The design system will prioritize high-quality imagery of food and event setups, ample whitespace, and clear call-to-action buttons for the booking flow.

### 5.2 Performance Requirements
The platform must prioritize high-performance image rendering. Strategies such as WebP formatting and lazy loading will be implemented to ensure the menu and gallery load instantaneously, even on mobile networks.

### 5.3 Security and Data Integrity
Given the handling of client contact information and event details, the product must enforce strict privacy protections. User data must be securely handled, and administrative interfaces must be protected by robust authentication protocols. Database constraints will be utilized to prevent the accidental deletion of historical order data, ensuring a reliable audit trail for the business.

---

# System Implementation Document: Mannat Caterers Platform

## 1. Executive Summary & AI Directives
This document outlines the frontend implementation requirements for the Mannat Caterers web application.
* **AI Agent Directive:** The backend architecture and database already exist. Your task is to generate ONLY the frontend codebase (React.js) and its corresponding API integration logic.
* **Core Objective:** Build a public-facing booking portal and update an existing protected admin dashboard to reflect new data schemas.
* **Agent Autonomy & Structural Flexibility:** This System Implementation Document serves as a recommended structure. If you identify a different UX/UI approach, feature flow, or architectural pattern that would demonstrably improve the experience for real-world customers, you are encouraged to suggest it. However, you must explicitly propose the alternative and await my confirmation before implementing any deviations from this document.

## 2. Frontend Architecture & Routing
* **Framework:** React.js (Vite) with Tailwind CSS.
* **State Management:** Use Context API or Redux specifically for the multi-step booking flow to maintain data between form steps and the billing sidebar.
* **Routing Architecture (React Router):**
    * Public Route: `/` (Home Page)
    * Public Route: `/menu` (Menu Page)
    * Public Route: `/book-now` (Booking Wizard)
    * Protected Route: `/admin/*` (Admin Dashboard)

## 3. UI/UX & Theming Directives
* **Primary Theme:** The core color palette must be centered around a light green theme.
* **Environmental Integration:** The design must feel organic and blend seamlessly with the environment. This implies using natural, fresh tones that complement catering, food photography, and outdoor event aesthetics.
* **Implementation:** Configure this explicitly in the `tailwind.config.js` file, establishing a custom color palette (e.g., extending colors with specific light green hex codes for backgrounds, buttons, and accents) to ensure consistent theming across all components.

## 4. Public Interface Specifications

### 4.1 Home Page (`/`)
This page must be constructed using modular, reusable components.
* **Navbar:** Sticky top navigation.
* **HeroSection:** High-quality visual banner with a prominent "Book Now" CTA redirecting to `/book-now`. The banner styling should heavily incorporate the light green environmental theme.
* **Services:** Component detailing service categories (Weddings, Corporate, Birthdays).
* **Portfolio:** Image gallery showcasing past event setups.
* **Reviews:** Testimonial carousel component.
* **Footer:** Standard contact details, social links, and navigation map.

### 4.2 Menu Page (`/menu`)
This page handles data fetching from the backend and local state filtering.
* **MenuFilter:** Sticky top bar featuring toggle buttons/chips to filter items by category (Veg, Non-Veg, Beverages, Desserts).
* **MenuGrid:** Responsive grid container mapping over the filtered array of menu items.
* **MenuCard:** Component displaying item image, title, and a brief price snippet.
* **ItemDetailsModal:** A popup triggered by clicking a MenuCard. It must display:
    * Comprehensive description.
    * Granular pricing (e.g., per plate, per kg).
    * Real-time availability status.
    * Nutritional information (Calories).

### 4.3 Book Now Page (`/book-now`)
* **Layout Design:** Split-screen layout. The left column contains a dynamic multi-step form wizard. The right column contains a persistent BillingSidebar that updates in real-time based on wizard inputs. On mobile, the sidebar must convert to a collapsible sticky bottom footer.
* **Step 1: User Data Module**
    * Fields: Name, Address, Phone Number, Email.
    * Strict Validation: The phone number input must enforce Indian formatting using the regex pattern `^\+91[0-9]{10}$`.
* **Step 2: Event Details Module**
    * Fields: Event Type, Date, Location, Number of Guests.
    * Strict Validation: The Date input must disable past dates and the immediate next 3 days. Use a dynamic minimum date calculation (Current Date + 3 Days).
* **Step 3: Menu Selection Module**
    * UI Reuse: Implement the MenuGrid, MenuFilter, and MenuCard components from the Menu Page.
    * Modification: MenuCard instances here must replace the "View Details" trigger with "Add to Booking" / quantity incrementer UI elements.
* **Final Step: Invoice & Submission**
    * Render a Final Bill component summarizing the total payload (User Data + Event Details + Selected Items Array).
    * Submit the consolidated payload to the backend booking endpoint.

## 5. Admin Panel Specifications (`/admin`)
The admin panel is an existing secured dashboard requiring updates to map to the new frontend logic.
* **Security:** The entire `/admin` route must be wrapped in a layout that verifies a valid administrative JWT or session token.
* **Dashboard Layout:** Must include a persistent Header, a global "Refresh Data" action button, and side/top tab navigation.
* **Required Modules:**
    * **Analytics:** Charts and metric cards.
    * **Inventory:** Forms and data tables for managing items. Update: Add inputs for calories, detailed description, and an availability boolean toggle that instantly marks an item as "Out of Stock" on the public menu.
    * **Bookings:** Data tables for managing orders. Update: The view must clearly separate "User Data" and "Event Details", and display the exact final bill generated by the public-facing BillingSidebar.
    * **Customers:** Directory of user profiles and history.
    * **Payments:** Financial tracking and transaction status forms.

## 6. SEO & Accessibility Optimization
Because this frontend is built as a Client-Side Rendered (CSR) React application, the AI agent must implement dynamic SEO handling and strict semantic HTML to ensure search engine visibility.
* **Dynamic Meta Tags (Page-Level):** Implement `react-helmet-async` to manage the `<head>` document. Each public route (`/`, `/menu`, `/book-now`) must inject its own unique `<title>`, `<meta name="description">`, and Open Graph (`og:title`, `og:image`) tags.
* **Semantic HTML (Section-Level):** Strictly use HTML5 semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`) instead of generic `<div>` containers. Maintain a strict heading hierarchy (only one `<h1>` per page, followed by sequential `<h2>`, `<h3>` tags). All images within the Portfolio, MenuCard, and HeroSection must have descriptive `alt` attributes for image search SEO and screen readers.
* **Structured Data (JSON-LD):** Inject Schema.org JSON-LD structured data into the HomePage defining the entity as a Local Business or FoodEstablishment (Caterer), including the business name, Goa location, and contact details.
* **Performance as SEO:** Ensure Core Web Vitals are respected by lazy-loading components below the fold and using modern image formats (WebP) to maintain fast page load speeds.