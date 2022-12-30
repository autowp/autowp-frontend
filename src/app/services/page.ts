import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Page {
  id: number;
  is_group_node: boolean;
  childs: Page[];
  url: string;
  name: string;
  title: string;
  registered_only: boolean;
  guest_only: boolean;
  class: string;
  icon: string;
  routerLink: string[];
}

@Injectable()
export class PageService {
  private pages = new Map<number, Page>();
  private parents = new Map<number, number>();

  private pagesJson: Page[];

  constructor() {}

  private walkPages(pages: Page[], parentID: number) {
    for (const page of pages) {
      this.parents.set(page.id, parentID);
      this.pages.set(page.id, page);
      this.walkPages(page.childs, page.id);
    }
  }

  private isDescendantPrivate(id: number, parentID: number): boolean {
    let pageId: number = id;
    while (pageId) {
      if (this.parents.get(pageId) === parentID) {
        return true;
      }

      pageId = this.parents.get(pageId);
    }

    return false;
  }

  private loadTree(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      if (!this.pagesJson) {
        this.pagesJson = require('./pages.json');
        this.walkPages(this.pagesJson, null);
      }

      observer.next(true);
      observer.complete();
    });
  }

  public isDescendant(id: number, parentID: number): Observable<boolean> {
    return this.loadTree().pipe(
      map(() => {
        if (id === parentID) {
          return true;
        }

        return this.isDescendantPrivate(id, parentID);
      })
    );
  }
}
