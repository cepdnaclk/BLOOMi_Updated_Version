const express = require('express');
const app = express();
require('dotenv').config()
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
const port = process.env.PORT || 4000;



console.log(process.env.MONGO_URL)
app.listen(port, () => console.log(`Server running on port ${port}`));