/**
 * Script de prueba para verificar usuarios en Google Sheets
 * Ejecutar: node test-users.js
 */

require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

async function testUsers() {
  try {
    console.log('\n🔍 Conectando a Google Sheets...\n');

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
    console.log(`✅ Conectado a: ${doc.title}\n`);

    // Buscar hoja USUARIOS
    const usersSheet = doc.sheetsByTitle['USUARIOS'];
    
    if (!usersSheet) {
      console.log('❌ No existe la hoja "USUARIOS"');
      console.log('📋 Hojas disponibles:');
      for (const sheet of doc.sheetsByIndex) {
        console.log(`   - ${sheet.title}`);
      }
      console.log('\n⚠️  Necesitas crear la hoja "USUARIOS" con las columnas:');
      console.log('   USUARIO | TIPO | CONTRASEÑA | CLIENTE\n');
      return;
    }

    console.log('✅ Hoja USUARIOS encontrada\n');
    
    // Cargar headers
    await usersSheet.loadHeaderRow();
    console.log('📋 Columnas de la hoja:');
    console.log(`   ${usersSheet.headerValues.join(' | ')}\n`);

    // Obtener todos los usuarios
    const rows = await usersSheet.getRows();
    
    if (rows.length === 0) {
      console.log('⚠️  La hoja USUARIOS está vacía. No hay usuarios registrados.\n');
      console.log('💡 Para crear un usuario de prueba, agrega una fila con:');
      console.log('   USUARIO: test@test.com');
      console.log('   TIPO: mecanico');
      console.log('   CONTRASEÑA: 123456');
      console.log('   CLIENTE: (vacío o nombre del cliente)\n');
      return;
    }

    console.log(`📊 Total de usuarios: ${rows.length}\n`);
    console.log('👥 Lista de usuarios:\n');
    
    rows.forEach((row, index) => {
      const usuario = row.get('USUARIO') || '(vacío)';
      const tipo = row.get('TIPO') || '(vacío)';
      const password = row.get('CONTRASEÑA') || '(vacío)';
      const cliente = row.get('CLIENTE') || '(sin cliente)';
      
      console.log(`${index + 1}. Usuario: ${usuario}`);
      console.log(`   Tipo: ${tipo}`);
      console.log(`   Contraseña: ${password.substring(0, 3)}*** (${password.length} caracteres)`);
      console.log(`   Cliente: ${cliente}\n`);
    });

    console.log('✅ Diagnóstico completado\n');
    console.log('💡 Intenta hacer login con alguno de estos usuarios en la aplicación.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n📋 Detalles del error:', error);
  }
}

testUsers();
