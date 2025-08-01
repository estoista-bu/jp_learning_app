// const express = require('express');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const router = express.Router();
// const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('@prisma/client');
const deckRoutes = require('./routes/decks');
require('dotenv').config();



const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// Import routes
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://192.168.1.200:3000',
    'https://192.168.1.200:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/decks', deckRoutes);


// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Japanese Mastery API is running!' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
// app.listen(PORT, HOST, () => {
//   console.log(`Server running at:`);
//   console.log(`- Local: http://localhost:${PORT}`);
//   console.log(`- Network: http://${HOST}:${PORT}`);
// });

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '../../certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../certs/cert.pem')),
};


https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
  console.log(`🔒 HTTPS server running at:`);
  console.log(`- Local: https://localhost:${PORT}`);
  console.log(`- Network: https://${HOST}:${PORT}`);
});


// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});



// // POST /api/decks
// router.post('/', async (req, res) => {
//   const { name, description } = req.body;

//   if (!name) {
//     return res.status(400).json({ error: 'Name is required' });
//   }

//   try {
//     const deck = await prisma.deck.create({
//       data: { name, description },
//     });

//     res.status(201).json(deck);
//   } catch (err) {
//     console.error('Failed to create deck:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


module.exports = app;
