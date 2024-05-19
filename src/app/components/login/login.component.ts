import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { loginModel } from '../../models/loginModel';
import { AuthService } from '../../services/auth.service';
import { ViewModeType } from '../app/app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  model: loginModel | undefined;

  //Evento da lanciare quando l'utente si logga
  @Output()
  onUserLogged: EventEmitter<ViewModeType> = new EventEmitter();

  //Evento da lanciare quando l'utente sceglie di passare alla schermata di registrazione
  @Output()
  onRegisterSelected: EventEmitter<ViewModeType> = new EventEmitter();
  
  //Resetta i campi di input
  reset() {
    this.model = {
      username: "",
      password: ""
    }
  }

  //Effettua il login tramite l'AuthService
  login() {
    if (this.isValidLogin()) {
      this.authService.login(this.model!).subscribe({
        next: () => {
          this.onUserLogged.emit(ViewModeType.Normal);
        }
      });
    }
  }

  //Controlla che l'oggetto sia correttamente valorizzato per fare il login
  isValidLogin(): boolean {
    return this.model !== undefined && this.model.password !== "" && this.model.username !== ""; 
  }

  //Effettivo lancio dell'evento per passare alla schermata di registrazione
  redirectToRegister() {
    this.onRegisterSelected.emit(ViewModeType.Register);
  }

  //Iniezione del servizio di autenticazione
  constructor(private authService: AuthService) {
    this.model = {
      username: "",
      password: ""
    }
  }
}
