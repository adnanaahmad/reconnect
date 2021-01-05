import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {License} from 'yfiles';
License.value = {
  "comment": "d998159d-069f-434f-bf25-304edc80675b",
  "date": "12/01/2020",
  "distribution": false,
  "domains": [
    "*"
  ],
  "expires": "01/31/2021",
  "fileSystemAllowed": true,
  "licensefileversion": "1.1",
  "localhost": true,
  "oobAllowed": true,
  "package": "complete",
  "product": "yFiles for HTML",
  "type": "eval",
  "version": "2.3",
  "watermark": "yFiles HTML Evaluation License (expires in ${license-days-remaining} days)",
  "key": "addd75342c9ca872a6be2299aca86bde6045fc5e"
};

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
