/**
 * Victory Race II - Backend Central (API & Triggers)
 * 
 * Gestiona:
 * 1. Recepción de inscripciones (doPost)
 * 2. Subida de Aptos Médicos a Drive (subirAptoMedico)
 * 3. Envío de correos de confirmación de inscripción
 * 4. Envío de correos de confirmación de pago (onEdit)
 */

// CONFIGURACIÓN GLOBAL
const SHEET_ID = '1ysaZQjmrF0Wqkzs3hJmc-USCq36nqX9eGeojFn6Ic1U';
const SHEET_NAME = 'Datos Atletas';
const DRIVE_FOLDER_NAME = 'Victory Race II — Aptos Médicos';
const ALIAS_PAGO = 'erick.cabrera.11';
const CBU_PAGO = '[CBU_PENDIENTE]';
const TITULAR_PAGO = 'Erick Cabrera';
const PRECIO_INDIVIDUAL = 50000;
const PRECIO_EQUIPO = 90000;
const WHATSAPP_ORGANIZADOR = '+5493541690852';
const INSTAGRAM = '@victoryrace.arg';

/**
 * Recibe inscripciones desde el sitio web.
 * Se invoca mediante POST a la URL de ejecución del script.
 */
function doPost(e) {
  // Escribir en una hoja de diagnóstico para confirmar que el código ejecuta
  var ss = SpreadsheetApp.openById('1ysaZQjmrF0Wqkzs3hJmc-USCq36nqX9eGeojFn6Ic1U');
  var logSheet = ss.getSheetByName('_Debug') || ss.insertSheet('_Debug');
  
  try {
    logSheet.appendRow([new Date(), 'doPost llamado', JSON.stringify(e?.postData)]);
    
    if (!e || !e.postData || !e.postData.contents) {
      logSheet.appendRow([new Date(), 'ERROR', 'postData vacío o undefined']);
      return ContentService
        .createTextOutput(JSON.stringify({status:'error', message:'postData vacio'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    logSheet.appendRow([new Date(), 'RAW CONTENTS', e.postData.contents]);
    
    var data = JSON.parse(e.postData.contents);
    logSheet.appendRow([new Date(), 'DATA PARSEADA', JSON.stringify(data)]);
    logSheet.appendRow([new Date(), 'CATEGORIA RECIBIDA', data.categoria || 'undefined']);
    
    // Buscar la categoría en el sheet
    var sheet = ss.getSheetByName('Datos Atletas');
    var allData = sheet.getDataRange().getValues();
    var categoriaEncontrada = false;
    
    let headerRowIndex = -1;
    for (var i = 0; i < allData.length; i++) {
      if (allData[i][0] === data.categoria) {
        categoriaEncontrada = true;
        headerRowIndex = i + 1; // 1-indexed
        logSheet.appendRow([new Date(), 'CATEGORIA ENCONTRADA en fila', headerRowIndex]);
        break;
      }
    }
    
    if (!categoriaEncontrada) {
      logSheet.appendRow([new Date(), 'ERROR', 'Categoría NO encontrada: ' + data.categoria]);
      // Loggear todos los valores de columna A para comparar
      var colA = allData.map(function(r) { return r[0]; }).join(' | ');
      logSheet.appendRow([new Date(), 'VALORES COL A', colA]);
      throw new Error("Categoría no encontrada en la hoja: " + data.categoria);
    }
    
    // 2. Buscar próxima fila disponible dentro del bloque
    let targetRowIndex = -1;
    let currentRow = headerRowIndex + 1;
    
    while (currentRow <= sheet.getLastRow()) {
      const cellValueD = sheet.getRange(currentRow, 4).getValue(); // Col D (Atleta)
      const isHeader = sheet.getRange(currentRow, 1).getBackground() !== "#ffffff"; // Los headers tienen color
      
      if (isHeader) break; // Fin del bloque
      
      if (cellValueD === "") {
        targetRowIndex = currentRow;
        break;
      }
      currentRow++;
    }
    
    // 3. Si no hay fila vacía, insertar una nueva después del último registro del bloque
    if (targetRowIndex === -1) {
      sheet.insertRowAfter(currentRow - 1);
      targetRowIndex = currentRow;
    }
    
    // 4. Mapeo de datos según tipo (Individual o Equipo)
    let fila = [];
    if (data.tipo === "individual") {
      fila = [
        data.categoria,      // A
        "",                 // B (Posición)
        "",                 // C (Puntaje)
        data.nombre + " " + data.apellido, // D
        data.dni,           // E
        data.fechaNacimiento, // F
        data.email,         // G
        data.telefono,      // H
        data.pais,          // I
        data.ciudad,        // J
        data.equipoGimnasio, // K
        data.talleRemera,   // L
        data.aptoMedicoUrl, // M
        false,              // N (Checkboxes se setean abajo)
        "Transferencia Bancaria", // O
        PRECIO_INDIVIDUAL,  // P
        data.numeroEmergencia // Q
      ];
    } else {
      fila = [
        data.categoria,      // A
        "",                 // B
        "",                 // C
        data.atleta1.nombre + " " + data.atleta1.apellido + " - " + data.atleta2.nombre + " " + data.atleta2.apellido, // D
        data.atleta1.dni + " - " + data.atleta2.dni, // E
        data.atleta1.fechaNacimiento + " - " + data.atleta2.fechaNacimiento, // F
        data.atleta1.email + " - " + data.atleta2.email, // G
        data.atleta1.telefono + " - " + data.atleta2.telefono, // H
        data.pais,          // I
        data.ciudad,        // J
        data.equipoGimnasio, // K
        data.talleRemera,   // L
        data.aptoMedicoAtleta1Url + " | " + data.aptoMedicoAtleta2Url, // M
        false,              // N
        "Transferencia Bancaria", // O
        PRECIO_EQUIPO,      // P
        data.atleta1.telefono + " - " + data.atleta2.telefono // Q (Emergencia)
      ];
    }
    
    // 5. Insertar datos y formato
    const range = sheet.getRange(targetRowIndex, 1, 1, fila.length);
    range.setValues([fila]);
    
    // Configurar Checkbox en Columna N (index 14)
    sheet.getRange(targetRowIndex, 14).setDataValidation(
      SpreadsheetApp.newDataValidation().requireCheckbox().build()
    );
    
    // 6. Enviar Email de Inscripción
    enviarEmailInscripcion(data);
    
    logSheet.appendRow([new Date(), 'RESULTADO', 'Completado sin error']);
    return ContentService.createTextOutput(JSON.stringify({status: 'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    logSheet.appendRow([new Date(), 'EXCEPTION', error.toString()]);
    console.error('Error en doPost:', error.toString(), error.stack);
    return ContentService
      .createTextOutput(JSON.stringify({status:'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sube un archivo a Google Drive y retorna su URL.
 */
function subirAptoMedico(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const folderMain = getOrCreateFolder(DRIVE_FOLDER_NAME);
    const folderAtleta = getOrCreateSubFolder(folderMain, data.nombreAtleta);
    
    const contentType = data.mimeType;
    const base64Data = data.archivo;
    const decodedFile = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(decodedFile, contentType, "AptoMedico_" + data.nombreAtleta);
    
    const file = folderAtleta.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return ContentService.createTextOutput(JSON.stringify({status: 'ok', url: file.getUrl()}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Envía el email de confirmación tras insertar la fila.
 */
function enviarEmailInscripcion(data) {
  const nombreDisplay = (data.tipo === "individual") ? data.nombre : data.atleta1.nombre + " y " + data.atleta2.nombre;
  const emails = (data.tipo === "individual") ? [data.email] : [data.atleta1.email, data.atleta2.email];
  const monto = (data.tipo === "individual") ? PRECIO_INDIVIDUAL : PRECIO_EQUIPO;
  const aclaracionEquipo = (data.tipo === "individual") ? "" : " ($45.000 por cada integrante)";
  
  const aptoStatus = (data.tipo === "individual") 
    ? (data.aptoMedicoUrl === "PRESENCIAL" ? "⚠️ Elegiste presentar tu apto médico el día del evento. Recordá llevarlo en papel. Sin apto médico no podrás participar." : "✅ Apto médico recibido correctamente.")
    : "Verificá el estado de los aptos médicos en la plataforma."; // Simplificado para equipos

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <h2 style="color: #1a3a5c; border-bottom: 2px solid #1a3a5c;">✅ ¡Inscripción confirmada! Victory Race II</h2>
      <p>Hola <strong>${nombreDisplay}</strong>,</p>
      <p>Tu inscripción para la categoría <strong>${data.categoria}</strong> ha sido registrada con éxito.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1a3a5c;">📅 Detalles del Evento</h3>
        <ul style="list-style: none; padding: 0;">
          <li>📍 <strong>Lugar:</strong> Playón Municipal, Villa Carlos Paz</li>
          <li>📅 <strong>Fecha:</strong> 11 de Septiembre, 2026</li>
        </ul>
      </div>

      <h3 style="color: #1a3a5c;">💰 INSTRUCCIONES DE PAGO</h3>
      <p>Para asegurar tu lugar, realizá la transferencia por el total:</p>
      <ul style="list-style: none; padding: 0; background-color: #eef2f7; padding: 15px; border-radius: 8px;">
        <li>💵 <strong>Monto:</strong> $${monto.toLocaleString('es-AR')}${aclaracionEquipo}</li>
        <li>🔑 <strong>Alias:</strong> ${ALIAS_PAGO}</li>
        <li>🏦 <strong>CBU:</strong> ${CBU_PAGO}</li>
        <li>👤 <strong>Titular:</strong> ${TITULAR_PAGO}</li>
      </ul>
      <p><em>"Una vez transferido, enviá el comprobante por WhatsApp al <strong>${WHATSAPP_ORGANIZADOR}</strong> con tu nombre y apellido."</em></p>

      <h3 style="color: #1a3a5c;">🩺 APTO MÉDICO</h3>
      <p>${aptoStatus}</p>

      <div style="background-color: #f2f2f2; padding: 15px; font-size: 12px; color: #666; margin-top: 30px; border-left: 4px solid #ccc;">
        <h4 style="margin-top: 0;">DESLINDE DE RESPONSABILIDAD ACEPTADO</h4>
        <p style="white-space: pre-line;">
          DESLINDE DE RESPONSABILIDAD — VICTORY RACE II
          
          El participante inscripto en Victory Race II declara conocer y aceptar los siguientes términos y condiciones de participación:
          
          1. CONDICIÓN FÍSICA: El participante declara encontrarse en óptimas condiciones físicas para participar en una competencia de alta intensidad, contando con el apto médico correspondiente.
          
          2. RIESGOS: El participante conoce y acepta los riesgos inherentes a la práctica deportiva de alta intensidad, incluyendo pero no limitado a: calambres, lesiones musculares, deshidratación y agotamiento físico.
          
          3. EXENCIÓN: El participante exime de toda responsabilidad civil y penal a los organizadores de Victory Race II, sus colaboradores, sponsors y al Municipio de Villa Carlos Paz por cualquier accidente, lesión o daño que pudiera sufrir durante el evento.
          
          4. DATOS PERSONALES: El participante autoriza a los organizadores a utilizar su imagen fotográfica y/o video captada durante el evento con fines de difusión en redes sociales y medios de comunicación, sin derecho a compensación económica.
          
          5. NORMATIVA: El participante se compromete a respetar el reglamento del evento y las indicaciones del personal organizador.
        </p>
      </div>

      <footer style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 14px;">
        <p><strong>Victory Race</strong> | <a href="https://instagram.com/victoryrace.arg">${INSTAGRAM}</a><br>
        WhatsApp: ${WHATSAPP_ORGANIZADOR}</p>
      </footer>
    </div>
  `;

  emails.forEach(email => {
    GmailApp.sendEmail(email.trim(), "✅ ¡Inscripción confirmada! Victory Race II — " + nombreDisplay, "", {
      htmlBody: htmlBody
    });
  });
}

/**
 * Trigger automático: Detecta el pago (Checkbox en Columna N).
 * DEBE INSTALARSE MANUALMENTE EN TRIGGERS.
 */
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  const col = range.getColumn();
  const row = range.getRow();
  
  if (sheet.getName() === SHEET_NAME && col === 14) { // Col N = 14
    const isPaid = range.getValue();
    const cellValueG = sheet.getRange(row, 7).getValue(); // Email
    
    if (isPaid === true && cellValueG !== "" && row > 1) {
      const nombre = sheet.getRange(row, 4).getValue(); // Atleta
      const aptoMedico = sheet.getRange(row, 13).getValue(); // Col M
      const emailRaw = cellValueG.toString();
      const emails = emailRaw.includes(" - ") ? emailRaw.split(" - ") : [emailRaw];
      
      const recordatorioApto = aptoMedico.toString().includes("PRESENCIAL") 
        ? "<p style='color: #d9534f;'>⚠️ <strong>Recordatorio:</strong> No olvides llevar tu Apto Médico impreso el día de la carrera ya que seleccionaste la entrega presencial.</p>" 
        : "";

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 2px solid #1a3d2b;">
          <h2 style="color: #1a3d2b;">🏆 ¡Pago recibido! Ya sos atleta oficial</h2>
          <p>¡Hola <strong>${nombre}</strong>!</p>
          <p>Hemos confirmado tu pago para <strong>Victory Race II</strong>. ¡Felicidades, ya estás oficialmente dentro de la competencia!</p>
          
          <div style="background-color: #f4faf6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p>Prepárate para dar lo mejor de vos. La disciplina y el esfuerzo de hoy serán tu victoria el día de la carrera.</p>
            <ul>
              <li>📅 <strong>Fecha:</strong> 11 de Septiembre 2026</li>
              <li>📍 <strong>Lugar:</strong> Playón Municipal, Villa Carlos Paz</li>
            </ul>
          </div>
          
          ${recordatorioApto}
          
          <p><strong>IMPORTANTE:</strong> El día del evento recordá traer tu DNI para retirar el kit.</p>
          
          <p>Nos vemos en la meta,</p>
          <p><strong>El equipo de Victory Race</strong><br>
          <a href="https://instagram.com/victoryrace.arg">${INSTAGRAM}</a></p>
        </div>
      `;

      emails.forEach(email => {
        GmailApp.sendEmail(email.trim(), "🏆 ¡Pago recibido! Ya sos atleta oficial de Victory Race II", "", {
          htmlBody: htmlBody
        });
      });
    }
  }
}

// FUNCIONES AUXILIARES DE DRIVE
function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function getOrCreateSubFolder(parent, name) {
  const folders = parent.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return parent.createFolder(name);
}
