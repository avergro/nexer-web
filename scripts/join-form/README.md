# Formulario "Únete a NEXER" — base de datos con Google Sheets

GitHub Pages es un hosting **estático** (sin servidor ni base de datos en
tiempo de ejecución). Por eso el formulario de la web envía a
[FormSubmit](https://formsubmit.co) (email inmediato al directorio).

Si además quieres una **base de datos que se vaya actualizando** (una hoja de
cálculo visible y editable por el directorio), usa esta opción con Google Apps
Script. Hace las dos cosas: guarda cada solicitud como fila **y** envía el
correo a todos los emails del directorio.

## Paso a paso

1. Crea un Google Sheet y llámalo como quieras (ej. `Solicitudes NEXER`).
   Copia su **ID** desde la URL:
   `https://docs.google.com/spreadsheets/d/<ID>/edit`.

2. En ese Sheet: `Extensions > Apps Script`, borra lo que haya y pega el
   contenido de `Code.gs`.

3. Edita `SHEET_ID` (el ID del paso 1) y `RECIPIENTS` (los emails del
   directorio) en el script.

4. `Deploy > New deployment > Web app`:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
   - Pulsa *Deploy* y autoriza los permisos.

5. Copia la URL que termina en `/exec` y ponla en `src/lib/join.ts`:

   ```ts
   export const JOIN_CONFIG = {
     recipients: ["coordinacion.nexer@ufrontera.cl", /* …nodos */],
     endpoint: "https://script.google.com/macros/s/<ID>/exec",
     subject: "Nueva solicitud de ingreso a NEXER",
   };
   ```

6. Para evitar el preflight de CORS, en `JoinForm.tsx` envía el JSON como
   texto plano:

   ```ts
   headers: { "Content-Type": "text/plain;charset=utf-8" },
   body: JSON.stringify({ … }),
   ```

   El script (`doPost`) ya parsea `e.postData.contents` como JSON.

## Cómo lo recibe el directorio

- **Email** a todos los emails de `RECIPIENTS` con los datos del solicitante.
- **Hoja de cálculo** con una fila por solicitud (fecha, nombre, email,
  teléfono, categoría, línea, palabras clave, biografía, idioma). La hoja se
  actualiza sola con cada envío y puede compartirse con el directorio.
