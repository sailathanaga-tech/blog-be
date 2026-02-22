# Blog App Backend

Express.js backend API for the blog application with MongoDB Atlas integration.

## Setup MongoDB Atlas

1. **Create a MongoDB Atlas account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a cluster:**
   - Click "Build a Cluster"
   - Choose the free tier (M0 Sandbox)
   - Select a cloud provider and region closest to you
   - Give your cluster a name

3. **Configure network access:**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0) for development

4. **Create a database user:**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Enter a username and password
   - Give the user "Read and write to any database" permissions

5. **Get your connection string:**
   - Go to "Clusters" and click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database-name>` with your preferred database name (e.g., "blogapp")

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB Atlas connection string:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster-url/blogapp?retryWrites=true&w=majority
```

4. Start the development server:

```bash
npm run dev
```

Or start the production server:

```bash
npm start
```

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Project Structure

```
blogapp-be/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # MongoDB data models
├── routes/          # API routes
├── .env.example     # Environment variables example
├── .gitignore       # Git ignore file
├── package.json     # Dependencies and scripts
├── server.js        # Main server file
└── README.md        # This file
```

## Features

- **MongoDB Atlas Integration**: Persistent cloud database
- **RESTful API**: Standard HTTP methods for CRUD operations
- **Error Handling**: Comprehensive error responses
- **Data Validation**: Input validation for all endpoints
- **CORS Support**: Cross-origin requests enabled
- **Security**: Helmet.js for security headers
"# blog-be" 
