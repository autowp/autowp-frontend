import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Notify from '../../notify';
import { PageEnvService } from '../../services/page-env.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { APIAttrAttribute, APIAttrZone, APIAttrsService } from '../../api/attrs/attrs.service';

// Acl.isAllowed('attrs', 'edit', 'unauthorized');

@Component({
  selector: 'app-moder-attrs',
  templateUrl: './attrs.component.html'
})
@Injectable()
export class ModerAttrsComponent implements OnInit, OnDestroy {
  public attributes: APIAttrAttribute[] = [];
  public zones: APIAttrZone[] = [];
  private zonesSub: Subscription;
  private attributesSub: Subscription;
  private attributesChange$ = new BehaviorSubject<null>(null);

  constructor(
    private http: HttpClient,
    private attrsService: APIAttrsService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          name: 'page/100/name',
          pageId: 100
        }),
      0
    );

    this.zonesSub = this.attrsService
      .getZones()
      .subscribe(
        zones => (this.zones = zones),
        response => Notify.response(response)
      );

    this.attributesSub = this.attributesChange$
      .pipe(
        switchMap(() => this.attrsService.getAttributes({ recursive: true }))
      )
      .subscribe(
        response => (this.attributes = response.items),
        response => Notify.response(response)
      );

    this.loadAttributes();
  }

  ngOnDestroy(): void {
    this.zonesSub.unsubscribe();
    this.attributesSub.unsubscribe();
  }

  private move(id: number, dir: string) {
    this.http
      .patch<void>('/api/attr/attribute/' + id, {
        move: dir
      })
      .subscribe(
        () => this.attributesChange$.next(null),
        response => Notify.response(response)
      );
  }

  public moveUp(id: number) {
    this.move(id, 'up');
  }

  public moveDown(id: number) {
    this.move(id, 'down');
  }

  private loadAttributes() {}
}
