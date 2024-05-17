import { toDataURL } from 'qrcode';

/**
 * Genera un código QR como Data URI. Acepta tanto cadenas de texto como objetos.
 * @param {string|object} data Los datos que se convertirán en QR, pueden ser una cadena de texto o un objeto.
 * @returns {Promise<string>} Una promesa que resuelve con el Data URI del código QR.
 */
async function generateQRCode(data) {
  try {
    // Opciones adicionales podrían incluirse aquí, como error correction level
    const options = {
      errorCorrectionLevel: 'H', // Niveles: L, M, Q, H
      type: 'image/png',
      quality: 0.92,
      margin: 1
    };
    // Verificar si los datos son un objeto y convertir a cadena JSON
    const dataForQR = (typeof data === 'object') ? JSON.stringify(data) : data;
    // Convertir datos a Data URI (base64)
    const qrImage = await toDataURL(dataForQR, options);
    return qrImage;
  } catch (err) {
    console.error('Error al generar el código QR:', err);
    throw err;  // Propaga el error para manejo externo
  }
}

export default generateQRCode;
