import { Material } from "./Material";

export class Course {
    id: string;
    name: string;
    instructor: string;
    hours: number;
    capacity: number;
    year: number;
    materials: Material[];
    isArchived:boolean;

    constructor(id: string, name: string, instructor: string, hours: number, capacity: number, year: number, materials: Material[] , isArchived:boolean) {
        this.id = id;
        this.name = name;
        this.instructor = instructor;
        this.hours = hours;
        this.capacity = capacity;
        this.year = year;
        this.materials = materials;
        this.isArchived = isArchived;
    }
}