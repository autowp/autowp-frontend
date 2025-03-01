import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavItemRole,
  NgbNavLink,
  NgbNavLinkBase,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {AutosizeModule} from 'ngx-autosize';

@Component({
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavLinkBase,
    NgbNavContent,
    FormsModule,
    AutosizeModule,
    MarkdownComponent,
    NgbNavOutlet,
  ],
  selector: 'app-markdown-edit',
  templateUrl: './markdown-edit.component.html',
})
export class MarkdownEditComponent {
  @Input() text: null | string = '';
  @Output() textChange = new EventEmitter();

  protected onChange() {
    this.textChange.emit(this.text);
  }
}
