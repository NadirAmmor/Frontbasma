import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {OffreService} from "../../controller/service/offre.service";
import {Campagne} from "../../controller/model/campagne";
import {AppConfig} from "../../api/appconfig";
import {Subscription} from "rxjs";
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {User} from "../../controller/model/user";

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
  constructor(public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }

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
    public openAjoutCampagne() {
        this.submittedCampagne = false;
        this.createDialogCampagne = true;
        this.Campagme = new Campagne();
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
}
