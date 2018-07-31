import React from "react";
import './Search.css';
import { NavBar,SearchBar,Icon } from "antd-mobile";
import history from '../../history';
import Restaurant from '../../components/restaurant/Restaurant';
import utis from '../../utils/utils';
export default class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hots:[],
      keyword:'',
      foods:[]
    }
  }
  keywordChange = (value) => {
    this.setState({keyword:value})
  }
  getHots(){
    let a = JSON.parse(window.localStorage.address);
    fetch(`api/restapi/shopping/v3/hot_search_words?latitude=${a.latitude}&longitude=${a.longitude}`).then(res => res.json()).then(json => {
      this.setState({hots:json})
    })
  }
  getFoods(keyword){
    let k = keyword || this.state.keyword;
    let a = JSON.parse(window.localStorage.address);
    fetch(`api/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${k}&latitude=${a.latitude}&longitude=${a.longitude}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`).then(res => res.json()).then(json => {
      let data = null;
      for( let k in json['inside']){
        data = json['inside'][k]['restaurant_with_foods'];
      }
      data.forEach(item => {
        item.restaurant.image_path = utis.formatHash(item.restaurant.image_path);
        item.show = false;
      })
      this.setState({foods:data})
    })
  }
  toggle = i => {

    this.setState(prev => {
      let items = prev.foods;
      items[i].show = !items[i].show;
      return {
        foods: items
      }
    })
  }
  componentDidMount(){
    this.getHots()
  }
  render(){
    return (
      <div style={{height:'100%',background:'#fff'}}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.go(-1)}
        >搜索</NavBar>
        <SearchBar onChange={this.keywordChange} onSubmit={(e) => this.getFoods() }/>
        <div style={{padding:'0.2rem'}}>
          {
            this.state.foods.length?
            '':
            <div className="hots">
              <h3 style={{fontWeight:'bold'}}>热门搜索</h3>
              <div className="fw-w">
                {
                  this.state.hots.map((item,index) => <span key={index} onClick={() => this.getFoods(item.word)}>{item.word}</span>)
                }
              </div>
            </div>
          }
          {
            this.state.foods.length?
            <div>
              {
                this.state.foods.map((item,index) => <Restaurant key={index} item={item} index={index}toggle={this.toggle}></Restaurant>)
              }
            </div>:''
          }
        </div>
        
      </div>
    )
  }
}