import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotingRoutingModule } from './voting-routing.module';
import { VotingComponent } from './voting.component';
import {
  NgbProgressbarModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';
import { CommentsModule } from '../comments/comments.module';
import { VotingVotesComponent } from './votes/votes.component';
import { UserModule } from '../user/user.module';
import { VotingService } from './voting.service';

@NgModule({
  declarations: [VotingComponent, VotingVotesComponent],
  imports: [
    CommonModule,
    VotingRoutingModule,
    NgbProgressbarModule,
    NgbModalModule,
    FormsModule,
    TranslateModule,
    MomentModule,
    CommentsModule,
    UserModule
  ],
  entryComponents: [VotingVotesComponent],
  providers: [VotingService]
})
export class VotingModule {}
