# Teneo CMS Service

Teneo CMS Service is a Node.js-based content management service that provides CRUD APIs for managing documents such as blog posts, articles, or any freeform content.

## Features
- Create, read, update, and delete documents.
- Supports large text content with markdown and links.
- Swagger UI for API documentation.
- Environment-specific configurations using `.env`.
- Integrated with Supabase for database operations.

## Prerequisites
- Node.js (v16 or later)
- Supabase account and project

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd teneo-cms-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   SUPABASE_API_KEY=<your-supabase-api-key>
   SUPABASE_PROJECT_URL=<your-supabase-project-url>
   ```

4. Run database migrations:
   ```bash
   psql -U <username> -d <database> -f sql/cms_schema.sql
   psql -U <username> -d <database> -f sql/documents.sql
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the Swagger UI for API documentation:
   ```
   http://localhost:3001/api-docs
   ```

## Scripts
- `npm start`: Start the server.
- `npm run dev`: Start the development server with live reload.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run format`: Format the code using Prettier.

## API Endpoints

### Documents
- **POST /api/cms/documents**: Create a new document.
- **GET /api/cms/documents**: Fetch all documents (excluding content).

## Folder Structure
```
.
├── clients/            # Supabase and Swagger configurations
├── routes/             # API route definitions
│   ├── documents/      # Document-related endpoints
├── sql/                # Database schema and migrations
├── index.js            # Entry point of the application
├── .env                # Environment variables
├── .prettierrc         # Prettier configuration
├── eslint.config.mjs   # ESLint configuration
```

## License
This project is licensed under the ISC License.