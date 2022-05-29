import {Campagne} from "./campagne";
import {Candidat} from "./candidat";
import {Critere} from "./critere";

export class CandidatResponseCritere {
    public idcandidatResponseCritere: number;
    public response: string;
    public critere= new Critere();
    public candidat= new Candidat();
    public campagne= new Campagne();
}
