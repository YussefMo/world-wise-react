import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useWidthContext } from "../context/WidthDetectContext"
import styles from './PageNav.module.css'
import Logo from "./Logo"

function PageNav() {
    const [navActive, setNavActive] = useState()
    const { width, breakpoint } = useWidthContext()

    if (width > breakpoint) {
        return (
            <nav className={styles.nav}>
                <Logo />
                <ul>
                    <li><NavLink to='/pricing'>Pricing</NavLink></li>
                    <li><NavLink to='/product'>Product</NavLink></li>
                    <li><NavLink to='/login' className={styles.ctaLink}>Log In</NavLink></li>
                </ul>
            </nav>
        )
    } else {
        return (
            <>
                <div className={`container-nav ${navActive && 'change'}`} onClick={() => setNavActive(!navActive)}>
                    <div className="bar1-nav"></div>
                    <div className="bar2-nav"></div>
                    <div className="bar3-nav"></div>
                </div>
                {
                    navActive &&
                    <nav className={styles.nav}>
                        <div>
                            <Logo />
                            <ul>
                                <li><NavLink to='/pricing'>Pricing</NavLink></li>
                                <li><NavLink to='/product'>Product</NavLink></li>
                                <li><NavLink to='/login' className={styles.ctaLink}>Log In</NavLink></li>
                            </ul>
                        </div>
                    </nav>
                }
            </>
        )
    }
}

export default PageNav
