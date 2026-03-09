/**
 * VICTORY RACE 2 — Backend Script (Google Apps Script)
 * 
 * INSTRUCCIONES:
 * 1. Crea un nuevo Google Sheet.
 * 2. Pon los siguientes encabezados en la primera fila (A1:K1):
 *    Timestamp | Nombre | Apellido | Ciudad | Email | DNI | Teléfono | Categoría | Nombre Compañero | Apellido Compañero | Pagado
 * 3. En la columna K (Pagado), selecciona el rango y ve a Insertar > Casilla de verificación.
 * 4. Ve a Extensiones > Apps Script.
 * 5. Pega este código y guarda.
 * 6. Implementar > Nueva implementación > Tipo: Aplicación Web.
 * 7. Configurar: Acceso "Cualquier persona".
 * 8. Copia la URL de la Aplicación Web y pégala en script.js (GOOGLE_SCRIPT_URL).
 * 9. En el editor de Apps Script, ve a Activadores (reloj a la izquierda) > Añadir activador.
 *    - Función: onEditTrigger
 *    - Evento: Al editar
 */

const SHEET_NAME = "Hoja 1"; 

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // Escribir fila en Sheets
    sheet.appendRow([
      new Date(),
      data.nombre,
      data.apellido,
      data.ciudad,
      data.email,
      data.dni,
      data.telefono || data.whatsapp, // Manejar ambos nombres posibles
      data.categorias.join(", "),
      data.nombreCompanero || '',
      data.apellidoCompanero || '',
      'PENDIENTE' // columna Pagado
    ]);
    
    // Enviar email de confirmación
    enviarEmailConfirmacion(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function enviarEmailConfirmacion(data) {
  var asunto = '✅ ¡Inscripción confirmada! Victory Race II — ' + data.nombre;
  
  var cuerpo = `
Hola ${data.nombre}!

Tu inscripción a Victory Race II fue recibida exitosamente. 🔥

━━━━━━━━━━━━━━━━━━━━━━━━
📋 RESUMEN DE INSCRIPCIÓN
━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${data.nombre} ${data.apellido}
DNI: ${data.dni}
Categoría: ${data.categorias.join(", ")}
Fecha del evento: 11 de Septiembre 2026
Lugar: Playón Municipal, Villa Carlos Paz

━━━━━━━━━━━━━━━━━━━━━━━━
💳 INSTRUCCIONES DE PAGO
━━━━━━━━━━━━━━━━━━━━━━━━
Monto: $[VALOR_POR_DEFINIR]
Alias: [erick.cabrera.11]
CBU: [N/A]
Titular: [Erick Cabrera]

⚠️ IMPORTANTE: Una vez realizada la transferencia,
enviá el comprobante por WhatsApp al: +54 9 3541 690852
con tu nombre y apellido para confirmar tu lugar.

━━━━━━━━━━━━━━━━━━━━━━━━
Sin el comprobante, tu inscripción queda PENDIENTE.
━━━━━━━━━━━━━━━━━━━━━━━━

¡Nos vemos el 11 de Septiembre!
Equipo Victory Race
Instagram: @victoryrace.arg
WhatsApp: +54 9 3541 690852
  `;
  
  GmailApp.sendEmail(data.email, asunto, cuerpo);
}
