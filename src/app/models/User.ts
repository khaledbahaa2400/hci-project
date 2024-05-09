export class User {
    id: string
    username: string
    email: string
    password: string
    role: string
    year: number
    isActivated: boolean

    constructor(id: string, username: string, email: string, password: string, role: string, year: number, isActivated: boolean) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.year = year;
        this.isActivated = isActivated;
    }
}