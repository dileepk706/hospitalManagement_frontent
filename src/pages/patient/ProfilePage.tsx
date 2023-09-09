import React, { Suspense,lazy } from 'react';
import { motion, useScroll } from 'framer-motion'
import Sidebar from '../../components/patient/sideBar/SideBar';
const ProfileWrapper=lazy(() => import('../../components/patient/profile/ProfileWrapper')) 

// import SearchBar from '../../components/patient/searchInputBar/SearchBar';
const AppointmentsPage = () => {

    const { scrollYProgress } = useScroll()
    return (
        <>
            <motion.div style={{ scaleX: scrollYProgress, position: 'fixed', top: 0, right: 0, left: 0, height: 6, background: '#0095ff', transformOrigin: '0%', zIndex: 999 }}></motion.div>
            <div className='container mx-auto py-5 flex flex-col relative' >
                <Suspense fallback={<p>loading</p>}>
                    <ProfileWrapper />
                </Suspense>

            </div>
        </>
    );
}
export default AppointmentsPage