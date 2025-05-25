import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/toker.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
 const tokenService = inject(TokenService);
 if (!tokenService.isLogged()) {
   return next(req);
 }
 const token = tokenService.getToken();
 const authReq = req.clone({
   setHeaders: {
     Authorization: `Bearer ${token}`
   }
 });
 return next(authReq);
};

