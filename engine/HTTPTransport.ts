enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  method: string;
  data?: any;
};

const commonPath = "https://ya-praktikum.tech/api/v2/";

export class HTTPTransport {
  get(url: string, options: Options): Promise<string | any> {
    return this.request(url, options);
  }

  post(url: string, options: Options): Promise<string | any> {
    return this.request(url, options);
  }

  put(url: string, options: Options): Promise<string | any> {
    return this.request(url, options);
  }

  delete(url: string, options: Options): Promise<string | any> {
    return this.request(url, options);
  }

  request(url: string, options: Options): Promise<string | any> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open(method, commonPath + url);

      if (method === Method.GET || !data) {
        xhr.send();
      } else if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        let body = JSON.stringify(data);
        xhr.send(body);
      } else {
        xhr.send(data);
      }

      xhr.onload = function () {
        if (xhr.status == 200) {
          if (xhr.responseText[0] == "{" || xhr.responseText[0] == "[") {
            let gObject = JSON.parse(xhr.responseText);
            resolve(gObject);
          } else {
            resolve(xhr.responseText);
          }
        } else {
          console.log(`errror: ${xhr.status}: ${xhr.statusText}`);
          reject("ошибка соединения с сервером");
        }
      };
    });
  }
}
