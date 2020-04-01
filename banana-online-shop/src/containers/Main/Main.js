import Toolbar from '../../components/Toolbar/Toolbar';
import Products from '../../components/Products/Products';
import Pagination from '../../components/Pagination/Pagination';
import './Main.scss';

class Main {
    constructor() {
        this.main = document.createElement('main');

        this.main.className = 'main';
        this.main.innerHTML = '<div class="main__wrapper"></div>';

        this.main.firstElementChild.append(
            new Toolbar(),
            new Products(),
            new Pagination()
        );

        return this.main;
    }
}

export default Main;
