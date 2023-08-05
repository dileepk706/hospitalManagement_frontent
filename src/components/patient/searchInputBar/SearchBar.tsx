import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { Search} from '@mui/icons-material';
import { fetchAllDoctersByHealthIssue, fetchAllDoctorDepatmentHealthNames, fetchAllDoctorsBy_name_deprtmnt_health } from '../../../services/patients/HeathAndDeprtmnt';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { searchAllDoctorsBy_name_deprtmnt_health } from '../../../services/patients/doctorapi';
import { insertDoctors } from '../../../redux/patient/doctorsDataSlicer';
import { useAppDispatch } from '../../../redux/hooks';
import { changeDepartment, changeName, changeSex, change_Gte_Lte } from '../../../redux/patient/doctorSearchParams';

const SearchBarAutocomplete: React.FC = () => {

  const disptch=useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation();
  const path = location.pathname;
  const [input, setInput] = useState<string>('');
  const [doctor_department_health_names, setDoctor_department_health_names] = useState([])
  const [result, setResult] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null); // Add type assertion for listRef


  useEffect(() => {
    const getAllDoctorDepatmentHealthNames = async () => {
      const data = await fetchAllDoctorDepatmentHealthNames()
      console.log(data);
      
      setDoctor_department_health_names(data)
    }
    getAllDoctorDepatmentHealthNames()
  }, [])

  const handleChange = async (value: string) => { //change the input value
    setInput(value);
    const filteredData = doctor_department_health_names?.filter((e: any) => {
      return e?.name?.toLowerCase().startsWith(value.toLowerCase());
    });
    setResult(filteredData);
  };

  useEffect(() => {// Hide the list if the click is outside of it
    document.addEventListener('click', () => setResult([]))
  }, []);


  //searching the doctor from backend
  const searchDoctors = async (searchQuery: any) => {
    setInput(searchQuery?.name)
    let docters = []
    if (searchQuery?.feild === 'Health issue') {
      docters = await fetchAllDoctersByHealthIssue(searchQuery?.name)
      disptch(insertDoctors(docters))
      path !== '/doctors' && navigate('/doctors', { state: { data: searchQuery } })
      return
    }
    let name = searchQuery?.feild === 'Doctor' ? searchQuery?.name : ''
    let department = searchQuery?.feild === 'Department' ? searchQuery?._id : ''
    //whenthe searching all other filters should be empty
    disptch(changeDepartment(''))
    disptch(changeSex(''))
    disptch(change_Gte_Lte({gte:'',lte:''}))

    docters = await searchAllDoctorsBy_name_deprtmnt_health('', name, department, '', '', '','')
    
    disptch(insertDoctors(docters))
    //change the ssearch parameter globaly 
    disptch(changeName(name))
    disptch(changeDepartment(department))
    path !== '/doctors' && navigate('/doctors', { state: { data: searchQuery } })
  }

  return (
    <div className='flex flex-col relative w-3/4 '>
      <div style={{ boxShadow: '0px 0px 8px #ddd' }} className='w-full h-9 border-none px-2.5 rounded-md bg-white flex items-center'>
        <Search />
        <input placeholder='Search doctors, deaprtment, health issues...' value={input} onChange={(e) => handleChange(e.target.value)} />
      </div>
      <div ref={listRef} style={{ boxShadow: '0px 0px 8px #ddd' }} className='absolute mt-11 w-full bg-white flex flex-col rounded-lg max-h-80 overflow-auto custom-scrollbar z-50'>
        {result?.map?.((res: any, id: number) => {
          return (
            <div onClick={() => searchDoctors(res)} className='search-result flex justify-between' key={id}>
              <h1 className='font-bold'>{res?.name}</h1>
              <p className='text-sm site-txt-color'>{res?.feild}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBarAutocomplete;




