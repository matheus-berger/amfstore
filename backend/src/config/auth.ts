
export default {
  secret: process.env.JWT_SECRET_KEY || 'default-secret',
  expiresIn: '1d', // Token será válido por 1 dia.
};
