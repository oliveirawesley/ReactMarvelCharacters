import React from 'react';

import Logo from '../../assets/logo.svg';
import './style.scss';

const Header: React.FC = () => {
  return (
    <section className="header">
      <img src={Logo} alt="" width="190px" height="90px"></img>
    </section>
  );
};

export default Header;
