# Angular Material Yelp Clone - Frontend (Angular)

Single-Page application built with Angular and Angular Material, replicating the core functionalities of a restaurant review platform.

**Live Demo:** https://dashing-duckanoo-556fe4.netlify.app

## Architecture & Design Patterns
This application was recently refactored to strictly adhere to an **MVC-style (Service-Component-Model)** architecture:
* **Models:** Strongly typed Data Transfer Objects (DTOs) for API consistency.
* **Views (Components):** Pure UI components utilizing Angular Material for responsive, accessible design.
* **Controllers (Services):** Centralized HTTP data fetching and state management.

## Tech Stack
* **Framework:** Angular v18
* **UI Library:** Angular Material
* **Hosting/Deployment:** Netlify (with custom routing for SPA 404 fallbacks)

## Local Development Setup
1. Clone repository: `git clone https://github.com/helloShreyasJ/yelp-material-app-frontend.git`
2. Change directory: `cd yelp-material-frontend`
3. Install dependencies: npm install
4. Configure environment variables: apiUrl is currently linked with [deployed backend](https://yelp-material-app-backend.onrender.com/api) but can be changed to localhost instance
5. ng serve
