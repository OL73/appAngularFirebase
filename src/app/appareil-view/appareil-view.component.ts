import { Component, OnInit } from '@angular/core';
import { AppareilService } from './../services/appareil.service';
import { Subscription } from 'rxjs/Subscription'; // *** Etape 4 Subject ***

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  // ajout de l'interface OnInit pour utiliser AppareilService

  // utiliser et déplacer dans AuthServive
  // isAuth: boolean = false;

  // appareilOne = 'Machine à laver';
  // appareilTwo = 'Frigo';
  // appareilThree = 'Ordinateur';

  // la liste des appareils est maintenant utilisées par le AppareilService
  // appareils = [
  //   {
  //     name: 'Machine à laver',
  //     status: 'éteint'
  //   },
  //   {
  //     name: 'Frigo',
  //     status: 'éteint'
  //   },
  //   {
  //     name: 'Ordinateur',
  //     status: 'éteint'
  //   }
  // ];

  //déplacement de cette propriété vers AppareilService
  //etatStatut: string = 'éteint';

  dateMaj = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  })

  appareils: any[];
  // *** suite Etape 4 *** : Subject, On fait appel à l'objet Subscription
  appareilSubscription: Subscription; // On stocke la souscription dans un object de type Subscription

  constructor(private appareilService: AppareilService) {

    // utiliser et déplacer dans AuthServive
    // setTimeout(
    //   () => {
    //     this.isAuth = true;
    //   }, 2000
    // );
  }

  // fonction implémentée suite à l'appel de l'interface OnInit
  // fonction exécutée au moment de la création du component par Angular et après le création du constructor
  ngOnInit() {
    // AVANT l'utilisation de Subscription et Subject (Observables)
    // la propriétés appareils: any[] sera égale à appareils qui se trouve dans le service
    // this.appareils = this.appareilService.appareils;

    // *** suite Etape 4 *** : Subject
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
    // L'application refonctionne comme avant, mais avec une différence cruciale de méthodologie : 
    // il y a une abstraction entre le service et les components, où les données sont maintenues à jour grâce au Subject.
  }

  onAllumer() {
    //this.etatStatut = (this.appareils[status] === 'éteint' ? this.appareils[status] = 'allumé' : this.appareils[status] = 'éteint');

    //déplacement de cette propriété vers AppareilService
    //this.etatStatut = this.appareils[status] = 'allumé';

    this.appareilService.allDeviceSwitchOn();
  }

  onEteindre() {
    //déplacement de cette propriété vers AppareilService
    //this.etatStatut = this.appareils[status] = 'éteint';

    this.appareilService.allDeviceSwitchOff();
  }

}
