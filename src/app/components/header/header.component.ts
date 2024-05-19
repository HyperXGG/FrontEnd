import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ViewModeType } from '../app/app.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  //Valore dell'H1 nell'HTML, grazie a @Input è possibile settarlo dal tag HTML in app.component.html
  @Input()
  pageTitle: string = ""

  //Evento da lanciare quando l'utente clicca sulla sezione dell'account per loggare
  @Output()
  onAccountSectionPressed: EventEmitter<ViewModeType> = new EventEmitter();

  //Funzione da avviare quando clicco sull'account (lancia l'evento)
  showLoginPanel() {
    this.onAccountSectionPressed.emit(ViewModeType.Login);
  }

  //Iniezione del servizio per l'autenticazione
  constructor(public authService: AuthService) {}
}
