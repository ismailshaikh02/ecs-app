const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Health check (VERY IMPORTANT for ALB)
app.get('/', (req, res) => {
  res.send('Hello from ECS 🚀');
});

app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store'); // disable caching
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
