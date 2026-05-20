const express = require('express');
const os = require('os');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`
  );
  next();
});

// Root API
app.get('/', (req, res) => {
  console.log('Root API called');
  res.send('Hello World, we are in meet with Ismail Shaikh');
});

// Health Check API
app.get('/health', (req, res) => {
  console.log('Health API called');

  res.set('Cache-Control', 'no-store');

  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// About API
app.get('/about', (req, res) => {
  console.log('About API called');

  res.json({
    app: 'Demo Node App',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Server Info API
app.get('/server-info', (req, res) => {
  console.log('Server Info API called');

  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    cpuCores: os.cpus().length,
  });
});

// Users API
app.get('/users', (req, res) => {
  console.log('Users API called');

  const users = [
    { id: 1, name: 'Ismail' },
    { id: 2, name: 'Gaurav' },
  ];

  res.json(users);
});

// POST API
app.post('/message', (req, res) => {
  console.log('POST Message API called');

  const { message } = req.body;

  res.status(201).json({
    success: true,
    receivedMessage: message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});