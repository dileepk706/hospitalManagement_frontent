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
        <div className='grid grid-cols-1 gap-4 mb-[8%] mt-[4%] md:grid-cols-3'>
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
                    Private online consultations with verified doctors in all specialists,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam obcaecati fugiat quidem nisi id libero dolorum deleniti.
                    Private online consultations with verified doctors in all specialists,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam obcaecati fugiat quidem nisi id libero dolorum deleniti.
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

                    <CardComponent image='https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dentist@2x.jpg' link='/demo' title='Instant Video cosultation' />
                    <CardComponent image={womenDocImg} link='/demo' title='Genaral department' />
                    <CardComponent image={prescriptDocImg} link='/demo' title='Genaral department' />
                    <CardComponent image={repoptDocImg} link='/demo' title='Genaral department' />
                    <CardComponent image={flDocImg} link='/demo' title='Genaral department' />
                    <CardComponent image={healthDocImg} link='/demo' title='Genaral department' />

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
