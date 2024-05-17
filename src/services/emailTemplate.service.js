function generatePaymentEmailTemplate(paymentData, qrCodeImage) {
  return `<html>
    <head>
    <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background: url('https://i.ibb.co/kJck6F1/imagen-2024-05-16-173401118.png') no-repeat center center fixed;
      background-size: cover;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      padding: 20px;
      background-color: #ffffffcc; /* Slight transparency to show the background */
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 100px;
      margin-bottom: 20px;
    }
    .content {
      padding: 30px;
      text-align: left;
      line-height: 1.6;
    }
    .qr-code {
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
          <img src="https://i.ibb.co/kJck6F1/imagen-2024-05-16-173401118.png" alt="Criadero Yusapi Logo" class="logo">
          <h2>Criadero Yusapi</h2>
          <h4>Bienvenido al evento!</h4>
        </div>
        <div class="content">
          <p>Estimado ${paymentData.payer.name},</p>
          <p>Tu pago ha sido procesado exitosamente. A continuación, encontrarás los detalles de tu pago y el código QR para ingresar al evento.</p>
          <p><strong>Referencia de pago:</strong> ${paymentData.order_id}</p>
          <p><strong>Monto:</strong> ${paymentData.amount} ${paymentData.currency}</p>
          <p><strong>Estado:</strong> ${paymentData.status}</p>
          <p><strong>Fecha del pago:</strong> ${paymentData.approved_date}</p>
          <div class="qr-code">
            <img src="${qrCodeImage}" alt="Código QR" style="width:200px;height:200px;">
            <p>Presenta este código QR en la entrada.</p>
          </div>
        </div>
        <div class="footer">
          <p>Gracias por tu compra!</p>
        </div>
      </div>
    </body>
    </html>`;
}

export { generatePaymentEmailTemplate };
