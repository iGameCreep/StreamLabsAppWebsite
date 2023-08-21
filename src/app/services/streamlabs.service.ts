import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenData } from '../types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamLabsService {
  constructor(private http: HttpClient) { }

  getTokenFromCode(code: string): Observable<TokenData> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest');

    const body = {
      grant_type: 'authorization_code',
      client_id: environment.streamlabs_app_id,
      client_secret: environment.streamlabs_app_secret,
      redirect_uri: environment.app_domain + '/data',
      code
    }
    return this.http.post<TokenData>('https://streamlabs.com/api/v2.0/token', body, { headers });
  }
}
