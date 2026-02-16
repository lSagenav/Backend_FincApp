const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret_key_fincapp';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // 👈 quita "Bearer"

  if (!token) {
    return res.status(403).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
