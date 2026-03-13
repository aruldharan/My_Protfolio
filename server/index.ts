import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';
import contactRouter from './routes/contact.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);
app.use('/api/contact', contactRouter);

import fs from 'fs';

// ... (existing imports)

// Serve static files from the React app if they exist
const distPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'MERN Showcase API is running...', status: 'online' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file or a status message.
app.get('*', (req: Request, res: Response) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'API route not found' });
  
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ 
      message: 'API is Live!', 
      note: 'Frontend is hosted separately (e.g., on Vercel). Please visit your frontend URL.',
      api_endpoints: ['/api/chat', '/api/contact']
    });
  }
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-showcase';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err);
  });
