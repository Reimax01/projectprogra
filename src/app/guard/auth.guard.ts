import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '@services/common/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {  }

  canActivate(): boolean {
    if (this.userService.isLogin()) {
      return true;
    } else {
      this.router.navigate(['login']).then(res => console.log(res));
      return false;
    }
  }

}
