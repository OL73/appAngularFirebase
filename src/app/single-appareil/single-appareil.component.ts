import { Component, OnInit } from '@angular/core';
import { AppareilService } from './../services/appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {


  name: string = 'appareil'; // 'appareil et status' = affichage par défaut
  status: string = 'status';

  constructor(
    private appareilService: AppareilService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.name = this.appareilService.getAppareilById(+id).name; // + = cast du paramètre typé number de la méthode en string
    this.status = this.appareilService.getAppareilById(+id).status;
  }

}
