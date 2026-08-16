const express = require('express');
const fs = require('fs');
const router = express.Router();
const apiRouter = require('./api');
const path = require('path');

const findFrontendBuildPath = () => {
  const candidatePaths = [
    path.resolve(__dirname, '../../frontend', 'build'),
    path.resolve(__dirname, '../frontend', 'build'),
    path.resolve(process.cwd(), 'frontend', 'build'),
    path.resolve(process.cwd(), '../frontend', 'build'),
  ];

  for (const buildPath of candidatePaths) {
    const indexPath = path.join(buildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return { buildPath, indexPath };
    }
  }

  return {
    buildPath: path.resolve(__dirname, '../../frontend', 'build'),
    indexPath: path.join(path.resolve(__dirname, '../../frontend', 'build'), 'index.html'),
  };
};

const { buildPath: frontendBuildPath, indexPath: frontendIndexPath } = findFrontendBuildPath();

router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    if (!fs.existsSync(frontendIndexPath)) {
      router.use((req, res) => {
        res.status(503).json({
          title: 'Frontend build missing',
          message: `The production frontend build was not found at ${frontendIndexPath}. Make sure Railway runs the frontend build before starting the app.`,
          stack: null,
        });
      });
    } else {
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
    }
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
