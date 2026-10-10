// Configuración del formulario "Únete a NEXER".
//
// IMPORTANTE: GitHub Pages es un hosting estático (sin servidor ni base de datos
// en tiempo de ejecución). Por eso el formulario envía a FormSubmit, un servicio
// gratuito que reenvía el contenido por email al directorio.
//
// FormSubmit envía el correo al destinatario principal (`to`) y una copia a cada
// email de `cc`. Así llega a todo el directorio sin backend propio.
//
// Para tener además una "base de datos" que se vaya actualizando (Google Sheets),
// ver scripts/join-form/ — es un endpoint de Google Apps Script que guarda cada
// solicitud como fila y envía el correo a todos los destinatarios.

export const JOIN_CONFIG = {
  // Destinatario principal ("Para").
  to: "marcela.calabi@ufrontera.cl",

  // Copia ("CC") — el resto del directorio NEXER.
  cc: [
    "alexander.vergara@uoh.cl",
    "claudiaandrea.mansilla@umag.cl",
    "gustavo.zuniga@usach.cl",
    "jenny.blamey@usach.cl",
    "leon.bravo@ufrontera.cl",
    "mailing.rivera@uantof.cl",
    "manuel.martinez@uoh.cl",
    "pedro.zamorano@uantof.cl",
  ],

  // Todo el directorio (para referencia y para la opción de Google Sheets).
  recipients: [
    "marcela.calabi@ufrontera.cl",
    "alexander.vergara@uoh.cl",
    "claudiaandrea.mansilla@umag.cl",
    "gustavo.zuniga@usach.cl",
    "jenny.blamey@usach.cl",
    "leon.bravo@ufrontera.cl",
    "mailing.rivera@uantof.cl",
    "manuel.martinez@uoh.cl",
    "pedro.zamorano@uantof.cl",
  ],

  // Endpoint de FormSubmit (AJAX) para el destinatario principal.
  endpoint: "https://formsubmit.co/ajax/marcela.calabi@ufrontera.cl",

  subject: "Nueva solicitud de ingreso a NEXER",
};
