import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITokenData } from '../models/ITokenData';

@Injectable({
  providedIn: 'root'
})
export class StreamLabsService {
  constructor(private http: HttpClient) { }

  getTokenFromCode(code: string): Observable<ITokenData> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest');

    const body = {
      grant_type: 'authorization_code',
      client_id: environment.streamlabs_app_id,
      client_secret: environment.streamlabs_app_secret,
      redirect_uri: `http://${environment.app_domain}/auth`,
      code
    }
    return this.http.post<ITokenData>(`http://${environment.app_domain}/api/v2.0/token`, body, { headers });
  }
}
