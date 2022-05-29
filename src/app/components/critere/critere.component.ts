import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Critere} from "../../controller/model/critere";
import {AppConfig} from "../../api/appconfig";
import {Subscription} from "rxjs";
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {User} from "../../controller/model/user";
import {Campagne} from "../../controller/model/campagne";
import {HttpErrorResponse} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-critere',
  templateUrl: './critere.component.html',
  styleUrls: ['./critere.component.scss']
})
export class CritereComponent implements OnInit {

    config: AppConfig;
    subscription: Subscription;
    @ViewChild('dt') table: Table;
    loading:boolean = true;
    @ViewChild('filter') filter: ElementRef;
    constructor(private  messageService: MessageService,private confirmationService: ConfirmationService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }


    ngOnInit(): void {
        if(this.User.username== null){
            this.router.navigate(['/pages/error']);
        }
  }
    get User(): User {
        return this.auth.User;
    }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    public newCriter(){
        this.submittedCritere = false;
        this.createDialogNewCritere = true;
        this.critere = new Critere();

    }
    get CampagmeCritere(): Campagne {
        return this.offre.CampagmeCritere;
    }

    set CampagmeCritere(value: Campagne) {
        this.offre.CampagmeCritere = value;
    }
    public editCritere(cr:Critere){
        this.submittedNewCritere = false;
        this.editDialogCritere = true;
        this.Selectedcritere = {...cr};

    }
    get critereList(): Array<Critere> {

        return this.offre.critereList;
    }

    set critereList(value: Array<Critere>) {
        this.offre.critereList = value;
    }
    get critereItems(): Array<Critere> {

        return this.offre.critereItems;
    }

    set critereItems(value: Array<Critere>) {
        this.offre.critereItems = value;
    }

    get submittedCritere(): boolean {
        return this.offre.submittedCritere;
    }

    set submittedCritere(value: boolean) {
        this.offre.submittedCritere = value;
    }

    get createDialogCritere(): boolean {
        return this.offre.createDialogCritere;
    }

    set createDialogCritere(value: boolean) {
        this.offre.createDialogCritere = value;
    }
    get submittedNewCritere(): boolean {
        return this.offre.submittedNewCritere;
    }

    set submittedNewCritere(value: boolean) {
        this.offre.submittedNewCritere = value;
    }

    get createDialogNewCritere(): boolean {
        return this.offre.createDialogNewCritere;
    }

    set createDialogNewCritere(value: boolean) {
        this.offre.createDialogNewCritere = value;
    }
    get editDialogCritere(): boolean {
        return this.offre.editDialogCritere;
    }

    set editDialogCritere(value: boolean) {
        this.offre.editDialogCritere = value;
    }
    get critere(): Critere {
        return this.offre.critere;
    }

    set critere(value: Critere) {
        this.offre.critere = value;
    }
    get Selectedcritere(): Critere {
        return this.offre.Selectedcritere;
    }

    set Selectedcritere(value: Critere) {
        this.offre.Selectedcritere = value;
    }
    public delete(cr: Critere) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + cr.nomCritere + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.offre.DeleteCritere(cr).subscribe(data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Offre Deleted',
                        life: 3000
                    });
                    this.offre.FindCampagneCritere().subscribe(
                        data => {
                            this.critereList= data;
                        }
                    );

                }, (errorResponse: HttpErrorResponse) => {
                    console.log(errorResponse);
                    alert('errorResponse');
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error Message',
                        detail: ' Failed to delete offre',
                        life: 3000
                    });
                });
            }
        });

    }
}
