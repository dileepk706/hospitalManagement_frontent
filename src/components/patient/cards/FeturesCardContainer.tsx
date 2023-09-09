import React, { useState, useRef, useEffect } from 'react';
import CardComponent from './card';
import youngDocimg from '../../../assets/images/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png'
import womenDocImg from '../../../assets/images/doc_choice.png'
import prescriptDocImg from '../../../assets/images/smiling-nurse-portrait-isolated-white-using-digital-tablet_53419-9441 (1).jpg'
import repoptDocImg from '../../../assets/images/instructor.6dcf1a03.png'
import healthDocImg from '../../../assets/images/Lovepik_com-402167626-nutritionists-take-vegetables-and-diet-health-tips.png'
import flDocImg from '../../../assets/images/mbbs.png'

import { motion } from 'framer-motion'

interface CardContainerProps { }

const FeaturesCardContainer: React.FC<CardContainerProps> = () => {

    const [width, setWidth] = useState<number>(0)
    const carousal = useRef<HTMLDivElement>(null)
    const [isScrollingPaused, setScrollingPaused] = useState<boolean>(false);

    useEffect(() => {
        const scrollWidth = carousal.current?.scrollWidth ?? 0;
        const offsetWidth = carousal.current?.offsetWidth ?? 0;
        setWidth(scrollWidth - offsetWidth); 

        let currentX = 0;
        const scrollInterval = setInterval(() => {
            if (!isScrollingPaused && carousal.current) {
                currentX += 1;
                const maxX = scrollWidth - offsetWidth;
                if (currentX >= maxX) {
                    currentX = 0; // Start over when reaching the end
                }
                carousal.current.scrollLeft = currentX;
            }
        }, 30);  // Adjust the scroll speed here (lower value for faster scrolling)

        return () => {
            clearInterval(scrollInterval);
        };
    }, [isScrollingPaused])

    const handleTouchStart = () => {
        setScrollingPaused(true);
    };
    const handleTouchEnd = () => {
        setScrollingPaused(false);
    };
    const handleMouseDown = () => {
        setScrollingPaused(true);
    };
    const handleMouseUp = () => {
        setScrollingPaused(false);
    };



    return (
        <motion.div 
        
        className=''>
            <h1 className='site-txt-color text-center font-bold text-xl  font-mono  mt-4 mb-1  md:mt-24 md:mb-3 md:text-2xl  '>Our Features and Services</h1>

            <motion.div
            initial={{ y: 100,opacity:0.7 ,scale:0.5}} //animate the section when show on the screen 
            whileInView={{ y: 0 ,opacity:1,scale:1}}
            transition={{ duration: '0.6',ease:'easeInOut',}}
                style={{
                    cursor: 'grab',
                    width: '100%',
                    overflow: 'hidden'
                }}
                
                ref={carousal}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className='curousal'>
                <motion.div style={{
                    display: 'flex',
                    gap: '10px',
                }}
                    drag='x'
                    dragConstraints={{ right: 0, left: -width }}
                    className='inner-carousal pt-2 pb-2'>

                    <CardComponent image={youngDocimg} link='/demo' title='Instant Video cosultation' />
                    <CardComponent image={womenDocImg} link='/demo' title='Chat with Dr' />
                    <CardComponent image={prescriptDocImg} link='/demo' title='Digital Prescription' />
                    <CardComponent image={repoptDocImg} link='/demo' title='Degital Health Reports' />
                    <CardComponent image={flDocImg} link='/demo' title='Submit Health Reports' />
                    <CardComponent image={healthDocImg} link='/demo' title='Daily health feeds' />

                </motion.div>
            </motion.div>
        </motion.div>


    );

}
export default FeaturesCardContainer
