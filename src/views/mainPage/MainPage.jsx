import React from 'react';
import Msite from './children/msite/Msite';
import Discover from './children/discover/Discover';
import Order from './children/order/Order';
import User from './children/user/User';
import {Route,Link,Switch,NavLink} from 'react-router-dom';
import './MainPage.css';

export default class MainPage extends React.Component {
  render(){
    return (
      <div style={{paddingBottom:'1rem'}}>
        <Switch>
          <Route path='/discover' component={Discover}/>
          <Route path='/order' component={Order}/>
          <Route path='/user' component={User}/>
          <Route  component={Msite}/>
        </Switch>
        <footer className='df-sp'>
            <NavLink exact to='/'>
            首页
            </NavLink>
            <NavLink to='/discover'>发现</NavLink>
            <NavLink to='/order'>订单</NavLink>
            <NavLink to='/user'>我的</NavLink>
        </footer>
      </div>
    )
  }
}