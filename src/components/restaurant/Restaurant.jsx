import React from 'react';
import utils, { getRestaurants } from "../../utils/utils";
import { Link } from 'react-router-dom';
import { Icon } from "antd-mobile";
import './Restaurant.css';
export default class Restaurant extends React.Component {
  render() {
    return (
      <li style={{ position: 'relative' }}>
        {
          this.props.item.restaurant.activities.length?
          <div className='toggle'
            onClick={() => this.props.toggle(this.props.index)}>
            {this.props.item.restaurant.activities.length}个活动
                {
              this.props.item.restaurant.activities.length > 2 ? <Icon size='xxs' type={this.props.item.show ? 'up' : 'down'} /> : ''
            }
          </div>
          :''
        }
        <Link to='/address' className='rest-item'>
          <img src={this.props.item.restaurant.image_path} alt="" />
          <div className="info">
            <div className="desc">
              <div>
                <span>品牌</span>
                {this.props.item.restaurant.name}
              </div>
              <div>
                评分<span>{this.props.item.restaurant.rating}</span>
                <span>月销</span>{this.props.item.restaurant.recent_order_num}
              </div>
              <div className='df-sb'>
                <div>
                  ￥{this.props.item.restaurant.float_minimum_order_amount}起送
                        <span>|</span>
                  {this.props.item.restaurant.float_delivery_fee}
                </div>
                <div>
                  {Math.round(this.props.item.restaurant.distance / 10) / 100}km
                        <span>|</span>
                  {this.props.item.restaurant.order_lead_time}分钟
                      </div>
              </div>

            </div>
            <div className="activities">
              {
                this.props.item.restaurant.activities.map((ite, inde) => inde < 2 || this.props.item.show ? <div key={inde}>
                  <span style={{ background: "#" + ite.icon_color, color: "#fff" }}>{ite.icon_name}</span>
                  {ite.tips}
                </div> : '')
              }
            </div>
          </div>
          {this.props.children}
        </Link>
      </li>
    )
  }
}