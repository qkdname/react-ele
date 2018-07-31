import React, { Component } from 'react';
import { Router,Route,Switch,Redirect } from "react-router-dom";
import history from './history';
import './App.css';
import MainPage from './views/mainPage/MainPage';
import Foods from './views/foods/Foods';
import Search from './views/search/Search';
import Address from './views/address/Address';



class App extends Component {
  componentDidMount(){
    
  }
  render() {
     
    return (
      
      <Router history={history} >
        <div className='App'>
            <Switch>
              <Route path='/foods' component={Foods} />
              <Route path='/search' component={Search} />
              <Route path='/address' component={Address} />
              <Route  component={MainPage}/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App
