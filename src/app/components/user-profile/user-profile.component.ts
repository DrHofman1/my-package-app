import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  userId: string | null = null;
  packageName: string = ''; // Store the package name

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.userProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      package: [{ value: '', disabled: true }] // Disable the package field
    });
  }

  ngOnInit(): void {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userId = user.uid;
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return new Observable();
        }
      }),
      switchMap((userData: any) => {
        if (userData && userData.package) {
          return this.firestore.collection('packages').doc(userData.package).valueChanges().pipe(
            map((packageData: any) => {
              this.packageName = packageData.name; // Store the package name
              return userData;
            })
          );
        } else {
          return new Observable<any>(observer => {
            observer.next(userData);
            observer.complete();
          });
        }
      })
    ).subscribe(userData => {
      if (userData) {
        this.userProfileForm.patchValue({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          package: this.packageName // Set the package name
        });
      }
    });
  }

  onSave(): void {
    if (this.userProfileForm.valid && this.userId) {
      this.firestore.collection('users').doc(this.userId).update(this.userProfileForm.value).then(() => {
        alert('Profile updated successfully!');
      }).catch(error => {
        console.error('Error updating profile', error);
      });
    }
  }
}














