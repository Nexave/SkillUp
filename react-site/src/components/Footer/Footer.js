import React from 'react';

import './Footer.scss';

const Footer = () => (
    <div className="footer">
        <h2 className="footer__title">
            All Rights Reserved, {new Date().getFullYear()}
        </h2>
    </div>
);

export default Footer;
