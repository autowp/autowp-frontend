import {AsyncPipe} from '@angular/common';
import {Component, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import showdown from 'showdown';

@Component({
  imports: [AsyncPipe],
  selector: 'app-markdown',
  styleUrls: ['markdown.component.scss'],
  templateUrl: './markdown.component.html',
})
export class MarkdownComponent {
  readonly markdown = input.required<null | string>();

  readonly #markdownConverter = new showdown.Converter({});

  protected readonly html$ = toObservable(this.markdown).pipe(
    map((markdown) => (markdown ? this.#markdownConverter.makeHtml(markdown) : '')),
  );
}
