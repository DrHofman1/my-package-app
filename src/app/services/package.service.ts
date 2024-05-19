import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private firestore: AngularFirestore) { }

  getPackages(): Observable<Package[]> {
    return this.firestore.collection<Package>('packages').valueChanges({ idField: 'id' });
  }

  getPackage(id: string): Observable<Package | undefined> {
    return this.firestore.collection<Package>('packages').doc(id).valueChanges();
  }
}




