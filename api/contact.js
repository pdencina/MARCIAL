export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;

  try {
    // 1. Email a Marcial con los datos del contacto
    const notificationEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Constructora Jireh <contacto@constructorajireh.cl>',
        to: 'delgadilloruizmarcial@gmail.com',
        subject: `Nuevo contacto web: ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c8a960, #b87333); padding: 30px; text-align: center;">
              <h1 style="color: #0d0d0d; margin: 0; font-size: 22px;">Nuevo Contacto desde la Web</h1>
            </div>
            <div style="padding: 30px; color: #f5f5f5;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #222; font-weight: 600; color: #c8a960; width: 100px;">Nombre</td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #222; color: #f5f5f5;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #222; font-weight: 600; color: #c8a960;">Teléfono</td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #222; color: #f5f5f5;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #222; font-weight: 600; color: #c8a960;">Email</td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #222; color: #f5f5f5;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; font-weight: 600; color: #c8a960; vertical-align: top;">Mensaje</td>
                  <td style="padding: 14px 0; color: #f5f5f5; line-height: 1.6;">${message}</td>
                </tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: #1a1a1a; border-radius: 8px; text-align: center;">
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #25D366; text-decoration: none; font-weight: 600;">
                  Responder por WhatsApp
                </a>
              </div>
            </div>
            <div style="padding: 16px; text-align: center; background: #080808; color: #666; font-size: 12px;">
              Constructora Jireh SPA | constructorajireh.cl
            </div>
          </div>
        `,
      }),
    });

    // 2. Auto-reply al interesado
    const autoReplyEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Constructora Jireh <contacto@constructorajireh.cl>',
        to: email,
        subject: 'Recibimos tu mensaje - Constructora Jireh',
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c8a960, #b87333); padding: 30px; text-align: center;">
              <h1 style="color: #0d0d0d; margin: 0; font-size: 24px;">Constructora Jireh</h1>
            </div>
            <div style="padding: 36px 30px; color: #f5f5f5;">
              <h2 style="color: #c8a960; font-size: 20px; margin: 0 0 16px;">¡Gracias por contactarnos, ${name}!</h2>
              <p style="color: #b3b3b3; line-height: 1.8; margin: 0 0 20px;">
                Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad. 
                Nuestro equipo revisará tu consulta y te responderemos en menos de 24 horas.
              </p>
              <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 3px solid #c8a960;">
                <p style="color: #888; margin: 0 0 8px; font-size: 13px;">Tu mensaje:</p>
                <p style="color: #f5f5f5; margin: 0; font-style: italic; line-height: 1.6;">"${message}"</p>
              </div>
              <p style="color: #b3b3b3; line-height: 1.8; margin: 20px 0;">
                Si necesitas una respuesta más inmediata, no dudes en escribirnos directamente por WhatsApp:
              </p>
              <div style="text-align: center; margin: 24px 0;">
                <a href="https://wa.me/56993913859?text=Hola%2C%20soy%20${encodeURIComponent(name)}%20y%20les%20escribí%20por%20la%20web" 
                   style="display: inline-block; background: #25D366; color: #fff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px;">
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
            <div style="padding: 20px; text-align: center; background: #080808; border-top: 1px solid #1a1a1a;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Constructora Jireh SPA | Santa Magdalena 75, Of 304, Providencia
              </p>
              <p style="color: #555; font-size: 11px; margin: 8px 0 0;">
                Este es un mensaje automático, por favor no responder a este correo.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (notificationEmail.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await notificationEmail.json();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Error al enviar' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
