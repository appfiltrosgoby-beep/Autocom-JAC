# 🔧 Configuración de Variables de Entorno en Render

## ⚠️ Error 500 en `/api/validate-user`

Si estás recibiendo un error 500 al intentar iniciar sesión, es muy probable que las **variables de entorno no estén configuradas correctamente en Render**.

## 📋 Variables de Entorno Requeridas

Estas variables **DEBEN** estar configuradas en el dashboard de Render:

### 1. `GOOGLE_SPREADSHEET_ID`
**Valor:** `1jx22Rew72D1RFC_WbcMtLYxlyvxNC8RdRMYmbt-g3m4`

### 2. `GOOGLE_CLIENT_EMAIL`
**Valor:** `autocom-jac@autocom-jac.iam.gserviceaccount.com`

### 3. `GOOGLE_PRIVATE_KEY`
**Valor:** La clave privada completa (ver archivo `.env` local)

⚠️ **IMPORTANTE:** Al copiar `GOOGLE_PRIVATE_KEY` a Render:
- Debe incluir `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`
- Los saltos de línea `\n` deben mantenerse como `\n` (no como saltos reales)
- Copiar **exactamente** como aparece en el archivo `.env`

### 4. `NODE_ENV`
**Valor:** `production`

### 5. `SUPERADMIN_1_EMAIL` (Opcional)
**Valor:** `appfiltrosgoby@gmail.com`

### 6. `SUPERADMIN_2_EMAIL` (Opcional)
**Valor:** `csilva@gobyfilters.com`

---

## 🔐 Cómo Configurar las Variables en Render

### Paso 1: Acceder al Dashboard
1. Ve a https://dashboard.render.com/
2. Selecciona tu servicio `autocom-qr-scanner`

### Paso 2: Ir a Environment Variables
1. En el menú lateral, haz clic en **"Environment"**
2. Verás la lista de variables de entorno

### Paso 3: Agregar/Editar Variables
1. Haz clic en **"Add Environment Variable"**
2. Copia el **Key** (nombre de la variable)
3. Copia el **Value** (valor desde el archivo `.env`)
4. Haz clic en **"Save Changes"**

### Paso 4: Redesplegar
Después de guardar las variables:
1. Ve a la pestaña **"Manual Deploy"**
2. Haz clic en **"Deploy latest commit"**
3. Espera a que el despliegue se complete (indicador verde ✅)

---

## 🧪 Verificar que las Variables Estén Configuradas

### Opción 1: Revisar los Logs de Render
1. Ve a la pestaña **"Logs"** en el dashboard
2. Al inicio del log deberías ver:
   - ✅ Si todo está bien: `✅ Servidor ejecutándose en http://...`
   - ❌ Si faltan variables: `⚠️ ADVERTENCIA: Variables de entorno faltantes: [...]`

### Opción 2: Probar el Health Check
Abre en tu navegador:
```
https://autocom-qr-scanner.onrender.com/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "message": "Servidor funcionando correctamente"
}
```

### Opción 3: Intentar Hacer Login
Si puedes hacer login sin error 500, las variables están bien configuradas.

---

## 🔍 Solución de Problemas

### Error: "Google Sheets credentials not configured"
- ✅ Verifica que las 3 variables de Google estén configuradas
- ✅ Verifica que no haya espacios extra al inicio/fin de los valores
- ✅ Redesplega después de guardar cambios

### Error: "Error al conectar con Google Sheets"
- ✅ Verifica que `GOOGLE_PRIVATE_KEY` incluya `-----BEGIN...` y `-----END...`
- ✅ Verifica que `GOOGLE_CLIENT_EMAIL` sea correcto
- ✅ Verifica que el Service Account tenga permisos en la hoja de cálculo

### La página carga pero no puedo hacer login
- ✅ Verifica que exista al menos un usuario en la hoja `USUARIOS` de Google Sheets
- ✅ Verifica que el usuario y contraseña sean correctos
- ✅ Revisa los logs de Render para ver el error específico

---

## 📝 Ejemplo de Configuración Correcta

```env
# En Render Dashboard > Environment
NODE_ENV=production
GOOGLE_SPREADSHEET_ID=1jx22Rew72D1RFC_WbcMtLYxlyvxNC8RdRMYmbt-g3m4
GOOGLE_CLIENT_EMAIL=autocom-jac@autocom-jac.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBA...(resto de la clave)...+PcGXN8A==\n-----END PRIVATE KEY-----\n"
SUPERADMIN_1_EMAIL=appfiltrosgoby@gmail.com
SUPERADMIN_2_EMAIL=csilva@gobyfilters.com
```

---

## 🆘 Soporte Adicional

Si después de seguir estos pasos el error persiste:
1. Revisa los logs de Render en detalle
2. Copia el mensaje de error completo
3. Verifica que el archivo `.env` local funcione correctamente
4. Contacta al administrador del sistema

---

**Última actualización:** Febrero 24, 2026
