import { SITE_URL } from "@/lib/site";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  alias?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "'");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const { name, email, phone, message, alias } = body;

  if (alias) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Заполните обязательные поля: имя, email, сообщение" },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    console.error("SMTP env vars are not configured");
    return NextResponse.json(
      { error: "Сервер не настроен для отправки писем. Обратитесь к администратору сайта." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const recipient = CONTACT_TO;

  try {
    const siteName = SITE_URL.replace(/^https?:\/\/(www\.)?/, "");

    await transporter.sendMail({
      from: `"Заявка с сайта ${siteName}" <${SMTP_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `Новая заявка с сайта ${siteName} — ${name}`,
      text: [
        `Имя: ${name}`,
        `Email: ${email}`,
        `Телефон: ${phone || "не указан"}`,
        "",
        "Сообщение:",
        message,
      ].join("\n"),
      html: `
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone || "не указан")}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send email:", err);
    return NextResponse.json(
      { error: "Не удалось отправить письмо. Попробуйте позже." },
      { status: 500 }
    );
  }
}
