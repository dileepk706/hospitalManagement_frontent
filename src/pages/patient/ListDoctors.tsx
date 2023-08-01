import { motion, useScroll } from 'framer-motion'
import { useLocation } from 'react-router-dom';
import Nav from '../../components/patient/doctorSrchResltPage/Nav';
import DoctorsListAria from '../../components/patient/doctorSrchResltPage/DoctorsListAria';
import Sidebar from '../../components/patient/sideBar/SideBar';

// import SearchBar from '../../components/patient/searchInputBar/SearchBar';
const ListDoctor = () => {

  const { scrollYProgress } = useScroll()

    const location = useLocation();
    const path = location.pathname;
    console.log({path});

   
  return (
    <>
    <Sidebar />
      <motion.div style={{scaleX: scrollYProgress,position: 'fixed',top: 0,right: 0,left: 0,height: 6,background: '#0095ff',transformOrigin: '0%',zIndex: 999}}></motion.div>
      <div className='container mx-auto py-5 flex flex-col relative'>
         <Nav/>
        <DoctorsListAria/>
     
      </div>
    </>
  );
}
export default ListDoctor