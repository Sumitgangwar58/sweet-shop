import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
const Home = () => {
  const nav = useNavigate();
  const redirectProduct = (data)=>{
    nav('/products' , {state:{cat:data}});
  }
  return (
    <>
    <div className="home">
      <div className="carousel">
        <div className="img-content">
            <p className="cursive">Chocolate Love</p>
            <p className="cursive2">LOVELY</p>
            <p className="cursive3 responsive">Its always good time for sweets! Made with care and prepared with love, our sweet are all need to make every day special. Find your favourite one</p>
            <p className="cursive4"><button onClick = {()=> nav('/products')}>Shop Now</button></p>
        </div>
      </div>
    </div>

    <div className='category'>
      <h1 className="cursive">We Know That</h1>
      <p className='cursive2'>Sweet is Art</p>
      <p className="cursive3 responsive">Its always good time for sweets! Made wi are all need to make every day special. Find your favourite one</p>
      <div className='flex-category'>
        <div className='flex-item'>
          <p className='circle barfi' onClick = {()=> redirectProduct("barfi")}><img src="./barfi.png" /></p>
          <p className="cursive3 responsive">Barfi</p>
        </div>
        <div className='flex-item'>
          <p className='circle' onClick = {()=> redirectProduct("laddoo")}><img src="./laddoo.png" /></p>
          <p className="cursive3 responsive">Laddoo</p>
        </div>
        <div className='flex-item'>
          <p className='circle' onClick = {()=> redirectProduct("soanpapdi")}><img className='big' src="./sonpapdi.png" /></p>
          <p className="cursive3 responsive">Soan Papdi</p>
        </div>
        <div className='flex-item'>
          <p className='circle' onClick = {()=> redirectProduct("ghewar")}><img src="./ghewar.png" /></p>
          <p className="cursive3 responsive">Ghewar</p>
        </div>
        <div className='flex-item'>
          <p className='circle' onClick = {()=> redirectProduct("kajuKatli")}><img className='big' src="./kaju.png" /></p>
          <p className="cursive3 responsive">Kaju Katli</p>
        </div>
        <div className='flex-item'>
          <p className='circle' onClick = {()=> redirectProduct("chocolate")}><img className='big' src="./chocolate.png" /></p>
          <p className="cursive3 responsive">Chocklate</p>
        </div>
      </div>

    </div>

    <div className='our-story'>
      <div className="our-story-content">
        <p className="cursive">Family Tradition</p>
        <h1 className="cursive2">Our Story</h1>
        <p className='cursive3 responsive'>t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)</p>
      </div>
    </div>
    
    </>
  )
}

export default Home