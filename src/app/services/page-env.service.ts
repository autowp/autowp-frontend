import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PageService } from './page';
import { switchMap } from 'rxjs/operators';

export interface LayoutParams {
  isAdminPage: boolean;
  isGalleryPage: boolean;
}

export interface PageEnv {
  pageId?: number;
  title?: string;
  layout?: {
    isAdminPage?: boolean;
    isGalleryPage?: boolean;
  };
}

@Injectable()
export class PageEnvService {
  public pageEnv$ = new BehaviorSubject<PageEnv>(null);
  public layoutParams$ = new BehaviorSubject<LayoutParams>({
    isAdminPage: false,
    isGalleryPage: false
  });

  public constructor(
    private pageService: PageService,
    private titleService: Title
  ) {
    this.pageEnv$.subscribe(data => {
      if (data) {
        this.layoutParams$.next({
          isAdminPage: data.layout?.isAdminPage,
          isGalleryPage: data.layout?.isGalleryPage
        });

        if (data.title) {
          this.titleService.setTitle(data.title);
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
