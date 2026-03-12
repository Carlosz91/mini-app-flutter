const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'tu_clave_secreta_aqui'; // Cambia esto en producción

app.use(cors());
app.use(express.json());

// ─── Base de datos simulada (reemplaza con tu DB real) ───────────────────────
const users = [
  { id: 1, email: 'admin@demo.com', password: '123456', name: 'Admin Demo' },
  { id: 2, email: 'user@demo.com',  password: '123456', name: 'Usuario Demo' },
];

// ─── Middleware de autenticación ─────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// ─── Rutas de autenticación ───────────────────────────────────────────────────
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña requeridos' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// ─── Ruta protegida de ejemplo ────────────────────────────────────────────────
app.get('/api/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ id: user.id, name: user.name, email: user.email });
});

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({
    stats: { users: 120, sessions: 45, notifications: 8 },
    message: `Bienvenido al dashboard`,
  });
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📧 Usuarios de prueba:`);
  console.log(`   admin@demo.com / 123456`);
  console.log(`   user@demo.com  / 123456`);
});