import express from 'express';
import contentRoutes from './routes/index.js';
import { swaggerSpec, swaggerUi } from './clients/swagger.js';
import { connectRabbitMQ } from './clients/rabbitmq.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001;

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/cms', contentRoutes);

connectRabbitMQ();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
