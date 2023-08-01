import loadingpinner from '../assets/images/Spinner-5.gif'

export const LoadingSpinner = () => {
    return (
        <div className='w-[3.25rem] mx-auto'>
            <img src={loadingpinner} alt="" className='w-full' />

        </div>
    )
}