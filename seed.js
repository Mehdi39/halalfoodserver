require('dotenv').config();
const connectDB = require('./config/db');

const User = require('./src/models/User');
const userData = require('./src/utils/user');
const Admin = require('./src/models/Admin');
const adminData = require('./src/utils/admin');
const Coupon = require('./src/models/Coupon');
const couponData = require('./src/utils/coupon');
const productData = require('./src/utils/products');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const categoryData = require('./src/utils/category');

connectDB();
const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(userData);

    await Admin.deleteMany();
    await Admin.insertMany(adminData);

    await Product.deleteMany();
    await Product.insertMany(productData);

    await Category.deleteMany();
    await Category.insertMany(categoryData);

    await Coupon.deleteMany();
    await Coupon.insertMany(couponData);

    console.log('data inserted successfully!');
    process.exit();
  } catch (error) {
    console.log('error', error);
    process.exit(1);
  }
};

importData();
