import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './blog/post/post.component';
import { PostUpdateComponent } from './blog/post-update/post-update.component';
import { UserRouteAccessService } from './core/auth/user-route-access-service';
import { UserRouteExitService } from './core/auth/user-route-exit-service';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          children: [
        
            { 
              path: 'home', 
              redirectTo: '/posts', 
              canActivate: [UserRouteAccessService]
             },
            { 
              path: 'posts', 
              component: PostComponent,
              data: {
                pageTitle: 'Home'
              }, 
              canActivate: [UserRouteAccessService] 
            },
            { 
              path: 'post/:id', 
              component: PostUpdateComponent, 
              data: {
                pageTitle: 'Edit Post'
              }, 
              canActivate: [UserRouteAccessService],
              canDeactivate: [UserRouteExitService] 
            },
            { 
              path: 'newpost', 
              component: PostUpdateComponent, 
              data: {
                pageTitle: 'New Post'
              }, 
              canActivate: [UserRouteAccessService], 
              canDeactivate: [UserRouteExitService] 
            },
            { 
              path: 'login', 
              data: {
                pageTitle: 'Log In'
              }, 
              component: LoginComponent 
            },
          ]
        },
        ...LAYOUT_ROUTES
      ]
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
