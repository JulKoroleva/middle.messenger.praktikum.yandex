const errorPage = `
<main class="error-page">
  <h1 class="page__title">{{errorCode}}</h1>
  <p class="page__description">{{description}}</p>
  <a href="/">
    {{> Button buttonText="Назад к чатам" buttonClass="button_text"}}
  </a>
</main>`;

export default errorPage;
