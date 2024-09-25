import { LoginPage } from '../../pages/login/index';
// import { ChatPage } from '../../pages/chat';
import { SignupPage } from '../../pages/signUp/index';
// import { ProfilePage } from '../../pages/profile';
// import { ErrorPage } from '../../pages/error-page/';

const ROUTES = {
//   'chat': ChatPage,
//   'profile': ProfilePage,
//   'errorPage': ErrorPage,
  'login': LoginPage,
  'signup': SignupPage,
}

export default function renderTemplate (name: keyof typeof ROUTES) {
  console.log('its render')
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}