import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

// Define o diretório temporário para onde os arquivos serão enviados
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      // Gera um hash aleatório para o nome do arquivo
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
