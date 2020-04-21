import React from 'react';
import { Link , NavLink} from 'react-router-dom';
import * as  Constants from '../utils/Constants';


export const MainNav = (props) => {
    let { MenuName, linkItem } = props
    return (
            <li className="nav-item">
                <NavLink activeClassName="active" to={ "/" + linkItem }  className="nav-link">{ MenuName }</NavLink>
            </li>
        //     <li className={item[Constants.KEY_IS_ACTIVE] && item[Constants.KEY_IS_ACTIVE]===true?"nav-item active":"nav-item"} onClick={clickMenuItem}>
        //     <Link to={linkItem}  className="nav-link active">{ MenuName }</Link>
        // </li>
        )
}


