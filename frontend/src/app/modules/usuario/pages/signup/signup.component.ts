import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { UsuarioRegistro } from '../../interfaces/usuario.interface';

const passwordRules = [
  Validators.required,
  Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/), 
];

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ToastModule,
    NgIf,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private usuarioService = inject(UsuarioService);

  form!: FormGroup;
  spinner = true;
  bgImg = '/img/bg-jordan.jpg';

  ngOnInit(): void {
    this.spinner = false;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', passwordRules],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {}

  crearUsuario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Revisá los campos resaltados.',
      });
      return;
    }

    const nuevoUsuario: UsuarioRegistro = this.form.value;

    this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario creado',
          detail: 'El usuario ha sido creado con éxito.',
        });
        this.form.reset();
        this.router.navigate(['/usuario/signin']);
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el usuario. Intentalo nuevamente.',
        }),
    });
  }
}

