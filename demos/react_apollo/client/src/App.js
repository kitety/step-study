import React from 'react';
import logo from './img/logo.jpg'
import { ApolloProvider } from '@apollo/react-hooks';
import Launches from './components/Launches'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import Launch from './components/Launch'
import './App.css';

const client = new ApolloClient({
  uri: '/graphql',
});
function App () {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img src={logo} alt="SpaceX" style={{ width: '300px', display: 'block', margin: 'auto' }} />
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
