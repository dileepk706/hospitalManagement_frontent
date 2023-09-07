import { People, PeopleAltRounded } from '@mui/icons-material'
import React from 'react'

type CardProps={
    title:string
    data:number|string
    perc?:number|string
}
const SoftCard:React.FC<CardProps>=({data,title,perc})=> {
  return (
    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-lg shadow-sky-500 rounded-2xl bg-clip-border">
    <div className="flex-auto p-4">
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-2/3 max-w-full px-3">
          <div>
            <p className="mb-0 font-sans font-semibold leading-normal text-sm">{title}</p>
            <h5 className="mb-0 font-bold">
             {data}
              <span className="leading-normal text-sm font-weight-bolder text-lime-500">+{perc}</span>
            </h5>
          </div>
        </div>
        <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
          <div className="inline-block w-12 h-12 my-auto text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
            {/* <PeopleAltRounded/> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SoftCard
