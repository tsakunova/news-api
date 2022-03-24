import { Endpoints } from '../../types/enums';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources<T>(callback: (data: T) => void): void {
        super.getResp<T>(
            {
                endpoint: Endpoints.sources,
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: (data: T) => void): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<T>(
                        {
                            endpoint: Endpoints.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
