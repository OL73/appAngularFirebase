import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; // Permet de recevoir les informations et choisir les informations qui seront transmises 
                                        // Utilisatation de Subject pour renforcer le contionnement de l'appli sans bugs
                                        // le subject émettra la liste des appareils quand on lui demandera de le faire

@Injectable() // Injectable() = permet d'utiliser un service dans un autre service
export class AppareilService {

    constructor(
        private route: Router
    ) { }

    // *** Etape 2 *** : ajouter le Subject : indiquer de quel type de données il gèrera
    appareilsSubject = new Subject<any[]>();

    
    // déplacement de la liste des appareils dans le service
    // Introduction des Subject pour ajouter un niveau d'abstration par rapport aux donnée (bonne pratique pour les grosses applications, contrôler de manière centralisée les données)
    // *** Etape 1 *** : déclaration de la propriété appareils en private
    private appareils = [
        {
            id: 1,
            name: 'Machine à laver',
            status: 'éteint'
        },
        {
            id: 2,
            name: 'Frigo',
            status: 'allumé'
        },
        {
            id: 3,
            name: 'Ordinateur',
            status: 'éteint'
        }
    ];

    allDeviceSwitchOn() {
        for (let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilSubject(); // Comme maintenant avec le subject les changements ne sont plus fait en temps réél, on fait émettre le subject
    }

    allDeviceSwitchOff() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject();
    }

    // méthode qui permet de récupérer la propriété id de l'objet appareils pour ensuite afficher via SingleAppareilComponent le nom et le statut de l'appareil sur une page dédiée
    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        this.emitAppareilSubject();
        return appareil;
    }

    getDetailAppareil(id: number) {
        this.route.navigate(['appareils', id]);
        this.emitAppareilSubject();
    }

    //***  Etape 3 : Subject ... Etape 4 : voir AppareilViewComponent
    // fait en sorte que le Subject émette la liste des appareils de l'extérieur
    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice()); // next() permet de forcer le subject à émettre de qu'on lui passe comme argument. / slice() permet d'avoir une copie de cet arrêt appareils
    }

    addAppareil(name: string, status: string) {
        const newId = this.appareils.length +1;
        const newAppareil = {id: newId, name: name, status: status};
        this.appareils.push(newAppareil);
        this.emitAppareilSubject();
    }
}