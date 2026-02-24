/**
 * Script para validar y extraer credenciales para Render
 * Ejecutar: node validate-and-extract-env.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(90));
console.log('🔐 VALIDACIÓN Y EXTRACCIÓN DE CREDENCIALES PARA RENDER');
console.log('='.repeat(90) + '\n');

// 1. Verificar que exista el archivo .env
console.log('📋 PASO 1: Verificando archivo .env local\n');
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ No existe archivo .env en:', envPath);
  process.exit(1);
}
console.log('✅ Archivo .env encontrado\n');

// 2. Validar que las variables estén cargadas
console.log('🔍 PASO 2: Validando variables cargadas\n');

const requiredVars = [
  'GOOGLE_SPREADSHEET_ID',
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY'
];

let allValid = true;
const extractedVars = {};

for (const varName of requiredVars) {
  const value = process.env[varName];
  
  if (!value) {
    console.log(`❌ ${varName}: NO ENCONTRADA`);
    allValid = false;
  } else {
    console.log(`✅ ${varName}: Encontrada (${value.length} caracteres)`);
    extractedVars[varName] = value;
    
    // Validaciones específicas
    if (varName === 'GOOGLE_PRIVATE_KEY') {
      if (!value.includes('BEGIN PRIVATE KEY') || !value.includes('END PRIVATE KEY')) {
        console.log('   ⚠️  ADVERTENCIA: No tiene BEGIN/END PRIVATE KEY');
        allValid = false;
      } else {
        console.log('   ✅ Tiene BEGIN y END PRIVATE KEY');
      }
    }
    
    if (varName === 'GOOGLE_CLIENT_EMAIL') {
      if (!value.includes('@') || !value.includes('.')) {
        console.log('   ⚠️  ADVERTENCIA: Formato de email inválido');
        allValid = false;
      } else {
        console.log('   ✅ Formato de email válido');
      }
    }
    
    if (varName === 'GOOGLE_SPREADSHEET_ID') {
      if (value.length < 20) {
        console.log('   ⚠️  ADVERTENCIA: ID muy corto, verifica que sea correcto');
        allValid = false;
      } else {
        console.log('   ✅ ID tiene longitud correcta');
      }
    }
  }
}

console.log('\n');

if (!allValid) {
  console.log('❌ Algunas variables tienen problemas\n');
  process.exit(1);
}

// 3. Mostrar variables listas para copiar
console.log('='.repeat(90));
console.log('📋 VARIABLES LISTAS PARA RENDER\n');
console.log('Copia cada par KEY-VALUE en Render (Environment section)\n');

console.log('1️⃣  GOOGLE_SPREADSHEET_ID');
console.log('━'.repeat(90));
console.log(extractedVars.GOOGLE_SPREADSHEET_ID);
console.log('\n');

console.log('2️⃣  GOOGLE_CLIENT_EMAIL');
console.log('━'.repeat(90));
console.log(extractedVars.GOOGLE_CLIENT_EMAIL);
console.log('\n');

console.log('3️⃣  GOOGLE_PRIVATE_KEY');
console.log('━'.repeat(90));
console.log(extractedVars.GOOGLE_PRIVATE_KEY);
console.log('\n');

console.log('4️⃣  NODE_ENV');
console.log('━'.repeat(90));
console.log('production');
console.log('\n');

// 4. Probar conexión a Google Sheets
console.log('='.repeat(90));
console.log('🧪 PASO 3: Probando conexión a Google Sheets\n');

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
    console.log(`   Hojas: ${doc.sheetCount}`);

    // Verificar hoja USUARIOS
    const usersSheet = doc.sheetsByTitle['USUARIOS'];
    if (usersSheet) {
      await usersSheet.loadHeaderRow();
      const rows = await usersSheet.getRows();
      console.log(`   Hoja USUARIOS: ${rows.length} usuarios\n`);
    }

    console.log('='.repeat(90));
    console.log('✅ VALIDACIÓN COMPLETADA CORRECTAMENTE\n');
    console.log('Ahora puedes:\n');
    console.log('1. Ir a Render Dashboard (https://dashboard.render.com/)');
    console.log('2. Seleccionar "autocom-qr-scanner"');
    console.log('3. Ir a "Environment"');
    console.log('4. Copiar y pegar las 4 variables de arriba');
    console.log('5. Hacer clic en "Redeploy"');
    console.log('6. Esperar a que diga ✅ Live\n');
    console.log('='.repeat(90) + '\n');

  } catch (error) {
    console.log(`❌ Error al conectar: ${error.message}\n`);
    console.log('Posibles causas:');
    console.log('- GOOGLE_PRIVATE_KEY no es válida');
    console.log('- GOOGLE_CLIENT_EMAIL es incorrecto');
    console.log('- GOOGLE_SPREADSHEET_ID es incorrecto\n');
  }
}

testConnection();
