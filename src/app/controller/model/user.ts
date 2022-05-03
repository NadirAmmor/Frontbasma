import {Profile} from "./profile";

export class User {
    public iduser: number;
    public nomUser: string;
    public username: string;
    public password: string;
    public prenomUser: string;
    public emailUser: string;
    public accountNonExpired = true;
    public credentialsNonExpired = true;
    public accountNonLocked = true;
    public enabled = true;
    public authorities: [];
    public  role = 'Role';
}
