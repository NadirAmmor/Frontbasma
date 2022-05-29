import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CandidatService} from "../../controller/service/candidat.service";
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {Candidat} from "../../controller/model/candidat";
import {User} from "../../controller/model/user";
import {AppConfig} from "../../api/appconfig";
import {Subscription} from "rxjs";
import {Table} from "primeng/table";
import {Campagne} from "../../controller/model/campagne";
import {CandidatResponseCritere} from "../../controller/model/candidat-response-critere";
import {Critere} from "../../controller/model/critere";

@Component({
  selector: 'app-list-candidat',
  templateUrl: './list-candidat.component.html',
  styleUrls: ['./list-candidat.component.scss']
})
export class ListCandidatComponent implements OnInit {
    config: AppConfig;
    subscription: Subscription;
    @ViewChild('dt') table: Table;
    loading:boolean = true;
    @ViewChild('filter') filter: ElementRef;
    constructor(public cand:CandidatService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
  ngOnInit(): void {
      this.createDialogCandidatResp = false;
      if(this.User.username== null){
          this.router.navigate(['/pages/error']);
      }
  }
    get User(): User {
        return this.auth.User;
    }
    get submitted(): boolean {
        return this.cand.submittedNewCandidat;
    }

    set submitted(value: boolean) {
        this.cand.submittedNewCandidat = value;
    }
    get ViewCandidat(): boolean {
        return this.cand.ViewCandidat;
    }

    set ViewCandidat(value: boolean) {
        this.cand.ViewCandidat = value;
    }
    get CandidatList(): Array<Candidat> {
        return this.cand.CandidatList;
    }

    set CandidatList(value: Array<Candidat>) {
        this.cand.CandidatList = value;
    }
    get CandidatItems(): Array<Candidat> {
        return this.cand.CandidatItems;
    }

    set CandidatItems(value: Array<Candidat>) {
        this.cand.CandidatItems = value;
    }
    get createDialogCandidat(): boolean {
        return this.cand.createDialogNewCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this.cand.createDialogNewCandidat = value;
    }
    get candidat(): Candidat {

        return this.cand.candidat;
    }

    get ArraycriterResCandidat(): Array<CandidatResponseCritere> {
        return this.cand.ArraycriterResCandidat;
    }

    set ArraycriterResCandidat(value: Array<CandidatResponseCritere>) {
        this.cand.ArraycriterResCandidat = value;
    }

    get ListcriterResCandidat(): Array<CandidatResponseCritere> {
        return this.cand.ListcriterResCandidat;
    }

    set ListcriterResCandidat(value: Array<CandidatResponseCritere>) {
        this.cand.ListcriterResCandidat = value;
    }
    get createDialogCandidatResp(): boolean {
        return this.cand.createDialogCandidatResp;
    }

    set createDialogCandidatResp(value: boolean) {
        this.cand.createDialogCandidatResp = value;
    }
    public openCandidatRes(cand:Candidat){
        console.log(cand.idcandidat);
        this.cand.getThisCandidatResp(cand.idcandidat).subscribe(data=>{
            this.ListcriterResCandidat=data;
                this.createDialogCandidatResp = true;
            }
        )

    }
    set candidat(value: Candidat) {
        this.cand.candidat = value;
    }
    get Campagnecandidat(): Campagne {

        return this.cand.Campagnecandidat;
    }

    set Campagnecandidat(value: Campagne) {
        this.cand.Campagnecandidat = value;
    }
    get CampagmeCritere(): Campagne {
        return this.offre.CampagmeCritere;
    }

    set CampagmeCritere(value: Campagne) {
        this.offre.CampagmeCritere = value;
    }
    public addCandidat() {
        this.submitted = false;
        this.createDialogCandidat = true;
        this.candidat = new Candidat();
    }
}
