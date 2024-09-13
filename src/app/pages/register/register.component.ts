import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistersService } from '../../services/register/register.service';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private registersService: RegistersService, private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checkPassword: ['',this.confirmationValidator],
      nickname: ['', Validators.required],
      photoURL: [''],
      phoneNumber: ['', Validators.required],
      role: ['Empleado'],
    });
  }

  onClickRegister(): void {
    if (this.form.invalid) return;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.registersService.createRegister({email, password},this.form.value)
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      })
    this.form.reset();
  }

  onClickRegisterWithGoogle(): void {
    this.registersService.createRegisterWithGoogle()
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.form.controls["checkPassword"].updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
