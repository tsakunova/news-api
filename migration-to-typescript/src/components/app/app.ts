import { ICategoriesResponse, ISoursesResponse } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document
            .querySelector('.sources')
            .addEventListener('click', (e: Event): void =>
                this.controller.getNews<ISoursesResponse>(e, (data: ISoursesResponse): void => this.view.drawNews(data))
            );
        this.controller.getSources<ICategoriesResponse>((data: ICategoriesResponse): void =>
            this.view.drawSources(data)
        );
    }
}

export default App;
