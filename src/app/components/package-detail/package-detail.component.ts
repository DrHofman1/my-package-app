import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/package.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {
  package: Package | undefined;
  errorMessage: string = '';
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.packageService.getPackage(id).subscribe({
        next: (data) => {
          if (data) {
            this.package = { ...data, id }; // Ensure the id is included in the package
          }
        },
        error: (err) => {
          console.error('Error fetching package', err);
          this.errorMessage = err.message;
        }
      });
    } else {
      console.error('Package ID is undefined');
    }
  }

  goToPackages() {
    this.router.navigate(['/packages']);
  }

  purchasePackage() {
    if (this.package?.id) {
      if (this.isLoggedIn) {
        this.router.navigate(['/confirm-purchase', this.package.id]);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      console.error('Package ID is undefined');
    }
  }
}









