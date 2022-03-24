import { ILoadOptions, IRequestConfig, IRequestOptions, UrlOptions } from '../../types/types';

class Loader {
    private baseLink: string;
    private options: ILoadOptions;
    constructor(baseLink: string, options: ILoadOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} as IRequestOptions }: IRequestConfig,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: IRequestConfig, endpoint: string): string {
        const urlOptions: Record<string, string | Partial<UrlOptions>> = {
            ...this.options,
            ...options,
        };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: (data: T) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), {
            method,
        })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
