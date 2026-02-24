const fs = require('fs');
require('dotenv').config();

console.log('\n🔍 VERIFICACIÓN DE CONFIGURACIÓN PARA RENDER\n');

const vars = ['GOOGLE_SPREADSHEET_ID', 'GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'NODE_ENV'];

vars.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    console.log(`❌ ${varName}: NO ENCONTRADA`);
  } else {
    if (varName === 'GOOGLE_PRIVATE_KEY') {
      const hasBegin = value.includes('BEGIN PRIVATE KEY');
      const hasEnd = value.includes('END PRIVATE KEY');
      const length = value.length;
      console.log(`✅ ${varName}:`);
      console.log(`   - Longitud: ${length} caracteres`);
      console.log(`   - Tiene BEGIN: ${hasBegin}`);
      console.log(`   - Tiene END: ${hasEnd}`);
      console.log(`   - Primer carácter: "${value[0]}"`);
      console.log(`   - Último carácter: "${value[value.length-1]}"`);
    } else {
      console.log(`✅ ${varName}: ${value}`);
    }
  }
});

console.log('\n📋 FORMATO PARA COPIAR A RENDER (sin comillas):\n');

console.log('GOOGLE_SPREADSHEET_ID:');
console.log(process.env.GOOGLE_SPREADSHEET_ID || 'NO ENCONTRADA');

console.log('\nGOOGLE_CLIENT_EMAIL:');
console.log(process.env.GOOGLE_CLIENT_EMAIL || 'NO ENCONTRADA');

console.log('\nNODE_ENV:');
console.log(process.env.NODE_ENV || 'NO ENCONTRADA');

console.log('\nGOOGLE_PRIVATE_KEY (primeros y últimos 100 caracteres):');
const key = process.env.GOOGLE_PRIVATE_KEY || '';
console.log('Inicio: ' + key.substring(0, 100));
console.log('...');
console.log('Final: ' + key.substring(key.length - 100));
