import { Link, NavLink } from 'react-router-dom'

import '../styles/Navbar.css'
import logo from '../resources/logo-white.png'
import CartSummary from './CartButton'

const Navbar = props => {
    return(
        <div className="navbar">
            <div className="navbarContainer">
                <div>
                    <Link to="/">
                        <img src={logo} alt="logo" height={50} />                    
                    </Link>                
                </div>


                <div className="navLinks">
                    <NavLink to="/shop">Shop</NavLink>
                    <NavLink to="/about">About</NavLink>                
                </div>

                <CartSummary cart={props.cart} />
            </div>            
        </div>

    )
}

export default Navbar