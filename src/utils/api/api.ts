function queryStringify(data: Record<string, any>): string {
  const queryStrings: string[] = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key];

      if (Array.isArray(value)) {
        value = value.join(",");
      } else if (typeof value === "object" && value !== null) {
        value = "[object Object]";
      }
      queryStrings.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      );
    }
  }

  return "?" + queryStrings.join("&");
}

class HTTPTransport {
  get = (
    url: string,
    options: RequestOptions = {}
  ): Promise<XMLHttpRequest> => {
    let resUrl = url;
    if (options.data) {
      resUrl += queryStringify(options.data);
    }
    return this.request(
      resUrl,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  put = (
    url: string,
    options: RequestOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  post = (
    url: string,
    options: RequestOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  delete = (
    url: string,
    options: RequestOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options: RequestOptions & { method: string },
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, url);

      if (options.headers) {
        for (const header in options.headers) {
          if (Object.prototype.hasOwnProperty.call(options.headers, header)) {
            xhr.setRequestHeader(header, options.headers[header]);
          }
        }
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.ontimeout = function () {
        reject(new Error("Request timeout"));
      };

      xhr.onerror = function () {
        reject(new Error("Network error"));
      };

      if (options.method === METHODS.GET || !options.data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(options.data));
      }
    });
  };
}
