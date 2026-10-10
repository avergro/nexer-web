// Configuración del formulario "Únete a NEXER".
//
// IMPORTANTE: GitHub Pages es un hosting estático (sin servidor ni base de datos
// en tiempo de ejecución). Por eso el formulario envía a FormSubmit, un servicio
// gratuito que reenvía el contenido por email al directorio.
//
// Para tener además una "base de datos" que se vaya actualizando (Google Sheets),
// ver scripts/join-form/ — es un endpoint de Google Apps Script que guarda cada
// solicitud como fila y envía el correo a todos los destinatarios.

export const JOIN_CONFIG = {
  // Emails del directorio que reciben las solicitudes.
  // FormSubmit reenvía al primer email; para varios, usa la opción de
  // Google Sheets (scripts/join-form/) o el panel gratuito de FormSubmit.
  recipients: ["coordinacion.nexer@ufrontera.cl"],

  // Endpoint de FormSubmit (AJAX) para el correo principal.
  endpoint: "https://formsubmit.co/ajax/coordinacion.nexer@ufrontera.cl",

  subject: "Nueva solicitud de ingreso a NEXER",
};
