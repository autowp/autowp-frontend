import {
  Component,
  Injectable,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {APICommentsService, APICommentVotes} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-comments-votes',
  templateUrl: './votes.component.html'
})
@Injectable()
export class CommentsVotesComponent implements OnInit, OnChanges {
  @Input() messageID: number;

  public votes: APICommentVotes;

  constructor(
    public activeModal: NgbActiveModal,
    private commentService: APICommentsService,
    private toastService: ToastsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.commentService.getVotes(this.messageID).subscribe(
      response => (this.votes = response),
      response => this.toastService.response(response)
    );
  }
}
