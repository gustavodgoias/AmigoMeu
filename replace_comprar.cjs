const fs = require('fs');
const files = [
  'src/App.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/Header.tsx',
  'src/pages/Catalogo.tsx',
  'src/pages/Home.tsx',
  'src/pages/Toppers.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/to="\/comprar"/g, 'to="/catalogo"');
  if (file === 'src/App.tsx') {
    content = content.replace(/<Route path="\/comprar" element={<ComprarOnline \/>} \/>\s*/g, '');
    content = content.replace(/import ComprarOnline from "\.\/pages\/ComprarOnline";\s*/g, '');
  }
  fs.writeFileSync(file, content);
});
