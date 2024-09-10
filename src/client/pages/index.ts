import mainPageRaw from './mainPage';
import loginPageRaw from './login';
import signInPageRaw from './signIn';

interface Pages {
    MainPage: string;
    LoginPage: string;
    SigninPage: string;
  }
  
  const Pages: Pages = {
      MainPage: mainPageRaw,
      LoginPage: loginPageRaw,
      SigninPage: signInPageRaw,
  };
  
  export default Pages;