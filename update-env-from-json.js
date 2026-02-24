/**
 * Script para analizar el JSON de Service Account y actualizar .env
 * Ejecutar: node update-env-from-json.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(90));
console.log('🔐 ANÁLISIS Y ACTUALIZACIÓN DE CREDENCIALES');
console.log('='.repeat(90) + '\n');

// Leer el archivo JSON descargado
const jsonPath = path.join(process.env.USERPROFILE, 'Downloads', 'autocom-jac-c59039090975.json');

console.log('📋 PASO 1: Leyendo archivo JSON\n');
console.log(`Buscando en: ${jsonPath}\n`);

if (!fs.existsSync(jsonPath)) {
  console.log('❌ No se encontró el archivo JSON');
  console.log('   Asegúrate de que descargaste: autocom-jac-c59039090975.json');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

console.log('✅ Archivo JSON cargado exitosamente\n');

// 2. Validar información
console.log('🔍 PASO 2: Extrayendo información\n');

const projectId = serviceAccount.project_id;
const clientEmail = serviceAccount.client_email;
const privateKey = serviceAccount.private_key;

console.log(`Proyecto ID: ${projectId}`);
console.log(`Email: ${clientEmail}`);
console.log(`Clave Privada: ${privateKey.substring(0, 30)}... (${privateKey.length} caracteres)`);
console.log('\n');

// 3. Validar que la clave sea válida
console.log('✅ PASO 3: Validando clave privada\n');

if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
  console.log('❌ Clave privada inválida');
  process.exit(1);
}

console.log('✅ Clave privada válida (tiene BEGIN y END)\n');

// 4. Leer .env actual
console.log('📄 PASO 4: Leyendo archivo .env actual\n');

const envPath = path.join(__dirname, '.env');
let envContent = fs.readFileSync(envPath, 'utf-8');

console.log('✅ Archivo .env cargado\n');

// 5. Actualizar .env con nuevas credenciales
console.log('🔄 PASO 5: Actualizando archivo .env\n');

// Actualizar GOOGLE_CLIENT_EMAIL
envContent = envContent.replace(
  /GOOGLE_CLIENT_EMAIL=.*/,
  `GOOGLE_CLIENT_EMAIL=${clientEmail}`
);

// Actualizar GOOGLE_PRIVATE_KEY (mantener comillas)
envContent = envContent.replace(
  /GOOGLE_PRIVATE_KEY=.*/,
  `GOOGLE_PRIVATE_KEY="${privateKey}"`
);

// Escribir .env actualizado
fs.writeFileSync(envPath, envContent);

console.log('✅ Archivo .env actualizado\n');

// 6. Mostrar resumen
console.log('='.repeat(90));
console.log('📊 RESUMEN DE CAMBIOS\n');

console.log('✅ Variables actualizadas:\n');
console.log(`1. GOOGLE_CLIENT_EMAIL = ${clientEmail}`);
console.log(`2. GOOGLE_PRIVATE_KEY = (${privateKey.length} caracteres)`);
console.log('\n');

// 7. Validar con dotenv
console.log('='.repeat(90));
console.log('🧪 PASO 6: Validando carga de variables\n');

require('dotenv').config();

if (process.env.GOOGLE_CLIENT_EMAIL === clientEmail) {
  console.log('✅ GOOGLE_CLIENT_EMAIL cargada correctamente');
} else {
  console.log('❌ GOOGLE_CLIENT_EMAIL no coincide');
}

if (process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_PRIVATE_KEY.includes('BEGIN')) {
  console.log('✅ GOOGLE_PRIVATE_KEY cargada correctamente');
} else {
  console.log('❌ GOOGLE_PRIVATE_KEY no se cargó correctamente');
}

console.log('\n');

// 8. Test de conexión
console.log('='.repeat(90));
console.log('🧪 PASO 7: Probando conexión a Google Sheets\n');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

async function testConnection() {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SPREADSHEET_ID,
      serviceAccountAuth
    );

    await doc.loadInfo();
    console.log(`✅ Conexión exitosa`);
    console.log(`   Documento: ${doc.title}`);
    console.log(`   Hojas: ${doc.sheetCount}\n`);

    const usersSheet = doc.sheetsByTitle['USUARIOS'];
    if (usersSheet) {
      const rows = await usersSheet.getRows();
      console.log(`   Hoja USUARIOS: ${rows.length} usuarios\n`);
    }

    console.log('='.repeat(90));
    console.log('✅ ACTUALIZACIÓN COMPLETADA EXITOSAMENTE\n');
    console.log('📝 Próximos pasos:\n');
    console.log('1. Ve a Render Dashboard: https://dashboard.render.com/');
    console.log('2. Selecciona "autocom-qr-scanner"');
    console.log('3. Ve a "Environment"');
    console.log('4. Actualiza estas variables:\n');
    console.log(`   - GOOGLE_CLIENT_EMAIL = ${clientEmail}`);
    console.log('   - GOOGLE_PRIVATE_KEY = (copia el valor completo)');
    console.log('\n5. Haz clic en "Redeploy"');
    console.log('6. Espera a que diga ✅ Live\n');
    console.log('='.repeat(90) + '\n');

  } catch (error) {
    console.log(`❌ Error en conexión: ${error.message}\n`);
  }
}

testConnection();
