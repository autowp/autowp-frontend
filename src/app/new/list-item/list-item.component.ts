import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItem, Picture} from '@grpc/spec.pb';
import {AuthService, Role} from '@services/auth.service';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {MarkdownComponent} from '@utils/markdown/markdown.component';

@Component({
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-new-list-item',
  styleUrls: ['./styles.scss'],
  templateUrl: './list-item.component.html',
})
export class NewListItemComponent {
  readonly #auth = inject(AuthService);

  protected readonly isModer$ = this.#auth.hasRole$(Role.MODER);
  @Input() item: APIItem | null = null;
  @Input() pictures: Picture[] = [];
  @Input() totalPictures: number = 0;
  @Input() date: string = '';
}
