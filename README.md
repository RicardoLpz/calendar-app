# 📅 Sistema de Gestión de Citas (Rails + React)

Aplicación web full-stack diseñada para la administración y agendamiento de citas en tiempo real. Cuenta con una arquitectura desacoplada basada en una API REST construida con Ruby on Rails y una interfaz interactiva desarrollada con React (Vite).

---

## 🚀 Características Principales

* **Gestión de Tipos de Cita (CRUD):** Creación, edición y eliminación de categorías de citas.
* **Agendamiento de Citas:** Formulario intuitivo con selección de tipos de cita, fechas/horas de inicio y fin, notas y ubicación.
* **Validaciones Robustas:**
  * **Backend:** Validaciones en modelos de Rails para evitar registros incompletos o inválidos.
  * **Frontend:** Validación de coherencia temporal (la fecha fin no puede ser anterior a la de inicio) y restricción visual en el selector de fechas.
* **Buscador en Tiempo Real:** Filtro dinámico en el cliente que busca dentro de descripciones y notas bajo demanda.
* **Vista de Calendario Mensual:** Cuadrícula interactiva que calcula y resalta automáticamente los días que tienen citas programadas.
* **Navegación Modular:** SPA (Single Page Application) estructurada mediante `react-router-dom`.

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Ruby on Rails (API Mode), PostgreSQL / MySQL, Docker.
* **Frontend:** React, Vite, React Router DOM, Javascript (ES6+).
* **Infraestructura:** Docker Compose.

---

## 📦 Estructura del Proyecto

```text
.
├── api/                    # Aplicación Backend (Ruby on Rails)
│   ├── app/models/         # Modelos (Appointment, AppointmentType)
│   ├── app/controllers/    # Controladores API (Strong Parameters & JSON responses)
│   └── db/migrate/         # Migraciones de base de datos
│
└── frontend/               # Aplicación Frontend (React + Vite)
    ├── src/components/     # Componentes reutilizables (MonthCalendar, AppointmentSearch)
    ├── src/pages/          # Vistas (Home, AppointmentsPage, AppointmentTypesPage)
    └── src/services/       # Capa de consumo de API (fetch)