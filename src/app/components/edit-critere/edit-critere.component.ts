import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {MessageService} from "primeng/api";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {Critere} from "../../controller/model/critere";
import {Campagne} from "../../controller/model/campagne";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-critere',
  templateUrl: './edit-critere.component.html',
  styleUrls: ['./edit-critere.component.scss']
})
export class EditCritereComponent implements OnInit {


    constructor(public app: AppComponent, private  messageService: MessageService,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }

    ngOnInit(): void {
    }
    get critere(): Critere {
        return this.offre.Selectedcritere;
    }

    set critere(value: Critere) {
        this.offre.Selectedcritere = value;
    }
    get editDialogCritere(): boolean {
        return this.offre.editDialogCritere;
    }

    set editDialogCritere(value: boolean) {
        this.offre.editDialogCritere = value;
    }
    get submittedNewCritere(): boolean {
        return this.offre.submittedNewCritere;
    }

    set submittedNewCritere(value: boolean) {
        this.offre.submittedNewCritere = value;
    }
    set critereList(value: Array<Critere>) {
        this.offre.critereList = value;
    }
    get CampagmeCritere(): Campagne {
        return this.offre.CampagmeCritere;
    }

    set CampagmeCritere(value: Campagne) {
        this.offre.CampagmeCritere = value;
    }
    public EditCritere() {
        this.submittedNewCritere = true;
        this.critere.campagne=this.CampagmeCritere;
        this.offre.EditCritere().subscribe(data => {
            this.offre.FindCampagneCritere().subscribe(
                data => {
                    this.critereList= data;
                }
            );
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: ' Critere Added',
                life: 3000
            });
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to add critere',
                life: 3000
            });
        });
        this.critere = new Critere();
        this.editDialogCritere = false;
    }
    public hideCreateDialog() {
        this.submittedNewCritere= false;
        this.editDialogCritere = false;
    }
}
