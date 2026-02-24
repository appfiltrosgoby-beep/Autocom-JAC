# 🔴 SOLUCIÓN: Error "Google Sheets credentials not configured" en Render

## ⚠️ PROBLEMA
El servidor en Render dice: `Google Sheets credentials not configured`

**CAUSA:** Las variables de entorno NO están configuradas en el dashboard de Render.

---

## ✅ PASOS PARA SOLUCIONAR (PASO A PASO)

### PASO 1️⃣ : Acceder a Render Dashboard
1. Abre: **https://dashboard.render.com/**
2. **Inicia sesión** con tu cuenta
3. En la lista de servicios, haz clic en: **`autocom-qr-scanner`**

### PASO 2️⃣ : Ir a Environment
1. En el menú lateral IZQUIERDO, busca: **"Environment"**
2. Haz clic en ese botón
3. Deberías ver una sección vacía (o con pocas variables)

### PASO 3️⃣ : Agregar Variable 1 - GOOGLE_SPREADSHEET_ID
1. Haz clic en: **"Add Environment Variable"** (botón azul/verde)
2. En el campo **"Key"**, escribe exactamente:
   ```
   GOOGLE_SPREADSHEET_ID
   ```
3. En el campo **"Value"**, pega:
   ```
   1jx22Rew72D1RFC_WbcMtLYxlyvxNC8RdRMYmbt-g3m4
   ```
4. Haz clic en: **"Save"** ✅

### PASO 4️⃣ : Agregar Variable 2 - GOOGLE_CLIENT_EMAIL
1. Haz clic en: **"Add Environment Variable"** nuevamente
2. En el campo **"Key"**, escribe:
   ```
   GOOGLE_CLIENT_EMAIL
   ```
3. En el campo **"Value"**, pega:
   ```
   autocom-jac@autocom-jac.iam.gserviceaccount.com
   ```
4. Haz clic en: **"Save"** ✅

### PASO 5️⃣ : Agregar Variable 3 - GOOGLE_PRIVATE_KEY
⚠️ **ESTA ES LA MÁS IMPORTANTE Y DELICADA**

1. Haz clic en: **"Add Environment Variable"**
2. En el campo **"Key"**, escribe:
   ```
   GOOGLE_PRIVATE_KEY
   ```
3. En el campo **"Value"**, pega LA CLAVE COMPLETA (desde tu archivo `.env` local):
   ```
   -----BEGIN PRIVATE KEY-----
   MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCygW1RACXbCehU
   yEH1Q9ylF39udhPYl2oRSYefroDJaj531tGVUU0dZG9elCZYswOTz4wG55Esvg/V
   Cifn4e4HEtOBhZTFrtTdwRqlxjsADiHatx2dUC+RNGQ7oszr8dl+9HhYg4opqVhQ
   fKGv9UEKYpxLCP7QRBy8iFRiCo0S+Vgc9avUwdQux0YeX9ukss3Dp7m5HbtNGihS
   TmBRWJI3uiLL2l3hia6i6wcS7zhFl8SCy8TkgoWiKwqoU0fMZ6uEl2cgxYDKhUug
   qQBa/58hu+EtV3K4I60leSIn9vrn6fYr6b+3RhAkaZ4wMRYuEIv7DstMvtKN429F
   JR65er2LAgMBAAECggEAByX20H8jPdZJENiLQPlcgYVOCfphaRN49iBDPMhxgoLm
   Otc33kNXNzhUMPT11e98YTBFMep6RV8VUI62OYDAco5KcgMn3ugOTxTV53WSFJ4K
   fCLWc23WnV0YoSHahZ2nikdNTDqRK55gdhw5W5L2Qu2Jx2d2JbViyFLkZxGUNZB2
   ZLMmGqTR7LpnREWcwqUZyE0Zcv6bBwxd3z14uSuYBOc0tlNAtFA1MkW5hDawZ9aK
   srzOci7TpX1P/5HG81xm+d+1TOrjtfG0Izd1ovhOZV/dvmeZm2yTkpz/SyRY445P
   rPUkVdXHhUnGWD5UMleuGPyJxf+vsITyMlvvPPEKoQKBgQDgmZ9HY8RgkViLSiWP
   rOk+PKDKw/CqXhPNQeF7suX9kN9N8xSR6dynb397pwtBca+H6LNgUFD0nr/M7Bt7
   Ic29WkPm3KGLaD0a1mzuzLNlIlURX5cTbFDoz0GPs5yICCFzd/EcTTAwIN5y89P9
   mbQ+Vh6q/7Yje0PvdoNFoA1LJwKBgQDLdhgq0tswyXKAhKz+uyDVBAlSDcB8diD4
   sOVU3M0++x9CKfn1XmCJPCcRPJ2VxhfwFsijR4IGVt3lH0euVppPLy4UxrORw470
   33k+RqmQBQia0k1xKogq2/L5k/MMcLQ1pjEhoNnULsU2DPTVDn+MvqY+UFwanJjn
   nm61gffI/QKBgCzHM/Q9tccy8x5CGB7+8DmSSNRkIDU3MGd5vQS2dBgLrBmUXwOA
   RpezKQ10DlBr4/0KrciD+r/qbn7ii9AOu0AHIQaD8kki7RvOqEUr1pBROfiOwEYF
   EFR6Da4itxB/3ntw7EciNHtD8lWkux0SadcLwG2DMcL9LlwtmpplAIF9AoGAQE3V
   u4si3Zt9heLo7iVkbg61h2pzQKLxLshx4s1aTSJ/MaEksAkhB56sVkVLJPAT1rzM
   stZB4REJVoX5WL9kS8yEiup2DIa7IueSYT1iD/OXUZ9P/IlNugYEGB9LfM4OFrqs
   4oz865PQnpGfu8q2Q1xqHF23jm2Z4fJv2Qv3rV0CgYAQGZaC/e/2hOAbyvrqT2Ii
   XG4dfIOZW0vE1JEGYkMiqGJmj3OOt245ardVRUGAMsiS/iKKBACu5tWjdzm6jd70
   8SFPOZjvORup/IRZl5IoR/AyX1sADKGpVrEnDgpnMmTayVAnv81ATB3rv76r+mfs
   /SuKd63cNeJsQB+PcGXN8A==
   -----END PRIVATE KEY-----
   ```
   ⚠️ **IMPORTANTE:** Copia TODO incluyendo `-----BEGIN` y `-----END`
