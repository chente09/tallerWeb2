import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checkPassword: ['', this.confirmationValidator],
      nickname: ['', Validators.required],
      photoURL: [''],
      phoneNumber: ['', Validators.required],
      role: ['Empleado'],
    });
  }

  onClickRegister(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.registerService.createRegister({ email, password }, this.form.value)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onClickRegisterWithGoogle(): void {
    this.registerService.createRegisterWithGoogle()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.form.get('checkPassword')?.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
