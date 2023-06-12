const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models'); // Sequelize models

// Koneksi ke database MySQL
db.sequelize.sync().then(() => {
  console.log('Connected to the database');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
