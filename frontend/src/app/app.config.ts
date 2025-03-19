import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {MenuFoldOutline, TeamOutline, UserOutline} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline, UserOutline,TeamOutline];
export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),provideZoneChangeDetection({ eventCoalescing: true }),
provideRouter(routes),provideHttpClient(),NzMessageService,{ provide: NZ_ICONS, useValue: icons }]
};
