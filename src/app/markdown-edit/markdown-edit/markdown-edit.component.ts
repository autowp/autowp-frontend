import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {AfterViewInit, ChangeDetectionStrategy, Component, computed, input, output, viewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavLinkBase, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {MarkdownComponent} from '@utils/markdown/markdown.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavLinkBase,
    NgbNavContent,
    FormsModule,
    MarkdownComponent,
    NgbNavOutlet,
    ReactiveFormsModule,
    CdkTextareaAutosize,
  ],
  selector: 'app-markdown-edit',
  templateUrl: './markdown-edit.component.html',
})
export class MarkdownEditComponent implements AfterViewInit {
  readonly text = input.required<string>();
  readonly textChange = output<string>();

  readonly control = computed(() => new FormControl<string>(this.text(), {nonNullable: true}));

  readonly autosize = viewChild(CdkTextareaAutosize);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.autosize()!.resizeToFitContent(true);
    }, 400);
  }

  protected onChange(value: string) {
    this.textChange.emit(value);
  }
}
