import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Проверка обязательных полей
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля" },
        { status: 400 }
      );
    }

    // Определяем, куда отправить письмо в зависимости от режима (разработка/деплой)
    const receiverEmail = process.env.SMTP_USER;

    // Проверяем, настроены ли переменные окружения
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("Критическая ошибка: Не настроены переменные SMTP в конфигурации!");
      return NextResponse.json(
        { error: "Ошибка конфигурации сервера отправки" },
        { status: 500 }
      );
    }

    // Создаем транспорт на основе данных из .env.local (или настроек хостинга)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.yandex.ru",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER, // Отправитель всегда должен совпадать с логином авторизации
      to: receiverEmail,           // Получатель (динамический)
      replyTo: email,              // Почта клиента, чтобы сразу ответить ему нажатием одной кнопки
      subject: `Новая заявка с сайта от ${name}`,
      html: `
        <h2>Новое обращение через форму контактов</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email для связи:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || "Не указан"}</p>
        <p><strong>Сообщение:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
      `,
    };

    // Отправка письма
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Ошибка SMTP:", error);
    return NextResponse.json(
      { error: "Не удалось отправить сообщение." },
      { status: 500 }
    );
  }
}
