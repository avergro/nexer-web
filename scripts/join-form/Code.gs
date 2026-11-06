/**
 * Endpoint del formulario "Únete a NEXER" — Google Apps Script.
 *
 * Recibe un POST desde la web, agrega una fila a una hoja de cálculo
 * (la "base de datos" que se va actualizando) y envía un correo al directorio.
 *
 * Cómo configurarlo:
 *   1. Crea un Google Sheet (ej. "Solicitudes NEXER") y copia su ID (está en la URL).
 *   2. Pega este script en Extensions > Apps Script (de ese mismo Sheet).
 *   3. Rellena SHEET_ID y RECIPIENTS abajo.
 *   4. Deploy > New deployment > Web app:
 *        - Execute as:  Me
 *        - Who has access:  Anyone
 *   5. Copia la URL /exec y pégala como endpoint en src/lib/join.ts.
 *
 * Nota CORS: para que el navegador haga fetch sin preflight, el formulario
 * debe enviar `Content-Type: text/plain;charset=utf-8` con el JSON en el body.
 * Este script también acepta form-encoded normal (e.parameter).
 */

var SHEET_ID = '1ld5wHGSAiF8_NT-nc40wiJIRPfVgaee_woRKb9YzF20';

var RECIPIENTS = [
  'vergara.alexander@gmail.com'
];

function doPost(e) {
  var p = {};

  // Prefiere JSON (text/plain) y cae a form-encoded si no hay JSON.
  if (e.postData && e.postData.contents) {
    try {
      p = JSON.parse(e.postData.contents);
    } catch (err) {
      p = e.parameter || {};
    }
  } else {
    p = e.parameter || {};
  }

  var sheet = SpreadsheetApp.openById(SHEET_ID);
  var sh = sheet.getSheetByName('Solicitudes') || sheet.getSheets()[0];

  // Las columnas nuevas van AL FINAL para no desalinear las filas antiguas.
  var HEADERS = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Categoría',
    'Línea de investigación', 'Palabras clave', 'Biografía', 'Idioma',
    'Tipo de membresía', 'Universidad / Institución', 'Área temática',
    'ORCID', 'Género', 'Proyectos de investigación'];
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  sh.appendRow([
    new Date(),
    p.name || '',
    p.email || '',
    p.phone || '',
    p.category || '',
    p.researchLine || '',
    p.keywords || '',
    p.bio || '',
    p.lang || '',
    p.membership || '',
    p.institution || '',
    p.area || '',
    p.orcid || '',
    p.gender || '',
    p.projects || ''
  ]);

  var orcidUrl = p.orcid ? 'https://orcid.org/' + p.orcid : '';

  var body = [
    'Nueva solicitud de ingreso a NEXER',
    '',
    'Nombre: ' + (p.name || ''),
    'Email: ' + (p.email || ''),
    'Teléfono: ' + (p.phone || ''),
    'Tipo de membresía: ' + (p.membership || ''),
    'Universidad / Institución: ' + (p.institution || ''),
    'Categoría: ' + (p.category || ''),
    'Área temática: ' + (p.area || '—'),
    'ORCID: ' + orcidUrl,
    'Género: ' + (p.gender || ''),
    'Línea de investigación: ' + (p.researchLine || ''),
    'Palabras clave: ' + (p.keywords || ''),
    'Proyectos de investigación: ' + (p.projects || ''),
    'Biografía: ' + (p.bio || '')
  ].join('\n');

  MailApp.sendEmail({
    to: RECIPIENTS.join(','),
    subject: 'Nueva solicitud de ingreso a NEXER',
    body: body
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
