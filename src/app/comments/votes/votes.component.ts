import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastsService} from '../../toasts/toasts.service';
import {CommentVote, GetCommentVotesRequest} from '../../../../generated/spec.pb';
import {map} from 'rxjs/operators';
import {CommentsClient} from '../../../../generated/spec.pbsc';

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
    private toastService: ToastsService,
    private commentsGrpc: CommentsClient,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.commentsGrpc.getCommentVotes(new GetCommentVotesRequest({
      commentId: ''+this.messageID,
    })).pipe(
      map(votes => ({
        positive: votes.items.filter(v => v.value === CommentVote.VoteValue.POSITIVE),
        negative: votes.items.filter(v => v.value === CommentVote.VoteValue.NEGATIVE)
      }))
    ).subscribe(
      response => (this.votes = response),
      response => this.toastService.grpcErrorResponse(response)
    );
  }
}
