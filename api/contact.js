export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, message } = req.body;

  // Validate
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Constructora Jireh Web <onboarding@resend.dev>',
        to: 'delgadilloruizmarcial@gmail.com',
        subject: `Nuevo contacto web: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #c8a960; border-bottom: 2px solid #c8a960; padding-bottom: 10px;">
              Nuevo mensaje desde la web
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #333;">Nombre:</td>
                <td style="padding: 12px 0; color: #555;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #333;">Teléfono:</td>
                <td style="padding: 12px 0; color: #555;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #333; vertical-align: top;">Mensaje:</td>
                <td style="padding: 12px 0; color: #555;">${message}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              Enviado desde constructorajireh.cl
            </p>
          </div>
        `,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await response.json();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Error al enviar email' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
