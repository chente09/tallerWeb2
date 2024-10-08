import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { RegistersService } from '../../services/register/register.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private registersService: RegistersService) { 
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onClickRegister(): void {
    this.usersService.register(this.form.value)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  onClickLogin(): void {
    this.usersService.login(this.form.value)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
  }   

  onClickLoginGoogle(): void {
    this.usersService.loginWithGoogle()
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

}
