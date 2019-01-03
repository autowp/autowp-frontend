import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PageService } from './page';
import { switchMap } from 'rxjs/operators';

export interface LayoutParams {
  isAdminPage: boolean;
  sidebar: boolean;
}

export interface PageEnv {
  pageId?: number;
  name?: string;
  nameTranslated?: string;
  layout: {
    needRight: boolean;
    isAdminPage?: boolean;
  };
  args?: { [key: string]: string };
}

@Injectable()
export class PageEnvService {
  public pageEnv$ = new BehaviorSubject<PageEnv>(null);
  public layoutParams$ = new BehaviorSubject<LayoutParams>({
    isAdminPage: false,
    sidebar: false
  });

  public constructor(
    private pageService: PageService,
    private titleService: Title,
    private translate: TranslateService
  ) {
    this.pageEnv$.subscribe(data => {
      if (data) {
        this.layoutParams$.next({
          isAdminPage: data.layout.isAdminPage,
          sidebar: data.layout.needRight
        });

        if (data.pageId) {
          const args = data.args ? data.args : {};

          if (data.nameTranslated) {
            this.titleService.setTitle(data.nameTranslated);
            return;
          }

          this.translate.get([data.name], args).subscribe(
            (translations: string[]) => {
              this.titleService.setTitle(translations[data.name]);
            },
            () => {
              this.titleService.setTitle(data.name);
            }
          );
        }
      }
    });
  }

  public set(data: PageEnv) {
    this.pageEnv$.next(data);
  }

  public isActive(id: number): Observable<boolean> {
    return this.pageEnv$.pipe(
      switchMap(data => {
        if (!data || !data.pageId) {
          return of(false);
        }
        return this.pageService.isDescendant(data.pageId, id);
      })
    );
  }
}
