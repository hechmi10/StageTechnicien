import { Employee } from "./employee";

export class Absence{
    id?: number;
    employee?: Employee;
    dateDebut?: Date;
    dateFin?: Date;
    nbJours?: number;
    raison?: string;

}