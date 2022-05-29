import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../controller/service/user.service";
import {User} from "../../controller/model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Candidat} from "../../controller/model/candidat";
import {CandidatService} from "../../controller/service/candidat.service";
import {Campagne} from "../../controller/model/campagne";
import {Critere} from "../../controller/model/critere";
import {RadioButtonModule} from 'primeng/radiobutton';
import {CandidatResponseCritere} from "../../controller/model/candidat-response-critere";
import {$} from "protractor";
@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.scss']
})
export class PostulerComponent implements OnInit {
 i:number =0;

    constructor(public cand: CandidatService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService, private  messageService: MessageService, public  users: UserService) { }
    get Campagnecandidat(): Campagne {

        return this.cand.Campagnecandidat;
    }

    set Campagnecandidat(value: Campagne) {
        this.cand.Campagnecandidat = value;
    }
    ngOnInit(): void {
        console.log("ll"+this.Listcriter.length);
    }
    get criter(): Critere {
        return this.cand.criter;
    }
    public clickRadio(value:string){
        this.criterResCandidat.response=value;
    }
    public next(){
        document.getElementById('option-1').style.backgroundColor= '#fff';
        document.getElementById('option-1').style.borderColor= '#fff';
        document.getElementById('option-2').style.backgroundColor='#fff';
        document.getElementById('option-2').style.borderColor='#fff';
        this.criterResCandidat.critere=this.criter;
        this.criterResCandidat.candidat=this.candidatVerifie;
        this.criterResCandidat.campagne=this.Campagnecandidat;

        this.cand.addCandidatRespCriter().subscribe(data => {
            console.log("dazet")});
        this.i = this.i+1;
        if (this.i<=this.Listcriter.length-1){
        this.criter=this.Listcriter[ this.i];

        }
        else{
            console.log("seuil"+(this.Campagnecandidat.seuil/2));
            this.cand.getThisCandidat().subscribe(data => {
                this.candidat=data;
                if(this.candidat.score >= (this.Campagnecandidat.seuil/2)){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: ' Your Candidature Passed first Selection',
                    life: 3000
                });
            }else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: ' Your Candidature was rejected',
                    life: 3000
                });
            }});
            this.candidat=new Candidat();
            this.candidatVerifie=new Candidat();
            this.i=0;
            this.createDialogCandidatRespCriter=false;
            console.log("fin");
        }
    }
    set criter(value: Critere) {
        this.cand.criter = value;
    }

    get Listcriter(): Array<Critere> {
        return this.cand.Listcriter;
    }

    set Listcriter(value: Array<Critere>) {
        this.cand.Listcriter = value;
    }

    get candidat(): Candidat {

        return this.cand.candidat;
    }

    set candidat(value: Candidat) {
        this.cand.candidat = value;
    }

    get submitted(): boolean {
        return this.cand.submitted;
    }

    set submitted(value: boolean) {
        this.cand.submitted = value;
    }

    get createDialogCandidat(): boolean {
        return this.cand.createDialogCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this.cand.createDialogCandidat = value;
    }
    get createDialogCandidatRespCriter(): boolean {
        return this.cand.createDialogCandidatRespCriter;
    }

    set createDialogCandidatRespCriter(value: boolean) {
        this.cand.createDialogCandidatRespCriter = value;
    }
    get candidatVerifie(): Candidat {

        return this.cand.candidatVerifie;
    }

    set candidatVerifie(value: Candidat) {
        this.cand.candidatVerifie = value;
    }
    public addCandidat() {
        this.candidat.campagne=this.Campagnecandidat;
        if (this.candidat.nomCandidat){
            this.cand.verfieThisCandidat().subscribe(data => {this.candidatVerifie=data;
            if (this.candidatVerifie.idcandidat==null){
        this.cand.addCandidat().subscribe(data => {
            this.cand.verfieThisCandidat().subscribe(data => {this.candidatVerifie=data});
                this.createDialogCandidat = false;
                if(this.Listcriter.length !=0){
                this.createDialogCandidatRespCriter=true;
                }



        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            this.createDialogCandidat = false;
            alert('errorResponse');
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to add candidate',
                life: 3000
            });
        });
            }else {
                this.createDialogCandidat = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: ' you already candidate',
                    life: 3000
                });
            }});
        }else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to postulate candidate',
                life: 3000
            });
            this.createDialogCandidat = false;
        }

    }
    get criterResCandidat(): CandidatResponseCritere {
        return this.cand.criterResCandidat;
    }

    set criterResCandidat(value: CandidatResponseCritere) {
        this.cand.criterResCandidat = value;
    }
    public hideCreateDialog() {
        this.submitted= false;
        this.createDialogCandidat = false;
    }
    public hideCreateDialogRes() {
        this.submitted= false;
        this.createDialogCandidatRespCriter = false;
    }
}
