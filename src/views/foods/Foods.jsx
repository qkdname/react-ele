import React from 'react';
import { NavBar,Icon } from "antd-mobile";
import './Foods.css';
import utils from '../../utils/utils';
import history from '../../history';
import Restaurant from '../../components/restaurant/Restaurant';
export default class Foods extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categories:[],
      category:'',
      currentIndex:0,
      restaurants:[],
      offset:0
    }
  }
  getCategories(id){
    let a = JSON.parse(window.localStorage.address);
    
    fetch(`api/restapi/shopping/v2/foods_page/sift_factors?entry_id=${id}&longitude=${a.longitude}&latitude=${a.latitude}&terminal=h5`).then(res => res.json()).then(json => {
      console.log(json);
      this.setState({categories:json});
      utils.getRestaurants(this,json[0]['restaurant_category_ids'])
    })
  }
  setCategory = i => {
    let s = this.state.categories;
    this.setState({currentIndex:i});
    utils.getRestaurants(this,s[i]['restaurant_category_ids'])
  }
  toggle = i => {

    this.setState(prev => {
      let items = prev.restaurants;
      items[i].show = !items[i].show;
      return {
        restaurants: items
      }
    })
  } 
  componentDidMount(){
    let id = this.props.location.state.id;
    this.getCategories(id);
    
  }
  render(){
    return (
      <div style={{background:'#fff'}}>
        <NavBar mode='dark'
        icon={<Icon type="left" />}
        onLeftClick={() => history.go(-1)}
        >{this.props.location.state.name}</NavBar>
        <ul className="categories">
          {
            this.state.categories.map((item,index) => <li key={index} className={index === this.state.currentIndex?'active':''} onClick={() => this.setCategory(index)}>
              {item.name}
            </li>)
          }
        </ul>
        <ul>
          {
            this.state.restaurants.map((item, index) => <Restaurant key={index} index={index} item={item} toggle={this.toggle}/>)
          }
        </ul>
      </div>
    )
  }
}