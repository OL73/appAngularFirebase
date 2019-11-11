import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number;
  counterSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const counter = Observable.interval(1000);
    // AVEC les souscriptions pour éviter les bugs
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.secondes = value;
      }
    );

    // Méthode sans les souscriptions qui peuvent provoquer des bugs !!!!
    //subcribe = méthode qui permet d'observer une observable et de régir à ses changements
    // peut prendre jusqu'à 3 arguments
    // counter.subscribe( // A FAIRE = stocker la méthode subcribe dans un object de type Subscription
    // premier argument = celui qui recoit les données
    // (value: number) => {
    //   this.secondes = value;
    // },
    // // 2nd argument pour les erreurs
    // (error: any) => {
    //   console.log('Une erreur a été rencontrée !');
    // },
    // // 3 argument = si l'observable se complète
    // () => {
    //   console.log('Observable complétée !');
    // }
    // ); // ATTENTION : ce genre de comportement infini peut provoquer de graves problèmes de bugs et peuvent être évités AVEC les 'Souscriptions'
  }

  // Détruire les soucriptions pour éviter les comportements infinis
  // décelencher au moment de la destruction du component 
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}