require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userOrderRoutes = require('./routes/userOrderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const couponRoutes = require('./routes/couponRoutes');
const { isAuth, isAdmin } = require('./config/auth');

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
app.enable('trust proxy');

app.use(express.json({ limit: '4mb' }));
app.use(cors());

//root route
app.get('/', (req, res) => {
  res.send(`
    <div>
      <h3>Welcome to HalalFood! Backend works Perfectly. \n Author: MD. Jahid Hossain Mridha</h3>
      <h2>API list</h2>
      <ul>
        <li>/api/products</li>
        <li>/api/category</li>
        <li>/api/coupon</li>
        <li>/api/user</li>
        <li>/api/order</li>
      </ul>

      <h2>Folder Structure & Customization:</h2>
      <ul>
        <li>In index.js file you will find all declared api endpoint for different route.</li>
        <li>In seed.js file you will find all created model for manually imported into database.</li>
        <li>/config : This folder contain auth for signInToken, isAdmin and isAuth middleware.</li>
        <li>/models: This folder contain all model create with mongoose schema validation.</li>
        <li>/routes: This folder contain all route like admin, category, product, coupon, user, userOrder route.</li>
        <li>/controller: This folder contain all different route controller function.</li>
        <li>/utils : This folder contain admin, user, product and category sample data.</li>
      </ul>
    </div>
  `);
});

//this for route will need for store front, also for admin dashboard
app.use('/api/products/', productRoutes);
app.use('/api/category/', categoryRoutes);
app.use('/api/coupon/', couponRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/order/', isAuth, userOrderRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use('/api/admin/', adminRoutes);
app.use('/api/orders/', isAuth, orderRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
