import { ICategorySource } from '../../../types/types';
import { COUNT_SOURSES } from '../../constants';
import './sources.css';

class Sources {
    public draw(data: ICategorySource[], page: number): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp');
        data.slice(0, page * COUNT_SOURSES).forEach((item: ICategorySource) => {
            const sourceClone: Element = sourceItemTemp.content.cloneNode(true) as Element;

            sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        document.querySelector('.sources').innerHTML = '';
        document.querySelector('.sources').append(fragment);
    }

    public drawShowMore(callback: () => void): void {
        const fragment: Element = document.createElement('button');
        const main: Element = document.querySelector('main');
        const div: Element = document.createElement('div');
        fragment.innerHTML = 'more sources';
        fragment.classList.add('more');
        div.append(fragment);
        main.prepend(div);
        fragment.addEventListener('click', callback);
    }

    public drawCategories(data: string[], drawCategories: (category: string) => void): void {
        const ulMain: Element = document.createElement('ul');
        ulMain.classList.add('source-main');
        const aside: Element = document.querySelector('aside');
        const sources: Element = document.querySelector('.sources');
        sources.appendChild(aside);
        aside.appendChild(ulMain);
        data.forEach((item: string) => {
            const liMain: Element = document.createElement('li');
            liMain.id = item;
            liMain.innerHTML = item;
            ulMain.appendChild(liMain);

            liMain.addEventListener('click', () => {
                drawCategories(item);
            });
        });
    }

    public drawCurrentCategories(data: ICategorySource[]): void {
        document.querySelector('.all').classList.remove('rotate-btn');
        if (document.querySelector('.source-current')) {
            document.querySelector('.all').classList.remove('rotate-btn');
            document.querySelector('.source-current').remove();
        }
        const ulCurrent: HTMLElement = document.createElement('ul');
        ulCurrent.classList.add('source-current');
        const div: Element = document.querySelector(`.sources`);
        div.appendChild(ulCurrent);
        data.forEach((item: ICategorySource): void => {
            const liCurrent: Element = document.createElement('li');
            liCurrent.id = item.name;
            liCurrent.classList.add('source__item');
            liCurrent.setAttribute('data-source-id', item.id);
            liCurrent.innerHTML = item.name;
            ulCurrent.appendChild(liCurrent);
        });
        const allSourcesBtn: Element = document.querySelector('.all');
        allSourcesBtn.classList.add('display');
        allSourcesBtn.addEventListener('click', (): void => {
            ulCurrent.classList.toggle('height');
            allSourcesBtn.classList.toggle('rotate-btn');
        });
    }
}

export default Sources;
