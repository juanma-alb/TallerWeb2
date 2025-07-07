import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';          
import { AuthUsuarioService } from '../../../../api/services/usuario/auth-usuario.service';

@Component({
  selector: 'app-signin',
  standalone: true,                                            
  imports: [
    RouterLink,                                                
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ToastModule,
    NgIf,
    ButtonModule
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [MessageService],
})
export class SigninComponent implements OnInit {

  messageService = inject(MessageService);
  router   = inject(Router);
  authService = inject(AuthUsuarioService);
  form!: FormGroup;
  bgImg = '/img/bg-jordan.jpg';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit() {
    if (this.authService.token) {
      this.router.navigate(['/']);
      return;
    }

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  iniciarSesion() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email o contraseña inválido.',
      });
      return;
    }

    this.usuarioService.iniciarSesion(this.form.value).subscribe({
      next: (res) => {
        this.authService.login(res);
        if(res.usuario.role === 'ADMIN'){
            this.router.navigate(['/usuario/admin']);
        }else{
            this.router.navigate(['/']);
        }
        
        // si tiene ROL admin enviarlo a la vista de admin
      },
      error: (errorResponse) => {
        const backendMsg = errorResponse.error?.error || 'Contraseña o email incorrecto';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: backendMsg });
      },
    });
  }
}
