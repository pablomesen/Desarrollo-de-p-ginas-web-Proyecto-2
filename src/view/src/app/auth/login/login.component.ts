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
    private authService: AuthService
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
            alert('Login exitoso');
            this.router.navigate(['/catalog']);
          } else {
            alert('Error: Usuario o contraseña incorrectos');
          }
        },
        (error) => {
          console.error('Error al hacer login:', error);
          alert('Hubo un error en el servidor. Inténtalo más tarde.');
        }
      );
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
