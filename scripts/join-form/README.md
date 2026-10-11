# Formulario "Únete a NEXER" — Google Apps Script

GitHub Pages es un hosting **estático** (sin servidor ni base de datos). El
formulario envía a un **web app de Google Apps Script** que hace dos cosas:

1. Guarda cada solicitud como fila en una Google Sheet.
2. Envía un correo a los destinatarios configurados en `RECIPIENTS`.

El correo sale desde la cuenta de Google propietaria del script (hoy una cuenta
dedicada, para no exponer el Gmail personal de nadie).

## Estado actual (2026-10)

- **Cuenta que ejecuta el script:** una cuenta de Gmail dedicada (preguntar a
  Alexander cuál es; NO es su Gmail personal).
- **Google Sheet:** "Solicitudes NEXER" (compartida como *Editor* con la cuenta
  dedicada).
- **SHEET_ID:** `1ld5wHGSAiF8_NT-nc40wiJIRPfVgaee_woRKb9YzF20`
- **Endpoint en uso (`src/lib/join.ts`):** ver el valor de `endpoint` ahí.
- **RECIPIENTS actual:** `vergara.alexander@gmail.com` (pruebas). Cambiar a
  coordinación/marcela al publicar con `nexer.cl`.

## Cómo cambiar el email al que llegan las solicitudes

1. Entra a `https://script.google.com` **con la cuenta dedicada** y abre el
   proyecto del formulario.
2. En `Code.gs`, edita el arreglo `RECIPIENTS`:

   ```js
   var RECIPIENTS = [
     'coordinacion.nexer@ufrontera.cl',
     'marcela.calabi@ufrontera.cl'
   ];
   ```

   (Puedes poner uno o varios emails; todos reciben el correo.)
3. **Deploy → Manage deployments → lápiz (Edit) → Version: "New version" →
   Deploy.** Esto es obligatorio: la versión desplegada es una foto del código,
   no se actualiza sola.
4. **No cambia la URL** ni el `endpoint` de `join.ts`. La hoja de cálculo sigue
   guardando igual (el guardado es independiente del correo).

## Qué hace el script (`Code.gs`)

- `doPost(e)`: recibe un POST con JSON en texto plano, agrega una fila a la
  hoja y envía el correo a `RECIPIENTS`.
- El formulario (`JoinForm.tsx`) envía `Content-Type: text/plain;charset=utf-8`
  para evitar el preflight de CORS; el script parsea `e.postData.contents`.

## Reconfigurar desde cero (si se pierde el script)

1. Crea un Google Sheet (ej. "Solicitudes NEXER") y copia su ID de la URL.
2. En `https://script.google.com` → Nuevo proyecto → pega `Code.gs`.
3. Rellena `SHEET_ID` y `RECIPIENTS`.
4. Comparte la hoja con la cuenta dueña del script como **Editor** (si son
   cuentas distintas).
5. **Deploy → New deployment → Web app**: Execute as *Me*, Who has access
   *Anyone* → autoriza (permite popups; acepta "enviar correo" + "editar hojas").
6. Pega la URL `/exec` en `src/lib/join.ts` → `endpoint`.

## Cómo lo recibe el directorio

- **Email** a todos los emails de `RECIPIENTS` con los datos del solicitante.
- **Hoja de cálculo** con una fila por solicitud (fecha, nombre, email,
  teléfono, categoría, línea, palabras clave, biografía, idioma).
