import { Component, OnInit, Input } from '@angular/core';
import { Dialog } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'busy-modal',
  template: `
    <p-dialog [header]="header" [(visible)]="visible" modal="modal" [closable]="false" [closeOnEscape]="false">
      <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i> Please Wait...
    </p-dialog>
  `,
  directives: [Dialog]
})
export class BusyModalComponent implements OnInit {
  @Input('header') header:string;
  @Input('visible') visible:boolean;
  
  constructor() { }

  ngOnInit() { }

}