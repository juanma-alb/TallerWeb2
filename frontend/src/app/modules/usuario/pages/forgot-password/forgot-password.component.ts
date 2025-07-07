import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthUsuarioService } from '../../../../api/services/usuario/auth-usuario.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService]
})
export class ForgotPasswordComponent implements OnInit {
  private fb          = inject(FormBuilder);
  private userService = inject(UsuarioService);
  private msg         = inject(MessageService);
  private router      = inject(Router);

  form!: FormGroup;
  authService = inject(AuthUsuarioService);

  ngOnInit() {
    if (this.authService.token) {                       
      this.router.navigate(['/']);
      return;
    }

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email } = this.form.value;

    this.userService.forgotPassword(email).subscribe({
      next: () => {
        this.msg.add({
          severity: 'success',
          summary: 'Revisa tu correo',
          detail: 'Si el email existe, enviamos un enlace para restablecer tu contraseña.'
        });
        this.router.navigate(['/usuario/signin']);
      },
      error: () => {
        this.msg.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo procesar tu solicitud. Intenta de nuevo.'
        });
      }
    });
  }
}
