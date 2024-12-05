import { Component, OnInit, inject } from '@angular/core';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-Perfil_Doctor_Cam-doctor',
  templateUrl: './Perfil_Doctor_Cam.page.html',
  styleUrls: ['./Perfil_Doctor_Cam.page.scss'],
})
export class Perfil_Doctor_CamPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(Camara_utilsService);

  ngOnInit() {}

  // Obtener el usuario actual desde el almacenamiento local
  user(): user {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  //========= Tomar / seleccionar imágenes y actualizar perfil ==========
  async takeImage() {
    const user = this.user();
    const path = `user/${user.uid}`;
    const imagePath = `${user.uid}/profile`;

    try {
      // Captura de imagen
      const dataUrl = (await this.utilsSvc.takePicture('Imagen del perfil')).dataUrl;
      const loading = await this.utilsSvc.loading();
      await loading.present();

      // Subir imagen a Firebase
      user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      await this.firebaseSvc.updateDocument(path, { image: user.image });

      // Actualizar almacenamiento local y mostrar éxito
      this.utilsSvc.saveInLocalStorage('user', user);
      this.utilsSvc.presentToast({
        message: 'Foto de perfil actualizada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      this.utilsSvc.presentToast({
        message: 'No se pudo actualizar la foto de perfil',
        duration: 2500,
        color: '#003B5C',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    } finally {
      const loading = await this.utilsSvc.loading();
      loading.dismiss();
    }
  }
}
