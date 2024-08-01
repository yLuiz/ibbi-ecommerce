import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const publicPaths = ['register', 'auth'];
  const currentPath = route.url[0]?.path || '';

  if (token && publicPaths.includes(currentPath)) {
    router.navigate(['/']);
    return false;
  }

  if (!token && !publicPaths.includes(currentPath)) {
    router.navigate(['/auth']);
    return false;
  }
  
  return true;
};
