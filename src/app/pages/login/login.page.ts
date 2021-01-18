import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginUserForm: FormGroup;

  get user(){
    return this.loginUserForm.get('user');
  }

  get pass(){
    return this.loginUserForm.get('pass');
  }
  
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private nativeStorage: NativeStorage,
    private router: Router
  ) { 
    this.ValidateForm();
  }

  ngOnInit() {
  }

  ValidateForm(){
    this.loginUserForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(4)]],
      pass: ['', [Validators.required]]
    });
  }

  public errorMessages = {
    user: [
      { type: 'required', message: 'El campo usuario es obligatorio.'},
      { type: 'minlength', message: 'Cantidad de caracteres minimos permitidos es (4).'}
    ],
    pass: [
      {type: 'required', message: 'El campo contraseña es obligatorio.'}
    ]
  }

  signUp(){
    const data = {
      usuario_login  : this.user.value,
      password_login : this.pass.value
    };

    this.authService.login(data).subscribe(
      login => {
        if (login['typeMsj'] == "Success") {
          this.nativeStorage.setItem('loggedIn', { logIn: "true", dataUser: login['datos']})
          .then(
            () => this.router.navigate(['/tabs']),
            error => console.log(error)
          );
        } else {
          swal({
            title: `${login['typeMsj']}`,
            text:  `${login['message']}`,
            icon:  `${login['iconMsj']}`,
          });
        }
      }
    );
  }

}
