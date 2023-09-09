import React from 'react';
import { motion, useScroll } from 'framer-motion'
import MyDoctorListWrapper from '../../components/patient/myDoctor/MyDoctorListWrapper';

// import SearchBar from '../../components/patient/searchInputBar/SearchBar';
const AppointmentsPage = () => {

    const { scrollYProgress } = useScroll()
    return (
        <>
            <motion.div style={{ scaleX: scrollYProgress, position: 'fixed', top: 0, right: 0, left: 0, height: 6, background: '#0095ff', transformOrigin: '0%', zIndex: 999 }}></motion.div>
            <div className='container mx-auto py-5 flex flex-col relative' >

                <MyDoctorListWrapper/>
            </div>
        </>
    );
}
export default AppointmentsPage