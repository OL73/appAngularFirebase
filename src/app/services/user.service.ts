import { User } from '../models/user.model';
import { Subject } from 'rxjs';

export class UserService {
    private users: User[] = [
        {
            firstName: 'James',
            lastName: 'Smith',
            email: 'james@smith.com',
            drinkPreference: 'Coca',
            hobbies: [
                'Coder',
                'La dégustation de café'
            ]
        }
    ];
    userSubject = new Subject<User[]>(); // émettra des arrêts de type User[]

    // méthode qui va appler la méthode nex et qui va émettre une copie de l'arrêt users
    emitUser() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUser();
    }
}