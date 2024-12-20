
# Web-мессенджер

SPA проект мессенджера, реализованный с использованием шаблонизатора Handlebars. Разработка осуществляется на TypeScript Архитектура построена по модели MVC с применением компонентного подхода для пользовательских интерфейсов. В проекте реализовано подключение WebSocket, создан Store и добавлен Router. Также внедрено HTTP API для работы с чатами, авторизацией и пользователями. Включены юнит-тесты

## Установка проекта:

Для сборки и запуска проекта выполните следующие команды:

- `npm install` — установка необходимых зависимостей,
- `npm run start` — сборка и запуск проекта.

## Страницы проекта:

- `src/pages/login/login.tmpl.ts` — страница входа,
- `src/pages/signup/signup.tmpl.ts` — страница регистрации,
- `src/pages/main-page/main-page.tmpl.ts` — основное окно/чат,
- `src/pages/profile-page/profile-page.tmpl.ts` — страница настроек профиля,
- `src/pages/error-page/error-page.tmpl.ts` — страница с сообщением об ошибке.

## Дополнительные ссылки:

В проекте использован макет из [Figma](https://www.figma.com/design/tCvsODs4cNW3eaZC2yvwjL/Web-messenger?m=auto&t=imLjJtGYzIJs0KJk-6).

Проект развернут на платформе [Netlify](https://julia-koroleva-middle-44.netlify.app/)
