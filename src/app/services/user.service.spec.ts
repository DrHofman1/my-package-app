import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUser(uid: string): Observable<User> {
    return this.firestore.collection('users').doc<User>(uid).valueChanges().pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(err => throwError(err))
    );
  }

  updateUser(uid: string, userData: Partial<User>): Promise<void> {
    return this.firestore.collection('users').doc(uid).update(userData);
  }
}


