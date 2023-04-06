import { AddRounded, RemoveRounded } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';
let cartItems = [];

const CartItem = ({ name, imgSrc, price, itemId }) => {
    const [qty, setQty] = useState(1);
    const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price));
    const [{cart, total}, dispatch] = useStateValue();

    useEffect(() => {
        cartItems = cart;
        setItemPrice(parseInt(qty) * parseFloat(price));
    }, [qty]);

    const updateQty = (action, id) => {
        if (action == "add") {
            setQty(qty + 1);
        } else {
            if (qty == 1) {
                cartItems.pop(id);
                dispatch({
                    type: actionType.SET_CART,
                    cart: cartItems,
                });
            } else {
                setQty(qty - 1);
                console.log(qty);
            }
        }
    }

  return (
    <div className='cardItem'>
        <div className='imgBox'>
            <img src={imgSrc} alt='' />
        </div>

        <div className='itemSection'>
            <h2 className='itemName'>{name}</h2>
            <div className='itemQuantity'>
                <span>x {qty}</span>
                <div className='quantity'>
                    <RemoveRounded 
                        className='itemRemove' 
                        onClick={()=> updateQty("remove", itemId)}
                    />
                    <AddRounded  
                        className='itemAdd' 
                        onClick={() => updateQty("add", itemId)}
                    />
                </div>
            </div>
        </div>

        <p className='itemPrice'>
            <span className='dolorSign'>$ </span>
            <span className='itemPriceValue'>{price}</span>
        </p>
    </div>
  )
}

export default CartItem
