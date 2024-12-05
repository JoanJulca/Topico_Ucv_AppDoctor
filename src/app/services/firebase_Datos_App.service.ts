import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,sendPasswordResetEmail } from 'firebase/auth'
import { user } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc ,getDoc ,addDoc,collection , collectionData,query,updateDoc,deleteDoc} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {getStorage,uploadString,ref,getDownloadURL,deleteObject} from 'firebase/storage';
import { Camara_utilsService } from './Camara_utils.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc = inject(Camara_utilsService);



//==================BD=========================================================================
  
//============Obtener documentos de una coleccion===========================
   getCollecitionData(path:string , collectionQuery?: any){
     const ref = collection(getFirestore(),path);
     return collectionData(query(ref,...collectionQuery),{idField:'id'})
   }
  //=====================================Auntetificacion=======================================
   
   getAuth(){
    return getAuth();
   }




  //===acceder===========
  signIn(user: user) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //===crear usuario===========
  signUp(user: user) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //===Actualizar usuario===========
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }
  //===Recuperar contra ===========

  sendRecoveryEmail(email:string){
    return sendPasswordResetEmail(getAuth(),email)
  }
    //===cerrar sesion ===========

    sigOut(){
      getAuth().signOut();
      localStorage.removeItem('user');
      this.utilsSvc.routerLink('/welcome');
    }


  //=====================================Base de Datos =======================================
//==setear un docuemnte====='users/id_del_usuario'
  setDocument(path: string, data: any) {

    return setDoc(doc(getFirestore(), path), data);

  }

  //==actualizar un docuemnte================
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }
    //==delect un docuemnte================
    deleteDocument(path: string) {
      return deleteDoc(doc(getFirestore(), path));
    }

//===obtener un documento
  async getDocument(path:string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

//===agregar documento=============='users/id_del_usuario/cita'
addDocument(path: string, data: any) {
  return addDoc(collection(getFirestore(), path), data);

}
////==================Almacenamiento==========================

//============Subir imagewn==============
async uploadImage(path:string , data_url:string){
return uploadString(ref(getStorage(),path),data_url,'data_url').then(()=>{
  return getDownloadURL(ref(getStorage(),path))
})
}

//============obtener ruta sde la imagen con su url==============

async getFilepath(url:string){
  return ref(getStorage(),url).fullPath
}

//============eliminar archivo==============
deleteFile(path:string){
return deleteObject(ref(getStorage(),path));
}



}