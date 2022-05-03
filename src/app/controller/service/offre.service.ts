import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Campagne} from "../model/campagne";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OffreService {
    private _url = environment.baseUrl;
    private _Campagme: Campagne;
    private _ListCampagme: Array<Campagne>;
    private _ItemsCampagme: Array<Campagne>;
    private _submitted: boolean;
    private _submittedCampagne: boolean;
    private _createDialog: boolean;
    constructor(private http: HttpClient) { }
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

    get ListCampagme(): Array<Campagne> {
        if(this._ListCampagme== null){
            this._ListCampagme = new Array<Campagne>();
        }
        return this._ListCampagme;
    }

    set ListCampagme(value: Array<Campagne>) {
        this._ListCampagme = value;
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
        return this.http.get<Array<Campagne>>(this.url + 'Campagne/');

    }
    public addOffre(): Observable<Campagne> {
        return this.http.post<Campagne>(this.url + 'Campagne/',this.Campagme);

    }
}
