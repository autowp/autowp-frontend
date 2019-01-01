import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-markdown-edit',
  templateUrl: './markdown-edit.component.html'
})
export class MarkdownEditComponent {
  @Input() text: string;
  @Output() textChange = new EventEmitter();

  constructor() {}

  public onChange() {
    this.textChange.emit(this.text);
  }
}
