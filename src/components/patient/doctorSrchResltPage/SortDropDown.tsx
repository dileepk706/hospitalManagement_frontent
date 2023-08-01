import { useState,useEffect ,useRef} from 'react';
import {motion} from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { searchAllDoctorsBy_name_deprtmnt_health } from '../../../services/patients/doctorapi';
import { insertDoctors } from '../../../redux/patient/doctorsDataSlicer';
import { changeSort } from '../../../redux/patient/doctorSearchParams';

const SortDropDown = () => {

    const dispatch=useAppDispatch()
    const {department,gte,lte,name,sex,}=useAppSelector((state)=>state.searchParameteres)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showDropdown,setShowDropdown]=useState('hidden')
    const [sortCriteria, setSortCriteria] = useState(SORTDATA)
      const changeDropdownOpen=()=>{
        setShowDropdown((prev=>{
          return prev==='hidden'?'block':'hidden'
        }))
      }
      const handleOutsideClick = (event:MouseEvent) => {
        if (dropdownRef.current && !dropdownRef?.current?.contains(event.target as Node)) {
            setShowDropdown('hidden')
        }
      };
      const searchDoctorWithSsort= async (position:number,sort:string)=>{
        const updatedPriceRange=sortCriteria?.map((item,i)=>{
          if(item.isSelected) return {...item,isSelected:false}
          return i===position?{...item,isSelected:true}:{...item}
        })
        setSortCriteria(updatedPriceRange)
        const docters = await searchAllDoctorsBy_name_deprtmnt_health(sort, name, department, sex, gte, lte,'')
        dispatch(insertDoctors(docters))
        dispatch(changeSort(sort))
      }
      useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);
    return (
        <motion.div //animation
        animate={{x:[1000,-30,0]}}
        transition={{delay:1.8,duration:0.6,ease:'easeIn'}}
        ref={dropdownRef} className="inline-block relative text-left shadow-[0_10px_25px_rgba(8,_112,_184,_0.7)]">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={changeDropdownOpen}
                >
                    Sort by
                    <svg
                        className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            <div className={`${showDropdown} absolute w-40 right-0 z-10 mt-2 md:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                    {
                        sortCriteria?.map((sort, i) => {
                            return (
                                <div onClick={() => {
                                    changeDropdownOpen()
                                    searchDoctorWithSsort(i,sort.apiParam)
                                }} className={`${sort.isSelected && 'bg-sky-300'} text-gray-700  font-mono  block px-4 py-2 text-sm cursor-pointer hover:bg-sky-200 hover:rounded-sm transition" role="menuitem" tabIndex="-1" id="menu-item-0`}>
                                    {sort.criteria}
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </motion.div>
    )
}

export default SortDropDown

const SORTDATA=[
    { criteria:'Price low to high',apiParam:'consultingFee1', isSelected: false },
    { criteria:'Price high to low',apiParam:'consultingFee-1', isSelected: false },
    { criteria:'Year-of-experience low to high ',apiParam:'yearOfExperiance1', isSelected: false },
    { criteria:'Year-of-experience high to low ',apiParam:'yearOfExperiance-1', isSelected: false },
  ]