import {isPlatformBrowser} from '@angular/common';
import {AfterViewInit, Component, ElementRef, inject, PLATFORM_ID} from '@angular/core';
import showdown from 'showdown';

@Component({
  selector: 'app-markdown2',
  standalone: true,
  styleUrls: ['markdown2.component.scss'],
  templateUrl: './markdown2.component.html',
})
export class Markdown2Component implements AfterViewInit {
  readonly #element = inject(ElementRef);
  readonly #platform = inject(PLATFORM_ID);

  private decodeHtml(html: string): string {
    if (isPlatformBrowser(this.#platform)) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = html;
      return textarea.value;
    }
    return html;
  }

  ngAfterViewInit() {
    const markdown = this.decodeHtml(this.#element.nativeElement.innerHTML);

    const markdownConverter = new showdown.Converter({});
    this.#element.nativeElement.innerHTML = markdownConverter.makeHtml(markdown);
  }
}
