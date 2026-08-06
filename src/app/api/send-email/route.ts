import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, alias } = await request.json();

    if (alias) {
    console.warn("Попытка спама заблокирована через Honeypot");
    return NextResponse.json({ success: true }, { status: 200 });
  }

    // 1. Проверка обязательных полей
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля" },
        { status: 400 }
      );
    }

    // 2. Валидация Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Некорректный формат email" },
        { status: 400 }
      );
    }

    // 3. Валидация телефона (если он передан)
    if (phone) {
      // Разрешает форматы: +79991112233, 89991112233, 79991112233
      const phoneRegex = /^(?:\+7|7|8)?\d{10}$/;
      // Очищаем строку от пробелов, дефисов и скобок перед проверкой
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
      
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          { error: "Некорректный формат номера телефона" },
          { status: 400 }
        );
      }
    }

    // 4. Проверяем, настроены ли переменные окружения
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("Критическая ошибка: Не настроены переменные SMTP в конфигурации!");
      return NextResponse.json(
        { error: "Ошибка конфигурации сервера отправки" },
        { status: 500 }
      );
    }

    // Безопасное присвоение после успешной проверки env-переменных
    const receiverEmail = process.env.SMTP_USER;

    // 5. Создаем транспорт nodemailer
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
      from: process.env.SMTP_USER,
      to: receiverEmail,
      replyTo: email,
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
