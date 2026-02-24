# 🚨 CHECKLIST: Verificar y Forzar Redeploy en Render

## PROBLEMA
Las variables están configuradas pero el servidor sigue sin usarlas.

## SOLUCIÓN

### PASO 1: Verifica el estado del despliegue
1. En Render Dashboard, ve a: **"Deployments"**
2. Busca el despliegue más reciente
3. Mira el **color del indicador**:
   - 🟢 **Verde (✅ Live)** = Despliegue completado (debe estar aquí)
   - 🟡 **Amarillo (⏳ Building)** = Aún se está compilando, espera
   - 🔴 **Rojo (❌ Failed)** = Error en el despliegue, necesitas verificar logs

### PASO 2: Si está ✅ Live (Verde)
1. Ve a: **"Logs"** en el menú lateral
2. Busca mensajes que digan:
   - ✅ Si ves: `⚠️ ADVERTENCIA: Variables de entorno faltantes:` → Las variables NO se aplicaron
   - ✅ Si ves: `✅ Servidor ejecutándose en http://...` → Las variables SÍ se aplicaron

### PASO 3: Si falta aplicar las variables, fuerza un nuevo despliegue
1. Ve a: **"Deployments"**
2. Busca el botón: **"Redeploy"** (para el despliegue actual)
   - O: **"Deploy latest commit"** (si hay cambios recientes)
3. Haz clic
4. Espera a que diga **✅ Live** nuevamente

### PASO 4: Si sigue sin funcionar, intenta esto
1. Ve a: **"Settings"**
2. En el menú, busca: **"Native Environment"** o similar
3. Verifica que NODE_ENV esté en **"production"**

---

## 🔍 VERIFICACIÓN RÁPIDA EN RENDER

En los **Logs** de Render (pestaña Logs), deberías ver exactamente ESTO al iniciar:

```
✅ Servidor ejecutándose en http://...
📊 Ambiente: production
🚀 API lista para recibir solicitudes
```

Si ves eso = Variables están configuradas correctamente ✅

Si ves esto en cambio:
```
⚠️ ADVERTENCIA: Variables de entorno faltantes: ['GOOGLE_SPREADSHEET_ID', ...]
```

= Las variables NO se aplicaron, necesitas nuevo redeploy

---

## ⚡ SOLUCIÓN RÁPIDA

Si nada funciona, intenta esto en orden:

1. **Redeploy Simple:**
   - Deployments → Click "Redeploy" button
   - Espera ✅ Live

2. **Redeploy Forzado:**
   - Shell → Settings → "Clear Build Cache"
   - Luego: Deployments → "Deploy latest commit"
   - Espera ✅ Live

3. **Verificar Logs:**
   - Logs → Busca "PRIVATE KEY" o "GOOGLE_SPREADSHEET"
   - Debe decir que están configuradas

---

## 📞 SI SIGUE SIN FUNCIONAR

Ejecuta en tu terminal local:
```bash
node export-env-for-render.js
```

1. Copia la salida
2. Verifica que el GOOGLE_PRIVATE_KEY esté completo (BEGIN y END)
3. Compara con lo que tienes en Render
4. Si está diferente, corrígelo
5. Vuelve a hacer Redeploy

---

**Próximo paso: Manda una captura de Render mostrando el estado del despliegue (Deployments tab)**
