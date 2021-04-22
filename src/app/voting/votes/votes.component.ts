import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VotingService, APIVotingVariantVote } from '../voting.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-voting-votes',
  templateUrl: './votes.component.html'
})
export class VotingVotesComponent implements OnChanges, OnInit {
  @Input() votingID: number;
  @Input() variantID: number;

  public votes: APIVotingVariantVote[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private votingService: VotingService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  private load() {
    this.votes = [];

    const votingID = this.votingID ? this.votingID : 0;
    const variantID = this.variantID ? this.variantID : 0;

    if (votingID && variantID) {
      this.votingService
        .getVariantVotes(votingID, variantID, {
          fields: 'user'
        })
        .subscribe(
          response => {
            this.votes = response.items;
          },
          response => this.toastService.response(response)
        );
    }
  }
}
