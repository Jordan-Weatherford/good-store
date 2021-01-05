import { useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import './styles/App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Product from './pages/[slug]'
import Success from './pages/Success'
import Canceled from './pages/Canceled'
import PageNotFound from './pages/PageNotFound'

const App = () => {
    const history = useHistory()

    const [cart, setCart] = useState([])

    const addItemToCart = (item, qty) => {
        // check to see if the item is already in the cart -- if so, just adjust qty
        let duplicate = cart.find(cartItem => cartItem.slug === item.slug)

        if (!duplicate) {
            setCart([...cart, {...item, qty}])
        } else {
            let newCart = cart

            newCart.forEach(newCartItem => {
                if (newCartItem.slug === duplicate.slug) {
                    newCartItem.qty += qty
                }
            })

            setCart(newCart)
        }

        history.push('/cart')
    }

    // adjust cart item quantity
    const adjustQty = (item, direction) => {
        let newCart = cart
        let deleteItem = false

        newCart.forEach((cartItem, i) => {
            if (cartItem.slug === item.slug) {
                if (direction === 'up') {
                    cartItem.qty += 1
                } else {
                    if (cartItem.qty === 1) {
                        deleteItem = true
                    } else {
                        cartItem.qty -= 1
                    }
                }
            }
        })

        if (deleteItem) {
            newCart = newCart.filter(cartItem => cartItem.slug !== item.slug)
        }
        setCart([...newCart])
    }

    

    return (
        <div className="appContainer">
            <Navbar cart={cart} />

            <main>
                <Switch>
                    <Route exact path='/cart' render={() => <Cart cart={cart} adjustQty={adjustQty} />} />
                    <Route exact path='/shop' component={Shop} />
                    <Route exact path='/shop/:slug' render={props => <Product slug={props.match.params.slug} addItemToCart={addItemToCart} />} />
                    <Route exact path='/success' component={Success} />
                    <Route exact path='/canceled' component={Canceled} />
                    <Route exact path='/' component={Home} />
                    <Route path='/' component={PageNotFound} />
                </Switch>
            </main>

            <Footer />
        </div>
    )
}

export default App