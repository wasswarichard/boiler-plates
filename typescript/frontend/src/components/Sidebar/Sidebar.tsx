import React from "react";
import {Link, useLocation} from "react-router-dom";
import routes from "../../routes/routes";
import "./Sidebar.sass"

const Sidebar = () => {
    // const location = useLocation();
    // const getNavLinkClass = (path: string) => {
    //     return location.pathname === path ? "active" : "";
    // }
    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                <h2><span className="lab la-accusoft"></span> <span>Nuri</span></h2>
            </div>
            <div className="sidebar-menu">
                <ul>
                    {routes
                        .filter(route => route.navbar !== "")
                        .map((route, key) => {
                            return (
                                <li key={key}>
                                    <a href="">
                                        <Link to={route.path}>
                                            <span className={route.iconClass}></span><span>{route.title}</span>
                                        </Link>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
export default Sidebar;