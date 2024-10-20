import { BaseApi } from "./base-api";

class ResourcesApi extends BaseApi {
  constructor() {
    super("/resources");
  }
  getAvatar(data: string): Promise<string> {
    return this.http.get(`${data}`);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  request = undefined;
}

export default new ResourcesApi();
