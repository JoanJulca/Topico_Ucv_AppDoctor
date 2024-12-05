//REPORTE DE CITAS (SEMANAL - CONCLUIDAS)

import { Component, OnInit, inject } from '@angular/core';
import { orderBy, where } from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { collectionGroup, getFirestore, query, onSnapshot } from 'firebase/firestore';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { AddUpdateCitaComponent } from 'src/app/shared/components/add-update-cita/add-update-cita.component';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';

@Component({
  selector: 'app-CC',
  templateUrl: './CC.page.html',
  styleUrls: ['./CC.page.scss'],
})
export class CCPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(Camara_utilsService);

  // Cerrar sesión
  singOut() {
    this.firebaseSvc.sigOut();
  }

  citas: Cita[] = [];
  loading: boolean = false;

  citaEstado(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }


  citaEstadoColor(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'danger' : 'success';
  }

  getCitasConcluidas() {
    const now = new Date();
    return this.citas.filter(cita => {
      const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
      return fechaCita < now; // Filtra solo las citas concluidas
    });
  }
  
  ngOnInit() {
  }

  user(): user {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getProducts(); // Corrige el llamado a la función
      event.target.complete();
    }, 1000);
  }

  // Obtener citas de hoy
  getCitasHoy() {
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Establece la hora a medianoche para la comparación

    return this.citas.filter(cita => {
      let fechaCita = new Date(cita.fecha);
      fechaCita.setHours(0, 0, 0, 0); // Establece la hora a medianoche para la comparación

      return fechaCita.getTime() === hoy.getTime();
    });
  }

  // Obtener las citas
  getProducts() {
    this.loading = true;
    let user = this.utilsSvc.getFromLocalStorage('user'); // Obtén el usuario actual

    // Utilizamos una consulta de grupo de colecciones para obtener todas las citas
    let citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      where('doctor', '==', user.name), // Filtra solo las citas del doctor con el mismo nombre del usuario
      orderBy('fecha', 'desc')
    );

    let sub = onSnapshot(citasQuery, (querySnapshot) => {
      let citas = [];
      querySnapshot.forEach((doc) => {
        citas.push(doc.data());
      });
      console.log(citas);
      this.citas = citas;
      this.loading = false;
      // No es necesario desuscribirse de onSnapshot
    }, (error) => {
      // Maneja el error si es necesario
    });
  }



}

