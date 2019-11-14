
// Formulaire - La Méthode réactive :
// Créer le formulaire fans le template et dans votre code TypeScript
// Puis brancher les 2 ensemble
export class User {
    // Ancienne méthode pour déclarer les propiétés puis de les appeler dans le constructeur
    // firstName: string;
    // lastName: string;

    // constructor(firstName: string, lastName: string) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    // }

    // NOUVELLE METHODE avec public :
    // raccourci typeScript, permet de créer ces données dans le modèle user
    // On rajout public devant les propriétés

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public drinkPreference: string,
        public hobbies: string[]
    ) {}

}