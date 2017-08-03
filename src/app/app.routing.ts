import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioWrapperComponent } from './portfolio/portfolio-wrapper.component'
import { AppGuard } from './app.guard'

const appRoutes: Routes = [
  {
  
    path: '',
    canActivate: [ AppGuard ],
    component: PortfolioWrapperComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
