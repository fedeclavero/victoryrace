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

const SHEET_NAME = "Hoja 1"; // Cambiar si el nombre de la pestaña es distinto

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    // Categorías se envían como array o string separado por comas
    const categorias = Array.isArray(data.categorias) ? data.categorias.join(", ") : data.categorias;
    
    const rowData = [
      new Date(),                     // Timestamp
      data.nombre,                    // Nombre
      data.apellido,                  // Apellido
      data.ciudad,                    // Ciudad
      data.email,                     // Email
      data.dni,                       // DNI
      data.telefono || "",            // Teléfono
      categorias,                     // Categoría
      data.nombreCompanero || "",      // Nombre Compañero
      data.apellidoCompanero || "",    // Apellido Compañero
      false                           // Pagado (Checkbox)
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function onEditTrigger(e) {
  const range = e.range;
  const sheet = range.getSheet();
  
  // Verificar que sea en la hoja correcta y en la columna K (11)
  if (sheet.getName() === SHEET_NAME && range.getColumn() === 11) {
    const row = range.getRow();
    const value = range.getValue();
    
    // Solo enviar si se marcó como TRUE (checkbox activo)
    if (value === true) {
      const data = sheet.getRange(row, 2, 1, 7).getValues()[0]; // Nombre(2), Apellido(3), Ciudad(4), Email(5), DNI(6), Tel(7), Cat(8)
      const nombre = data[0];
      const email = data[3];
      const categoria = sheet.getRange(row, 8).getValue();
      
      sendConfirmationEmail(nombre, email, categoria);
    }
  }
}

function sendConfirmationEmail(nombre, email, categoria) {
  const subject = "✅ ¡Inscripción confirmada! — Victory Race II";
  
  const htmlBody = `
    <div style="background-color: #0a0a0a; color: #ffffff; padding: 40px; font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; border: 2px solid #00aaff;">
      <h1 style="color: #00aaff; text-align: center;">VICTORY RACE II</h1>
      <hr style="border: 0; border-top: 1px solid #1a1a2e; margin: 20px 0;">
      <p style="font-size: 18px;">¡Hola <strong>${nombre}</strong>!</p>
      <p>Tu inscripción a <strong>Victory Race II</strong> está <strong>CONFIRMADA</strong>.</p>
      
      <div style="background-color: #111111; padding: 20px; border-radius: 8px; border-left: 4px solid #00aaff; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> 11 de Septiembre 2026</p>
        <p style="margin: 5px 0;"><strong>📍 Lugar:</strong> Playón Municipal, Costanera, Villa Carlos Paz</p>
        <p style="margin: 5px 0;"><strong>💪 Categoría:</strong> ${categoria}</p>
      </div>
      
      <p>No olvides seguirnos en Instagram para todas las novedades:</p>
      <p style="text-align: center;">
        <a href="https://www.instagram.com/victory.race" style="background-color: #00aaff; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">@victory.race</a>
      </p>
      
      <p style="font-size: 14px; text-align: center; color: #888; margin-top: 30px;">
        Prepárate para desafiar tus límites.<br>
        ¡Nos vemos en la arena!
      </p>
    </div>
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}
