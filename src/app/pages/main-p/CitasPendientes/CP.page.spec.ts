import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CPPage } from './CP.page';
import { FirebaseService } from 'src/app/services/firebase_Datos_App.service';
import { Camara_utilsService } from 'src/app/services/Camara_utils.service';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

// Mock de pdfMake para evitar la generación real del PDF durante las pruebas
const pdfMakeMock = {
  createPdf: jasmine.createSpy('createPdf').and.returnValue({
    open: jasmine.createSpy('open')
  })
};

describe('CPPage', () => {
  let component: CPPage;
  let fixture: ComponentFixture<CPPage>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;
  let camaraUtilsServiceSpy: jasmine.SpyObj<Camara_utilsService>;

  beforeEach(async () => {
    // Crear spies para los servicios
    firebaseServiceSpy = jasmine.createSpyObj('FirebaseService', ['sigOut']);
    camaraUtilsServiceSpy = jasmine.createSpyObj('Camara_utilsService', [
      'getFromLocalStorage'
    ]);

    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [CPPage],
      imports: [IonicModule.forRoot()], // Importar IonicModule
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceSpy },
        { provide: Camara_utilsService, useValue: camaraUtilsServiceSpy },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CPPage);
    component = fixture.componentInstance;

    // Simulación de retorno de datos
    camaraUtilsServiceSpy.getFromLocalStorage.and.returnValue({ name: 'Doctor1' });
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener solo las citas pendientes', () => {
    component.citas = [
      { fecha: '2024-11-04', hora: '10:00' } as any,
      { fecha: '2024-10-20', hora: '12:00' } as any 
    ];
    const citasPendientes = component.getCitasPendientes();
    expect(citasPendientes.length).toBe(1);
    expect(citasPendientes[0].fecha).toBe// 
  });

  it('debe obtener citas pendientes para la próxima semana', () => {
    const now = new Date();
    const nextWeekDate = new Date();
    nextWeekDate.setDate(now.getDate() + 5);  
    component.citas = [
      { fecha: nextWeekDate.toISOString().split('T')[0], hora: '10:00' } as any,
      { fecha: '2024-10-20', hora: '12:00' } as any  
    ];
    const citasPendientesSemanales = component.getCitasPendientesSemanales();
    expect(citasPendientesSemanales.length).toBe(1);
    expect(citasPendientesSemanales[0].fecha).toBe 
  });
});
