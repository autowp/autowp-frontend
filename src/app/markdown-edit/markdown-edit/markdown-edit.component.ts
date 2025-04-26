import {Component, effect, input, output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavLinkBase, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {AutosizeModule} from 'ngx-autosize';

@Component({
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavLinkBase,
    NgbNavContent,
    FormsModule,
    AutosizeModule,
    MarkdownComponent,
    NgbNavOutlet,
    ReactiveFormsModule,
  ],
  selector: 'app-markdown-edit',
  templateUrl: './markdown-edit.component.html',
})
export class MarkdownEditComponent {
  readonly text = input.required<string>();
  readonly textChange = output<string>();

  protected readonly control = new FormControl<string>('', {nonNullable: true});

  constructor() {
    effect(() => {
      this.control.setValue(this.text());
    });
  }

  protected onChange() {
    this.textChange.emit(this.control.value);
  }
}
