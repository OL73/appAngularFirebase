import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  // arret users en local
  users: User[];
  // Une souscription 
  userSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Créer la Souscription
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.emitUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
