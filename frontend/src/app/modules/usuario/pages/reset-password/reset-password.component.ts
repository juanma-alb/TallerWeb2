// src/app/modules/usuario/pages/reset-password/reset-password.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService]
})
export class ResetPasswordComponent implements OnInit {
  private route       = inject(ActivatedRoute);
  private router      = inject(Router);
  private fb          = inject(FormBuilder);
  private userService = inject(UsuarioService);
  private msg         = inject(MessageService);

  form!: FormGroup;
  token!: string | null;

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.msg.add({ severity: 'error', summary: 'Token inválido' });
      this.router.navigate(['/usuario/forgot-password']);
      return;
    }

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  private passwordsIguales(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const c    = group.get('confirm')?.value;
    return pass === c ? null : { noMatch: true };
  }

  cambiar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { password } = this.form.value;

    this.userService.resetPassword(this.token!, password).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Contraseña actualizada' });
        this.router.navigate(['/usuario/signin']);
      },
      error: err => {
        const backend = err.error?.error || 'Token inválido o expirado';
        this.msg.add({ severity: 'error', summary: 'Error', detail: backend });
      }
    });
  }
}
