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

// Directorio NEXER completo — restaurar al publicar con nexer.cl:
//   to:      "marcela.calabi@ufrontera.cl"  (o "coordinacion.nexer@ufrontera.cl")
//   cc:      ["alexander.vergara@uoh.cl", "claudiaandrea.mansilla@umag.cl",
//             "gustavo.zuniga@usach.cl", "jenny.blamey@usach.cl",
//             "leon.bravo@ufrontera.cl", "mailing.rivera@uantof.cl",
//             "manuel.martinez@uoh.cl", "pedro.zamorano@uantof.cl"]
//   endpoint: "https://formsubmit.co/ajax/marcela.calabi@ufrontera.cl"

export const JOIN_CONFIG = {
  // TEMPORAL (pruebas): los envíos van solo a Alexander. Restaurar a
  // marcela.calabi@ufrontera.cl / coordinación al publicar con nexer.cl.
  to: "alexander.vergara@uoh.cl",

  // Copia ("CC") — vacío durante las pruebas para no molestar al directorio.
  cc: [],

  // Todo el directorio (para referencia y para la opción de Google Sheets).
  recipients: ["alexander.vergara@uoh.cl"],

  // Endpoint de FormSubmit (AJAX) para el destinatario principal.
  endpoint: "https://formsubmit.co/ajax/alexander.vergara@uoh.cl",

  subject: "Nueva solicitud de ingreso a NEXER",
};
