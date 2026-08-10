const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const path = require('path');

const frontendBuildPath = path.resolve(__dirname, '../../frontend', 'build');
const frontendIndexPath = path.join(frontendBuildPath, 'index.html');

router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(frontendIndexPath);
    });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(frontendBuildPath));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(frontendIndexPath);
    });
};

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.json({});
    });
  }

  // TEST
  router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
  });

module.exports = router;
