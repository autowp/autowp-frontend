import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItem, Picture} from '@grpc/spec.pb';
import {AuthService, Role} from '@services/auth.service';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {MarkdownComponent} from '@utils/markdown/markdown.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-new-list-item',
  styleUrls: ['./styles.scss'],
  templateUrl: './list-item.component.html',
})
export class NewListItemComponent {
  readonly #auth = inject(AuthService);

  protected readonly isModer$ = this.#auth.hasRole$(Role.MODER);

  readonly item = input.required<APIItem>();
  readonly pictures = input.required<Picture[]>();
  readonly totalPictures = input.required<number>();
  readonly date = input.required<string>();
}
