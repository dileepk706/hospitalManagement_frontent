 export type DoctorType = {
    _id:string;
    name?:string;
    email: string;
    password: string;
    phone: string;
    image: string;
    address: string;
    dob: string;
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
    reviews:Review[]
    rating:number
}

export interface Review  {
    rating:number
    comment:string
    patient:UserType
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
    phone: string;
    image: string;
    address: AddressType;
    dob: string;
    desease:string;
    isBlocked:boolean;
    isMailVarified: boolean;
    sex:string;
    wallet?:number
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
    user:UserType;
    doctor:DoctorType;
    isConsulted:boolean;
    status:'consulted'|'cancelled'|'notConsulted'|'cancellation-requested';
    scheduledAt:slots
    paymentStatus:'pending' | 'success';
    consultingFee:number;
}
export interface Prescription {
    doctor: DoctorType;
    patient: UserType;
    date: string;
    prescriptionNumber?: string;
    medicines:Medicine[]
  }

  export interface Medicine{
    medicineName: string;
    purpose: string;
    dosage: string;
    frequency: string;
  }
 