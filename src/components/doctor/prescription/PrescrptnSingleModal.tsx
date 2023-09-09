import React,{useRef} from 'react'
import './style.css';
import { Prescription } from '../../../types/Models';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import logo from '../../../assets/images/logo.png'
import { Download } from '@mui/icons-material';

type PrescrptnSingleModalProp={
	singlePrescription: Prescription | undefined
	setiSinglePrescrption?: React.Dispatch<React.SetStateAction<Prescription | undefined>>
	setPrescrptnSingleModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const  PrescrptnSingleModal:React.FC<PrescrptnSingleModalProp>=({singlePrescription,setPrescrptnSingleModalOpen,setiSinglePrescrption})=> {

	const pdfRef = useRef<HTMLDivElement>(null);

	const downloadPrescriptionHandler = () => {
	  const input = pdfRef.current;
	  if (input) {
		html2canvas(input)
		  .then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'px', 'a4' );
			var width = pdf.internal.pageSize.getWidth();
			var height = pdf.internal.pageSize.getHeight();
  
			pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
			pdf.save('prescription.pdf');
		  });
	  }
	};

  return (
	  <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60'>

		  <button
		  	  onClick={()=>{
				setPrescrptnSingleModalOpen(false)
				if(setiSinglePrescrption){
				setiSinglePrescrption(undefined)
				}
			}}
			  className='bg-gray-600 border border-white absolute text-white px-4 py-2 rounded hover:bg-gray-600 top-[10%] right-[5%] '>
			  Close
		  </button>

		  <div className=' absolute top-[2%] left[49%] '>
			  <Button  startIcon={<Download />} variant='contained' color='primary'
				  onClick={downloadPrescriptionHandler}
			  >
				  Dowload File
			  </Button>
		  </div>


		  <div className='bg-white p-6 rounded shadow-md w-[60%] h-[80%] overflow-y-scroll relative'>


			  <div ref={pdfRef} className="flex flex-col gap-2 w-full border border-gray-700 p-[2%]">

				  <div className='flex items-center w-full justify-between '>

					  <div className='max-w-[112px] p-5 '>
						  <div className='w-full'>
							  <img src={logo} className='w-full' alt="" />

						  </div>
					  </div>
					  <div className='flex items-center justify-center mr-[36px]  '>
						  <div className='flex flex-col gap-2 '>
							  <h4 className='text-xl font-semibold'>Dr. {singlePrescription?.doctor.name}</h4>
							  <h5 className='text-gray-600'>Email: {singlePrescription?.doctor.email}</h5>
							  <h5 className='text-gray-600'>Phone: {singlePrescription?.doctor.phone}</h5>
							  <h5 className='text-gray-600'>Designation: {singlePrescription?.doctor.designation}</h5>
							  <h5 className='text-gray-600'>Department: {singlePrescription?.doctor.department.departmentName}</h5>
						  </div>
					  </div>
				  </div>
				  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

				  <div className='flex flex-col gap-2'>

					  <h1 className='my-[10px] font-bold text-lg '>Patient information</h1>


					  <div className='flex gap-10 items-center justify-start'>
						  <div>
							  <div className='flex gap-1 my-1 ' >
								  <h2 className="font-medium">name : </h2>
								  <p className="text-gray-600">{singlePrescription?.patient.name}</p>
							  </div>
							  <div className='flex gap-1  my-1'  >
								  <h2 className="font-medium">Age : </h2>
								  <p className="text-gray-600">{singlePrescription?.patient.dob}</p>
							  </div>
						  </div>
						  <div>
							  <div className='flex gap-1  my-1' >
								  <h2 className="font-medium">Emal : </h2>
								  <p className="text-gray-600">{singlePrescription?.patient.email}</p>
							  </div>

							  <div className='flex gap-1  my-1' >
								  <h2 className="font-medium">Gender : </h2>
								  <p className="text-gray-600">{singlePrescription?.patient.sex}</p>
							  </div>
						  </div>

					  </div>
				  </div>
				  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

				  <div className=''>

					  <h1 className='my-[10px] font-bold text-lg '>List of prescrbed medications</h1>



					  <p className='font-light my-2 '> Date : {singlePrescription?.date} </p>

					  <div className="relative overflow-x-auto shadow-md my-4 sm:rounded-lg">
						  <table className="w-full text-sm text-left text-black ">
							  <thead className="text-xs uppercase bg-sky-200 ">

								  <tr>
									  <th scope="col" className="px-6 py-3">
										  Medicine name
									  </th>
									  <th scope="col" className="px-6 py-3">
										  Purpose
									  </th>
									  <th scope="col" className="px-6 py-3">
										  Doage
									  </th>
									  <th scope="col" className="px-6 py-3">
										  Freaquwncy
									  </th>
								  </tr>

							  </thead>

							  <tbody>
								  {
									  singlePrescription?.medicines.map((e, i) => (
										  <tr  key={i} className="bg-sky-50 border-b border-blue-400">

											  <td className="px-6 py-4 ">
												  {e.medicineName}
											  </td>
											  <td className="px-6 py-4">
												  {e.purpose}
											  </td>
											  <td className="px-6 py-4">
												  {e.dosage}
											  </td>
											  <td className="px-6 py-4">
												  {e.frequency}
											  </td>

										  </tr>
									  ))
								  }
								  

							  </tbody>
						  </table>
					  </div>



				  </div>

			  </div>
		  </div>
	  </div>


 
  )
}

export default PrescrptnSingleModal
