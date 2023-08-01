import React, { useState, useRef, useEffect } from 'react';

// import Typewriter from 'typewriter-effect'

import { motion } from 'framer-motion'

interface ArticleSectionProps { }

const ArticleSection: React.FC<ArticleSectionProps> = () => {

     
    return (
        //article and news section 
        <div className='flex flex-col items-center justify-center gap-4 mb-[8%] mt-[4%] md:grid-cols-3'>
             <div className='col-span-1 flex flex-col'>
                <h1 className='site-txt-color text-center font-bold text-xl  font-mono  md:mb-[35px]   md:text-2xl'>Read top articles from health experts</h1>
                <p className='text-sm hidden font-mono text-gray-500 text-start md:text-sm md:block'>Health articles that keep you informed about good health practices and achieve your goals.</p>
             </div>
            
             <div>

             </div>


             
        </div>

    );

}
export default ArticleSection
