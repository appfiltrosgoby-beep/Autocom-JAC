/**
 * Script de validación de variables de entorno
 * Ejecutar: node validate-env.js
 */

require('dotenv').config();

console.log('\n🔍 Validando configuración de variables de entorno...\n');

const requiredVars = {
  'GOOGLE_SPREADSHEET_ID': {
    value: process.env.GOOGLE_SPREADSHEET_ID,
    description: 'ID de la hoja de cálculo de Google',
    example: '1jx22Rew72D1RFC_WbcMtLYxlyvxNC8RdRMYmbt-g3m4'
  },
  'GOOGLE_CLIENT_EMAIL': {
    value: process.env.GOOGLE_CLIENT_EMAIL,
    description: 'Email del Service Account de Google',
    example: 'autocom-jac@autocom-jac.iam.gserviceaccount.com'
  },
  'GOOGLE_PRIVATE_KEY': {
    value: process.env.GOOGLE_PRIVATE_KEY,
    description: 'Clave privada del Service Account',
    example: '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n'
  }
};

const optionalVars = {
  'PORT': {
    value: process.env.PORT,
    description: 'Puerto del servidor',
    default: '3000'
  },
  'NODE_ENV': {
    value: process.env.NODE_ENV,
    description: 'Ambiente de ejecución',
    default: 'development'
  },
  'SUPERADMIN_1_EMAIL': {
    value: process.env.SUPERADMIN_1_EMAIL,
    description: 'Email del primer superadministrador',
    default: ''
  },
  'SUPERADMIN_2_EMAIL': {
    value: process.env.SUPERADMIN_2_EMAIL,
    description: 'Email del segundo superadministrador',
    default: ''
  }
};

let hasErrors = false;
let hasWarnings = false;

// Validar variables requeridas
console.log('📋 Variables REQUERIDAS:\n');
for (const [key, config] of Object.entries(requiredVars)) {
  if (!config.value) {
    console.log(`❌ ${key}: FALTANTE`);
    console.log(`   Descripción: ${config.description}`);
    console.log(`   Ejemplo: ${config.example}\n`);
    hasErrors = true;
  } else {
    // Validaciones específicas
    if (key === 'GOOGLE_PRIVATE_KEY') {
      if (!config.value.includes('BEGIN PRIVATE KEY')) {
        console.log(`⚠️  ${key}: CONFIGURADA pero formato incorrecto`);
        console.log(`   La clave debe incluir -----BEGIN PRIVATE KEY----- y -----END PRIVATE KEY-----\n`);
        hasErrors = true;
      } else {
        const keyLength = config.value.length;
        console.log(`✅ ${key}: CONFIGURADA (${keyLength} caracteres)`);
      }
    } else if (key === 'GOOGLE_CLIENT_EMAIL') {
      if (!config.value.includes('@') || !config.value.includes('.')) {
        console.log(`⚠️  ${key}: CONFIGURADA pero formato incorrecto`);
        console.log(`   Debe ser un email válido del Service Account\n`);
        hasErrors = true;
      } else {
        console.log(`✅ ${key}: CONFIGURADA (${config.value})`);
      }
    } else {
      console.log(`✅ ${key}: CONFIGURADA (${config.value})`);
    }
  }
}

// Validar variables opcionales
console.log('\n📝 Variables OPCIONALES:\n');
for (const [key, config] of Object.entries(optionalVars)) {
  if (!config.value) {
    console.log(`⚪ ${key}: No configurada (usando default: "${config.default}")`);
    console.log(`   Descripción: ${config.description}\n`);
    hasWarnings = true;
  } else {
    console.log(`✅ ${key}: CONFIGURADA (${config.value})\n`);
  }
}

// Resumen
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.log('\n❌ VALIDACIÓN FALLIDA');
  console.log('Hay variables críticas faltantes o mal configuradas.');
  console.log('Por favor, configura las variables requeridas en el archivo .env');
  console.log('o en las variables de entorno de Render.\n');
  console.log('📖 Consulta RENDER_ENV_SETUP.md para instrucciones detalladas.\n');
  process.exit(1);
} else if (hasWarnings) {
  console.log('\n⚠️  VALIDACIÓN PASADA CON ADVERTENCIAS');
  console.log('Todas las variables críticas están configuradas.');
  console.log('Algunas variables opcionales no están configuradas (se usarán valores por defecto).\n');
  process.exit(0);
} else {
  console.log('\n✅ VALIDACIÓN EXITOSA');
  console.log('Todas las variables están correctamente configuradas.\n');
  process.exit(0);
}
