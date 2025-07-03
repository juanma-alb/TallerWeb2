import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { NgIf } from '@angular/common';
import { UsuarioRegistro } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-signup',
    imports: [ButtonModule, ReactiveFormsModule, InputTextModule, SelectModule, ToastModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit,OnDestroy {
  private fb = inject(FormBuilder);
  messageService = inject(MessageService);
  usuarioService = inject(UsuarioService)
  form!: FormGroup;
  spinner = true;
  bgImg: string = '/img/bg-jordan.jpg';


  ngOnInit(): void {
    this.spinner = false;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    
  }

  crearUsuario() {
    console.log('Se envio el Formulario');
    
    if (this.form.valid) {
      const nuevoUsuario: UsuarioRegistro = {
        email: this.form.value.email,
        password: this.form.value.password,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        address: this.form.value.address
      };

      this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario creado',
            detail: 'El usuario ha sido creado con éxito.'
          });
          this.form.reset(); // para limpiar el formulario
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el usuario. Inténtelo nuevamente.'
          });
        },
        complete: () => {
          
        }
      });

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Por favor, complete todos los campos obligatorios correctamente.'
      });

      this.form.markAllAsTouched(); // Marcar todos los campos para que muestren sus errores
    }
  }
}
