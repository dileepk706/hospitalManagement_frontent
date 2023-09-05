import loadingpinner from '../assets/images/Spinner-5.gif'
import React from 'react'
type LoadingSpinnerProps={
    width?:string
}
export const LoadingSpinner:React.FC<LoadingSpinnerProps> = ({width}) => {
    return (
        <div className={width?`${width} mx-auto`:`w-[3.25rem] mx-auto`}>
            <img src={loadingpinner} alt="" className='w-full' />

        </div>
    )
}