4. Haz clic en: **"Save"** ✅

### PASO 6️⃣ : Verificar que todas las variables estén guardadas
Deberías ver una tabla con 3 filas:
```
KEY                          VALUE
GOOGLE_SPREADSHEET_ID        1jx22Rew72D1RFC_WbcMtLYxlyvxNC8RdRMYmbt-g3m4
GOOGLE_CLIENT_EMAIL          autocom-jac@autocom-jac.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY           -----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----
```

### PASO 7️⃣ : REDEPLOY (Esto es crítico)
1. En el menú lateral, haz clic en: **"Deployments"**
2. Busca el botón: **"Deploy latest commit"** o **"Manual Deploy"**
3. Haz clic en ese botón
4. ESPERA a que el indicador diga: **✅ Live** (puede tomar 1-3 minutos)

---

## 🧪 Verificar que funciona

Una vez que Render dice ✅ Live, abre en tu navegador:

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

Si ves eso, ¡las variables están configuradas!

Ahora intenta hacer login en:
```
https://autocom-qr-scanner.onrender.com
```

---

## ❓ Preguntas Frecuentes

### P: ¿Qué pasa si me equivoco al copiar una variable?
**R:** Simplemente haz clic en el icono de papelera (🗑️) en esa variable para eliminarla, y vuelve a crear la correcta.

### P: ¿Cuánto tiempo tarda el redeploy?
**R:** Entre 1-3 minutos. Verás una barra de progreso.

### P: ¿El error persiste después de hacer todo esto?
**R:** 
1. Verifica que el redeploy haya terminado (debe decir ✅ Live en verde)
2. Recarga la página del navegador (Ctrl+F5 o Cmd+Shift+R)
3. Prueba nuevamente

### P: ¿Dónde consigo la clave privada exacta?
**R:** En tu archivo local `.env`, busca la línea que empieza con `GOOGLE_PRIVATE_KEY=`. 
Ejecuta (en tu terminal local):
```bash
node export-env-for-render.js
```
Y copia la clave que aparece en la salida.

---

## 📋 CHECKLIST

- [ ] Fui a https://dashboard.render.com/
- [ ] Seleccioné "autocom-qr-scanner"
- [ ] Entré a "Environment"
- [ ] Agregué GOOGLE_SPREADSHEET_ID
- [ ] Agregué GOOGLE_CLIENT_EMAIL
- [ ] Agregué GOOGLE_PRIVATE_KEY (completa con BEGIN y END)
- [ ] Guardé todos los cambios
- [ ] Hice clic en "Manual Deploy"
- [ ] Esperé a que diga ✅ Live
- [ ] Probé /api/health
- [ ] Intenté hacer login

---

**Una vez que hagas esto, el error debe desaparecer.** ✅

Si necesitas copiar las variables fácilmente, ejecuta en tu terminal local:
```bash
node export-env-for-render.js
```

Última actualización: 24 de Febrero de 2026
