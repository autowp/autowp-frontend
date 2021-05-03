import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {CommentVote} from '../../../../generated/spec.pb';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-comments-votes',
  templateUrl: './votes.component.html'
})
export class CommentsVotesComponent implements OnInit, OnChanges {
  @Input() messageID: number;

  public votes: {
    positive: CommentVote[],
    negative: CommentVote[]
  };

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
    this.commentService.getVotes(this.messageID).pipe(
      map(votes => ({
        positive: votes.filter(v => v.value === CommentVote.VoteValue.POSITIVE),
        negative: votes.filter(v => v.value === CommentVote.VoteValue.NEGATIVE)
      }))
    ).subscribe(
      response => (this.votes = response),
      response => this.toastService.response(response)
    );
  }
}
