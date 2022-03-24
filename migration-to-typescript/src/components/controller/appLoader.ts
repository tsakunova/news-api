import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '9b47d59191b8451ebb7f343cdb254081', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
