const axios = require('axios');

const RENDER_URL = 'https://autocom-qr-scanner.onrender.com';

console.log('\n🔍 VERIFICANDO ESTADO DE RENDER\n');

async function testRender() {
  try {
    // Test 1: Health
    console.log('1️⃣  Probando /api/health...');
    const health = await axios.get(`${RENDER_URL}/api/health`);
    console.log('   ✅ Health:', health.data);

    // Test 2: Validate user (debería fallar o tener error específico)
    console.log('\n2️⃣  Probando /api/validate-user...');
    const response = await axios.post(`${RENDER_URL}/api/validate-user`, {
      usuario: 'testuser',
      tipo: 'mecanico',
      password: 'testpass'
    }).catch(err => err.response);
    
    console.log('   ✅ Respuesta:', response?.data || response?.status);
    
    if (response?.data?.error) {
      console.log('   📊 Error detectado:', response.data.error);
    }

  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

testRender();
