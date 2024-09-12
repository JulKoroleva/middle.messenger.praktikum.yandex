import union from "../../../../static/assets/union.svg";
import arrowBtn from "../../../../static/assets/arrowBtn.svg";

const profilePage = `
  <main class="profile">
    {{> Button buttonLink="/chats" buttonImage="${arrowBtn}" buttonClass="profile__btn-back" buttonImageClass="profile__btn-back-icon"  imageAlt="back"}}
    <div class="profile__form-container">
      <form class="profile__form">
        <img class="profile__avatar" src="${union}" alt="Аватар">
        <h3 class="profile__name">{{userData.display_name}}</h3>
        <div class="profile__inputs-container">
          {{> Input inputValue=userData.email inputLabel="Почта" inputName="email" inputType="email" inputMainClass="line-input" inputLabelClass="line-input__placeholder" inputClass="line-input__data" labelClass="line-input__placeholder"}}
          {{> Input inputValue=userData.login inputLabel="Логин" inputName="login" inputType="text" inputMainClass="line-input" inputLabelClass="line-input__placeholder" inputClass="line-input__data" labelClass="line-input__placeholder"}}
          {{> Input inputValue=userData.first_name inputLabel="Имя" inputName="first_name" inputType="text" inputMainClass="line-input" inputLabelClass="line-input__placeholder" inputClass="line-input__data" labelClass="line-input__placeholder"}}
          {{> Input inputValue=userData.second_name inputLabel="Фамилия" inputName="second_name" inputType="text" inputMainClass="line-input" inputLabelClass="line-input__placeholder" inputClass="line-input__data" labelClass="line-input__placeholder"}}
          {{> Input inputValue=userData.display_name inputLabel="Имя в чате" inputName="display_name" inputType="text" inputMainClass="line-input" inputLabelClass="line-input__placeholder" inputClass="line-input__data" labelClass="line-input__placeholder"}}
          {{> Input inputValue=userData.phone inputLabel="Телефон" inputName="phone" inputType="tel" inputMainClass="line-input" inputLabelClass="line-input__placeholder" inputClass="line-input__data" labelClass="line-input__placeholder"}}
        </div>
        <div class="profile__btn-container">
            {{> Button buttonText="Изменить данные" buttonClass="button_text button_border"}}
            {{> Button buttonText="Изменить пароль" buttonClass="button_text button_border"}}
            {{> Button buttonText="Выйти" buttonClass="button_danger button_border" buttonLink="/login"}}
        </div>
      </form>
    </div>
  </main>
`;

export default profilePage;
