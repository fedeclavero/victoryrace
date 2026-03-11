/**
 * Victory Race II - Script de Inicialización de Hoja de Cálculo
 * 
 * Este script configura la hoja "Datos Atletas" con la estructura de categorías,
 * encabezados y formato necesarios. Se debe ejecutar UNA SOLA VEZ en una hoja vacía.
 * 
 * Configuración:
 * - Sheet ID: 1ysaZQjmrF0Wqkzs3hJmc-USCq36nqX9eGeojFn6Ic1U
 * - Nombre de la hoja: "Datos Atletas"
 */

function initVictoryRaceSheet() {
  const SPREADSHEET_ID = '1ysaZQjmrF0Wqkzs3hJmc-USCq36nqX9eGeojFn6Ic1U';
  const SHEET_NAME = 'Datos Atletas';
  
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // 1. Verificar si la hoja existe, si no, crearla
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // 2. VERIFICACIÓN ANTES DE EJECUTAR
  // Verificar si la fila 1 tiene contenido para evitar sobreescribir datos
  const firstCell = sheet.getRange('A1').getValue();
  if (firstCell !== "") {
    throw new Error("La hoja ya tiene contenido. Ejecutá este script solo en una hoja vacía.");
  }
  
  // 3. ESTRUCTURA DE DATOS
  const COLUMNS = [
    "Categoría", "Posición", "Puntaje", "Atleta / Equipo", "DNI", 
    "Fecha de Nacimiento", "Email", "Teléfono", "País", "Ciudad", 
    "Nombre Equipo / Gimnasio", "Talle Remera", "Apto Médico", 
    "Pagado", "Medio de Pago", "Total Pagado", "Número de Emergencia"
  ];
  
  const CATEGORIES = [
    "Open Recreativo Hombre",
    "Open Recreativo Mujer",
    "Individual Intermedio Hombre",
    "Individual Intermedio Mujer",
    "Individual Avanzado Hombre",
    "Individual Avanzado Mujer",
    "Equipos Principiantes Masculino",
    "Equipos Principiantes Femenino",
    "Equipos Principiantes Mixto",
    "Equipos Intermedio Masculino",
    "Equipos Intermedio Femenino",
    "Equipos Intermedio Mixto"
  ];
  
  // Colores de encabezado
  const COLOR_INDIVIDUAL = "#1a3a5c"; // Azul marino oscuro
  const COLOR_EQUIPOS = "#1a3d2b";    // Verde oscuro
  
  // 4. GENERACIÓN DE BLOQUES
  CATEGORIES.forEach((category, index) => {
    // Determinar color según el tipo de categoría
    // Individuales: 1-6 (index 0-5)
    // Equipos: 7-12 (index 6-11)
    const bgColor = (index < 6) ? COLOR_INDIVIDUAL : COLOR_EQUIPOS;
    
    // Insertar fila de encabezado
    // Nota: Aunque los nombres de columna son iguales, se inserta una fila por categoría
    // como separador/encabezado de bloque.
    const rowData = [...COLUMNS];
    // Reemplazamos el primer valor con la categoría para que el encabezado sea descriptivo
    // (Opcional: Si prefieren que la primera columna diga "Categoría" se deja COLUMNS tal cual)
    // El requerimiento pide "1 fila de encabezado (con los 17 nombres de columna)"
    
    sheet.appendRow(rowData);
    
    // Aplicar formato al encabezado recién insertado
    const lastRow = sheet.getLastRow();
    const headerRange = sheet.getRange(lastRow, 1, 1, COLUMNS.length);
    
    headerRange
      .setBackground(bgColor)
      .setFontColor("#ffffff")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");
      
    // NOTA PARA EL SCRIPT DE INSCRIPCIÓN:
    // - Columna N (Pagado): El script de inscripción debe usar .insertCheckboxes() al agregar filas de datos.
    // - Columna O (Medio de Pago): El script de inscripción debe setear "Transferencia Bancaria" por defecto.
  });
  
  // 5. AJUSTES FINALES
  // Auto-ajustar todas las columnas (A-Q)
  sheet.autoResizeColumns(1, COLUMNS.length);
  
  // Congelar la primera fila si se desea, aunque hay múltiples encabezados.
  // En este diseño de bloques, no solemos congelar filas individuales.
  
  Logger.log("Inicialización completada con éxito.");
}
