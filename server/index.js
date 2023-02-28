import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import collectionsRoutes from './routes/collections.js';
import itemsRoutes from './routes/items.js';
import featuresRoutes from './routes/features.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
}));

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/collections', collectionsRoutes);
app.use('/collections', itemsRoutes);
app.use('/', featuresRoutes);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
