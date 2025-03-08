import { Outlet } from "react-router-dom"
import { useCitiesContext } from "../context/CitiesContext";
import { useWidthContext } from "../context/WidthDetectContext";
import style from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'

function SideBar() {
    const { isActive, setIsActive } = useCitiesContext()
    const {width, breakpoint} = useWidthContext()

    if (width > breakpoint) {
        return (
            <div className={style.sidebar}>
                <Logo />
                <AppNav />
                <Outlet />
                <footer className={style.footer}>
                    <p className={style.copyright}>
                        &copy; Copyright {new Date().getFullYear()} by
                        WorldWise Inc.
                    </p>
                </footer>
            </div>
        )
    } else {
        return (
            <>
                <div className={`container ${isActive && 'change'}`} onClick={() => setIsActive(!isActive)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                {
                    isActive &&
                    <div className={style.sidebar}>
                        
                        <Logo />
                        <AppNav />
                        <Outlet />
                        <footer className={style.footer}>
                            <p className={style.copyright}>
                                &copy; Copyright {new Date().getFullYear()} by
                                WorldWise Inc.
                            </p>
                        </footer>
                    </div>
                }
            </>
        )
    }
}

export default SideBar
