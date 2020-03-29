import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../services/page-env.service';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {ACLService} from '../services/acl.service';
import {APIGalleryItem} from './definitions';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html'
})
@Injectable()
export class GalleryPageComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public current: string;

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private router: Router,
    private acl: ACLService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.acl.inheritsRole('moder'),
      this.route.paramMap.pipe(
        map(route => route.get('identity')),
        distinctUntilChanged()
      )
    ])
      .subscribe((data) => {
        if (!data[1]) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return;
        }

        setTimeout(() => {
          this.pageEnv.set({
            layout: {
              needRight: false,
              isGalleryPage: true
            },
            nameTranslated: '', // data.picture.name_text,
            pageId: 187
          });
        }, 0);

        this.current = data[1];
      });
  }

  pictureSelected(item: APIGalleryItem) {
    this.pageEnv.set({
      layout: {
        needRight: false,
        isGalleryPage: true
      },
      nameTranslated: item.name,
      pageId: 187
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
