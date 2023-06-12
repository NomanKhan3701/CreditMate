import React from 'react'
import Navigation from "../routes/homeStack";
import AuthNavigation from "../routes/authStack";
import { useSelector } from 'react-redux';

const Layout = () => {
    const user = useSelector(state => state.main.user);

    return (
        <>
            {
                user.id ? <Navigation /> : <AuthNavigation />
            }
        </>
    )
}

export default Layout