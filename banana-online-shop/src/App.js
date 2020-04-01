import Header from './containers/Header/Header';
import Main from './containers/Main/Main';
import Footer from './containers/Footer/Footer';
import './App.scss';

class App {
    constructor() {
        this.app = document.createElement('div');

        this.app.className = 'app';

        this.app.append(
            new Header(),
            new Main(),
            new Footer()
        );

        return this.app;
    }
}

export default App;
