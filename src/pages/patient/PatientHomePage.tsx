import ArticleSection from "../../components/patient/cards/ArticleSection";
import ConcernCardContainer from "../../components/patient/cards/ConcernCardContainer";
import FeaturesCardContainer from "../../components/patient/cards/FeturesCardContainer";
import DepartmentCardContainer from "../../components/patient/cards/departmentCardContainer.tsxx";
import HomeTopSection from "../../components/patient/homeTopSection/HomeTop";
import { motion, useScroll } from 'framer-motion'
import Sidebar from "../../components/patient/sideBar/SideBar";


// import SearchBar from '../../components/patient/searchInputBar/SearchBar';
const UserHome = () => {

  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div style={{scaleX: scrollYProgress,position: 'fixed',top: 0,right: 0,left: 0,height: 10,background: '#0095ff',transformOrigin: '0%',zIndex: 999}}></motion.div>
      <Sidebar />
      <div className='container mx-auto py-5'>
        <HomeTopSection />
        <FeaturesCardContainer />
        <ConcernCardContainer />
        <DepartmentCardContainer/>
        <ArticleSection/>
      </div>
    </>
  );
}
export default UserHome