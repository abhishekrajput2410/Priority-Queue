require('dotenv').config();
const mongoose = require('mongoose');
const { hashPassword } = require('./password.util');
const User = require('../models/user.model');
const { connectDatabase } = require('../config/db');

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@priorityqueue.local';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AdminPass123!';
const DEFAULT_USER_EMAIL = process.env.USER_EMAIL || 'user@priorityqueue.local';
const DEFAULT_USER_PASSWORD = process.env.USER_PASSWORD || 'UserPass123!';

const seedAdminUser = async () => {
  if (mongoose.connection.readyState !== 1) {
    await connectDatabase();
  }

  const seedUser = async (email, password, name, role) => {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`User already exists: ${email}`);
      return existing;
    }

    const user = new User({
      name,
      email,
      password: await hashPassword(password),
      role,
      verified: true,
    });
    await user.save();
    console.log(`Seeded ${role} user: ${email} / ${password}`);
    return user;
  };

  await seedUser(DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, 'System Admin', 'Admin');
  await seedUser(DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD, 'Regular User', 'User');
};

if (require.main === module) {
  seedAdminUser().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { seedAdminUser };
