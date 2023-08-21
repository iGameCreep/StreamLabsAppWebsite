import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamLabsService } from 'src/app/services/streamlabs.service';
import { TokenData } from 'src/app/types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  data: TokenData | null = null;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private streamlabsService: StreamLabsService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const code: string = params['code'];
      if (!code) {
        this.router.navigateByUrl('')
        return;
      };

      this.streamlabsService.getTokenFromCode(code).subscribe((data) => {
        this.data = data;
      })
    })
  }
}
