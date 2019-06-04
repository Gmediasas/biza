import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'events-list', loadChildren: './events-list/events-list.module#EventsListPageModule' },
  { path: 'events-detail', loadChildren: './events-detail/events-detail.module#EventsDetailPageModule' },
  { path: 'event-qr', loadChildren: './event-qr/event-qr.module#EventQRPageModule' },
  { path: 'event-list', loadChildren: './event-list/event-list.module#EventListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
