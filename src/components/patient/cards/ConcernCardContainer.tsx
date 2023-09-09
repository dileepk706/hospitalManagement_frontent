import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'
import ConcernCard from './ConcernCards';
import accneImg from '../../../assets/images/accne.png'
import kidny from '../../../assets/images/kidny.png'
import bones from '../../../assets/images/download.png'
import childrImg from '../../../assets/images/heart.png'
import depressionImg from '../../../assets/images/brain.png'
import dentalImg from '../../../assets/images/teeth.png'
import AppointmentBookingModal from '../homeTopSection/AppointmentBookingModal';
// import Typewriter from 'typewriter-effect'

interface ConcernCardContainerProps { }

const ConcernCardContainer: React.FC<ConcernCardContainerProps> = () => {

    const [width, setWidth] = useState<number>(0)
    const carousal = useRef<HTMLDivElement>(null)
    const [isScrollingPaused, setScrollingPaused] = useState<boolean>(false);
    const [AppntmtBkngModalView,setAppntmtBkngModalView]=useState(false)

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
        <>
        <div className='mt-[10%] mb-[8%]'>

        <div className='flex space-x-1 flex-col'>
                <div className='mb-[30px]'>
                    <h1 className='site-txt-color text-center font-semibold text-sm mt-14    font-mono mb-1  md:mt-24 md:mb-3 md:text-2xl '>
                        Consult top doctors online for any health concern.
                    </h1>
                    <p className='text-sm font-mono text-gray-500 text-center md:text-xl'>Private online consultations with verified doctors in all specialists</p>
                </div>

            <motion.div
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
                <motion.div 
               
                    drag='x'
                    dragConstraints={{ right: 0, left: -width }}
                    className='inner-carousal pt-2 pb-2 flex justify-evenly justify'
                >
                   <ConcernCard  setAppntmtBkngModalView={setAppntmtBkngModalView} concern='Low bone density'img={bones} animatePropForPosY={120} timer='1'/>
                   <ConcernCard setAppntmtBkngModalView={setAppntmtBkngModalView}  concern='kidney problems'img={kidny} animatePropForPosY={100} timer='1.6'/>
                   <ConcernCard  setAppntmtBkngModalView={setAppntmtBkngModalView} concern='Heart problem'img={childrImg} animatePropForPosY={90} timer='1.9'/>
                   <ConcernCard  setAppntmtBkngModalView={setAppntmtBkngModalView} concern='Depression or anxiety'img={depressionImg} animatePropForPosY={80} timer='2.2'/>
                   <ConcernCard  setAppntmtBkngModalView={setAppntmtBkngModalView} concern='Dental or Teething troubles' img={dentalImg} animatePropForPosY={70}  timer='2.5'/>
                   
                </motion.div>
            </motion.div>
        </div>

        </div>
    {   
    AppntmtBkngModalView&&<AppointmentBookingModal setAppntmtBkngModalView={setAppntmtBkngModalView}/>
    }
  </>
    );

}
export default ConcernCardContainer
