import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AppComponent} from "../../app.component";
import {Campagne} from "../../controller/model/campagne";
import {OffreService} from "../../controller/service/offre.service";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./land.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  config: AppConfig;

  subscription: Subscription;

  constructor(public configService: ConfigService,public app: AppComponent, public router: Router,private offre: OffreService) { }

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
}
