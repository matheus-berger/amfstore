
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("❌ A variável de ambiente JWT_SECRET_KEY não foi definida.");
}

export default {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: '1d', // Token será válido por 1 dia.
};
