import { NavBar, Icon } from 'antd-mobile';
import React from 'react';
import history from '../../history';
import { SearchBar,List } from "antd-mobile";
const Item = List.Item;
const Brief = Item.Brief;
export default class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      addresses:[]
    }
    this.getAddresses = this.getAddresses.bind(this)
  }
  keywordChange = (value) => {
    this.setState({ keyword: value })
  }
  getAddresses = () => {
    let k = this.state.keyword;
    
    if(k){

      fetch(`api/restapi/bgs/poi/search_poi_nearby_alipay?keyword=${k}&offset=0&limit=20`).then(response => {
        return response.json();
  
      }).then( json => {
        console.log(json);
        this.setState({addresses:json})
      })
    } else {

    }
  }
  setAddress = (index) => {
    let address = this.state.addresses[index];
    window.localStorage.setItem('address',JSON.stringify(address));
    history.push('/')
  }
  render() {
    return (
      <div id="address-box">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.go(-1)}
        >搜索地址</NavBar>
        <SearchBar onChange={this.keywordChange} onSubmit={ () => this.getAddresses()}/>
        {
          this.state.addresses.length?
          <List>
          {
            this.state.addresses.map( (item,index) => <Item key={index} onClick={() => this.setAddress(index)}>
              {item.short_address}
              <Brief>{item.address}</Brief>
            </Item>)
          }
        </List>
        :''
        }
      </div>
    )
  }
}
