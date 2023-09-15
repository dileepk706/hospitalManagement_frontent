 
import React from 'react'

type PaginationProps = {
    changePage?: any
    currentPage?: any
    totalPage:number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<PaginationProps> = ({ changePage, currentPage ,totalPage,setCurrentPage}) => {

    const pages = []
    for (let i = 1; i <= totalPage; i++) {
        pages.push(
            (
                <li>
                    <p onClick={()=>setCurrentPage(i)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500  ${i==currentPage?'bg-gray-600':'bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{i}</p>
                </li>
            )
        )
    }
    return (
        <nav className=' flex justify-center items-center my-[20px] ' aria-label="Page navigation example ">
            <ul className="inline-flex -space-x-px text-sm">
            <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
        </li>
               {pages}

               <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
        </li>
            </ul>
        </nav>
    )
}

export default Pagination

// {
//     currentPage ? (
//         <li>
//             <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
//         </li>
//     ) : (

//         <li>
//             <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
//         </li>
//     )
// }
