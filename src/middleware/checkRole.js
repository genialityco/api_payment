const admin = require('firebase-admin');
admin.initializeApp();

// Middleware para verificar el token de Firebase y obtener el rol del usuario
const checkRole = (roles) => (req, res, next) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  admin.auth().verifyIdToken(token)
    .then(decodedToken => {
      const userRole = decodedToken.role;
      if (roles.includes(userRole)) {
        next();
      } else {
        res.status(403).send('Acceso denegado');
      }
    })
    .catch(error => {
      res.status(403).send('Token inválido o expirado');
    });
};

module.exports = checkRole;