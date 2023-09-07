import React, { useState, useEffect } from 'react'
import { DoctorType, UserType } from '../../../types/Models'
import { getAllDoctor, getAllpatient } from '../../../services/admin/adminApi'
import { checkAdminAuth } from '../../../utils/chekAuth'
import DropDown from '../../dropdown/Dropdown'
import SearchInput from '../../searchBar/SearchInput'
import DoctorTable from './DoctorTable'

function DoctorListWrapper() {
    const [doctors, setDoctor] = useState<DoctorType[] | null>(null)
    const [searchInpt, setearchinpt] = useState('')
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [sex, setSex] = useState('')
    const [gte, setGte] = useState('')
    const [lte, setLte] = useState('')
    const [sort, setSort] = useState('')
    const [singlePatient, setSinglePatient] = useState<UserType | undefined>(undefined)
    const [singlePatientView, setSinglePatientView] = useState(false)

    const sortOptions = [
        {
            option: 'Price high to low',
            isSelected: false
        },
        {
            option: 'Price low to high',
            isSelected: false
        },
        {
            option: 'Experiance high to low',
            isSelected: false
        },
        {
            option: 'Experiance Low to High',
            isSelected: false
        }
    ]
    const gender = [
        {
            option: 'male',
            isSelected: false
        },
        {
            option: 'female',
            isSelected: false
        }
    ]

    const price = [
        {
            option: 'price 100 to 199',
            isSelected: false
        },
        {
            option: 'price 200 to 399',
            isSelected: false
        },
        {
            option: 'price 400 to 599',
            isSelected: false
        },
        {
            option: 'price 600 to above ',
            isSelected: false
        }
        
        
    ]
    const getSortedData = async (sort: string) => {
        try {
            setSort(sort)
            if (sort === 'Price high to low') {
                sort = 'consultingFee-1'
            } else if (sort === 'Price low to high') {
                sort = 'consultingFee1'
            } else if (sort === 'Experiance high to low') {
                sort = 'yearOfExperiance-1'

            } else if (sort === 'Experiance Low to High') {
                sort = 'yearOfExperiance1'
            } else {
                sort = sort ? sort : ''
            }

            const doc: DoctorType[] = await getAllDoctor(name, department, sex, gte, lte, sort)
            console.log({ patients: doc })
            setDoctor(doc)
        } catch (error: any) {
            checkAdminAuth(error)
            // setApiError(error?.response?.data?.message)
            console.log('error : ', error?.response?.status);
        }

    }
    const getfilterbyGender = async (sex: string) => {
        try {
            setSex(sort)
            const doc: DoctorType[] = await getAllDoctor(name, department, sex, gte, lte, sort)
            console.log({ patients: doc })
            setDoctor(doc)
        } catch (error: any) {
            checkAdminAuth(error)
            // setApiError(error?.response?.data?.message)
            console.log('error : ', error?.response?.status);
        }

    }
    const getfilterbyPrice = async (price: string) => {
        let gte=''
        let lte=''
        try {
            if(price==='price 100 to 199'){
                setLte('100')
                setGte('199')
                gte='100'
                lte='199'

            }else if(price==='price 200 to 399'){
                setLte('200')
                setGte('399')
                gte='200'
                lte='399'
            }else if(price==='price 400 to 599'){
                setLte('400')
                setGte('599')
                gte='400'
                lte='599'
            }else if(price==='price 600 to above'){
                setLte('600')
                setGte('10000')
                gte='100'
                lte='199'
            }
            setGte(sort)
            const doc: DoctorType[] = await getAllDoctor(name, department, sex, gte, lte, sort)
            console.log({ patients: doc })
            setDoctor(doc)
        } catch (error: any) {
            checkAdminAuth(error)
            // setApiError(error?.response?.data?.message)
            console.log('error : ', error?.response?.status);
        }

    }

    const handleGetPateints = async (name?: string) => {
        try {
            name = name ? name : ''
            setName(name)
            const doctrs: DoctorType[] = await getAllDoctor(name, department, sex, gte, lte, sort)
            console.log({ patients: doctrs })
            setDoctor(doctrs)
        } catch (error: any) {
            checkAdminAuth(error)
            // setApiError(error?.response?.data?.message)
            console.log('error : ', error?.response?.status);
        }
    }
    useEffect(() => {

        handleGetPateints()
    }, [])
    return (
        <div className='flex flex-col gap-5'>
            <div className="w-full z-10 p-2  sticky top-0 rounded-md flex justify-start gap-5" >
                <SearchInput handleSearch={handleGetPateints} />

                <DropDown
                    name='Sort'
                    options={sortOptions}
                    getdataByfilter={getSortedData}
                />
                <DropDown
                    name='Gender'
                    options={gender}
                    getdataByfilter={getfilterbyGender}
                />
                <DropDown
                    name='Price'
                    options={price}
                    getdataByfilter={getfilterbyPrice}
                />
            </div>

            <DoctorTable doctors={doctors} setDoctor={setDoctor} />
        </div>


    )
}

export default DoctorListWrapper
