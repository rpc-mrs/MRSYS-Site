"use client";

import React, { useState } from "react";

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    alias: "", // honeypot field — real users never fill this in
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, text: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        text: "Пожалуйста, заполните обязательные поля (имя, email, сообщение)",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Что-то пошло не так");
      }

      setStatus({
        type: "success",
        text: "Спасибо! Ваше сообщение успешно доставлено на наш почтовый ящик.",
      });

      setFormData({ name: "", email: "", phone: "", message: "", alias: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Произошла ошибка при отправке. Проверьте конфигурацию сервера.";
      setStatus({ type: "error", text: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12 text-center md:text-left">
        <p className="eyebrow">Связь с нами</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
          Контакты
        </h1>
      </div>

      <div className="mb-12 grid items-start gap-12 md:grid-cols-5">
        {/* Форма */}
        <div className="rounded-2xl border border-line bg-white p-8 shadow-sm md:col-span-3">
          <h2 className="mb-6 text-2xl font-bold text-ink">Напишите нам</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot — hidden from real users, bots tend to fill every field */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/70">
                Ваше имя *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-line px-4 py-3 text-sm placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-4 focus:ring-signal/10"
                placeholder="Иван Иванов"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/70">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-4 focus:ring-signal/10"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/70">
                  Телефон
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-4 focus:ring-signal/10"
                  placeholder="+7 (999) 999-99-99"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/70">
                Ваше сообщение или запрос *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border border-line px-4 py-3 text-sm placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-4 focus:ring-signal/10"
                placeholder="Опишите необходимое оборудование или техническую задачу"
              />
            </div>

            {status.type && (
              <div
                className={`rounded-xl p-4 text-sm font-medium ${
                  status.type === "success"
                    ? "border border-green-200 bg-green-50 text-green-800"
                    : "border border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {status.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full cursor-pointer rounded-xl bg-ink py-3.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-all ${
                isSubmitting
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-steel-700 active:scale-[0.99]"
              }`}
            >
              {isSubmitting ? "Отправка..." : "Отправить запрос"}
            </button>
          </form>
        </div>

        {/* Прямые контакты */}
        <div className="space-y-8 py-2 md:col-span-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-ink">Прямые контакты</h2>
            <p className="text-sm leading-relaxed text-muted">
              Свяжитесь с нами напрямую для быстрого ответа по техническим
              вопросам, ценам на оборудование и условиям сотрудничества.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-steel-50 p-3 text-steel-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">
                  Наш адрес
                </h3>
                <p className="text-sm font-medium leading-relaxed text-ink">
                  Краснодар, пос. Краснодарский,
                  <br />
                  ул. Платнировская, д. 7, пом. 1
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-steel-50 p-3 text-steel-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 0 1-7.147-7.147c-.145-.441.02-.928.396-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.75Z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">
                  Телефон
                </h3>
                <a
                  href="tel:+79024032020"
                  className="text-base font-semibold text-signal hover:underline"
                >
                  +7 (902) 403-20-20
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-steel-50 p-3 text-steel-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">
                  Электронная почта
                </h3>
                <a
                  href="mailto:sacred_jktu@bk.ru"
                  className="text-base font-semibold text-signal hover:underline"
                >
                  sacred_jktu@bk.ru
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[450px] w-full overflow-hidden rounded-2xl">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A044ba442820f802b37cb9d6b9e3716ae58b7d62e79fe5052da94f859c1a0672e&amp;source=constructor"
          width="100%"
          height="100%"
          title="Яндекс Карта с адресом организации"
          className="rounded-xl border-0"
        />
      </div>
    </main>
  );
}
