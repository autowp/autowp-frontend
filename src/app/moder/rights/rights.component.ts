import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import {
  APIACL,
  APIACLRole,
  APIACLRule,
  APIACLResource
} from '../../services/acl.service';
import { PageEnvService } from '../../services/page-env.service';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';
import { APIService } from '../../services/api.service';

// Acl.inheritsRole('moder', 'unauthorized');

interface IAddRoleParentForm {
  role: null | string;
  parentRole: null | string;
}

interface IAddRoleForm {
  name: null | string;
}

interface IAddRuleForm {
  role: null | string;
  privilege: null | string;
  allowed: number;
}

@Component({
  selector: 'app-moder-rights',
  templateUrl: './rights.component.html'
})
@Injectable()
export class ModerRightsComponent implements OnInit, OnDestroy {
  public rules: APIACLRule[] = [];
  public resources: APIACLResource[] = [];
  public roles: APIACLRole[] = [];
  public rolesTree: APIACLRole[] = [];
  private $loadRoles = new BehaviorSubject<null>(null);
  private $loadRolesTree = new BehaviorSubject<null>(null);
  private $loadRules = new BehaviorSubject<null>(null);

  public addRoleParentForm: IAddRoleParentForm = {
    role: null,
    parentRole: null
  };

  public addRoleForm: IAddRoleForm = {
    name: null
  };
  public addRuleForm: IAddRuleForm = {
    role: null,
    privilege: null,
    allowed: 0
  };
  private sub: Subscription;

  constructor(
    private api: APIService,
    private acl: APIACL,
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
          name: 'page/71/name',
          pageId: 71
        }),
      0
    );

    this.sub = combineLatest([
      this.$loadRolesTree.pipe(switchMapTo(this.acl.getRoles(true))),
      this.$loadRoles.pipe(switchMapTo(this.acl.getRoles(false))),
      this.acl.getResources(),
      this.$loadRules.pipe(switchMapTo(this.acl.getRules()))
    ]).subscribe(([rolesTree, roles, resources, rules]) => {
      this.rolesTree = rolesTree.items;
      this.roles = roles.items;
      this.resources = resources.items;
      this.rules = rules.items;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public addRoleParent() {
    if (this.addRoleParentForm.role) {
      this.api
        .request<void>(
          'POST',
          'acl/roles/' +
            encodeURIComponent(this.addRoleParentForm.role) +
            '/parents',
          {body: {
            role: this.addRoleParentForm.parentRole
          }}
        )
        .subscribe(() => {
          this.$loadRoles.next(null);
          this.$loadRolesTree.next(null);
        });
    }
  }

  public addRole() {
    this.api
      .request<void>('POST', 'acl/roles', {body: this.addRoleForm})
      .subscribe(() => {
        this.$loadRoles.next(null);
        this.$loadRolesTree.next(null);
      });
  }

  public addRule() {
    if (!this.addRuleForm.privilege) {
      return;
    }

    const privilege = this.addRuleForm.privilege.split('/');
    this.api
      .request<void>('POST', 'acl/rules', {body: {
        role: this.addRuleForm.role,
        resource: privilege[0],
        privilege: privilege[1],
        allowed: this.addRuleForm.allowed
      }})
      .subscribe(() => {
        this.$loadRules.next(null);
      });
  }
}
