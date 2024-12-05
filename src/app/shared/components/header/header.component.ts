import { Component, Input, OnInit, inject } from '@angular/core';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

 @Input() isModal!:boolean;
 @Input() showMenu!:boolean;
 @Input() title!:string;
 @Input() backButton!: string;
 //== parametro para que se muestre el boton

 utilSvc = inject(Camara_utilsService);

  

  ngOnInit() {}

  dismissModal(){
    this.utilSvc.dismissModal();
  }

}
