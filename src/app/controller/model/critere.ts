import {Campagne} from "./campagne";

export class Critere {
    public idcritere: number;
    public nomCritere: string;
    public valPositive: string;
    public valNegative: string;
    public actif: boolean;
    public poids: number;
    public campagne= new Campagne();
}
