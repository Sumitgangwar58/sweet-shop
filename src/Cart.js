import React, { useContext, useEffect, useState } from 'react'
import { data } from './DataContext'
import './Cart.css'
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom';

const Cart = () => {

  const [open , setOpen] = useState(false);
  const [t , setT] = useState(false);

  var [total , setTotal] = useState(0);
  const u = useContext(data)
  console.log(u.cart[0]);

  const increaseQuant = (item) =>{
    let ind = u.cart[0].indexOf(item)
    u.cart[0][ind].quantity+=1;
    u.cart[1]([...u.cart[0]])
  }
  const decreaseQuant = (item) =>{
    let ind = u.cart[0].indexOf(item)
    if(u.cart[0][ind].quantity-1>0){
      u.cart[0][ind].quantity-=1;
      u.cart[1]([...u.cart[0]])
    }
  }
  const deleteProduct = (item) =>{
    let ind = u.cart[0].indexOf(item)
    u.cart[0].splice(ind, 1);
    u.cart[1]([...u.cart[0]]);
  }

  const placeOrder = (event) =>{
    event.preventDefault();
    setOpen(false)
    setT(true)
    u.cart[1]([]);
  }

  useEffect(() => {
    total = 0;
    u.cart[0].map(item => total+=Number(item.quantity) * Number(item.price))
    setTotal(total)
  },[u.cart[0]])


  if(u.cart[0].length === 0){
    return (
      <div className='empty'>
        <p className='cursive'>{t === true ? "Order Placed Successfully" :"Your cart is empty!!"}</p>
        <Link to='/Products' className='responsive'>Go To Shop Page</Link>
      </div>
    )
  }

  return (
    <div className="cart">

      <div className='product-banner' style={{backgroundImage:'url("https://mydesi-shop.com/wp-content/uploads/2021/05/Rasgulla-250-Grams-1.jpg")'}}>
        <p className='shop'>Cart</p>
      </div>
      <table className='cart-table'>
        <thead style={{borderBottom: '1px solid grey'}}>
          <tr>
            <th></th>
            <th></th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tr><td colSpan={6}><hr /></td></tr>
        <tbody>
      {
        u.cart[0].map((product , index) =>
        <>
          <tr key={index} style={{borderBottom: '1px solid grey'}}>
            <td className='hover-del' style={{color:'grey' , cursor: 'pointer' , fontSize:'1.2vw'}} onClick={() => deleteProduct(product)}>X</td>
            <td> <img src={product.image} alt="#" /> </td>
            <td>{product.name}</td>
            <td>₹{product.price}</td>
            <td>
              <table className='quantity'>
                <tr>
                  <td rowSpan={2}>{product.quantity}</td>
                  <td className="hover-td" onClick={() => increaseQuant(product)}>+</td>
                </tr>
                <tr>
                  <td className="hover-td" onClick={() => decreaseQuant(product)}>-</td>
                </tr>
              </table>
            </td>
            <td>₹{product.price * product.quantity}</td>
          </tr>
          <tr><td colSpan={6}><hr /></td></tr>
          </>
          
        )
      }
      <tr>
        <th style={{textAlign: 'center'}} colspan={5}>Total</th>
        <th>₹{total}</th>
      </tr>
      <tr>
        <th style={{textAlign: 'center'}} colspan={5}>Discount</th>
        <th>-₹{total/10}</th>
      </tr>
      <tr>
        <th style={{textAlign: 'center'}} colspan={5}>Total Bill</th>
        <th>₹{total - total/10}</th>
      </tr>
      </tbody></table>
      <p className="cursive4" style={{ textAlign: 'center' , marginBottom:'3vw'}} ><button style={{border:'solid 2px goldenrod' , borderRadius:'5px'}} onClick={() => setOpen(true)}>CHECKOUT</button></p>
      <Modal
        open = {open}
        onClose = {() =>setOpen(false)}
      >
        <div className="modal-body">
          <table>
            <tr>
              <th style={{color: 'black'}} className='cursive2' colSpan={2}>ORDER SUMMARY</th> 
            </tr>
            <tr>
              <th>PRODUCT</th>
              <th>SUBTOTAL</th>
            </tr>
            {
              u.cart[0].map((product , index) =>
                <tr>
                  <td>{product.name}</td>
                  <td>₹{product.price * product.quantity}</td>
                </tr>
              )
            }
            <tr>
              <th>Total Bill</th>
              <th>₹{total - total/10}</th>
            </tr>
          </table>
          <hr />
          <form onSubmit={placeOrder}><table>
            <tr>
              <th colspan='2'>Enter Billing Details</th>
            </tr>
            <tr>
              <td>Name</td>
              <td><input required type='text' placeholder='Full Name' /></td>
            </tr>
            <tr>
              <td>Contact</td>
              <td><input required type='text' placeholder=' +91 123456789' /></td>
            </tr>
            <tr>
              <td>Address</td>
              <td><textarea required type='text' placeholder='15, 80ft Rd, R T Nagar...' /></td>
            </tr>
            <tr>
              <td colspan='2'><button type='submit'>Place Order</button></td>
            </tr>
            </table></form>  
        </div>
      </Modal>
    </div>
  )
}

export default Cart