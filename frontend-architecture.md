# Архитектура проекта Fullstack JavaScript Project 12

## Общая структура проекта

Проект представляет собой fullstack JavaScript приложение с клиент-серверной архитектурой. Основная структура проекта включает:

```
.
├── Makefile
├── package.json (корневой)
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── index.jsx (точка входа)
│       ├── init.js (инициализация приложения)
│       ├── App.jsx (основной компонент приложения)
│       ├── components/
│       │   ├── ChannelsList.jsx
│       │   ├── ChatWindow.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── modals/
│       │       ├── AddChannelModal.jsx
│       │       ├── RemoveChannelModal.jsx
│       │       └── RenameChannelModal.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   └── NotFound.jsx
│       ├── services/
│       │   ├── api.js
│       │   ├── createI18n.js
│       │   └── createSocket.js
│       └── store/
│           ├── index.js
│           ├── authSlice.js
│           ├── channelsSlice.js
│           ├── messagesSlice.js
│           └── uiSlice.js
└── node_modules/ (игнорируются)
```

## Фронтенд архитектура

### Точка входа и основное приложение

- `frontend/src/index.jsx` - точка входа приложения, подключает React и основной компонент App
- `frontend/src/init.js` - инициализация приложения, создание store, i18n и socket
- `frontend/src/App.jsx` - основной компонент приложения, содержит маршрутизацию

### Маршрутизация

Приложение использует react-router-dom для навигации между страницами:

- `/` - главная страница (защищенный маршрут)
- `/login` - страница аутентификации
- `/signup` - страница регистрации
- `*` - страница 404 (не найдено)

### Компоненты

- `components/ProtectedRoute.jsx` - компонент для защиты маршрутов, требующих аутентификации
- `components/ChannelsList.jsx` - компонент для отображения списка каналов
- `components/ChatWindow.jsx` - компонент для отображения окна чата
- `components/modals/AddChannelModal.jsx` - модальное окно для добавления канала
- `components/modals/RemoveChannelModal.jsx` - модальное окно для удаления канала
- `components/modals/RenameChannelModal.jsx` - модальное окно для переименования канала

### Страницы

- `pages/Home.jsx` - главная страница приложения
- `pages/Login.jsx` - страница входа в систему
- `pages/Signup.jsx` - страница регистрации
- `pages/NotFound.jsx` - страница для несуществующих маршрутов

### Состояние приложения (Redux)

Приложение использует Redux Toolkit для управления состоянием:

- `store/index.js` - конфигурация хранилища Redux
- `store/authSlice.js` - состояние аутентификации
- `store/channelsSlice.js` - состояние каналов чата
- `store/messagesSlice.js` - состояние сообщений
- `store/uiSlice.js` - состояние пользовательского интерфейса

### Сервисы

- `services/api.js` - конфигурация API взаимодействия с использованием RTK Query
- `services/createI18n.js` - конфигурация интернационализации с использованием i18next
- `services/createSocket.js` - конфигурация WebSocket соединения с использованием Socket.IO

## Технологии

### Основные библиотеки и фреймворки

- React 19 - основной фреймворк для построения пользовательского интерфейса
- Redux Toolkit - управление состоянием приложения
- React Router v7 - маршрутизация в приложении
- Axios - HTTP клиент для API запросов
- Socket.IO Client - для работы с WebSocket соединениями
- Bootstrap 5 - CSS фреймворк для стилизации
- Formik - управление формами
- Yup - валидация форм
- i18next - интернационализация

### Инструменты разработки

- Vite - инструмент сборки и разработки
- ESLint - линтинг JavaScript кода

## Архитектурные особенности

1. **Многослойная архитектура**: разделение на компоненты, страницы, сервисы и хранилище
2. **Защита маршрутов**: реализована через компонент ProtectedRoute
3. **Централизованное состояние**: все состояние приложения управляется через Redux
4. **Модульная структура**: код организован по функциональным модулям
5. **Реактивность**: использование современных возможностей React и Redux
6. **RTK Query**: для работы с API и автоматической генерацией хуков
7. **WebSocket**: для получения обновлений в реальном времени
8. **Middleware**: для обработки WebSocket событий в Redux
