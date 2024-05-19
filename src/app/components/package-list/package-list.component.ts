import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { AuthService } from '../../services/auth.service';
import { Package } from '../../models/package.model';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {
  packages: Package[] = [];
  errorMessage: string = '';
  isLoggedIn = false;

  constructor(
    private packageService: PackageService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    this.packageService.getPackages().subscribe({
      next: (data) => {
        console.log('Fetched packages:', data);
        this.packages = data;
      },
      error: (err) => {
        console.error('Error fetching packages', err);
        this.errorMessage = err.message;
      }
    });
  }

  viewDetails(id?: string) {
    if (id) {
      if (this.isLoggedIn) {
        this.router.navigate(['/package', id]);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      console.error('Package ID is undefined');
    }
  }

  purchasePackage(id?: string) {
    if (id) {
      if (this.isLoggedIn) {
        this.router.navigate(['/confirm-purchase', id]);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      console.error('Package ID is undefined');
    }
  }
}






