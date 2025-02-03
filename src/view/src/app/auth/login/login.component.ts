import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule], // Incluye HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Requerido y formato de correo
      password: ['', [Validators.required, Validators.minLength(3)]], // Requerido y mínimo 3 caracteres
    });
    
  }

  onSubmit(): void {
    console.log("entre")
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login({ credential: credentials.email, password: credentials.password }).subscribe(
        (response) => {
          console.log('Login response:', response);
          if (response.opCode === 0) {
            this.router.navigate(['/catalog']);
          } else {
            this.snackBar.open('Contraseña incorrecta', 'Close', { duration: 3000 });
          }
        },
        (error) => {
          this.snackBar.open('Credenciales incorrectas', 'Close', { duration: 3000 });
        }
      );
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
