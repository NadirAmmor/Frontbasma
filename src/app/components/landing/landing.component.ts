import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AppComponent} from "../../app.component";
import {Campagne} from "../../controller/model/campagne";
import {OffreService} from "../../controller/service/offre.service";
import {User} from "../../controller/model/user";
import {UserService} from "../../controller/service/user.service";
import {Candidat} from "../../controller/model/candidat";
import {CandidatService} from "../../controller/service/candidat.service";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./land.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  config: AppConfig;

  subscription: Subscription;

  constructor(public cand:CandidatService ,public users: UserService,public configService: ConfigService,public app: AppComponent, public router: Router,private offre: OffreService) { }

  ngOnInit(): void {
      this.app.menuMode = 'overlay';
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    this.offre.FindLast5().subscribe(data=>{
        this.ListCampagme = data;
        });
  }
    get ListCampagme(): Array<Campagne> {
        return this.offre.ListCampagme;
    }

    set ListCampagme(value: Array<Campagne>) {
        this.offre.ListCampagme = value;
    }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  OffrePage(){
      this.router.navigate(["/pages/offre"]);
  }
    get userA(): User {
        return this.users.user;
    }

    set userA(value: User) {
        this.users.user = value;
    }
    get submitted(): boolean {
        return this.users.submitted;
    }

    set submitted(value: boolean) {
        this.users.submitted = value;
    }

    get createDialog(): boolean {
        return this.users.createDialog;
    }

    set createDialog(value: boolean) {
        this.users.createDialog = value;
    }

    get candidat(): Candidat {

        return this.cand.candidat;
    }

    set candidat(value: Candidat) {
        this.cand.candidat = value;
    }

    get submittedCand(): boolean {
        return this.cand.submitted;
    }

    set submittedCand(value: boolean) {
        this.cand.submitted = value;
    }

    get createDialogCandidat(): boolean {
        return this.cand.createDialogCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this.cand.createDialogCandidat = value;
    }
    get Campagnecandidat(): Campagne {

        return this.cand.Campagnecandidat;
    }

    set Campagnecandidat(value: Campagne) {
        this.cand.Campagnecandidat = value;
    }
    public openPostuler(of: Campagne) {
        this.submittedCand = false;
        this.createDialogCandidat = true;
        this.candidat = new Candidat();
        this.Campagnecandidat=of;
    }
}
