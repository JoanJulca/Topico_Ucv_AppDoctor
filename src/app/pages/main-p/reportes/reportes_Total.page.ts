import { Component, OnInit, inject } from '@angular/core';
import { orderBy, where } from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { collectionGroup, getFirestore, query, onSnapshot } from 'firebase/firestore';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-reportes_Total',
  templateUrl: './reportes_Total.page.html',
  styleUrls: ['./reportes_Total.page.scss'],
})
export class Reportes_TotalPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(Camara_utilsService);
  citas: Cita[] = [];
  loading: boolean = false;

  ngOnInit() {this.loadCitas();} // Cargar las citas al iniciar el componente

  // Cerrar sesión
  singOut() {this.firebaseSvc.sigOut();}

  // Determinar el estado de la cita
  citaEstado(cita: Cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    return fechaCita < new Date() ? 'Cita Concluida' : 'Cita Pendiente';
  }
  // Obtener color basado en el estado de la cita
  citaEstadoColor(cita: Cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    return fechaCita < new Date() ? 'danger' : 'success';
  }
  // Obtener el usuario actual del almacenamiento local
  user(): user {return this.utilsSvc.getFromLocalStorage('user');}
  // Hook del ciclo de vida para cargar las citas cuando la vista está a punto de entrar
  ionViewWillEnter() {this.loadCitas();} // Cargar las citas al entrar en la vista

  // Refrescar la lista de citas
  doRefresh(event: any) {
    setTimeout(() => {
      this.loadCitas(); // Recargar citas
      event.target.complete(); // Completar la acción de refresco
    }, 1000);
  }
  // Obtener las citas de hoy
  getCitasHoy(): Cita[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Restablecer la hora a medianoche para comparación
    return this.citas.filter(cita => {
      const fechaCita = new Date(cita.fecha);
      fechaCita.setHours(0, 0, 0, 0); // Restablecer la hora a medianoche para comparación
      return fechaCita.getTime() === hoy.getTime();
    });
  }
  // Cargar citas desde Firestore
  private loadCitas() {
    this.loading = true;
    const user = this.utilsSvc.getFromLocalStorage('user'); // Obtener usuario actual

    // Consulta para obtener todas las citas del doctor actual
    const citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      where('doctor', '==', user.name), // Filtrar por citas del doctor con el mismo nombre que el usuario
      orderBy('fecha', 'desc')
    );

    const unsubscribe = onSnapshot(citasQuery, (querySnapshot) => {
      this.citas = querySnapshot.docs.map(doc => doc.data() as Cita);
      console.log(this.citas);
      this.loading = false; // Detener el loading una vez que se cargan las citas
    }, (error) => {
      this.loading = false; // Detener loading en caso de error
      console.error('Error al obtener citas:', error);
      this.utilsSvc.presentToast({message: 'Error al cargar las citas. Inténtalo de nuevo más tarde.',
      duration: 2500,color: 'danger',position: 'middle',});
    });
  }
}
