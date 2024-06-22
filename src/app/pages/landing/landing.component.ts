import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  streamlabs_app_url: string = `${
    environment.streamlabs_app_url
  }?response_type=code&client_id=${
    environment.streamlabs_app_id
  }&redirect_uri=${
    environment.app_domain
  }/auth&scope=${environment.streamlabs_app_scopes.join('+')}`;
}
