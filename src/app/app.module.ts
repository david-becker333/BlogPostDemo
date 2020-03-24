import './vendor';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { rootReducers } from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/effects/post.effects';
import { PostService } from './core/services/post.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { PostComponent } from './blog/post/post.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent, MainComponent, ErrorComponent, FooterComponent } from './layouts';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { PostUpdateComponent } from './blog/post-update/post-update.component';
import { AppInitializerService } from './app.init';
import { UserEffects } from './store/effects/user.effects';

export const initUsers = (appInitService: AppInitializerService) => {
  return () => appInitService.initializeUsers();
}

export const initPosts = (appInitService: AppInitializerService) => {
  return () => appInitService.initializePosts();
}

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    CoreModule,
    StoreModule.forRoot(rootReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !environment.production }),
    EffectsModule.forRoot([UserEffects, PostEffects]),
    AppRoutingModule,
    NgxWebstorageModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    PostComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    ErrorComponent,
    PostUpdateComponent
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initUsers, deps: [AppInitializerService], multi: true },
    { provide: APP_INITIALIZER, useFactory: initPosts, deps: [AppInitializerService], multi: true }
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
