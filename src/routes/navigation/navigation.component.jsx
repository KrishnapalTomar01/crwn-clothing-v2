import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import './navigation.styles.scss';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    
    return (
        <Fragment>
            <div className="navigation">
                <Link to='/' className="logo-container">
                    <CrwnLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link to='/shop' className="nav-link">SHOP</Link>
                    {
                        currentUser ? (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>) :
                         (<Link to='/auth' className="nav-link">SIGN IN</Link>)
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;