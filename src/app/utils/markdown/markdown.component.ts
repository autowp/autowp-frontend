import {Component, Input} from '@angular/core';
import * as showdown from 'showdown';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['markdown.component.scss'],
})
export class MarkdownComponent {
  @Input() set markdown(value: string) {
    this.markdown$.next(value);
  }
  private readonly markdown$ = new BehaviorSubject<string>(null);

  private readonly markdownConverter = new showdown.Converter({});

  protected readonly html$ = this.markdown$.pipe(
    map((markdown) => (markdown ? this.markdownConverter.makeHtml(markdown) : ''))
  );
}
