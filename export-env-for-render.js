/**
 * Script para exportar variables de entorno en formato listo para Render
 * Ejecutar: node export-env-for-render.js
 */

require('dotenv').config();

console.log('\n' + '='.repeat(70));
console.log('🚀 VARIABLES PARA CONFIGURAR EN RENDER');
console.log('='.repeat(70) + '\n');

console.log('📋 Copia estas variables en el dashboard de Render:\n');

console.log('1️⃣  GOOGLE_SPREADSHEET_ID');
console.log('────────────────────────────────────────');
console.log(`${process.env.GOOGLE_SPREADSHEET_ID}\n`);

console.log('2️⃣  GOOGLE_CLIENT_EMAIL');
console.log('────────────────────────────────────────');
console.log(`${process.env.GOOGLE_CLIENT_EMAIL}\n`);

console.log('3️⃣  GOOGLE_PRIVATE_KEY');
console.log('────────────────────────────────────────');
console.log(`${process.env.GOOGLE_PRIVATE_KEY}\n`);

console.log('4️⃣  NODE_ENV');
console.log('────────────────────────────────────────');
console.log('production\n');

console.log('='.repeat(70));
console.log('\n✅ INSTRUCCIONES:\n');
console.log('1. Ve a https://dashboard.render.com/');
console.log('2. Selecciona "autocom-qr-scanner"');
console.log('3. Haz clic en "Environment"');
console.log('4. Copia cada par KEY-VALUE arriba');
console.log('5. Haz clic "Add Environment Variable" para cada uno');
console.log('6. Guarda cambios');
console.log('7. Haz clic "Manual Deploy"');
console.log('8. Espera a que esté ✅ Live');
console.log('\n');
