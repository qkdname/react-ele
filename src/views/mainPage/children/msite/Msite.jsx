import React from 'react';
import { Carousel, Icon } from 'antd-mobile';
import './Msite.css';
import history from '../../../../history';
import { Link } from "react-router-dom";
import utils from '../../../../utils/utils';
import Restaurant from '../../../../components/restaurant/Restaurant';
export default class Msite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      address: '',
      restaurants: [],
      offset: 0
    }
  }
  getEntries(address) {
    fetch(`api/restapi/shopping/openapi/entries?latitude=${address.latitude}&longitude=${address.longitude}&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template`).then(res => {
      return res.json();
    }).then(json => {
      json = json[0].entries.concat(json[1].entries);
      console.log(json);
      json.forEach((item, index) => {
        item.image_hash = utils.formatHash(item.image_hash)
      })
      this.setState({ entries: json });
    })
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
  componentWillMount() {
    let address = window.localStorage.address;
    if (address) {
      address = JSON.parse(address);
      this.setState({ address: address.short_address })
      this.getEntries(address);
      utils.getRestaurants(this);
    } else {
      history.push('/address')
    }
  }
  render() {
    let entries = null;
    if (this.state.entries.length) {
      entries = <Carousel className='carousel'>
        <div className='fw-w'>
          {
            this.state.entries.slice(0, 10).map((item, index) => <Link key={index} className='entry' to={{pathname:'/foods',state:{id:item.id,name:item.name}}}>
              <img src={item.image_hash} alt="" />
              {item.name}
            </Link>)
          }
        </div>
        <div className='fw-w'>
          {
            this.state.entries.slice(10).map((item, index) => <Link key={index} className='entry' to={{pathname:'/foods',state:{id:item.id,name:item.name}}}>
              <img src={item.image_hash} alt="" />
              {item.name}
            </Link>)
          }
        </div>
      </Carousel>
    }
    return (
      <div style={{ height: '100%', background: '#fff' }}>
        <Link to='/address' className='bg-main' style={{ display: 'block', paddingLeft: '0.2rem', lineHeight: '0.8rem' }}>{this.state.address}</Link>
        <Link to='/search' className='dsp-b bg-main' style={{ padding: '0 0.2rem 0.2rem' }}>
          <div style={{ background: '#fff', color: '#666', textAlign: 'center', verticalAlign: 'text-top', lineHeight: '0.7rem' }}>
            <Icon className='ver-al-top' size='xs' type='search' /> 搜索饿了么商家，商品名称
          </div>
        </Link>
        {entries}
        <div style={{ lineHeight: '0.8rem', textAlign: 'center' }}>推荐商家</div>
        <ul>
          {
            this.state.restaurants.map((item, index) => <Restaurant key={index} index={index} item={item} toggle={this.toggle}/>)
          }
        </ul>
      </div>

    );
  }
}