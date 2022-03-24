export interface ICategorySource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface ICategoriesResponse {
    status: string;
    sources: ICategorySource[];
}

interface ISourse {
    id: string;
    name: string;
}

export interface ISourseArticle {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: ISourse;
    title: string;
    url: string;
    urlToImage: string;
}

export interface ISoursesResponse {
    articles: ISourseArticle[];
    status: string;
    totalResults: number;
}

export interface ILoadOptions {
    apiKey: string;
}

export interface IRequestOptions {
    sources: string;
    endpoint?: string;
}

export interface IRequestConfig {
    endpoint?: string;
    options?: IRequestOptions;
}

export interface UrlOptions {
    endpoint: string;
    options: IRequestOptions;
    apiKey: string;
}
