
import React from 'react'
import {motion} from 'framer-motion'

type ConcernCardProps = {
    concern:string;
    img:string;
    animatePropForPosY:number;
    timer:string
}
const ConcernCard: React.FC<ConcernCardProps> = ({concern,img,animatePropForPosY,timer}) => {

    return (
        <motion.div  
        initial={{ y: 200, }} //animate the section when show on the screen 
        whileInView={{ y: [0,-30,0,30,0], }}
        transition={{ duration: timer, ease: 'easeOut', }}
        className="relative flex w-43 h-60 flex-col justify-center items-center rounded-xl bg-white bg-clip-border text-gray-700 "
        >
            <div className="relative p-[10px]   overflow-hidden   bg-white bg-clip-border text-gray-700">
                <img
                    src={img}
                    className=" object-cover "
                    alt="Product"
                />
            </div>
            <p className="block  text-center font-sans font-medium leading-relaxed text-blue-gray-900 antialiased">
                {concern}
            </p>
            <button
                className="block mt-1 site-txt-color w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                CONSULT NOW
            </button>
        </motion.div>


    )
}

export default ConcernCard