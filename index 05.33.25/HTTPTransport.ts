enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: METHOD;
    data?: any;
}

class HTTPTransport {
    get(url: string, options: Options):Promise<XMLHttpRequest>{
        return this.request(url, options);
    }

    post(url:string, options:Options):Promise<XMLHttpRequest>{
        return this.request(url, options)
    }

    put(url:string, options:Options):Promise<XMLHttpRequest>{
        return this.request(url, options)
    }

    delete(url:string, options:Options):Promise<XMLHttpRequest>{
        return this.request(url, options)
    }

    request(url: string, options: Options): Promise<XMLHttpRequest> {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            
            xhr.onload = function() {
                resolve(xhr);
            }

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            
            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                let body=JSON.stringify(data)
                xhr.send(body)
            }
        })
    }
} 