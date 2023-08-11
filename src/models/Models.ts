 export type DoctorType = {
    name?:string;
    email: string;
    password: string;
    phone: string;
    image: string;
    address: string;
    dob: Date;
    isBlocked:boolean;
    isMailVarified: boolean;
    sex:string;
    designation:string;
    department:{
        departmentName:string
    };
    yearOfExperiance:number;
    biography:string;
    consultingFee:number;
    rating:number
}


export type Slot={
    _id:string
    doctor:string;
    slotes:slots[]
    created_at: Date
}
export type slots={
    slot_time: string;
    slot_date: string;
    isBooked?:boolean
    _id:string
}