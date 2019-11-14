import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'; // Validators permet d'intégrer une validation du formulaire pour la méthode réactive
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup; // FormGroup pour la méthode réactive, il s'agit d'un object formulaire

  constructor(
    private formBuilder: FormBuilder, // outil permet de créer des formulaires simples et lisibles
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required], // Validators permet d'intégrer une validation du formulaire pour la méthode réactive // on récupère des données valides
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        drinkPreference: ['', Validators.required],
        hobbies: this.formBuilder.array([])
      }
    );
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'], 
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : [] // on vérifie que des hobbies existent bien en réalisant un test, si pas de hobbies, on affiche rien
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

  // Méthode obligatoire pour pouvoir récupérer les valeurs de hobbies
  // permet de récupérer l'array de type array
  // besoin de FormArray pour récupére les hobbies depuis le FormTemplate
  getHobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  // control() pour générer un control
  onAddHobby() {
    const newHobbyControl = this.formBuilder.control('', Validators.required);
    this.getHobbies().push(newHobbyControl); // on fait appel à la méthode getHobbies pour accéder au FormArray
  }

}
