import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITokenData } from 'src/app/models/ITokenData';
import { StreamLabsService } from 'src/app/services/streamlabs.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  data: ITokenData | null = null;
  expiresOn!: Date;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private streamlabsService: StreamLabsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const code: string = params['code'];
      if (!code) {
        this.router.navigateByUrl('');
        return;
      }

      this.streamlabsService.getTokenFromCode(code)
      .subscribe({
        next: (data) => {
          this.data = {
            access_token: data.access_token.substring(0, 50),
            refresh_token: data.access_token.substring(0, 50),
            expires_in: data.expires_in,
          };
          this.expiresOn = new Date(Date.now() + data.expires_in);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.message);
          this.toastr.error(
            'Unable to generate an access_token and a refresh_token.'
          );
        }
      });
    });
  }

  copyAccessToken(): void {
    if (this.data?.access_token) {
      navigator.clipboard.writeText(this.data.access_token);
      this.clipboardToast(true, 'access');
    } else {
      this.clipboardToast(false, 'access');
    }
  }

  copyRefreshToken(): void {
    if (this.data?.refresh_token) {
      navigator.clipboard.writeText(this.data.refresh_token);
      this.clipboardToast(true, 'refresh');
    } else {
      this.clipboardToast(false, 'refresh');
    }
  }

  private clipboardToast(success: boolean, type: 'access' | 'refresh') {
    if (success) {
      this.toastr.success(
        `Successfully copied ${type} token to clipboard !`,
        'Success !'
      );
    } else {
      this.toastr.error(`Unable to copy ${type} token to clipboard.`, 'Error');
    }
  }
}
