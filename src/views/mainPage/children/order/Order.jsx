import React from 'react';
import { NavBar } from "antd-mobile";
export default class Order extends React.Component {
  componentDidMount(){
    console.log('order');
    
  }
  render(){
    return (
      <div>
        <NavBar mode='dark'>订单</NavBar>
        订单
      </div>
    )
  }
}