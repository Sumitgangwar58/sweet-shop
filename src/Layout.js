import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Home from './Home'
import Products from './Products'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import './Layout.css';
import CloseIcon from '@mui/icons-material/Close';
import { data } from './DataContext';
import { Modal } from '@mui/material';

const Layout = () => {

  const nav = useNavigate()
  const [open , setOpen] = useState(false);

  useEffect(() =>{
    setTimeout(()=>{
      setOpen(true);
    },2000)
  },[])

  const serachShow = ()=> {
    document.getElementById('ul').style.display = 'none';
    document.getElementById('search-div').style.display = 'block';
  }
  const disable_serachShow = ()=> {
    document.getElementById('search').value = '';
    document.getElementById('search-div').style.display = 'none';
    document.getElementById('ul').style.display = 'flex';
    document.getElementById('search-div').style.display = 'none';
  }

  const u = useContext(data)

  const searchFun = (e) => {
    nav('/products' , {state:{text:e}})
  }
  
  return (
    <div className="layout">
      <div className="menu" id="menu">
        <div className = "left-menu">
          <Link to='/'>
            <img className='logo' src='./logo.png' alt="logo"/>
          </Link>
        </div>
        <div className = "right-menu" id="right-menu">
          <ul id="ul">
            <li>
              <Link className='responsive' to='/' element={<Home />}>Home</Link>
            </li>
            <li>
              <Link className='responsive' to='/Products' element={<Products />}>Products</Link>
            </li>
            <li>
              <SearchTwoToneIcon className='responsive' sx={{fontSize:'3vw'}} onClick={serachShow}/>
            </li>
            <li>
              <Link className='responsive' to='/cart'><ShoppingCartCheckoutTwoToneIcon style={{fontSize:'3vw'}}/><span className='counter'>{u.cart[0].length}</span></Link>
            </li>
          </ul>
          <div id="search-div">
            <div className='sss'>
              <input className='responsive' autoFocus type="text" placeholder="Search here..." id="search" onChange={(event)=>{searchFun(event.target.value)}} />
              <CloseIcon className='responsive' style={{cursor: 'pointer'}} onClick={() =>{disable_serachShow(); searchFun('')}}/>
            </div>
          </div>
        </div>
        <Modal
          open = {open}
          onClose = {() =>setOpen(false)}
        >
          <div className='offer'>
            <p>
              Enjoy 10% off on your first order
            </p>
          </div>
        </Modal>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout