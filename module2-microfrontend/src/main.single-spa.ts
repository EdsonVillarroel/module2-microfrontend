import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app/app.component';
import { EmptyRouteComponent } from './app/empty-route/empty-route.component';

import { environment } from './environments/environment';
import { SingleSpaProps, singleSpaPropsSubject } from './single-spa/single-spa-props';
import { enableProdMode, getSingleSpaExtraProviders, singleSpaAngular } from 'single-spa-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { NavigationStart, Router, provideRouter } from '@angular/router';
import { NgZone } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, {
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        getSingleSpaExtraProviders(),
        provideRouter([{ path: '**', component: EmptyRouteComponent }]),
      ],
    });
  },
  template: '<module2 />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
