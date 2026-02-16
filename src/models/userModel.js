const db = require('../config/db');

const User = {
  create: (user, callback) => {
    const sql = `
      INSERT INTO users (full_name, email, password, phone, farm_name)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, user, callback);
  },

  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },

  findById: (id, callback) => {
    const sql = `
      SELECT id, full_name, email, phone, farm_name, created_at
      FROM users WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

module.exports = User;
