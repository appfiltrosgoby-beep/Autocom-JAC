/**
 * Script de prueba EXHAUSTIVA del sistema de validación de usuarios
 * Ejecutar: node test-validation-flow.js
 */

require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

async function testValidationFlow() {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🧪 PRUEBA EXHAUSTIVA: VALIDACIÓN DE USUARIOS EN GOOGLE SHEETS');
    console.log('='.repeat(80) + '\n');

    // 1. Conectar a Google Sheets
    console.log('📡 PASO 1: Conectando a Google Sheets...\n');
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

    // 2. Verificar hoja USUARIOS
    console.log('📋 PASO 2: Verificando hoja USUARIOS...\n');
    const usersSheet = doc.sheetsByTitle['USUARIOS'];
    
    if (!usersSheet) {
      console.log('❌ No existe la hoja USUARIOS');
      return;
    }

    await usersSheet.loadHeaderRow();
    console.log('✅ Hoja USUARIOS encontrada');
    console.log(`   Columnas: ${usersSheet.headerValues.join(', ')}\n`);

    // 3. Obtener todos los usuarios
    console.log('👥 PASO 3: Listando usuarios en la hoja...\n');
    const rows = await usersSheet.getRows();
    
    if (rows.length === 0) {
      console.log('⚠️  La hoja USUARIOS está vacía\n');
      return;
    }

    console.log(`📊 Total de usuarios: ${rows.length}\n`);
    
    rows.forEach((row, index) => {
      console.log(`${index + 1}. Usuario: "${row.get('USUARIO')}"`);
      console.log(`   Tipo: "${row.get('TIPO')}"`);
      console.log(`   Contraseña: "${row.get('CONTRASEÑA')}"`);
      console.log(`   Cliente: "${row.get('CLIENTE') || '(vacío)'}"\n`);
    });

    // 4. Simular validación de credenciales
    console.log('='.repeat(80));
    console.log('🔐 PASO 4: Simulando validación de credenciales...\n');

    const testCases = [
      { usuario: 'Autocom', password: 'Autocom@2026', tipo: 'administrador', esperado: true },
      { usuario: 'autocom', password: 'Autocom@2026', tipo: 'administrador', esperado: true },
      { usuario: 'AUTOCOM', password: 'Autocom@2026', tipo: 'administrador', esperado: true },
      { usuario: 'Autocom', password: 'WrongPassword', tipo: 'administrador', esperado: false },
      { usuario: 'NoExiste', password: 'Autocom@2026', tipo: 'administrador', esperado: false },
      { usuario: 'appfiltrosgoby@gmail.com', password: 'appsuper@26', tipo: 'administrador', esperado: true },
      { usuario: 'appfiltrosgoby@gmail.com', password: 'WrongPassword', tipo: 'administrador', esperado: false },
    ];

    let passCount = 0;
    let failCount = 0;

    for (const testCase of testCases) {
      process.stdout.write(`🧪 Probando: usuario="${testCase.usuario}", password="${testCase.password}"... `);
      
      // Simular la función normalizeUser del servidor
      const normalizedInput = testCase.usuario.trim().toLowerCase();
      
      // Buscar el usuario en la hoja
      let found = false;
      let matchedRow = null;
      
      for (const row of rows) {
        const normalizedStored = (row.get('USUARIO') || '').trim().toLowerCase();
        const storedPassword = (row.get('CONTRASEÑA') || '').toString().trim();
        
        if (normalizedStored === normalizedInput && storedPassword === testCase.password) {
          found = true;
          matchedRow = row;
          break;
        }
      }

      const resultado = found ? '✅ VALIDADO' : '❌ RECHAZADO';
      const esperado = testCase.esperado ? 'DEBE VALIDAR' : 'DEBE RECHAZAR';
      
      if (found === testCase.esperado) {
        console.log(`${resultado} (${esperado}) ✓`);
        passCount++;
      } else {
        console.log(`${resultado} (${esperado}) ✗ ERROR`);
        failCount++;
      }

      if (matchedRow) {
        console.log(`   → Usuario encontrado: "${matchedRow.get('USUARIO')}" (Tipo: ${matchedRow.get('TIPO')})`);
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('📊 RESULTADOS DE PRUEBAS\n');
    console.log(`✅ Pasaron: ${passCount}/${testCases.length}`);
    console.log(`❌ Fallaron: ${failCount}/${testCases.length}`);
    
    if (failCount === 0) {
      console.log('\n✅ TODAS LAS PRUEBAS PASARON - Sistema de validación funcionando correctamente');
    } else {
      console.log('\n⚠️  ALGUNAS PRUEBAS FALLARON - Revisa la configuración de usuarios');
    }

    console.log('\n' + '='.repeat(80) + '\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nDetalles:', error);
  }
}

testValidationFlow();
