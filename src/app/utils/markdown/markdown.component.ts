import {AsyncPipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import showdown from 'showdown';

@Component({
  imports: [AsyncPipe],
  selector: 'app-markdown',
  styleUrls: ['markdown.component.scss'],
  templateUrl: './markdown.component.html',
})
export class MarkdownComponent {
  @Input() set markdown(value: null | string) {
    this.markdown$.next(value);
  }
  private readonly markdown$ = new BehaviorSubject<null | string>(null);

  private readonly markdownConverter = new showdown.Converter({});

  protected readonly html$ = this.markdown$.pipe(
    map((markdown) => (markdown ? this.markdownConverter.makeHtml(markdown) : '')),
  );
}
