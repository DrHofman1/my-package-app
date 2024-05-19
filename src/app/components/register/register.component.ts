import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form submitted', this.registerForm.value); // Debug statement
    if (this.registerForm.valid) {
      const { email, password, name, phone, address } = this.registerForm.value;
      this.authService.register(email, password, name, phone, address).subscribe({
        next: () => {
          console.log('Registration successful'); // Debug statement
          this.router.navigate(['/login']); // Navigate to login page
        },
        error: (err) => {
          console.error('Registration error', err); // Debug statement
          this.errorMessage = err.message;
        }
      });
    }
  }
}





