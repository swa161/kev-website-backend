# Kevin Wang Personal Website backend
## Author: Kevin Wang
This repository contains the backend application for my personal website. It is build with Node.js, Express.js and TypeScript, focusing on RESTful API design, with Model View (routes) Controller archetecture. The backend handles authentication, data persistence, and file uploads.

# Setup & Installation
1. clone the repository
2. install dependencies `npm install`
3. create .env file. Use environment variables configured in the Render 
    - `Render → My project → kev-website-backend → Enviroment (under manage tab)`
4. navigate to the root of the project.  `npm run start` the application will run locally in development mode.

# Tech Stack
- Node.js
- Express.js
- TypeScript
- PostgreSQL (Database)
- Cloudflare R2 object storage (images and CV file)

## Key Libraries
- Winston: application logging
- bcrypt: password hashing
- AJV: request payload validation

# Project Structure 
### /src/app
- `controllers`: Contains request-handling logic. Controllers receive HTTP requests, coordinate with services and models, and return responses to the client.
- `middleware`: Middleware functions such as authentication checks, CORS configuration, and request preprocessing.
- `resouces`: AJV schema definitions used for request payload validation.
- `routes`: Defines all available API routes and their corresponding HTTP methods, following RESTful conventions.
- `services`: Contains business logic and shared services, including password handling, validation logic, and Cloudflare R2 integration
- `types`: shared TypeScript type definitions

### /src/config
- Contains centralized configuration for core services, including:
    - Express application setup
    - Cloudflare R2 client configuration
    - Database connections
    - Application logging (winston)


# Future improvements
- Refactor and clean up the exisiing codebase to improve readabilitym, and maintainability.
- Add additional API routes to support serving localized content to the frontend.
- Introduce language-specific models or controllers to store and return content in multiple languages.