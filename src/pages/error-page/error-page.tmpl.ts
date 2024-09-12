const errorPage = `
<main class="error-page">
  <h1 class="page__title">{{errorCode}}</h1>
  <p class="page__description">{{description}}</p>
    {{> Button buttonText="Назад к чатам" buttonClass="button_text" buttonLink="/chats"}}
</main>`;

export default errorPage;
