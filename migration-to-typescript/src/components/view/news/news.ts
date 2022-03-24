import { ISourseArticle } from '../../../types/types';
import './news.css';

class News {
    public draw(data: ISourseArticle[]): void {
        if (document.querySelector('.source-current')) {
            document.querySelector('.source-current').remove();
            document.querySelector('.all').classList.remove('display');
        }

        const news: ISourseArticle[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp');
        if (data.length === 0) {
            const div: Element = document.createElement('div');
            div.innerHTML = 'Sorry, we cannot load news from this category right now';
            div.classList.add('error');
            fragment.append(div);
        }
        news.forEach((item: ISourseArticle, idx: number) => {
            const newsClone: HTMLElement = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');

            newsClone.querySelector<HTMLElement>('.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title').textContent = item.title;
            newsClone.querySelector('.news__description-source').textContent = item.source.name;
            newsClone.querySelector('.news__description-content').textContent = item.description;
            newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news').innerHTML = '';
        document.querySelector('.news').appendChild(fragment);
    }
}

export default News;
