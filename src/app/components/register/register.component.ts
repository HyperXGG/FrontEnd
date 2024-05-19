import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { registerModel } from '../../models/registerModel';
import { ViewModeType } from '../app/app.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  model: registerModel | undefined;

  //Evento da lanciare quando l'utente si è registrato
  @Output()
  onUserRegistered: EventEmitter<ViewModeType> = new EventEmitter();

  //Evento da lanciare quando l'utente vuole passare alla schermata di login
  @Output()
  onLoginSelected: EventEmitter<ViewModeType> = new EventEmitter();

  //Metodo per registrarsi
  register() {
    if (this.model) {
      this.authService.register(this.model).subscribe({
        next: (response) => {
          console.log(response);
          this.onUserRegistered.emit(ViewModeType.Normal);
        },

        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  //Metodo per resettare i campi di input
  reset() {
    this.model = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: new Date()
    }
  }

  //Metodo che lancia l'evento per tornare alla schermata di login
  loginRedirect() {
    this.onLoginSelected.emit(ViewModeType.Login);
  }

  constructor(public authService: AuthService) {
    this.model = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: new Date()
    }
  }
}
