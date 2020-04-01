import './Footer.scss';

class Footer {
    constructor() {
        this.footer = document.createElement('footer');
        const year = new Date().getFullYear();

        this.footer.className = 'footer';
        this.footer.innerHTML = `
            <div class="footer__wrapper">
                <strong class="footer__text">
                    All Rights Reserved, ${year}
                </strong>
            </div>
        `;

        return this.footer;
    }
}

export default Footer;
