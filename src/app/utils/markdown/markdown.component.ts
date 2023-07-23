import {Component, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import * as showdown from 'showdown';

@Component({
  selector: 'app-markdown',
  styleUrls: ['markdown.component.scss'],
  templateUrl: './markdown.component.html',
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
