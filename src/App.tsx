import React from 'react';

import Routes from './routes/routes';
import { BrowserRouter } from 'react-router-dom';

import './styles/main.scss';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
