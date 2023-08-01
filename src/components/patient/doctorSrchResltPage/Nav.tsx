import GenderDropDown from "./GenderDropDown"
import MobileDropDown from "./MobileDropDown"
import PriceDropDown from "./PriceDropDown"
import RatingDropdown from "./RatingDropDown"
import SortDropDown from "./SortDropDown"


const Nav=()=>{
    
    return(
        <div style={{boxShadow: "0 20px 50px rgba(46, 224, 240, 0.7)",background:'linear-gradient(90deg, rgba(0,187,241,1) 0%, rgba(31,197,255,0.7511379551820728) 50%, rgba(3,247,228,0.3981967787114846) 100%)'}}
        className="w-full z-10 p-2 them sticky top-0 rounded-md flex justify-center gap-5">
            <PriceDropDown/>
            <GenderDropDown/>
            <RatingDropdown/>
            <SortDropDown/>
            <MobileDropDown/>
        </div>
    )
}
export default Nav