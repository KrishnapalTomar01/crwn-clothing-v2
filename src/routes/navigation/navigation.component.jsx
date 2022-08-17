import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { LogoContainer, NavLink, NavLinksContainer, NavigationContainer } from './navigation.styles';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector"
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const cartOpen = useSelector(selectIsCartOpen);

    const signOutHandler = () => {
        dispatch(signOutStart());
    }
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {
                        currentUser ? (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>) :
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