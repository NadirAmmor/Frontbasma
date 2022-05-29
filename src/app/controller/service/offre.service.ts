import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Campagne} from "../model/campagne";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Critere} from "../model/critere";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class OffreService {
    private _url = environment.baseUrl;
    private _Campagme: Campagne;
    private _SelectedCampagme: Campagne;
    private _CampagmeCritere: Campagne;
    private _CampagmeCandidat: Campagne;
    private _ListCampagme: Array<Campagne>;
    private _List5Campagme: Array<Campagne>;
    private _ItemsCampagme: Array<Campagne>;
    private _submitted: boolean;
    private _submittedCampagne: boolean;
    private _submittedEditCampagne: boolean;
    private _submittedCritere: boolean;
    private _submittedNewCritere: boolean;
    private _createDialog: boolean;
    private _editDialogCampagne: boolean;
    private _editDialogCritere: boolean;
    private _createDialogCritere: boolean;
    private _createDialogNewCritere: boolean;
    private _critere: Critere;
    private _Selectedcritere: Critere;
    private _critereList: Array<Critere>;
    private _critereItems: Array<Critere>;
    constructor(private http: HttpClient) { }


    get editDialogCampagne(): boolean {
        return this._editDialogCampagne;
    }

    set editDialogCampagne(value: boolean) {
        this._editDialogCampagne = value;
    }get editDialogCritere(): boolean {
        return this._editDialogCritere;
    }

    set editDialogCritere(value: boolean) {
        this._editDialogCritere = value;
    }

    get submittedCritere(): boolean {
        return this._submittedCritere;
    }

    set submittedCritere(value: boolean) {
        this._submittedCritere = value;
    }

    get createDialogCritere(): boolean {
        return this._createDialogCritere;
    }

    set createDialogCritere(value: boolean) {
        this._createDialogCritere = value;
    }

    get submittedNewCritere(): boolean {
        return this._submittedNewCritere;
    }

    set submittedNewCritere(value: boolean) {
        this._submittedNewCritere = value;
    }

    get createDialogNewCritere(): boolean {
        return this._createDialogNewCritere;
    }

    set createDialogNewCritere(value: boolean) {
        this._createDialogNewCritere = value;
    }

    get critere(): Critere {
        if (this._critere==null){
            this._critere= new Critere();
        }
        return this._critere;
    }

    set critere(value: Critere) {
        this._critere = value;
    }
    get Selectedcritere(): Critere {
        if (this._Selectedcritere==null){
            this._Selectedcritere= new Critere();
        }
        return this._Selectedcritere;
    }

    set Selectedcritere(value: Critere) {
        this._Selectedcritere = value;
    }

    get critereList(): Array<Critere> {
        if (this._critereList==null){
            this._critereList= new Array<Critere>();
        }
        return this._critereList;
    }

    set critereList(value: Array<Critere>) {
        this._critereList = value;
    }

    get CampagmeCandidat(): Campagne {
        return this._CampagmeCandidat;
    }

    set CampagmeCandidat(value: Campagne) {
        this._CampagmeCandidat = value;
    }

    get critereItems(): Array<Critere> {
        return this._critereItems;
    }

    set critereItems(value: Array<Critere>) {
        this._critereItems = value;
    }

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }
    get submittedCampagne(): boolean {
        return this._submittedCampagne;
    }

    set submittedCampagne(value: boolean) {
        this._submittedCampagne = value;
    }
get submittedEditCampagne(): boolean {
        return this._submittedEditCampagne;
    }

    set submittedEditCampagne(value: boolean) {
        this._submittedEditCampagne = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get Campagme(): Campagne {
        if(this._Campagme== null){
            this._Campagme = new Campagne();
        }
        return this._Campagme;
    }

    set Campagme(value: Campagne) {
        this._Campagme = value;
    }
    get SelectedCampagme(): Campagne {
        if(this._SelectedCampagme== null){
            this._SelectedCampagme = new Campagne();
        }
        return this._SelectedCampagme;
    }

    set SelectedCampagme(value: Campagne) {
        this._SelectedCampagme = value;
    }
    get CampagmeCritere(): Campagne {
        if(this._CampagmeCritere== null){
            this._CampagmeCritere = new Campagne();
        }
        return this._CampagmeCritere;
    }

    set CampagmeCritere(value: Campagne) {
        this._CampagmeCritere = value;
    }

    get ListCampagme(): Array<Campagne> {
        if(this._ListCampagme== null){
            this._ListCampagme = new Array<Campagne>();
        }
        return this._ListCampagme;
    }

    set ListCampagme(value: Array<Campagne>) {
        this._ListCampagme = value;
    }
    get List5Campagme(): Array<Campagne> {
        if(this._List5Campagme== null){
            this._List5Campagme = new Array<Campagne>();
        }
        return this._List5Campagme;
    }

    set List5Campagme(value: Array<Campagne>) {
        this._List5Campagme = value;
    }
    get ItemsCampagme(): Array<Campagne> {
        if(this._ItemsCampagme== null){
            this._ItemsCampagme = new Array<Campagne>();
        }
        return this._ItemsCampagme;
    }

    set ItemsCampagme(value: Array<Campagne>) {
        this._ItemsCampagme = value;
    }
    public FindAllCampagne(): Observable<Array<Campagne>> {
        return this.http.get<Array<Campagne>>(this.url + 'Campagne/All/');

    }
    public addOffre(): Observable<Campagne> {
        return this.http.post<Campagne>(this.url + 'Campagne/',this.Campagme);

    }
    public editOffre(): Observable<Campagne> {
        return this.http.put<Campagne>(this.url + 'Campagne/',this.SelectedCampagme);

    }
    public FindLast5(): Observable<Array<Campagne>> {
        return this.http.get<Array<Campagne>>(this.url + 'Campagne/last5/');

    }

    public FindCampagneCritere(): Observable<Array<Critere>> {
        return this.http.get<Array<Critere>>(this.url + 'Critere/listCritere/'+this.CampagmeCritere.idcampagne);

    }
    public AddCritere(): Observable<Critere> {
        return this.http.post<Critere>(this.url + 'Critere/',this.critere);

    }
    public EditCritere(): Observable<Critere> {
        return this.http.put<Critere>(this.url + 'Critere/',this.Selectedcritere);

    }
    public DeleteCamp(cm: Campagne): Observable<Campagne> {
        return this.http.delete<Campagne>(this.url + 'Campagne/deletCamp/'+cm.idcampagne);

    }
    public DeleteCritere(cr: Critere): Observable<Critere> {
        return this.http.delete<Critere>(this.url + 'Critere/deletCriter/'+cr.idcritere);

    }

}
