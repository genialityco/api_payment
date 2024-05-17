import QRCode from "../models/qrCode";

class QRCodeService {
  // Crear un nuevo código QR en la base de datos
  static async createQRCode(data) {
    const qrCode = new QRCode(data);
    return await qrCode.save();
  }

  // Obtener un código QR por token
  static async getQRCodeByToken(token) {
    return await QRCode.findOne({ token });
  }

  // Actualizar el uso del código QR
  static async updateQRCodeUsage(token, useType) {
    const qrCode = await this.getQRCodeByToken(token);
    if (!qrCode) {
      throw new Error('Código QR no encontrado');
    }
    if (useType === 'entry') {
      if (qrCode.eventEntryUsed) {
        throw new Error('Código QR ya utilizado para la entrada');
      }
      qrCode.eventEntryUsed = true;
    } else if (useType === 'food') {
      if (qrCode.foodRedemptionUsed) {
        throw new Error('Código QR ya utilizado para la comida');
      }
      qrCode.foodRedemptionUsed = true;
    }
    return await qrCode.save();
  }
}

module.exports = QRCodeService;
