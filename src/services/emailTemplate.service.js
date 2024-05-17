function translateStatus(status) {
  const statusTranslations = {
    PENDING: "PENDIENTE",
    PAID: "PAGADO",
    REJECTED: "RECHAZADO",
    CANCELLED: "CANCELADO",
    EXPIRED: "EXPIRADO",
  };
  return statusTranslations[status] || status;
}

function generatePaymentEmailTemplate(paymentData, qrCodeImage) {
  const status = translateStatus(paymentData.status);
  let additionalMessage = "";

  switch (paymentData.status) {
    case "PAID":
      additionalMessage =
        "Tu pago ha sido procesado exitosamente. A continuación, encontrarás los detalles de tu pago y el código QR para ingresar al evento.";
      break;
    case "PENDING":
      additionalMessage =
        "Tu pago está actualmente pendiente. Te notificaremos una vez que se haya procesado.";
      break;
    case "REJECTED":
      additionalMessage =
        "Tu pago ha sido rechazado. Por favor, verifica tus datos y vuelve a intentarlo.";
      break;
    case "CANCELLED":
      additionalMessage = "Tu pago ha sido cancelado.";
      break;
    case "EXPIRED":
      additionalMessage = "Tu pago ha expirado.";
      break;
    default:
      additionalMessage = "Por favor, verifica el estado de tu pago.";
  }

  return `<html>
    <head>
    <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background: url('https://firebasestorage.googleapis.com/v0/b/magnetic-be10a.appspot.com/o/images%2FLogos.png?alt=media&token=cbb567ba-2851-4df3-a240-54e507d7d908') no-repeat center center fixed;
      background-size: cover;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      padding: 20px;
      background-color: #ffffffcc; /* Slight transparency to show the background */
      border: 1px solid gray;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }
    .header {
      width: 100%;
      background-color: #7cbcec;
      color: #ffffff;
      text-align: center;
      border-radius: 8px 8px 0 0;
      padding-block: 10px;
    }
    .logo {
      max-width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .content {
      padding: 30px;
      text-align: left;
      line-height: 1.6;
    }
    .qr-code {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      margin-top: 20px;
    }    
    .footer {
      background-color: #f0f0f0;
      padding: 15px;
      text-align: center;
      border-radius: 0 0 8px 8px;
      font-size: 0.9em;
    }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://firebasestorage.googleapis.com/v0/b/magnetic-be10a.appspot.com/o/images%2FBanner%204mb.png?alt=media&token=5d332619-e0fc-4f9e-bcc1-2a6b977d11f6" alt="Criadero Yusapi Banner" class="logo">
          <h2>Evento: Que día tan Padre</h2>
          <h3>Lugar: Criadero YUSAPI Vereda la trinidad  - Duitama</h3>
          <h3>Fecha: 9 de Junio  Horario: 1pm a 5pm</h3>
        </div>
        <div class="content">
          <p>Estimado ${paymentData.payer.name},</p>
          <p>${additionalMessage}</p>
          <p><strong>Referencia de pago:</strong> ${paymentData.order_id}</p>
          <p><strong>Monto:</strong> ${paymentData.amount} ${paymentData.currency}</p>
          <p><strong>Estado:</strong> ${status}</p>
          <p><strong>Fecha del pago:</strong> ${paymentData.approved_date}</p>
          <div class="qr-code">
            <img src="${qrCodeImage}" alt="Código QR" style="width:200px;height:200px; margin:auto">
            <p>Presenta este código QR en la entrada.</p>
          </div>
        </div>
        <div class="footer">
          <p>¡Gracias por tu compra!</p>
        </div>
      </div>
    </body>
    </html>`;
}

export { generatePaymentEmailTemplate };
