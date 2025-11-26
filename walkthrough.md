# Walkthrough - JFK Campaign Platform

I have successfully initialized and implemented the core structure of the JFK Campaign Platform, focusing on SEO, Security, and Architecture.

## Changes Implemented

### 1. Backend (NestJS)
- **Created `apps/api`**: A standard NestJS application.
- **Security**:
    - Configured `helmet` for HTTP headers.
    - Configured `cors` to allow requests from the frontend.
    - Implemented `ThrottlerModule` for rate limiting.
    - Set up `ValidationPipe` with `class-validator`.
- **Adherents Module**:
    - Created `AdherentsModule`, `AdherentsController`, `AdherentsService`.
    - Implemented `POST /adherents` endpoint with `CreateAdherentDto` validation.

### 2. Frontend (Next.js)
- **Cleaned `apps/web`**: Removed boilerplate code.
- **SEO & Metadata**:
    - Configured `layout.tsx` with title, description, keywords, and Open Graph tags.
    - Integrated Google Fonts (Poppins & Roboto).
- **UI Components**:
    - Created `Header`, `Hero`, `Stats`, `Vision` components using Tailwind CSS.
    - Implemented `AdhesionForm` with client-side validation and API integration.
- **Tailwind CSS**:
    - Installed and configured Tailwind CSS with custom colors and fonts.

## Verification Results

### Automated Tests
- **Build**: The project builds successfully using `pnpm build` (Turbo).
- **Lint**: Code quality checked with `pnpm lint`.

### Manual Verification Steps
1.  **Start the project**:
    ```bash
    pnpm dev
    ```
2.  **Frontend (`http://localhost:3000`)**:
    - Verify the landing page loads with the correct design.
    - Check the "Rejoindre" button scrolls to the form.
    - Submit the form and verify the success message.
3.  **Backend (`http://localhost:3001`)**:
    - Verify the API receives the request (check console logs).
    - Test rate limiting by sending multiple requests quickly.

## Next Steps
- Connect the backend to a real database (PostgreSQL).
- Implement email notifications upon adhesion.
- Add unit and e2e tests for the new module.
