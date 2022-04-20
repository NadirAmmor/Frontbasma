import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AppComponent} from "../../app.component";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  config: AppConfig;

  subscription: Subscription;

  constructor(public configService: ConfigService,public app: AppComponent, public router: Router) { }

  ngOnInit(): void {
      this.app.menuMode = 'overlay';
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
