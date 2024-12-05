import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
@Component({
  selector: 'app-main-p',
  templateUrl: './main-p.page.html',
  styleUrls: ['./main-p.page.scss'],
})
export class MainPPage implements OnInit {

  pages =[
    {title:'CITAS PENDIENTES',url:'/main-p/CitasPendientes'},
    {title: 'CITAS CONCLUIDAS', url: '/main-p/CitasConcluidas'},
    {title:'PERFIL',url:'/main-p/profile',},
    {title:'HISTORIAL',url:'/main-p/reportes'},

]

 router = inject(Router);
 firebaseSvc = inject(FirebaseService);
 utilsSvc = inject(Camara_utilsService);


 currentPath: string ='';


  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath = event.url;
    })
  }


  user(): user {
    return this.utilsSvc.getFromLocalStorage('users');
  }


//cerrar sesion
  singOut(){
    this.firebaseSvc.sigOut();
  }

  constructor() { }



}
