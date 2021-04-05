import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {License} from 'yfiles';
License.value = {
  "comment": "0c49103c-818c-4871-a56d-364696990444",
  "date": "04/05/2021",
  "distribution": false,
  "domains": [
    "*"
  ],
  "expires": "06/05/2021",
  "fileSystemAllowed": true,
  "licensefileversion": "1.1",
  "localhost": true,
  "oobAllowed": true,
  "package": "complete",
  "product": "yFiles for HTML",
  "type": "eval",
  "version": "2.3",
  "watermark": "yFiles HTML Evaluation License (expires in ${license-days-remaining} days)",
  "key": "88860e3a38a73ef9003c6bbfd15164032bba4066"
};

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
