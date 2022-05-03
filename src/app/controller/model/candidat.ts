import {Critere} from "./critere";
import {Campagne} from "./campagne";
import {Statut} from "./statut";

export class Candidat {
    public idcandidat: number;
    public nomCandidat: string;
    public prenomCandidat: string;
    public emailCandidat: string;
    public telephone: string;
    public cv: string;
    public reussiSelectionAuto: number;
    public commentaire1: string;
    public commentaire2: string;
    public commentaire3: string;
    public commentaire4: string;
    public Score: number;
    public IsCreatedBy: string;
    public campagne= new Campagne();
    public statut= new Statut();

}
