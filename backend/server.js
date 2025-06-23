const express = require('express');
const urlRoutes = require('./routes/url');
const connectDB = require('./config/db');
const { requestLogger, errorLogger } = require('../backend/Logging_Middleware/logger');
const app = express();
connectDB();
app.use(express.json());
app.use(requestLogger);
app.use('/api', urlRoutes);
app.use(errorLogger);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});