/**
 * Script para probar el endpoint de validación de usuario
 */

async function testValidateUser() {
  try {
    console.log('\n🧪 Probando endpoint /api/validate-user...\n');

    const response = await fetch('http://localhost:3000/api/validate-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        usuario: 'Autocom', 
        tipo: 'administrador', 
        password: 'Autocom@2026'
      })
    });

    const data = await response.json();
    
    console.log('📊 Status:', response.status);
    console.log('📋 Respuesta:', JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log('\n✅ Login exitoso!');
      console.log(`   Usuario: ${data.usuario}`);
      console.log(`   Rol: ${data.role}`);
      console.log(`   Tipo: ${data.tipo}`);
      console.log(`   Cliente: ${data.cliente || '(sin cliente)'}`);
    } else {
      console.log('\n❌ Login fallido');
      console.log(`   Mensaje: ${data.message || data.error}`);
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

testValidateUser();
