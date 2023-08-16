import { motion, useScroll } from 'framer-motion'
import Sidebar from '../../components/patient/sideBar/SideBar';
import AppointmentsWrapper from '../../components/patient/appointments/AppointmentsWrapper';

// import SearchBar from '../../components/patient/searchInputBar/SearchBar';
const AppointmentsPage = () => {

    const { scrollYProgress } = useScroll()
    return (
        <>
            <motion.div style={{ scaleX: scrollYProgress, position: 'fixed', top: 0, right: 0, left: 0, height: 6, background: '#0095ff', transformOrigin: '0%', zIndex: 999 }}></motion.div>
            <Sidebar />
            <div className='container mx-auto py-5 flex flex-col relative'>
                <AppointmentsWrapper/>
            </div>
        </>
    );
}
export default AppointmentsPage