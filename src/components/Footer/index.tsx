import React from 'react';

import './style.scss';

const Footer: React.FC = () => {
  return (
    <section className="footer">
      <div className="top"></div>
      <div className="bottom">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        <p>
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
        </p>
      </div>
    </section>
  );
};

export default Footer;
