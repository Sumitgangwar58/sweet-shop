import React, { useContext, useEffect, useState } from 'react'
import './Products.css'
import { products } from './Data'
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { data } from './DataContext';

// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Products = () => {
  const [value, setValue] = React.useState([0, 2000]);
  const [category, setCategory] = useState({barfi:0 , kajuKatli:0 , laddoo:0 , ghewar:0 , soanpapdi:0 , chocolate:0});
  const [text, setText] = useState('');
  const [displayPro , setDisplayPro] = useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const pageUrl = useLocation();

  
  
  useEffect(() => {
    if(pageUrl.state!==null && pageUrl.state.cat!==undefined) {
      let temp = category
      temp[pageUrl.state.cat] = 1;
      setCategory({...temp});
    } 
    if( pageUrl.state!==null && pageUrl.state.text!==undefined) setText(pageUrl.state.text)
    
  },[pageUrl.state])

  // console.table(category);

  const catFilter = (e , data)=>{
    if(e.target.checked){
      let temp = category
      temp[data] = 1;
      setCategory({...temp});
    }
    else{
      let temp = category
      temp[data] = 0;
      setCategory({...temp});
    }
  }

  const productChange = () =>
    {
      let temp = [];
      Object.keys(products).map(product =>{
        if(category[product]===1 || (category['barfi']===0 && category['chocolate']===0 && category['ghewar']===0 && category['kajuKatli']===0 && category['laddoo']===0 && category['soanpapdi']===0) ){
          products[product].map((item , i)=>{
            if(item['name'].toLowerCase().includes(text.toLowerCase()) || text===''){
              if(item['price']>=value[0] && item['price']<=value[1]){
                temp.push(item)
              }
            }
          })
        }
      })
      setDisplayPro([...temp])
    }

    useEffect(()=>{
      productChange();
    },[category , text , value])

    const u = useContext(data)
    // console.table(u.cart[0])

    const add_to_cart = (item) =>{
      item['quantity']=1
      if(u.cart[0].indexOf(item)===-1) {
        u.cart[1]([...u.cart[0] , item])
      }
    }

    const errMsg = () =>{
      return(
      <div className='errP'>
        <p>No data found!!</p>
      </div>)
    }

    // productChange();
    // console.log(category);


  return (
    <div className='products-page'>

      <div className='product-banner'>
        <p className='shop'>SHOP</p>
      </div>
      <div className='grid'>  
        <div className='product-list'>
          {
            displayPro.length === 0 ? errMsg() :
          
          displayPro.map((item , i) =>
            <div key={i} className='product'>
                <p className='hidden-button'><button onClick={()=>add_to_cart(item)}>ADD TO CART</button></p>
              <img src={item['image']} alt="img" />
              <p className='responsive' style={{ fontFamily:'smallcaps' , paddingTop:'1vw' , fontWeight:'500'}}>{item['name']}</p>
              <p className='responsive' style={{ fontFamily:'courier' , color:'goldenrod' , fontWeight:'550'}}>₹{item['price']}</p>
            </div>
          )
        }
        </div>
        
        <div className='product-list-filters'>
          <div className='pfilter'>
          <Typography  id="non-linear-slider" gutterBottom className="price">
            <p className="cursive2 responsive" style={{fontSize:'3.5vw'}}>Price:</p><span className='responsive' style={{fontSize:'1.8vw'}}> ₹{value[0] + " to ₹"  + value[1]}</span>
          </Typography>
            <Slider
              min = {0}
              max = {2000}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              style = {{color:'goldenrod'}}
            />
          </div>
          <div className='cfilter'>
            <table>
              <thead>
                <tr>
                  <td className='cursive2' style={{fontSize:'3.5vw'}} colSpan={2}>Category</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input checked={category.barfi===1} onChange = {(event)=>catFilter(event , "barfi")} className='checkbox' type='checkbox'></input></td>
                  <td className='responsive'>Barfi</td>
                </tr>
                <tr>
                  <td><input type='checkbox' checked={category.laddoo===1} onChange = {(event)=>catFilter(event , "laddoo")} className='checkbox'></input></td>
                  <td className='responsive'>Laddoo</td>
                </tr>
                <tr>
                  <td><input type='checkbox' checked={category.soanpapdi===1} onChange = {(event)=>catFilter(event , "soanpapdi")} className='checkbox'></input></td>
                  <td className='responsive'>Soan Papdi </td>
                </tr>
                <tr>
                  <td><input type='checkbox' checked={category.ghewar===1} onChange = {(event)=>catFilter(event , "ghewar")} className='checkbox'></input></td>
                  <td className='responsive'>Ghewar</td>
                </tr>
                <tr>
                  <td><input checked={category.kajuKatli===1} type='checkbox' onChange = {(event)=>catFilter(event , "kajuKatli")} className='checkbox'></input></td>
                  <td className='responsive'>Kaju Katli</td>
                </tr>
                <tr>
                  <td><input  type='checkbox' checked={category.chocolate===1} onChange = {(event)=>catFilter(event , "chocolate")} className='checkbox'></input></td>
                  <td className='responsive'>Chocolate</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <p className='cursive4'><button>Apply Filter</button></p> */}
        </div>
      </div>
    </div>
  )
}

export default Products