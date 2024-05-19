import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirm-purchase',
  templateUrl: './confirm-purchase.component.html',
  styleUrls: ['./confirm-purchase.component.scss']
})
export class ConfirmPurchaseComponent implements OnInit {
  packageId: string | null = null;
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.packageId = this.route.snapshot.paramMap.get('id');
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  confirmPurchase() {
    if (this.packageId && this.userId) {
      this.userService.updateUser(this.userId, { package: this.packageId }).then(() => {
        alert('Purchase confirmed!');
        this.router.navigate(['/profile']);
      }).catch(error => {
        console.error('Error updating user package:', error);
      });
    }
  }

  cancelPurchase() {
    this.router.navigate(['/packages']);
  }
}




