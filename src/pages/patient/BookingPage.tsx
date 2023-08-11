import { motion, useScroll } from 'framer-motion'
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/patient/sideBar/SideBar';
import Container from '../../components/patient/slotBooking/Container';

// import SearchBar from '../../components/patient/searchInputBar/SearchBar';
const BookDoctorSlot = () => {

    const { scrollYProgress } = useScroll()

    const location = useLocation();
    const path = location.pathname;
    console.log({ path });


    return (
        <>
            <motion.div style={{ scaleX: scrollYProgress, position: 'fixed', top: 0, right: 0, left: 0, height: 6, background: '#0095ff', transformOrigin: '0%', zIndex: 999 }}></motion.div>
            <Sidebar />
            <div className='container mx-auto py-5 flex flex-col relative'>
                <Container/>
            </div>
        </>
    );
}
export default BookDoctorSlot