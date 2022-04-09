import {Component, Input} from '@angular/core';
import * as showdown from 'showdown';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['markdown.component.scss']
})
export class MarkdownComponent {
  @Input() set markdown(value: string) { this.markdown$.next(value); };
  private markdown$ = new BehaviorSubject<string>(null);

  private markdownConverter = new showdown.Converter({});

  public html$ = this.markdown$.pipe(
    map(markdown => markdown ? this.markdownConverter.makeHtml(markdown) : '')
  );
}
