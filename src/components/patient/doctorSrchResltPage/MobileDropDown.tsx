import { useState,useEffect ,useRef} from 'react';
import {motion} from 'framer-motion'

const MobileDropDown=()=>{
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showDropdown,setShowDropdown]=useState('hidden')
    const [priceRange, setPriceRange] = useState([
        { from: 100, to: 299, isSelected: false },
        { from: 300, to: 599, isSelected: false },
        { from: 600, to: 999, isSelected: false },
        { from: 1000, to: 'above', isSelected: false }
      ])
      const [Genders, setGenders] = useState([
        { gender:'Male Doctor', isSelected: false },
        { gender:'Female Doctor' ,isSelected: false },
  
      ])
      const [ratings, setRatings] = useState([
        { rating:'2 to 2.9', isSelected: false },
        { rating:'3 to 3.9', isSelected: false },
        { rating:'4 and above', isSelected: false },
      ])
      const changeIsSelectedForRatings=(position:number)=>{
          const updatedPriceRange=ratings?.map((item,i)=>{
            if(item.isSelected) return {...item,isSelected:false}
            return i===position?{...item,isSelected:true}:{...item}
          })
          setRatings(updatedPriceRange)
        }
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
        const changeIsSelectedForPrice=(position:number)=>{
          const updatedPriceRange=priceRange?.map((item,i)=>{
            if(item.isSelected) return {...item,isSelected:false}
            return i===position?{...item,isSelected:true}:{...item}
          })
          setPriceRange(updatedPriceRange)
        }

        const changeIsSelectedForGender=(position:number)=>{
            const updatedPriceRange=Genders?.map((item,i)=>{
              if(item.isSelected) return {...item,isSelected:false}
              return i===position?{...item,isSelected:true}:{...item}
            })
            setGenders(updatedPriceRange)
          }
      useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);
    return(
        <motion.div //animation
        initial={{y:100,opacity:0,scale:0.7}}
        animate={{y:0,opacity:1,scale:1}}
        transition={{delay:1.8,duration:0.6,ease:'easeOut'}}
        ref={dropdownRef} className="inline-block relative text-left md:hidden shadow-[0_10px_25px_rgba(8,_112,_184,_0.7)]">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={changeDropdownOpen}
                >
                    Filters
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

            <div className={`${showDropdown} absolute   right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                    <h1 className=' text-gray-900 mt-5 text-center font-mono font-bold block px-4 py-2 text-sm cursor-pointer hover:rounded-sm transition" role="menuitem" tabIndex="-1"'>Filter by fee range</h1>
                    {
                        priceRange?.map((ranges, i) => {
                            return (
                                <div onClick={() => {
                                    changeDropdownOpen()
                                    changeIsSelectedForPrice(i)
                                }} className={`${ranges.isSelected && 'bg-sky-300'} text-gray-700  font-mono  block px-4 py-2 text-sm cursor-pointer hover:bg-sky-200 hover:rounded-sm transition" role="menuitem" tabIndex="-1" id="menu-item-0`}>
                                    ₹{ranges.from} to ₹{ranges.to}
                                </div>
                            )
                        })
                    }

                </div>
                <div className="py-1" role="none">
                    {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                    <h1 className=' text-gray-900 mt-5 text-center font-mono font-bold block px-4 py-2 text-sm cursor-pointer hover:rounded-sm transition" role="menuitem" tabIndex="-1"'>Filter by Gender</h1>
                    {
                        Genders?.map((gender, i) => {
                            return (
                                <div onClick={() => {
                                    changeDropdownOpen()
                                    changeIsSelectedForGender(i)
                                }} className={`${gender.isSelected && 'bg-sky-300'} text-gray-700  font-mono  block px-4 py-2 text-sm cursor-pointer hover:bg-sky-200 hover:rounded-sm transition" role="menuitem" tabIndex="-1" id="menu-item-0`}>
                                    {gender.gender}
                                </div>
                            )
                        })
                    }

                </div>
                <div className="py-1" role="none">
                    {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                    <h1 className=' text-gray-900 mt-5 text-center font-mono font-bold block px-4 py-2 text-sm cursor-pointer hover:rounded-sm transition" role="menuitem" tabIndex="-1"'>Filter by Ratings</h1>
                    {
                        ratings?.map((rating, i) => {
                            return (
                                <div onClick={() => {
                                    changeDropdownOpen()
                                    changeIsSelectedForRatings(i)
                                }} className={`${rating.isSelected && 'bg-sky-300'} text-gray-700  font-mono  block px-4 py-2 text-sm cursor-pointer hover:bg-sky-200 hover:rounded-sm transition" role="menuitem" tabIndex="-1" id="menu-item-0`}>
                                    {rating.rating}
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </motion.div>
    )
}
export default MobileDropDown
 