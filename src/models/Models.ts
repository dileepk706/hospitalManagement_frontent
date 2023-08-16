 export type DoctorType = {
    _id:string;
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
export type AddressType={
    houseNo:string;
    city:string;
    state:string;
    country:string
}
export type UserType = {
    _id:string;
    name?:string;
    email: string;
    password: string;
    phone: string;
    image: string;
    address: AddressType;
    dob: string;
    desease:[];
    isBlocked:boolean;
    isMailVarified: boolean;
    sex:string;
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
export type Appointment={
    _id:string;
    user:string;
    doctor:DoctorType;
    isConsulted:boolean;
    status:'pending'|'cancelled'|'notConsulted';
    scheduledAt:slots
    paymentStatus:'pending' | 'success';
    consultingFee:number;
}