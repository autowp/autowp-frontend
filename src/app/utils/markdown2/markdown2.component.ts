import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import * as showdown from 'showdown';

@Component({
  selector: 'app-markdown2',
  templateUrl: './markdown2.component.html',
  styleUrls: ['markdown2.component.scss'],
})
export class Markdown2Component implements AfterViewInit {
  constructor(private element: ElementRef, @Inject(PLATFORM_ID) private platform: object) {}

  private decodeHtml(html: string): string {
    if (isPlatformBrowser(this.platform)) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = html;
      return textarea.value;
    }
    return html;
  }

  ngAfterViewInit() {
    const markdown = this.decodeHtml(this.element.nativeElement.innerHTML);

    const markdownConverter = new showdown.Converter({});
    this.element.nativeElement.innerHTML = markdownConverter.makeHtml(markdown);
  }
}
