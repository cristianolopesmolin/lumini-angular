import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { CustomSnackBarModule } from './components/custom-snack-bar/custom-snack-bar.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CurrencyMaskModule } from 'ng2-currency-mask';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      const tokenResponse = JSON.parse(
        window.localStorage.getItem('lumini_demo_auth')
      );
      if (tokenResponse) {
        return tokenResponse.token;
      }
    },
    whitelistedDomains: ['localhost:8080'],
  };
}

export function tokenGetter() {
  return localStorage.getItem('lumini_demo_auth');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CustomSnackBarModule,

    JwtModule.forRoot({
      jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory
      }
  })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomSnackBarComponent
  ]
})
export class AppModule { }
