export class Material {
    id: string;
    name: string;
    type: string
    file: string
    week: number;
    isDone: { [key: string]: boolean };

    constructor(id: string, name: string, type: string, file: string, week: number, isDone: { [key: string]: boolean }) {
        this.id = id;
        this.name = name;
        this.type = type
        this.file = file;
        this.week = week;
        this.isDone = isDone;
    }
}