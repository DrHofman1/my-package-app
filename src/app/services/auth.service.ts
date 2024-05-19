import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/compat/app'; // Correct import for firebase

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  register(email: string, password: string, name: string, phone: string, address: string): Observable<any> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
        // Create user document in Firestore
        return this.firestore.collection('users').doc(result.user?.uid).set({
          name,
          phone,
          address,
          email
        });
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  get user$(): Observable<firebase.User | null> { // Correctly reference the User type
    return this.afAuth.authState;
  }
}





