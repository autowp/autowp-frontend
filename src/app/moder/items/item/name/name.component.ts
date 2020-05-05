import {
  Component,
  Injectable,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy
} from '@angular/core';
import { APIItem } from '../../../../services/item';
import {
  APIItemLanguage,
  ItemLanguageService
} from '../../../../services/item-language';
import { ContentLanguageService } from '../../../../services/content-language';
import { combineLatest, BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { APIService } from '../../../../services/api.service';

@Component({
  selector: 'app-moder-items-item-name',
  templateUrl: './name.component.html'
})
@Injectable()
export class ModerItemsItemNameComponent
  implements OnChanges, OnInit, OnDestroy {
  @Input() item: APIItem;

  public loading = 0;

  public itemLanguages: APIItemLanguage[] = [];
  public currentLanguage: string = null;
  private item$ = new BehaviorSubject<APIItem>(null);
  private sub: Subscription;

  constructor(
    private api: APIService,
    private itemLanguageService: ItemLanguageService,
    private contentLanguage: ContentLanguageService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest(
      [
        this.contentLanguage.getList().pipe(
          map(contentLanguages => {
            const languages = new Map<string, APIItemLanguage>();

            for (const language of contentLanguages) {
              languages.set(language, {
                language,
                name: null,
                text: null,
                full_text: null,
                text_id: null,
                full_text_id: null
              });
            }

            this.currentLanguage = contentLanguages[0];

            return languages;
          })
        ),
        this.item$
      ]
    )
      .pipe(
        switchMap(([languages, item]) => this.itemLanguageService.getItems(item.id).pipe(
          map(values => ({
            languages,
            values: values.items
          }))
        ))
      )
      .subscribe(data => {
        for (const value of data.values) {
          data.languages.set(value.language, value);
        }

        this.itemLanguages = Array.from(data.languages.values());
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.item$.next(this.item);
    }
  }

  public saveLanguages() {
    for (const language of this.itemLanguages) {
      this.loading++;
      this.api
        .request<void>(
          'PUT',
          'item/' + this.item.id + '/language/' + language.language,
          {body: {
            name: language.name,
            text: language.text,
            full_text: language.full_text
          }}
        )
        .subscribe(
          () => {
            this.loading--;
          },
          () => {
            this.loading--;
          }
        );
    }
  }
}
