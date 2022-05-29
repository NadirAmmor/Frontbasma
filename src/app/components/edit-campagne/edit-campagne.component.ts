import { Component, OnInit } from '@angular/core';
import {Campagne} from "../../controller/model/campagne";
import {ConfirmationService, MessageService} from "primeng/api";
import {CandidatService} from "../../controller/service/candidat.service";
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-campagne',
  templateUrl: './edit-campagne.component.html',
  styleUrls: ['./edit-campagne.component.scss']
})
export class EditCampagneComponent implements OnInit {

    constructor(private  messageService: MessageService,private confirmationService: ConfirmationService,public cand:CandidatService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }

  ngOnInit(): void {
  }
    get submittedEditCampagne(): boolean {
        return this.offre.submittedEditCampagne;
    }

    set submittedEditCampagne(value: boolean) {
        this.offre.submittedEditCampagne = value;
    }
    get Campagme(): Campagne {
        return this.offre.SelectedCampagme;
    }

    set Campagme(value: Campagne) {
        this.offre.SelectedCampagme = value;
    }
    get editDialogCampagne(): boolean {
        return this.offre.editDialogCampagne;
    }

    set editDialogCampagne(value: boolean) {
        this.offre.editDialogCampagne = value;
    }
    get ItemsCampagme(): Array<Campagne> {

        return this.offre.ItemsCampagme;
    }

    set ItemsCampagme(value: Array<Campagne>) {
        this.offre.ItemsCampagme = value;
    }
    public editOffre() {
        this.submittedEditCampagne = true;
        this.offre.editOffre().subscribe(data => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Offre Edited',
                life:3000
            });

        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to Edit Offre',
                life:3000
            });
        });
        this.offre.FindAllCampagne().subscribe(
            data => {
                this.ItemsCampagme = data;
            }
        );
        this.editDialogCampagne = false;
        this.Campagme = new Campagne();
    }
    public hideCreateDialog() {
        this.submittedEditCampagne = false;
        this.editDialogCampagne = false;
    }
}
