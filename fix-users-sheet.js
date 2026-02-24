/**
 * Script para agregar columna CLIENTE a la hoja USUARIOS
 * Ejecutar: node fix-users-sheet.js
 */

require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

async function fixUsersSheet() {
  try {
    console.log('\n🔧 Reparando hoja USUARIOS...\n');

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

    const usersSheet = doc.sheetsByTitle['USUARIOS'];
    
    if (!usersSheet) {
      console.log('❌ No se encontró la hoja USUARIOS');
      return;
    }

    await usersSheet.loadHeaderRow();
    console.log('📋 Columnas actuales:', usersSheet.headerValues);

    // Verificar si falta la columna CLIENTE
    if (!usersSheet.headerValues.includes('CLIENTE')) {
      console.log('\n⚠️  Falta la columna CLIENTE. Agregándola...');
      
      const newHeaders = [...usersSheet.headerValues, 'CLIENTE'];
      await usersSheet.setHeaderRow(newHeaders);
      await usersSheet.loadHeaderRow();
      
      console.log('✅ Columna CLIENTE agregada');
      console.log('📋 Columnas nuevas:', usersSheet.headerValues);
    } else {
      console.log('\n✅ La columna CLIENTE ya existe');
    }

    // Mostrar usuarios actualizados
    const rows = await usersSheet.getRows();
    console.log(`\n👥 Usuarios en la hoja (${rows.length}):\n`);
    
    rows.forEach((row, index) => {
      console.log(`${index + 1}. ${row.get('USUARIO')} - Tipo: ${row.get('TIPO')} - Cliente: ${row.get('CLIENTE') || '(vacío)'}`);
    });

    console.log('\n✅ Reparación completada\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixUsersSheet();
