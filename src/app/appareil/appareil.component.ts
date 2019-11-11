import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from './../services/appareil.service';
import { ActivatedRoute, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() appareilIndex: number;
  @Input() appareilId: number;

  constructor(
    private appareilService: AppareilService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  getStatus() {
    return this.appareilStatus;
  }

  onAllumerOne() {
    this.appareilService.switchOnOne(this.appareilIndex);
    console.log('index n° ' + this.appareilIndex)
  }

  onEteindreOne() {
    this.appareilService.switchOffOne(this.appareilIndex);
  }

  goToDetailAppareil() {
    console.log(this.appareilId);
    this.appareilService.getDetailAppareil(this.appareilId);
  }

}
