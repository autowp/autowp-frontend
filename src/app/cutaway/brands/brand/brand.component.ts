import {Component, OnInit} from '@angular/core';
import {combineLatest, EMPTY} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {PictureService} from '../../../services/picture';
import {PageEnvService} from '../../../services/page-env.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {ItemService} from '../../../services/item';

@Component({
  selector: 'app-cutaway',
  templateUrl: './brand.component.html',
})
export class CutawayBrandsBrandComponent implements OnInit {
  public brand$ = this.route.paramMap.pipe(
    map((params) => '' + params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemService.getItems({
        catname,
        fields: 'name_text,name_html',
        limit: 1,
      });
    }),
    map((response) => (response.items.length > 0 ? response.items[0] : null)),
    shareReplay(1)
  );

  public query$ = combineLatest([this.brand$, this.route.queryParamMap]).pipe(
    switchMap(([brand, params]) =>
      this.pictureService.getPictures({
        item_id: brand.id,
        status: 'accepted',
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 12,
        page: parseInt(params.get('page'), 10),
        perspective_id: 9,
        order: 15,
      })
    ),
    catchError((response) => {
      this.toastService.response(response);
      return EMPTY;
    })
  );

  constructor(
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 109}), 0);
  }
}
