import React, { useState, useRef, useEffect } from 'react';
import CardComponent from './card';
import womenDocImg from '../../../assets/images/doc_choice.png'
import prescriptDocImg from '../../../assets/images/smiling-nurse-portrait-isolated-white-using-digital-tablet_53419-9441 (1).jpg'
import repoptDocImg from '../../../assets/images/instructor.6dcf1a03.png'
import healthDocImg from '../../../assets/images/Lovepik_com-402167626-nutritionists-take-vegetables-and-diet-health-tips.png'
import flDocImg from '../../../assets/images/mbbs.png'
// import Typewriter from 'typewriter-effect'

import { motion } from 'framer-motion'

interface DepartmentCardContainerProps { }

const DepartmentCardContainer: React.FC<DepartmentCardContainerProps> = () => {

    const [width, setWidth] = useState<number>(0)
    const carousal = useRef<HTMLDivElement>(null)
    const [isScrollingPaused, setScrollingPaused] = useState<boolean>(false);

    useEffect(() => {
        const scrollWidth = carousal.current?.scrollWidth ?? 0;
        const offsetWidth = carousal.current?.offsetWidth ?? 0;
        setWidth(scrollWidth - offsetWidth); 
    },[isScrollingPaused,width])
    const handleTouchStart = () => setScrollingPaused(true);
    const handleTouchEnd = () => setScrollingPaused(false);
    const handleMouseDown = () => setScrollingPaused(true);
    const handleMouseUp = () => setScrollingPaused(false);

    return (
        <div className='grid grid-cols-1 gap-4 my-[14%] md:grid-cols-3'>
            <div className=' col-span-1 flex flex-col md:col-span-1'>
                <motion.h1
                    initial={{ x: -200 }} //animate the section when show on the screen 
                    whileInView={{ x: 0 }}
                    transition={{ duration: '1', ease: 'easeIn', }}
                    exit={{ x: 0 }}
                    className='site-txt-color text-center font-bold text-xl  font-mono  md:mb-[35px]   md:text-2xl'>
                    25+ Specialities.
                </motion.h1>
                <motion.p
                    initial={{ x: -200 }} //animate the section when show on the screen 
                    whileInView={{ x: 0 }}
                    transition={{ duration: '1.3', ease: 'easeOut', }}
                    exit={{ x: 0 }}
                    className='text-sm hidden font-mono text-gray-500 text-start md:text-sm md:block'>
                    Private online consultations with verified doctors in all specialists  Each department is staffed with healthcare professionals who are trained and experienced in diagnosing, treating, and managing particular types of medical conditions or body systems. These departments work together to provide comprehensive healthcare services to patients, addressing a wide range of medical needs and conditions
                </motion.p>
            </div>
            <motion.div
                initial={{ y: 200, opacity: 0.7 }} //animate the section when show on the screen 
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: '1', ease: 'easeInOut', }}
                style={{
                    cursor: 'grab',
                    width: '100%',
                    overflow: 'hidden'
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={carousal}

                className='curousal col-span-1  md:col-span-2'>
                <motion.div style={{
                    display: 'flex',
                    gap: '10px',
                }}
                    drag='x'
                    dragConstraints={{ right: 0, left: -750 }}
                    className='inner-carousal pt-2 pb-2'>
                    
                    <CardComponent image='https://media.istockphoto.com/id/1295301481/photo/modern-empty-temporary-intensive-care-emergency-room-is-ready-to-receive-patients-with.jpg?s=612x612&w=0&k=20&c=JS084TTZ4l5cmquQhncNlkUaiohHt762HnopGkpYwgA=' 
                    title='Genaral department' 
                    discription='The hospitals general department offers basic medical'
                    />
                    <CardComponent image='https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dentist@2x.jpg' 
                    title='Dentist' 
                    discription='Dentists specialize in oral health'
                    />
                    <CardComponent 
                    image='https://cdn.pixabay.com/photo/2015/07/10/21/00/hospital-840135_640.jpg'
                    title='Mental Health Department  '
                    discription='The mental health department focuses on diagnosing and treating mental and emotional disorders'
                     />
                    <CardComponent
                     image='https://cdn.pixabay.com/photo/2014/12/10/20/48/laboratory-563423_640.jpg'
                    title='ENT (Ear, Nose, and Throat)'
                    discription='Disorders related to the ear, nose, and throat, addressing issues like hearing problems'
                     />
                    <CardComponent 
                    image='https://media.istockphoto.com/id/1321691559/photo/friendly-nurse-wearing-face-mask-talks-to-beautiful-senior-female-patient-resting-in-bed.jpg?s=612x612&w=0&k=20&c=rgsQdIlPKpLRJDuJkOWgEOJfd1EVJ7a4J-StxlwoVOI='
                    title='Urology Department'
                    discription='The urology department deals with urinary tract and reproductive system conditions'
                     />
                    <CardComponent 
                    image='https://media.istockphoto.com/id/1038799988/photo/recovering-little-child-lying-in-the-hospital-bed-sleeping-mother-holds-her-hand-comforting.jpg?s=612x612&w=0&k=20&c=NdyrMOmg3Jlg5FucAwgMPYzxtbOtEonxFYHUvDiyrkE='
                    title='Cardiology Department'
                    discription=' The cardiology department is dedicated to heart health'
                     />

                </motion.div>
                <div className='flex justify-center items-center gap-1'>
                    <div className={`w-5 h-5 rounded-full border-2 border-sky-400  ${width > 500 ? 'bg-sky-500' : ''} shadow-lg`}></div>
                    <div className={`w-5 h-5 rounded-full border-2  border-sky-400 ${width < 500 ? 'bg-sky-500' : ''} shadow-lg`}></div>

                </div>
            </motion.div>
            {/* </div> */}
        </div>

    );

}
export default DepartmentCardContainer
