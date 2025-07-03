import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthUsuarioService } from '../../../../api/services/usuario/auth-usuario.service';
import { UsuarioRest } from '../../../../api/services/usuario/interfaces/usuario.interface.rest';
import { UsuarioMapper } from '../../../../api/services/usuario/mappings/usuario.mapper';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ToastModule, NgIf, ButtonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [MessageService],
})
export class SigninComponent implements OnInit {

  messageService = inject(MessageService);
  router= inject(Router)
  authService= inject(AuthUsuarioService)
  form!: FormGroup;
  bgImg: string = '/img/bg-jordan.jpg';


  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  iniciarSesion() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El email o contraseña es invalido.'
          });
      return;
    }

  console.log('Datos para login:', this.form.value);  

    this.usuarioService.iniciarSesion(this.form.value).subscribe({
      next: (res: UsuarioRest) => {
        console.log('Login OK', res);
        UsuarioMapper.mapUsuarioRestToUsuario(res) // MAPEO A USUARIO
        this.authService.setUsuario(res)  // Setea en LocalStorage  

        this.router.navigate(['/']);
      },
      error: (errorResponse) => {
        const backendMsg = errorResponse.error?.error || 'Error desconocido';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: backendMsg });
      }
    });
  }
}
