// Configuración del formulario "Únete a NEXER".
//
// GitHub Pages es un hosting estático (sin servidor ni base de datos). Por eso
// el formulario envía a un endpoint de Google Apps Script (scripts/join-form/)
// que guarda cada solicitud en una Google Sheet y envía el correo al directorio
// desde una cuenta de Gmail propia. Sin terceros ni activación.
//
// Para volver a FormSubmit (solo email, sin base de datos), reemplaza `endpoint`
// por "https://formsubmit.co/ajax/<email>" y restaura en JoinForm.tsx el body con
// _subject/_cc/_replyto.

export const JOIN_CONFIG = {
  // URL del web app de Google Apps Script (termina en /exec).
  // Pégala aquí después de hacer el deploy del script.
  endpoint: "https://script.google.com/macros/s/AKfycbwrbY-Ez26UuDmDMh1hVArKgdnjyrAgMJRCn2wvfSAbPEUNIzGwe1spdTfALtE_4I9A0g/exec",
};
