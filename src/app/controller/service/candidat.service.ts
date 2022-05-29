import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Candidat} from "../model/candidat";
import {Observable} from "rxjs";
import {Campagne} from "../model/campagne";
import {Critere} from "../model/critere";
import {CandidatResponseCritere} from "../model/candidat-response-critere";

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
    private _submitted: boolean;
    private _submittedNewCandidat: boolean;
    private _createDialogCandidat: boolean;
    private _createDialogCandidatRespCriter: boolean;
    private _ViewCandidat: boolean;
    private _editDialogCandidat: boolean;
    private _createDialogNewCandidat: boolean;
    private _createDialogCandidatResp: boolean;
    private _candidat: Candidat;
    private _candidatVerifie: Candidat;
    private _criter: Critere;
    private _criterResCandidat: CandidatResponseCritere;
    private _ListcriterResCandidat: Array<CandidatResponseCritere>;
    private _ArraycriterResCandidat: Array<CandidatResponseCritere>;
    private _Listcriter: Array<Critere>;
    private _Campagnecandidat: Campagne;
    private _Selectedcandidat: Candidat;
    private _CandidatList: Array<Candidat>;
    private _CandidatItems: Array<Candidat>;
    private _url = environment.baseUrl;
    constructor(private http: HttpClient) { }


    get createDialogCandidatResp(): boolean {
        return this._createDialogCandidatResp;
    }

    set createDialogCandidatResp(value: boolean) {
        this._createDialogCandidatResp = value;
    }

    get ArraycriterResCandidat(): Array<CandidatResponseCritere> {
        if (this._ArraycriterResCandidat==null){
            this._ArraycriterResCandidat= new Array<CandidatResponseCritere>();
        }
        return this._ArraycriterResCandidat;
    }

    set ArraycriterResCandidat(value: Array<CandidatResponseCritere>) {
        this._ArraycriterResCandidat = value;
    }

    get ListcriterResCandidat(): Array<CandidatResponseCritere> {
        if (this._ListcriterResCandidat==null){
            this._ListcriterResCandidat= new Array<CandidatResponseCritere>();
        }
        return this._ListcriterResCandidat;
    }

    set ListcriterResCandidat(value: Array<CandidatResponseCritere>) {
        this._ListcriterResCandidat = value;
    }

    get criterResCandidat(): CandidatResponseCritere {
        if (this._criterResCandidat==null){
            this._criterResCandidat= new CandidatResponseCritere();
        }
        return this._criterResCandidat;
    }

    set criterResCandidat(value: CandidatResponseCritere) {
        this._criterResCandidat = value;
    }

    get ViewCandidat(): boolean {
        return this._ViewCandidat;
    }

    set ViewCandidat(value: boolean) {
        this._ViewCandidat = value;
    }

    get Campagnecandidat(): Campagne {
        if (this._Campagnecandidat==null){
            this._Campagnecandidat=new Campagne();
        }
        return this._Campagnecandidat;
    }

    set Campagnecandidat(value: Campagne) {
        this._Campagnecandidat = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }
    get submittedNewCandidat(): boolean {
        return this._submittedNewCandidat;
    }

    set submittedNewCandidat(value: boolean) {
        this._submittedNewCandidat = value;
    }

    get createDialogCandidat(): boolean {
        return this._createDialogCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this._createDialogCandidat = value;
    }
    get createDialogCandidatRespCriter(): boolean {
        return this._createDialogCandidatRespCriter;
    }

    set createDialogCandidatRespCriter(value: boolean) {
        this._createDialogCandidatRespCriter = value;
    }
    get createDialogNewCandidat(): boolean {
        return this._createDialogNewCandidat;
    }

    set createDialogNewCandidat(value: boolean) {
        this._createDialogNewCandidat = value;
    }

    get editDialogCandidat(): boolean {
        return this._editDialogCandidat;
    }

    set editDialogCandidat(value: boolean) {
        this._editDialogCandidat = value;
    }

    get candidat(): Candidat {
        if (this._candidat== null){
            this._candidat=new Candidat();
        }
        return this._candidat;
    }

    set candidat(value: Candidat) {
        this._candidat = value;
    }

    get candidatVerifie(): Candidat {
        if (this._candidatVerifie== null){
            this._candidatVerifie=new Candidat();
        }
        return this._candidatVerifie;
    }

    set candidatVerifie(value: Candidat) {
        this._candidatVerifie = value;
    }

    get Selectedcandidat(): Candidat {
        if (this._Selectedcandidat== null){
            this._Selectedcandidat=new Candidat();
        }
        return this._Selectedcandidat;
    }

    set Selectedcandidat(value: Candidat) {
        this._Selectedcandidat = value;
    }

    get CandidatList(): Array<Candidat> {
        if (this._CandidatList== null){
            this._CandidatList=new Array<Candidat>();
        }
        return this._CandidatList;
    }

    set CandidatList(value: Array<Candidat>) {
        this._CandidatList = value;
    }

    get CandidatItems(): Array<Candidat> {
        if (this._CandidatItems== null){
            this._CandidatItems=new Array<Candidat>();
        }
        return this._CandidatItems;
    }

    set CandidatItems(value: Array<Candidat>) {
        this._CandidatItems = value;
    }

    get criter(): Critere {
        if (this._criter==null){
            this._criter=new Critere();
        }
        return this._criter;
    }

    set criter(value: Critere) {
        this._criter = value;
    }

    get Listcriter(): Array<Critere> {
        if (this._Listcriter==null){
            this._Listcriter=new Array<Critere>();
        }
        return this._Listcriter;
    }

    set Listcriter(value: Array<Critere>) {
        this._Listcriter = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
    public addCandidat(): Observable<Candidat> {

        return this.http.post<Candidat>(this.url + 'Candidat/',this.candidat);

    }
    public addCandidatRespCriter(): Observable<CandidatResponseCritere> {

        return this.http.post<CandidatResponseCritere>(this.url + 'CandidatRespCritere/',this.criterResCandidat);

    }
    public getCandidat(): Observable<Array<Candidat>> {
    let a =true;
        return this.http.get<Array<Candidat>>(this.url + 'Candidat/ListCandidatId/'+this.Campagnecandidat.idcampagne+'/reussite/'+a);

    }

    public verfieThisCandidat(): Observable<Candidat> {

        return this.http.get<Candidat>(this.url + 'Candidat/Candidatprenom/'+this.candidat.prenomCandidat+"/nom/"+this.candidat.nomCandidat+"/id/"+this.Campagnecandidat.idcampagne);

    }
    public getThisCandidat(): Observable<Candidat> {

        return this.http.get<Candidat>(this.url + 'Candidat/Candidatprenom/'+this.criterResCandidat.candidat.prenomCandidat+"/nom/"+this.criterResCandidat.candidat.nomCandidat+"/id/"+this.Campagnecandidat.idcampagne);

    }
    public getThisCandidatResp(id: number): Observable<Array<CandidatResponseCritere>> {

        return this.http.get<Array<CandidatResponseCritere>>(this.url + 'CandidatRespCritere/idCand/'+id+"/idCamp/"+this.Campagnecandidat.idcampagne);

    }
    public getAllCriter(cm: Campagne): Observable<Array<Critere>> {

        return this.http.get<Array<Critere>>(this.url + 'Critere/listCritere/'+cm.idcampagne);

    }
}
