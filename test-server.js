const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for testing
const mockPosts = [
  {
    id: '1',
    title: 'Test Post 1',
    content: 'This is a test post content',
    author: 'Test Author',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2', 
    title: 'Test Post 2',
    content: 'Another test post content',
    author: 'Another Author',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Test API is running!' });
});

// Posts API
app.get('/api/posts', (req, res) => {
  console.log('GET /api/posts called');
  res.json(mockPosts);
});

app.get('/api/posts/:id', (req, res) => {
  console.log('GET /api/posts/:id called with id:', req.params.id);
  const post = mockPosts.find(p => p.id === req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Users API
app.get('/api/users', (req, res) => {
  console.log('GET /api/users called');
  res.json([]);
});

app.post('/api/users', (req, res) => {
  console.log('POST /api/users called');
  res.json({ id: '1', ...req.body });
});

app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
  console.log('Test these URLs:');
  console.log(`- http://localhost:${PORT}/`);
  console.log(`- http://localhost:${PORT}/api/posts`);
  console.log(`- http://localhost:${PORT}/api/posts/1`);
});
