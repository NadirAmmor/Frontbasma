import {Statut} from "./statut";

export class Campagne {
    public idcampagne: number;
    public nomCampagne: string;
    public description: string;
    public image: string;
    public dateDebut = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+ new Date().getDay();
    public dateFin= new Date().getFullYear()+"-"+new Date().getMonth()+"-"+ new Date().getDay();
    public seuil: number;
}
