import Block from "./Block.ts";
import { Routes } from "../utils/Routes.ts";
import { render } from "../utils/dom/render.ts";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly blockClass: typeof Block,
    private readonly query: string
  ) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block as Block);
      return;
    }
  }
}

export class Router {
  private static __instance?: Router;
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public reset() {
    const instance = Router.__instance;
    if (instance) {
      instance.routes = [];
      instance.currentRoute = null;
      instance.history.replaceState({}, "", "/");
    }
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      const notFoundRoute = this.getRoute(Routes.Error);
      notFoundRoute?.render();
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }
  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
export default new Router("#app");
