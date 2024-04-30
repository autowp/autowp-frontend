import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Page {
  childs: Page[];
  class: string;
  guest_only: boolean;
  icon: string;
  id: number;
  is_group_node: boolean;
  name: string;
  registered_only: boolean;
  routerLink: string[];
  title: string;
  url: string;
}

@Injectable()
export class PageService {
  private pages = new Map<number, Page>();
  private parents = new Map<number, null | number>();

  private pagesJson: Page[];

  private walkPages(pages: Page[], parentID: null | number) {
    for (const page of pages) {
      this.parents.set(page.id, parentID);
      this.pages.set(page.id, page);
      this.walkPages(page.childs, page.id);
    }
  }

  private isDescendantPrivate(id: number, parentID: number): boolean {
    let pageId: null | number | undefined = id;
    while (pageId) {
      if (this.parents.get(pageId) === parentID) {
        return true;
      }

      pageId = this.parents.get(pageId);
    }

    return false;
  }

  private loadTree$(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      if (!this.pagesJson) {
        this.pagesJson = require('./pages.json');
        this.walkPages(this.pagesJson, null);
      }

      observer.next(true);
      observer.complete();
    });
  }

  public isDescendant$(id: number, parentID: number): Observable<boolean> {
    return this.loadTree$().pipe(
      map(() => {
        if (id === parentID) {
          return true;
        }

        return this.isDescendantPrivate(id, parentID);
      }),
    );
  }
}
