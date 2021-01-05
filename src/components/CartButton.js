import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../styles/CartButton.css'
import cartIcon from '../resources/cart-icon.png'


const CartSummary = props => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        setCart(props.cart)
    }, [props.cart])

    return(
        <Link to="/cart" className="CartSummaryContainer">
            <img src={cartIcon} alt="cart icon" height={30} />
            { cart.length > 0 && <span className="CartCount">{ cart.length }</span> }
        </Link>                 
    )
}

export default CartSummary