const express = require('express');
const app = express();
const sequelize = require('./config/database');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');

// Connect to database
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/users', usersRoute);
app.use('/posts', postsRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
