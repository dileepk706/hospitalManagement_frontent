import { useState } from 'react'
import { Chip } from "@mui/material"
import DoctorCard from "./DoctorCard"
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useEffect } from 'react'
import { changeSex, changeSort, change_Gte_Lte } from '../../../redux/patient/doctorSearchParams'
import { searchAllDoctorsBy_name_deprtmnt_health } from '../../../services/patients/doctorapi'
import { insertDoctors } from '../../../redux/patient/doctorsDataSlicer'
import { motion } from 'framer-motion'
import { LoadingSpinner } from '../../LodingSpinner'

const DoctorsListAria = () => {
    // const [searchResltDoctors,setFetchDoctors]=useState([1,2,4,5])
    
    const dispatch = useAppDispatch()
    const [priceFilter, setPriceFilter] = useState<string | undefined>(undefined);
    const [sexFilter, setSexFilter] = useState<string | undefined>(undefined);
    const [sortedBy, seSortedBy] = useState<string | undefined>(undefined)
    const [isLoading,setIsLoading]=useState(false)
    const searchResltDoctors = useAppSelector(state => state.doctors)
    const applidFilters = useAppSelector(state => state.searchParameteres)

    useEffect(() => {
        let pricefilter = applidFilters.gte && applidFilters.lte ? `Price ${applidFilters.gte} to ${applidFilters.lte}` : undefined
        let sexfilter = applidFilters.sex ? `${applidFilters.sex} Doctor` : undefined
        if (pricefilter) setPriceFilter(pricefilter)
        if (sexfilter) setSexFilter(sexfilter)

        if (applidFilters.sort) {
            let srtdBy = undefined
            if (applidFilters.sort === 'consultingFee1') srtdBy = 'Price low to high'
            if (applidFilters.sort === 'consultingFee-1') srtdBy = 'Price high to low'
            if (applidFilters.sort === 'yearOfExperiance1') srtdBy = 'experience low to high '
            if (applidFilters.sort === 'yearOfExperiance-1') srtdBy = 'experience high to low '
            seSortedBy(srtdBy)
        }
    }, [applidFilters])

    const removeFiltersAndSort = async (filed: string) => {
        let docters = []
        const { department, name, sex, gte, lte, sort } = applidFilters
        if (filed === 'sort') {
            seSortedBy(undefined)
            dispatch(changeSort(''))
            docters = await searchAllDoctorsBy_name_deprtmnt_health('', name, department, sex, gte, lte, '')
            dispatch(insertDoctors(docters))
        }
        if (filed === 'price') {
            setPriceFilter(undefined)
            dispatch(change_Gte_Lte({ gte: '', lte: '' }))
            docters = await searchAllDoctorsBy_name_deprtmnt_health(sort, name, department, sex, '', '', '')
            dispatch(insertDoctors(docters))
        }
        if (filed === 'sex') {
            setSexFilter(undefined)
            dispatch(changeSex(''))
            docters = await searchAllDoctorsBy_name_deprtmnt_health(sort, name, department, '', gte, lte, '')
            dispatch(insertDoctors(docters))
        }
    }
    return (
        <div className="w-full flex gap-1 pt-[5%] pb-[5%] ">
            <div className="w-2/3 flex flex-col justify-center">
                <div className="w-full">
                    <h1 className="site-txt-color text-start font-bold text-xl  font-mono  md:mb-[6px]   md:text-2xl">{searchResltDoctors?.length} doctors available</h1>
                    <p className="text-sm hidden font-mono text-gray-500 text-start md:text-sm md:block"> Verified doctor details Book appointments with minimum wait-time</p>
                </div>
                <div className="w-full  mx-auto flex flex-col mt-[41px]">
                    {isLoading?<LoadingSpinner/>:searchResltDoctors?.map((doc, i: number) => (
                        <DoctorCard
                            DoctorName={doc.name}
                            cunsultingFee={doc.consultingFee}
                            department={doc.department}
                            experience={doc.yearOfExperiance}
                            rating={doc.rating}
                            review={doc.review}
                            image={doc.image}
                            key={i} />
                    ))}
                </div>

            </div>


            <div className="flex flex-col justify-start w-1/3 h-full  fixed right-0">
                <div className="flex flex-col justify-start">
                    <h1 className="text-start mt-3 mb-3 font-semibold text-lg font-mono leading-tight truncate txt-them">Applied Filters</h1>
                    <div className="flex flex-col gap-1 ">
                        {priceFilter &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className='w-auto'> <Chip label={priceFilter} variant="outlined" size="small" onDelete={() => removeFiltersAndSort('price')} />
                            </motion.div>}
                        {sexFilter &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className='w-auto'><Chip label={sexFilter} variant="outlined" size="small" onDelete={() => removeFiltersAndSort('sex')} />
                            </motion.div>}
                    </div>
                </div>

                <div className="flex flex-col justify-start">
                    <h1 className="text-start mt-3 mb-3 font-semibold text-lg font-mono leading-tight truncate txt-them">Sorted by</h1>
                    <div className="flex flex-col gap-1 ">
                        {sortedBy &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className='w-auto'> <Chip label={sortedBy} variant="outlined" size="small" onDelete={() => removeFiltersAndSort('sort')} />
                            </motion.div>}
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default DoctorsListAria

