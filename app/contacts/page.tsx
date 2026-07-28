"use client";

import React, { useState } from "react";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    alias: "", 
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, text: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", text: "Пожалуйста, заполните обязательные поля (Имя, Email, Сообщение)" });
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (err: any) {
      setStatus({ 
        type: "error", 
        text: err.message || "Произошла ошибка при отправке. Проверьте конфигурацию сервера." 
      });
    }
  };

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Контакты</h1>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="bg-white border rounded-xl p-6 shadow-xs">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Напишите нам</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 2. Поле-ловушка. Полностью скрыто от людей, но доступно для ботов */}
            <div className="hidden" aria-hidden="true">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                Оставьте это поле пустым
              </label>
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
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Ваше имя *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Иван Иванов"
              />
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Ваше сообщение или запрос *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Опишите необходимое оборудование или техническую задачу"
              ></textarea>
            </div>

            {status.type && (
              <div className={`p-3 rounded-lg text-xs font-medium ${
                status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {status.text}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition"
            >
              Отправить запрос
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">НПФ «Магнитно-резонансные системы»</h2>
            
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Адрес:</h3>
                <p className="text-sm font-medium text-slate-800">
                  Краснодар, пос. Краснодарский, ул. Платнировская, д. 7, пом. 1
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Телефон:</h3>
                <a href="tel:+79024032020" className="text-sm font-medium text-blue-600 hover:underline">
                  +7 (902) 403-20-20
                </a>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email:</h3>
                <a href="mailto:dir@mrsys.ru" className="text-sm font-medium text-blue-600 hover:underline">
                  dir@mrsys.ru
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
