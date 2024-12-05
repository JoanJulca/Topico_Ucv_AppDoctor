import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { FirebaseApp } from '@angular/fire/compat';
import { User } from 'firebase/auth';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-password_Doctor-doctor',
  templateUrl: './password_Doctor.page.html',
  styleUrls: ['./password_Doctor.page.scss'],
})
export class password_Doctor implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

  })
  // creamo esta variable para inyectar el servicio de firebase

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(Camara_utilsService)

  ngOnInit() {
  }


  async submit() {
    if (this.form.valid) {

      const loading = await this.utilSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {

        this.utilSvc.presentToast({
          message: 'Correo enviado con exito',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        }) 
        this.utilSvc.routerLink('/auth');
        this.form.reset();


      }).catch(error => {
        console.log(error);

        this.utilSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }
  //======================
  


}
