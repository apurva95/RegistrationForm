import React from 'react';
import RegistrationForm from './RegistrationForm';
import Header from './Header';
import Footer from './Footer';
// import { useFetch } from "react-async"
// const APIEndPoint = 'https://wv3c849t9g.execute-api.eu-west-2.amazonaws.com/v1/hello'
const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
            {/* {APIEndPoint.startsWith('http') &&
            <APIResult />} */}
      <div className="content">
        <RegistrationForm />
      </div>
      <Footer />
    </div>
  );
};
// const APIResult = () => {
//   const { data, error } = useFetch(APIEndPoint, {
//     headers: { accept: "application/json" },
//   })
//   if (error) return <p>{error.message}</p>
//   return null
// }

export default App;