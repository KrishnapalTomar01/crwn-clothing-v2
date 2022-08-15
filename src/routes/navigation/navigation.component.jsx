import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { LogoContainer, NavLink, NavLinksContainer, NavigationContainer } from './navigation.styles.jsx';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector.js";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { cartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {
                        currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) :
                            (<NavLink to='/auth'>SIGN IN</NavLink>)
                    }
                    <CartIcon />
                </NavLinksContainer>
                {
                    cartOpen && <CartDropdown />
                }

            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;