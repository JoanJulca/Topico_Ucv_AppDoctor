import { FirebaseApp } from '@angular/fire/compat';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-Registrarse_Doctor_Log-admin',
  templateUrl: './Registrarse_Doctor_Log.page.html',
  styleUrls: ['./Registrarse_Doctor_Log.page.scss'],
})
export class Registrarse_Doctor_LogPage implements OnInit {

  especialidad: string[] = [
    'Psicologia','Oftalmologia','Fisioterapia',"odontologia",
  ];
  
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('',[Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]), // Validador de solo números
    especialidad: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]), // Asumiendo DNI de 8 dígitos
    role: new FormControl('admin', [Validators.required]) // Valor predeterminado: admin
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc= inject(Camara_utilsService)

  ngOnInit() {
  }

  async submit() {
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as user).then(async res =>{
        await this.firebaseSvc.updateUser(this.form.value.name);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid)
      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }

  async setUserInfo(uid:string) {
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `user/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res =>{
        this.utilsSvc.saveInLocalStorage('user',this.form.value)
        this.utilsSvc.routerLink('/main-p/home');
        this.form.reset();
      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }
}
