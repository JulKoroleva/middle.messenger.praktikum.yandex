export default class App {
    state: {
        currentPage: string;
        // currentUserInfo?: object;
        // chats?: any[];
    };
    appElement: HTMLElement | null;

    constructor() {
        this.state = {
            currentPage: 'mainPage',
            // currentUserInfo: {},
            // chats: [],
        };
        this.appElement = document.getElementById('app');
    }

    render() {
        // TODO
    }
}
