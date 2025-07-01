import mongoose, {  Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
  avatar?: string
}

const UsuarioSchema: Schema = new Schema({
  nome: { type: String, required: true},
  email: { type: String, required: true, unique: true, lowercase: true},
  senha: { type: String, required: true, select: false},
  avatar: { type: String, required: false }
}, {
  timestamps: true
})

// Moongose Hook: Executado antes do documento ser salvo
UsuarioSchema.pre<IUsuario>('save', async function(next) {
  // Se a senha não foi modificada nesta operação de 'save', pule o hash.
  if (!this.isModified('senha')) {
    return next();
  }
  
  // Gera o hash do campo senha com um "custo" de 10.
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);
