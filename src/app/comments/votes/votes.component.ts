import {
  Component,
  Injectable,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Notify from '../../notify';
import { APICommentsService } from '../../api/comments/comments.service';

@Component({
  selector: 'app-comments-votes',
  templateUrl: './votes.component.html'
})
@Injectable()
export class CommentsVotesComponent implements OnInit, OnChanges {
  @Input() messageID: number;

  public html: string;

  constructor(
    public activeModal: NgbActiveModal,
    private commentService: APICommentsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.commentService
      .getVotes(this.messageID)
      .subscribe(
        response => (this.html = response),
        response => Notify.response(response)
      );
  }
}
