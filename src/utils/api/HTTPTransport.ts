interface Options {
    headers?: {
      [key: string]: string;
    },
    data?: any,
    method: 'GET' | 'PUT' | 'POST' | 'DELETE',
    timeout?: number,
  }
  
  const METHODS: Record<string, 'GET' | 'PUT' | 'POST' | 'DELETE'> = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
  };
  
  type StringKeyObject = {
    [key: string]: string | StringKeyObject;
  };
  function queryStringify(obj: StringKeyObject) {
    const queryString = [];
  
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        let value = obj[key];
  
              if (Array.isArray(value)) {
                  value = value.join(",");
              } else if (typeof value === "object" && value !== null) {
          // Если значение является объектом, преобразуем его в строку "[object Object]"
          value = '[object Object]';
        }
  
        // Кодируем ключ и значение и добавляем их к массиву параметров
        queryString.push(`${key}=${value}`);
      }
    }
  
    // Объединяем массив параметров в строку с разделителем "&"
    return queryString.join("&");
  }
  
  class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }
  
    get<Response>(url: string, options?: Options): Promise<Response> {
          let query = '';
          if (options && options.data) {
              query += `?${queryStringify(options.data)}`;
          }
      return this.request<Response>(this.endpoint + `${url}${query}`, { ...options, method: METHODS.GET });
    }
  
    put<Response>(path: string = '/', data: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, { data, method: METHODS.PUT });
    }
  
    post<Response>(path: string = '/', data: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, { data, method: METHODS.POST });
    }
  
    delete<Response>(path: string = '/', data: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, { data, method: METHODS.DELETE });
    }
  
    request<Response>(url: string, options: Options, timeout = 5000): Promise<Response> {
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
  
        xhr.onload = function() {
          console.log(`Response: ${xhr.response}`);
          resolve(xhr.response);
        };
        
        xhr.onerror = function() {
          console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
          reject(new Error(`Request failed with status ${xhr.status}`));
        };
  
        xhr.timeout = timeout;
        xhr.withCredentials = true;
        xhr.responseType = 'json';
  
        xhr.ontimeout = function () {
          reject(new Error('Request timed out'));
        };
  
        if (options.method === METHODS.GET) {
          xhr.send();
        } else {
          if (options.data instanceof FormData) {
            // Если данные - FormData, отправляем их без установки Content-Type
            xhr.send(options.data);
          } else {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(options.data));
          }
        }
      });
    }
  }
  
  export { HTTPTransport };
  