import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError: string = '';
  registrationSuccess: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      isAdmin: [false] // New form control for role toggle
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registrationData = {
        userName: this.registerForm.get('fullName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        role: this.registerForm.get('isAdmin')?.value ? 'admin' : 'user'
      };

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          if (response.opCode === 0) {
            console.log('Registro exitoso');
            this.registrationSuccess = '¡Registro exitoso! Redirigiendo al inicio de sesión...';
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 3000);
          } else {
            this.registrationError = response.msg || 'Error en el registro';
          }
        },
        error: (error) => {
          console.error('Error de registro:', error);
          this.registrationError = 'Ocurrió un error durante el registro';
        }
      });
    }
  }
}