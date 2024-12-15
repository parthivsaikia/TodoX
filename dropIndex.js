// dropIndex.js
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(async () => {
    try {
      await mongoose.connection.collection('users').dropIndex('userName_1');
      console.log('Index dropped successfully');
    } catch (error) {
      console.log('Error dropping index:', error.message);
    } finally {
      mongoose.connection.close();
    }
  });