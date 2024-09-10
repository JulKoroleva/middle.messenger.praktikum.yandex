import express from 'express';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Обратите внимание, что путь должен указывать на директорию с фронтенд-файлами
const distPath = resolve(__dirname, '../../dist'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Раздача статических файлов
app.use(express.static(distPath));

// Все несуществующие пути должны возвращать index.html для корректной работы SPA
app.get('*', (req, res) => {
  res.sendFile(resolve(distPath, 'src/client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
