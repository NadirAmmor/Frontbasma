import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {OffreService} from "../../controller/service/offre.service";
import {Campagne} from "../../controller/model/campagne";
import {AppConfig} from "../../api/appconfig";
import {Subscription} from "rxjs";
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {User} from "../../controller/model/user";
import {Critere} from "../../controller/model/critere";
import {CandidatService} from "../../controller/service/candidat.service";
import {Candidat} from "../../controller/model/candidat";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-list-offre',
  templateUrl: './list-offre.component.html',
  styleUrls: ['./list-offre.component.scss']
})
export class ListOffreComponent implements OnInit {
    config: AppConfig;
    subscription: Subscription;
    @ViewChild('dt') table: Table;
    loading:boolean = true;
    @ViewChild('filter') filter: ElementRef;
  constructor(private  messageService: MessageService,private confirmationService: ConfirmationService,public cand:CandidatService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }

  ngOnInit(): void {
      if(this.User.username== null){
          this.router.navigate(['/pages/error']);
      }
      this.offre.FindAllCampagne().subscribe(
      data => {
          this.ItemsCampagme = data;
      }
  );
      console.log("items  :"+  this.ItemsCampagme.length);
      this.app.menuMode = 'static';
      this.config = this.configService.config;
      this.subscription = this.configService.configUpdate$.subscribe(config => {
          this.config = config;
      });

  }
    get createDialogCampagne(): boolean {
        return this.offre.createDialog;
    }

    set createDialogCampagne(value: boolean) {
        this.offre.createDialog = value;
    }
    get editDialogCampagne(): boolean {
        return this.offre.editDialogCampagne;
    }

    set editDialogCampagne(value: boolean) {
        this.offre.editDialogCampagne = value;
    }
    public openAjoutCampagne() {
        this.submittedCampagne = false;
        this.createDialogCampagne = true;
        this.Campagme = new Campagne();
    }
    public FindCriter(cm:Campagne) {
        this.CampagmeCritere = {...cm};
        this.offre.FindCampagneCritere().subscribe(data=>{
            this.critereList=data;
        })
        this.submittedCritere = false;
        this.createDialogCritere = true;

    }
    get Campagnecandidat(): Campagne {

        return this.cand.Campagnecandidat;
    }

    set Campagnecandidat(value: Campagne) {
        this.cand.Campagnecandidat = value;
    }
    get CandidatList(): Array<Candidat> {
        return this.cand.CandidatList;
    }

    set CandidatList(value: Array<Candidat>) {
        this.cand.CandidatList = value;
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
    get ViewCandidat(): boolean {
        return this.cand.ViewCandidat;
    }

    set ViewCandidat(value: boolean) {
        this.cand.ViewCandidat = value;
    }

    public FindCandidat(cm:Campagne) {
        this.Campagnecandidat = {...cm};
        this.cand.getCandidat().subscribe(data=>{
            this.CandidatList=data;
        })
        this.submitted = false;
        this.ViewCandidat = true;

    }
    get submittedCampagne(): boolean {
        return this.offre.submittedCampagne;
    }

    set submittedCampagne(value: boolean) {
        this.offre.submittedCampagne = value;
    }
    get User(): User {
        return this.auth.User;
    }
    get ListCampagme(): Array<Campagne> {
        return this.offre.ListCampagme;
    }
    get Campagme(): Campagne {
        return this.offre.Campagme;
    }

    set Campagme(value: Campagne) {
        this.offre.Campagme = value;
    }get SelectedCampagme(): Campagne {
        return this.offre.SelectedCampagme;
    }

    set SelectedCampagme(value: Campagne) {
        this.offre.SelectedCampagme = value;
    }
    get CampagmeCritere(): Campagne {
        return this.offre.CampagmeCritere;
    }

    set CampagmeCritere(value: Campagne) {
        this.offre.CampagmeCritere = value;
    }
    get CampagmeCandidat(): Campagne {
        return this.offre.CampagmeCandidat;
    }

    set CampagmeCandidat(value: Campagne) {
        this.offre.CampagmeCandidat = value;
    }
    set ListCampagme(value: Array<Campagne>) {
        this.offre.ListCampagme = value;
    }

    get ItemsCampagme(): Array<Campagne> {

        return this.offre.ItemsCampagme;
    }

    set ItemsCampagme(value: Array<Campagne>) {
        this.offre.ItemsCampagme = value;
    }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    get critereList(): Array<Critere> {

        return this.offre.critereList;
    }

    set critereList(value: Array<Critere>) {
        this.offre.critereList = value;
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
    public delete(cm: Campagne) {
        this.SelectedCampagme = cm;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + cm.nomCampagne + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.offre.DeleteCamp(cm).subscribe(data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Offre Deleted',
                        life: 3000
                    });

                    this.offre.FindAllCampagne().subscribe(
                        data => {
                            this.ItemsCampagme = data;
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
        this.offre.FindAllCampagne().subscribe(
            data => {
                this.ItemsCampagme = data;
            }
        );
    }
    get submittedEditCampagne(): boolean {
        return this.offre.submittedEditCampagne;
    }

    set submittedEditCampagne(value: boolean) {
        this.offre.submittedEditCampagne = value;
    }
    public editCampagne(cm:Campagne){
      this.SelectedCampagme=cm;
      this.editDialogCampagne =true;
    }
}
