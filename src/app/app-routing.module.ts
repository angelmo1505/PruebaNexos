import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'generateqr',
    loadChildren: () => import('./pages/generateqr/generateqr.module').then( m => m.GenerateqrPageModule)
  },
  {
    path: 'view-movements',
    loadChildren: () => import('./pages/view-movements/view-movements.module').then( m => m.ViewMovementsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
