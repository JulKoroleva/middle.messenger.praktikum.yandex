import Handlebars from 'handlebars';
import Pages from './pages';

import Button from './components/button/button.tmpl';
import Input from './components/input/input.tmpl';

Handlebars.registerPartial('Button', Button)
Handlebars.registerPartial('Input', Input)

interface AppState {
    currentPage: string;
  }
  
  export default class App {
    private state: AppState;
    private appElement: HTMLElement | null;
  
    constructor() {
      this.state = {
        currentPage: 'loginPage',
      };
      this.appElement = document.getElementById('app');
    }
  
    render(): void {
      if (!this.appElement) return;
  
      let template: Handlebars.TemplateDelegate<any>;
      
      switch (this.state.currentPage) {
        case 'mainPage':
          template = Handlebars.compile(Pages.MainPage);
          break;
        case 'currentUserPage':
          template = Handlebars.compile(Pages.MainPage);
          break;
        case 'loginPage':
          template = Handlebars.compile(Pages.LoginPage);
          break;
        case 'registerPage':
          template = Handlebars.compile(Pages.SigninPage);
          break;
        default:
          template = Handlebars.compile(Pages.MainPage);
      }
  
      this.appElement.innerHTML = template({});
      this.addEventListeners();
    }
  
    addEventListeners(): void {
      const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[data-page]');
      links.forEach((link) => {
        link.addEventListener('click', (event: MouseEvent) => {
          event.preventDefault();
          const target = event.currentTarget as HTMLAnchorElement;
          const page = target.getAttribute('data-page');
          if (page) {
            this.setState({ currentPage: page });
          }
        });
      });
    }
  
    setState(newState: Partial<AppState>): void {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  }