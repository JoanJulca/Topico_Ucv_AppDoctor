import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { orderBy, where, collectionGroup, getFirestore, query, onSnapshot } from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-CP',
  templateUrl: './CP.page.html',
  styleUrls: ['./CP.page.scss'],
})
export class CPPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(Camara_utilsService);
  citas: Cita[] = [];
  loading: boolean = false;

  // Obtener el usuario desde el almacenamiento local
  user(): user {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  // Cerrar sesión
  singOut() {
    this.firebaseSvc.sigOut();
  }

  // Obtener el estado de la cita (Pendiente o Concluida)
  citaEstado(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }

  // Obtener el color del estado de la cita
  citaEstadoColor(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    return fechaCita < new Date() ? 'danger' : 'success';
  }

  // Obtener citas pendientes en el futuro
  getCitasPendientes() {
    return this.citas.filter(cita => new Date(`${cita.fecha}T${cita.hora}:00`) >= new Date());
  }

  // Obtener las citas para el día de hoy
  getCitasHoy() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.citas.filter(cita => {
      const fechaCita = new Date(cita.fecha);
      fechaCita.setHours(0, 0, 0, 0);
      return fechaCita.getTime() === hoy.getTime();
    });
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  // Refrescar lista de citas
  doRefresh(event: any) {
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

  // Obtener citas desde Firestore
  private getProducts() {
    this.loading = true;
    const user = this.user();

    const citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      where('doctor', '==', user.name),
      orderBy('fecha', 'desc')
    );

    onSnapshot(citasQuery, (querySnapshot) => {
      this.citas = querySnapshot.docs.map(doc => doc.data() as Cita);
      this.loading = false;
    }, (error) => {
      console.error('Error obteniendo citas:', error);
      this.loading = false;
    });
  }

  // Obtener citas pendientes de la próxima semana
  getCitasPendientesSemanales(): Cita[] {
    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    return this.citas.filter(cita => {
      const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
      return fechaCita >= now && fechaCita <= oneWeekLater;
    });
  }

  // Generar reporte de citas pendientes semanales en PDF
  generarReporteCitasPendientesSemanales() {
    const citasPendientesSemanales = this.getCitasPendientesSemanales();

    const pdfDefinition = {
      content: [
        { text: 'Reporte de Citas Pendientes Semanales', style: 'header' },
        { text: '\n' },
        ...citasPendientesSemanales.map(cita => [
          { text: `Fecha: ${cita.fecha}`, style: 'subheader' },
          { text: `Hora: ${cita.hora}` },
          { text: `DNI: ${cita.dni}` },
          { text: `Nombre Paciente: ${cita.name}` },
          { text: `Estado: ${this.citaEstado(cita)}` },
          { text: '\n' }
        ])
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] }
      }
    };

    pdfMake.createPdf(pdfDefinition).open();
  }
}
