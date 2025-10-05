const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    await userService.createUser(email, password);
    res.status(201).json({ message: 'User registered successfully', email });
  } catch (err) {
    if ((err.number === 2627 || err.code === 'EREQUEST') || err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.Id, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.Id,
        email: user.Email,
        createdAt: user.CreatedAt
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
}

module.exports = { register, login };

