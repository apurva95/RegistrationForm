import React from 'react';
import RegistrationForm from './RegistrationForm';
import Header from './Header';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <RegistrationForm />
      </div>
      <Footer />
    </div>
  );
};

export default App;