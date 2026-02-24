/**
 * Script para mostrar contraseñas completas (solo para debugging)
 * ADVERTENCIA: No uses esto en producción
 */

require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

async function showPasswords() {
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
    const usersSheet = doc.sheetsByTitle['USUARIOS'];
    const rows = await usersSheet.getRows();

    console.log('\n🔐 CONTRASEÑAS COMPLETAS (solo para debugging):\n');
    
    rows.forEach((row, index) => {
      console.log(`${index + 1}. Usuario: ${row.get('USUARIO')}`);
      console.log(`   Tipo: ${row.get('TIPO')}`);
      console.log(`   Contraseña completa: "${row.get('CONTRASEÑA')}"`);
      console.log(`   Cliente: ${row.get('CLIENTE') || '(sin cliente)'}\n`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

showPasswords();
