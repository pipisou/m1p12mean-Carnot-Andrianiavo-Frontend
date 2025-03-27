import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {MenuFoldOutline, TeamOutline, UserOutline} from '@ant-design/icons-angular/icons';
import { NZ_I18N, fr_FR } from 'ng-zorro-antd/i18n';
import {NzModalService} from 'ng-zorro-antd/modal';


const icons = [MenuFoldOutline, UserOutline,TeamOutline];
export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),provideZoneChangeDetection({ eventCoalescing: true }),
provideRouter(routes),provideHttpClient(),NzMessageService, NzModalService,{ provide: NZ_ICONS, useValue: icons },{ provide: NZ_I18N, useValue: fr_FR }]
};
