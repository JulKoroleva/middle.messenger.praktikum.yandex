import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { HTTPTransport } from "./HTTPTransport";
import { expect } from "chai";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport("/auth");
  });

  afterEach(() => {
    requests = [];
  });

  describe("GET", () => {
    it(".get() должен отправить GET-запрос", () => {
      instance.get("/user");

      const [request] = requests;

      expect(request.method).to.eq("GET");
    });

    it(".get() должен сформировать строку запроса из данных", () => {
      const data = {
        login: "fakeLogin",
        password: "fakePassword",
      };
      const result =
        "https://ya-praktikum.tech/api/v2/auth/user?login=fakeLogin&password=fakePassword";

      instance.get("/user", { data });

      const [request] = requests;

      expect(request.url).to.eq(result);
    });
  });

  describe("POST", () => {
    it(".post() должен отправить POST-запрос", () => {
      instance.post("/user", {});

      const [request] = requests;

      expect(request.method).to.eq("POST");
    });

    it(".post() должен отправить тело с данными", async () => {
      const data = {
        login: "fakeLogin",
        password: "fakePassword",
      };

      instance.post("/signin", data);

      const [request] = requests;

      expect(request.requestBody).to.eq(JSON.stringify(data));
    });

    it("Заголовок content-type должен быть application/json", async () => {
      const data = {
        login: "fakeLogin",
        password: "fakePassword",
      };

      instance.post("/signin", data);

      const [request] = requests;

      expect(request.requestHeaders["Content-Type"]).to.contain(
        "application/json"
      );
    });

    it("Заголовок content-type для FormData должен быть пустым", async () => {
      const data = new FormData();
      data.append("first", "1");
      data.append("second", "2");

      instance.post("/signin", data);

      const [request] = requests;

      expect(request.requestHeaders).is.empty;
    });
  });

  describe("DELETE", () => {
    it(".delete() должен отправить DELETE-запрос", () => {
      instance.delete("/user", {});

      const [request] = requests;

      expect(request.method).to.eq("DELETE");
    });

    it(".delete() должен отправить тело с данными", async () => {
      const data = {
        login: "fakeLogin",
        password: "fakePassword",
      };

      instance.delete("/signin", data);

      const [request] = requests;

      expect(request.requestBody).to.eq(JSON.stringify(data));
    });

    it("Заголовок content-type должен быть application/json", () => {
      instance.delete("/user", {});

      const [request] = requests;

      expect(request.requestHeaders["Content-Type"]).to.contain(
        "application/json"
      );
    });
  });

  describe("PUT", () => {
    it(".put() должен отправить PUT-запрос", () => {
      instance.put("/user", {});

      const [request] = requests;

      expect(request.method).to.eq("PUT");
    });

    it(".put() должен отправить тело с данными", async () => {
      const data = {
        login: "fakeLogin",
        password: "fakePassword",
      };

      instance.put("/signin", data);

      const [request] = requests;

      expect(request.requestBody).to.eq(JSON.stringify(data));
    });

    it("Заголовок content-type должен быть application/json", () => {
      instance.put("/user", {});

      const [request] = requests;

      expect(request.requestHeaders["Content-Type"]).to.contain(
        "application/json"
      );
    });

    it("Заголовок content-type для FormData должен быть пустым", async () => {
      const data = new FormData();
      data.append("first", "1");
      data.append("second", "2");

      instance.put("/signin", data);

      const [request] = requests;

      expect(request.requestHeaders).is.empty;
    });
  });
});
