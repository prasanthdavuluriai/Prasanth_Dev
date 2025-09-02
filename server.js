const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the root directory
app.use(express.static('.'));

// Handle React Router (return `index.html` for non-API routes)
app.get('*', (req, res) => {
  // Don't serve index.html for API routes or static assets
  if (req.path.startsWith('/api') || req.path.startsWith('/static') || req.path.includes('.')) {
    return res.status(404).send('Not Found');
  }
  
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Portfolio website running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

module.exports = app;