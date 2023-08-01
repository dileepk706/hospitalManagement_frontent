import React from "react";
import './style.css'
import HomeImage from '../../../assets/images/team-medical-professionals-white-background-team-medical-professionals-white-background-178237078.webp';
import { StyledButton } from "../button/ResponsiveButton";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"
import Typewriter from 'typewriter-effect'

type HomeTopSectionType = {}

const HomeTopSection: React.FC<HomeTopSectionType> = () => {

  return (
    <div style={{
      background: `#f9f9f9 url(${HomeImage}) no-repeat bottom`,
      // w-[112%]  md:h-[116vh]
    }} className='relative h-[113vh]   '>
      {/* <img src={HomeImage} className='rounded-3xl' alt="" /> */}
      <div className='absolute left-[25%] bottom-[80%] md:w-1/3 md:left-[50%] md:top-[5%]'>
        
        <h1
        className=' text-3xl site-txt-color  font-mono mb-2 sm:font-semibold  sm:text-3xl sm:block'
        >
          <Typewriter 
            options={{
              autoStart:true,
              loop:true,
              delay:50,
              strings:['We are commited to your health.']
            }}
          />
        </h1>
        
        {/* <motion.h1 
         initial={{x:1000}}
         animate={{x:[0,900,0]}}
         transition={{
             duration:'2',
             delay:1
         }}
        style={{ color: '#0ea5e9' }} 
        className=' text-xs   font-mono mb-2 sm:font-semibold  sm:text-3xl sm:block'
        >
          We are commited to your health.
        </motion.h1> */}


        <motion.p 
        initial={{y: 100 }}
        animate={{y:0}}
        transition={{
          duration:'0.6',
          delay:0.6
        }}
        className=' hidden font-mono text-xl text-gray-700 mb-5 md:block'
        >
          We provide the broadest range of innovative patient service
        </motion.p>

        <motion.div
        initial={{opacity:0,scale:0,}}
        animate={{opacity:1,scale:1}}
        transition={{duration:'1',delay:1}}
        className='w-full flex justify-center '>
          <Link to={'make-appointment'}><StyledButton variant="contained">Make an appointment</StyledButton></Link>
        </motion.div>
      </div>
    </div>
  );
};
export default HomeTopSection;

