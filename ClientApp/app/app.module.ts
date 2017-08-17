import * as Raven from 'raven-js';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';

Raven.config('https://de53b8d63b9b49929523c877f1252e29@sentry.io/204815').install();

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: [...sharedConfig.declarations],
    imports: [
        BrowserModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        ...sharedConfig.providers
    ]
})
export class AppModule {
}
