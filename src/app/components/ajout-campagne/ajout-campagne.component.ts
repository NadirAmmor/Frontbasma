import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {Campagne} from "../../controller/model/campagne";
import {HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {FileUploadStatus} from "../../controller/model/FileUploadStatus";

@Component({
  selector: 'app-ajout-campagne',
  templateUrl: './ajout-campagne.component.html',
  styleUrls: ['./ajout-campagne.component.scss']
})
export class AjoutCampagneComponent implements OnInit {

    constructor(public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService, private  messageService: MessageService) { }

  ngOnInit(): void {
  }
    get ItemsCampagme(): Array<Campagne> {

        return this.offre.ItemsCampagme;
    }

    set ItemsCampagme(value: Array<Campagne>) {
        this.offre.ItemsCampagme = value;
    }
    public addOffre() {
        this.submittedCampagne = true;
        this.offre.addOffre().subscribe(data => {
            this.offre.FindAllCampagne().subscribe(
                data => {
                    this.ItemsCampagme = data;
                }
            );
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: ' Campagne Added',
                life:3000
            });
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to add Campagne',
                life:3000
            });
        });
        this.createDialogCampagne = false;
        this.Campagme = new Campagne();
    }
    public hideCreateDialog() {
        this.submittedCampagne = false;
        this.createDialogCampagne = false;
    }
    get submittedCampagne(): boolean {
        return this.offre.submittedCampagne;
    }

    set submittedCampagne(value: boolean) {
        this.offre.submittedCampagne = value;
    }
    get createDialogCampagne(): boolean {
        return this.offre.createDialog;
    }

    set createDialogCampagne(value: boolean) {
        this.offre.createDialog = value;
    }
    get Campagme(): Campagne {
        return this.offre.Campagme;
    }

    set Campagme(value: Campagne) {
        this.offre.Campagme = value;
    }


}
