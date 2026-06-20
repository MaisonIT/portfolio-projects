export default async function handler(req, res) {
   // Дозволяємо лише POST-запити
   if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
   }

   try {
      // 🌟 Змінні оточення, які ми сховаємо в адмінці Vercel
      const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
      const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

      const { name, email, phone, message } = req.body;

      const textMessage = `
<b>🚀 Нова заявка з сайту!</b>\n
<b>👤 Ім'я:</b> ${name}
<b>📧 Email:</b> ${email}
<b>📞 Телефон:</b> ${phone}\n
<b>📝 Повідомлення:</b>
<i>${message}</i>
      `;

      const API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

      const telegramResponse = await fetch(API_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: textMessage,
            parse_mode: 'HTML'
         })
      });

      if (telegramResponse.ok) {
         return res.status(200).json({ success: true });
      } else {
         const errorData = await telegramResponse.json();
         return res.status(500).json({ message: 'Telegram API Error', details: errorData });
      }

   } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
   }
}