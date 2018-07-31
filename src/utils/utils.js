const formatHash = (hash) => {
  return `//fuss10.elemecdn.com/${hash.slice(0, 1)}/${hash.slice(1, 3)}/${hash.slice(3)}${hash.slice(-3) === 'png'?'.png':'.jpeg'}` 
}
const getRestaurants = (th,category) => {
  let data = th.state,address = window.localStorage.address;
  let ids = '';
  if(category){
    
    category.forEach(function (item,) {
      ids += `&restaurant_category_ids[]=${item}`
    })
    console.log(ids);
  }
  if(address){
     address = JSON.parse(address);
    fetch(`api/restapi/shopping/v3/restaurants?latitude=${address.latitude}&longitude=${address.longitude}&offset=${data.offset}&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5${ids}`).then(res => res.json()).then(json => {
      json['items'].forEach(item => {
        item.show = false;
        item.restaurant.image_path = formatHash(item.restaurant.image_path)
      })
      th.setState({restaurants:json['items']})
      console.log(json['items']);
    })
  }
}
export default {
  formatHash: formatHash,
  getRestaurants:getRestaurants
}