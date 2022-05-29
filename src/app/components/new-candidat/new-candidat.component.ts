import { Component, OnInit } from '@angular/core';
import {CandidatService} from "../../controller/service/candidat.service";
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../controller/service/user.service";
import {Campagne} from "../../controller/model/campagne";
import {Candidat} from "../../controller/model/candidat";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-new-candidat',
  templateUrl: './new-candidat.component.html',
  styleUrls: ['./new-candidat.component.scss']
})
export class NewCandidatComponent implements OnInit {


    constructor(public cand: CandidatService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService, private  messageService: MessageService, public  users: UserService) { }

    ngOnInit(): void {
    }
    get Campagnecandidat(): Campagne {

        return this.cand.Campagnecandidat;
    }

    set Campagnecandidat(value: Campagne) {
        this.cand.Campagnecandidat = value;
    }
    get candidat(): Candidat {

        return this.cand.candidat;
    }

    set candidat(value: Candidat) {
        this.cand.candidat = value;
    }

    get submitted(): boolean {
        return this.cand.submittedNewCandidat;
    }

    set submitted(value: boolean) {
        this.cand.submittedNewCandidat = value;
    }

    get createDialogCandidat(): boolean {
        return this.cand.createDialogNewCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this.cand.createDialogNewCandidat = value;
    }
    get CandidatList(): Array<Candidat> {
        return this.cand.CandidatList;
    }

    set CandidatList(value: Array<Candidat>) {
        this.cand.CandidatList = value;
    }
    public addCandidat() {
        this.submitted = true;
        this.candidat.campagne=this.Campagnecandidat;
        this.cand.addCandidat().subscribe(data => {
            this.cand.getCandidat().subscribe(data=>{
                this.CandidatList=data;
            })
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: ' candidat Added',
                life: 3000
            });
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to add candidate',
                life: 3000
            });
        });
        this.createDialogCandidat = false;
        this.candidat = new Candidat();
    }
    public hideCreateDialog() {
        this.submitted= false;
        this.createDialogCandidat = false;
    }
}
