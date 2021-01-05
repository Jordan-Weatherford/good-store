// import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'

import '../styles/Cart.css'
import { API_URL } from '../utils/Variables'

const stripePromise = loadStripe("pk_test_51HEhAgAX9HHAr5HrTmBPQ9cPS7oGlGOfI2cNYOADmRtCsUmmitjAdrBrsDA2Ne7l1TYzvvfUWbMAebEQmJ1vzuhh00uzyGHwpt");

const Cart = props => {
    const redirectToCheckout = async () => {
        const stripe = await stripePromise

        const response = await axios.post(`${API_URL}/create-checkout-session`, props.cart)

        // const session = await response.json()
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: response.data.id,
        })

        if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        }
    }

    return(
        <div>                
            <h1>Cart</h1>
            <div className="CartContainer">
                { props.cart.length === 0 && <p>You have no items in your cart!</p> }

                { 
                    props.cart && props.cart.map(item => (
                        <div key={item.slug} className="CartItem">
                            <div className="CartItemImage">
                                <img src={item.image_url} alt='item' width='100%' />
                            </div>
                            <p className="CartItemName">{ item.name }</p>
                            <button onClick={() => props.adjustQty(item, 'down')}>down</button>
                            <p>qty:{ item.qty }</p>
                            <button onClick={() => props.adjustQty(item, 'up')}>up</button>
                            <p className="CartItemPrice">${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                    ))
                }

                { props.cart.length > 0 && <button onClick={() => redirectToCheckout()}>Checkout</button> }
            </div>            
        </div>

    )
}

export default Cart


