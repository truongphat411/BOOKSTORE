const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const authorgoryRoutes = require('./routes/author');
const productRoutes = require('./routes/product');
const filterRoutes = require('./routes/filter');

// middlewate
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/author', authorgoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);
connectDB();

////////////////////////////////////////////
////////////////////////////////////////////


const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));