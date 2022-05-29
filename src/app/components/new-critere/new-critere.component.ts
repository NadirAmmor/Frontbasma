import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {User} from "../../controller/model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Critere} from "../../controller/model/critere";
import {MessageService} from "primeng/api";
import {Campagne} from "../../controller/model/campagne";

@Component({
  selector: 'app-new-critere',
  templateUrl: './new-critere.component.html',
  styleUrls: ['./new-critere.component.scss']
})
export class NewCritereComponent implements OnInit {

    constructor(public app: AppComponent, private  messageService: MessageService,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }

  ngOnInit(): void {
  }
    get critere(): Critere {
        return this.offre.critere;
    }

    set critere(value: Critere) {
        this.offre.critere = value;
    }
    get createDialogNewCritere(): boolean {
        return this.offre.createDialogNewCritere;
    }

    set createDialogNewCritere(value: boolean) {
        this.offre.createDialogNewCritere = value;
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
    public AddCritere() {
        this.submittedNewCritere = true;
        this.critere.campagne=this.CampagmeCritere;
        this.offre.AddCritere().subscribe(data => {
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
        this.createDialogNewCritere = false;
    }
    public hideCreateDialog() {
        this.submittedNewCritere= false;
        this.createDialogNewCritere = false;
    }
}
