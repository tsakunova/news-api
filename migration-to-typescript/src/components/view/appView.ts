import { ICategoriesResponse, ICategorySource, ISourseArticle, ISoursesResponse } from '../../types/types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;
    private data: ICategorySource[];
    private page: number;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.page = 1;
    }

    public drawNews(data: ISoursesResponse): void {
        const values: ISourseArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    private generateCategories(data: ICategoriesResponse): string[] {
        const arr: string[] = data.sources.map((item): string => item.category);
        const categories: string[] = Array.from(new Set(arr));
        return categories;
    }

    private generateCurrentCategories(currentCat: string): ICategorySource[] {
        return this.data.filter((item): boolean => item.category === currentCat);
    }

    private drawCurrentSource = (category: string): void => {
        this.sources.drawCurrentCategories(this.generateCurrentCategories(category));
    };

    public drawSources(data: ICategoriesResponse): void {
        this.data = data?.sources ? data?.sources : [];
        this.sources.drawCategories(this.generateCategories(data), this.drawCurrentSource);
    }
}

export default AppView;
