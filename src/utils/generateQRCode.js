const { storage } = require("../../firebase-config.js"); // Ajusta la ruta según sea necesario
const { toDataURL } = require("qrcode");

/**
 * Genera un código QR y lo sube a Firebase Storage.
 * @param {string|object} data Los datos para el código QR.
 * @param {string} fileName Nombre del archivo para el QR.
 * @returns {Promise<string>} URL pública del archivo en Firebase Storage.
 */
async function generateQRCode(data, fileName) {
  try {
    const options = {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.92,
      margin: 1,
    };
    const dataForQR = typeof data === "object" ? JSON.stringify(data) : data;
    const qrImage = await toDataURL(dataForQR, options);

    const buffer = Buffer.from(qrImage.split(",")[1], "base64");
    const file = storage.bucket().file(`QR/${fileName}.png`);

    await file.save(buffer, {
      metadata: {
        contentType: "image/png",
      },
      public: true,
      validation: "md5",
    });

    // Retorna la URL pública
    return getPublicUrl(`QR/${fileName}.png`);
  } catch (err) {
    console.error("Error generating or uploading QR code:", err);
    throw err;
  }
}

/**
 * Obtiene la URL pública de un archivo en Firebase Storage.
 * @param {string} filePath Path del archivo en el bucket.
 * @returns {string} URL pública del archivo.
 */
function getPublicUrl(filePath) {
  return `https://storage.googleapis.com/${storage.bucket().name}/${filePath}`;
}

module.exports = generateQRCode;
