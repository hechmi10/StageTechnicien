import { Role } from "./role";

export class Employee{
    id?:number;
    name?:string;
    surname?:string;
    email?:string;
    password?:string;
    role?:Role;
    conges?:any[];
    absences?:any[];
    evaluation:any;
    autorisations?:any[];
    retards?:any[];
}