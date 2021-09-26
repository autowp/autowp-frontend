/* tslint:disable */
/* eslint-disable */
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcEvent,
  GrpcMetadata
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors
} from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './spec.pb';
import * as googleProtobuf001 from '@ngx-grpc/well-known-types';
import {
  GRPC_AUTOWP_CLIENT_SETTINGS,
  GRPC_CONTACTS_CLIENT_SETTINGS,
  GRPC_USERS_CLIENT_SETTINGS
} from './spec.pbconf';
/**
 * Service client implementation for goautowp.Autowp
 */
@Injectable({ providedIn: 'any' })
export class AutowpClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary RPC for /goautowp.Autowp/AclEnforce
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.AclEnforceResult>>
     */
    aclEnforce: (
      requestData: thisProto.AclEnforceRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.AclEnforceResult>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/AclEnforce',
        requestData,
        requestMetadata,
        requestClass: thisProto.AclEnforceRequest,
        responseClass: thisProto.AclEnforceResult
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/AddToTrafficBlacklist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    addToTrafficBlacklist: (
      requestData: thisProto.AddToTrafficBlacklistRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/AddToTrafficBlacklist',
        requestData,
        requestMetadata,
        requestClass: thisProto.AddToTrafficBlacklistRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/AddToTrafficWhitelist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    addToTrafficWhitelist: (
      requestData: thisProto.AddToTrafficWhitelistRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/AddToTrafficWhitelist',
        requestData,
        requestMetadata,
        requestClass: thisProto.AddToTrafficWhitelistRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/CreateFeedback
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    createFeedback: (
      requestData: thisProto.APICreateFeedbackRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/CreateFeedback',
        requestData,
        requestMetadata,
        requestClass: thisProto.APICreateFeedbackRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/DeleteFromTrafficBlacklist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    deleteFromTrafficBlacklist: (
      requestData: thisProto.DeleteFromTrafficBlacklistRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/DeleteFromTrafficBlacklist',
        requestData,
        requestMetadata,
        requestClass: thisProto.DeleteFromTrafficBlacklistRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/DeleteFromTrafficWhitelist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    deleteFromTrafficWhitelist: (
      requestData: thisProto.DeleteFromTrafficWhitelistRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/DeleteFromTrafficWhitelist',
        requestData,
        requestMetadata,
        requestClass: thisProto.DeleteFromTrafficWhitelistRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetBrandIcons
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.BrandIcons>>
     */
    getBrandIcons: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.BrandIcons>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetBrandIcons',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.BrandIcons
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetBrandVehicleTypes
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.BrandVehicleTypeItems>>
     */
    getBrandVehicleTypes: (
      requestData: thisProto.GetBrandVehicleTypesRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.BrandVehicleTypeItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetBrandVehicleTypes',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetBrandVehicleTypesRequest,
        responseClass: thisProto.BrandVehicleTypeItems
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetCommentVotes
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.CommentVoteItems>>
     */
    getCommentVotes: (
      requestData: thisProto.GetCommentVotesRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.CommentVoteItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetCommentVotes',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetCommentVotesRequest,
        responseClass: thisProto.CommentVoteItems
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetForumsUserSummary
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APIForumsUserSummary>>
     */
    getForumsUserSummary: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APIForumsUserSummary>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetForumsUserSummary',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APIForumsUserSummary
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetIP
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APIIP>>
     */
    getIP: (
      requestData: thisProto.APIGetIPRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APIIP>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetIP',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIGetIPRequest,
        responseClass: thisProto.APIIP
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetMessagesNewCount
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APIMessageNewCount>>
     */
    getMessagesNewCount: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APIMessageNewCount>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetMessagesNewCount',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APIMessageNewCount
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetMessagesSummary
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APIMessageSummary>>
     */
    getMessagesSummary: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APIMessageSummary>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetMessagesSummary',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APIMessageSummary
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetPerspectives
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.PerspectivesItems>>
     */
    getPerspectives: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.PerspectivesItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetPerspectives',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.PerspectivesItems
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetPerspectivePages
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.PerspectivePagesItems>>
     */
    getPerspectivePages: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.PerspectivePagesItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetPerspectivePages',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.PerspectivePagesItems
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetReCaptchaConfig
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ReCaptchaConfig>>
     */
    getReCaptchaConfig: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ReCaptchaConfig>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetReCaptchaConfig',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.ReCaptchaConfig
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetSpecs
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.SpecsItems>>
     */
    getSpecs: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.SpecsItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetSpecs',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.SpecsItems
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetTrafficTop
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITrafficTopResponse>>
     */
    getTrafficTop: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITrafficTopResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetTrafficTop',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APITrafficTopResponse
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetTrafficWhitelist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITrafficWhitelistItems>>
     */
    getTrafficWhitelist: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITrafficWhitelistItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetTrafficWhitelist',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APITrafficWhitelistItems
      });
    },
    /**
     * Unary RPC for /goautowp.Autowp/GetVehicleTypes
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.VehicleTypeItems>>
     */
    getVehicleTypes: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.VehicleTypeItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Autowp/GetVehicleTypes',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.VehicleTypeItems
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_AUTOWP_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Autowp', settings);
  }

  /**
   * Unary RPC for /goautowp.Autowp/AclEnforce
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.AclEnforceResult>
   */
  aclEnforce(
    requestData: thisProto.AclEnforceRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.AclEnforceResult> {
    return this.$raw
      .aclEnforce(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/AddToTrafficBlacklist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  addToTrafficBlacklist(
    requestData: thisProto.AddToTrafficBlacklistRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .addToTrafficBlacklist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/AddToTrafficWhitelist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  addToTrafficWhitelist(
    requestData: thisProto.AddToTrafficWhitelistRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .addToTrafficWhitelist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/CreateFeedback
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  createFeedback(
    requestData: thisProto.APICreateFeedbackRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .createFeedback(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/DeleteFromTrafficBlacklist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  deleteFromTrafficBlacklist(
    requestData: thisProto.DeleteFromTrafficBlacklistRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .deleteFromTrafficBlacklist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/DeleteFromTrafficWhitelist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  deleteFromTrafficWhitelist(
    requestData: thisProto.DeleteFromTrafficWhitelistRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .deleteFromTrafficWhitelist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetBrandIcons
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.BrandIcons>
   */
  getBrandIcons(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.BrandIcons> {
    return this.$raw
      .getBrandIcons(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetBrandVehicleTypes
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.BrandVehicleTypeItems>
   */
  getBrandVehicleTypes(
    requestData: thisProto.GetBrandVehicleTypesRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.BrandVehicleTypeItems> {
    return this.$raw
      .getBrandVehicleTypes(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetCommentVotes
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.CommentVoteItems>
   */
  getCommentVotes(
    requestData: thisProto.GetCommentVotesRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.CommentVoteItems> {
    return this.$raw
      .getCommentVotes(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetForumsUserSummary
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APIForumsUserSummary>
   */
  getForumsUserSummary(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APIForumsUserSummary> {
    return this.$raw
      .getForumsUserSummary(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetIP
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APIIP>
   */
  getIP(
    requestData: thisProto.APIGetIPRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APIIP> {
    return this.$raw
      .getIP(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetMessagesNewCount
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APIMessageNewCount>
   */
  getMessagesNewCount(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APIMessageNewCount> {
    return this.$raw
      .getMessagesNewCount(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetMessagesSummary
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APIMessageSummary>
   */
  getMessagesSummary(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APIMessageSummary> {
    return this.$raw
      .getMessagesSummary(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetPerspectives
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.PerspectivesItems>
   */
  getPerspectives(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.PerspectivesItems> {
    return this.$raw
      .getPerspectives(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetPerspectivePages
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.PerspectivePagesItems>
   */
  getPerspectivePages(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.PerspectivePagesItems> {
    return this.$raw
      .getPerspectivePages(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetReCaptchaConfig
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ReCaptchaConfig>
   */
  getReCaptchaConfig(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ReCaptchaConfig> {
    return this.$raw
      .getReCaptchaConfig(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetSpecs
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.SpecsItems>
   */
  getSpecs(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.SpecsItems> {
    return this.$raw
      .getSpecs(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetTrafficTop
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITrafficTopResponse>
   */
  getTrafficTop(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITrafficTopResponse> {
    return this.$raw
      .getTrafficTop(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetTrafficWhitelist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITrafficWhitelistItems>
   */
  getTrafficWhitelist(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITrafficWhitelistItems> {
    return this.$raw
      .getTrafficWhitelist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Autowp/GetVehicleTypes
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.VehicleTypeItems>
   */
  getVehicleTypes(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.VehicleTypeItems> {
    return this.$raw
      .getVehicleTypes(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
/**
 * Service client implementation for goautowp.Contacts
 */
@Injectable({ providedIn: 'any' })
export class ContactsClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary RPC for /goautowp.Contacts/CreateContact
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    createContact: (
      requestData: thisProto.CreateContactRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Contacts/CreateContact',
        requestData,
        requestMetadata,
        requestClass: thisProto.CreateContactRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Contacts/DeleteContact
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    deleteContact: (
      requestData: thisProto.DeleteContactRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Contacts/DeleteContact',
        requestData,
        requestMetadata,
        requestClass: thisProto.DeleteContactRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Contacts/GetContact
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.Contact>>
     */
    getContact: (
      requestData: thisProto.GetContactRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.Contact>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Contacts/GetContact',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetContactRequest,
        responseClass: thisProto.Contact
      });
    },
    /**
     * Unary RPC for /goautowp.Contacts/GetContacts
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.ContactItems>>
     */
    getContacts: (
      requestData: thisProto.GetContactsRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.ContactItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Contacts/GetContacts',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetContactsRequest,
        responseClass: thisProto.ContactItems
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_CONTACTS_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Contacts', settings);
  }

  /**
   * Unary RPC for /goautowp.Contacts/CreateContact
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  createContact(
    requestData: thisProto.CreateContactRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .createContact(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Contacts/DeleteContact
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  deleteContact(
    requestData: thisProto.DeleteContactRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .deleteContact(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Contacts/GetContact
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.Contact>
   */
  getContact(
    requestData: thisProto.GetContactRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.Contact> {
    return this.$raw
      .getContact(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Contacts/GetContacts
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.ContactItems>
   */
  getContacts(
    requestData: thisProto.GetContactsRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.ContactItems> {
    return this.$raw
      .getContacts(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
/**
 * Service client implementation for goautowp.Users
 */
@Injectable({ providedIn: 'any' })
export class UsersClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary RPC for /goautowp.Users/CreateUser
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    createUser: (
      requestData: thisProto.APICreateUserRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/CreateUser',
        requestData,
        requestMetadata,
        requestClass: thisProto.APICreateUserRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Users/UpdateUser
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    updateUser: (
      requestData: thisProto.APIUpdateUserRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/UpdateUser',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIUpdateUserRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Users/DeleteUser
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    deleteUser: (
      requestData: thisProto.APIDeleteUserRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/DeleteUser',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIDeleteUserRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Users/GetUser
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APIUser>>
     */
    getUser: (
      requestData: thisProto.APIGetUserRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APIUser>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/GetUser',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIGetUserRequest,
        responseClass: thisProto.APIUser
      });
    },
    /**
     * Unary RPC for /goautowp.Users/EmailChange
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    emailChange: (
      requestData: thisProto.APIEmailChangeRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/EmailChange',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIEmailChangeRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Users/EmailChangeConfirm
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    emailChangeConfirm: (
      requestData: thisProto.APIEmailChangeConfirmRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/EmailChangeConfirm',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIEmailChangeConfirmRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Users/PasswordRecovery
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    passwordRecovery: (
      requestData: thisProto.APIPasswordRecoveryRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/PasswordRecovery',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIPasswordRecoveryRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Users/PasswordRecoveryCheckCode
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    passwordRecoveryCheckCode: (
      requestData: thisProto.APIPasswordRecoveryCheckCodeRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/PasswordRecoveryCheckCode',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIPasswordRecoveryCheckCodeRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary RPC for /goautowp.Users/PasswordRecoveryConfirm
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APIPasswordRecoveryConfirmResponse>>
     */
    passwordRecoveryConfirm: (
      requestData: thisProto.APIPasswordRecoveryConfirmRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APIPasswordRecoveryConfirmResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/PasswordRecoveryConfirm',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIPasswordRecoveryConfirmRequest,
        responseClass: thisProto.APIPasswordRecoveryConfirmResponse
      });
    },
    /**
     * Unary RPC for /goautowp.Users/SetPassword
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    setPassword: (
      requestData: thisProto.APISetPasswordRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/SetPassword',
        requestData,
        requestMetadata,
        requestClass: thisProto.APISetPasswordRequest,
        responseClass: googleProtobuf001.Empty
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_USERS_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Users', settings);
  }

  /**
   * Unary RPC for /goautowp.Users/CreateUser
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  createUser(
    requestData: thisProto.APICreateUserRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .createUser(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/UpdateUser
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  updateUser(
    requestData: thisProto.APIUpdateUserRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .updateUser(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/DeleteUser
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  deleteUser(
    requestData: thisProto.APIDeleteUserRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .deleteUser(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/GetUser
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APIUser>
   */
  getUser(
    requestData: thisProto.APIGetUserRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APIUser> {
    return this.$raw
      .getUser(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/EmailChange
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  emailChange(
    requestData: thisProto.APIEmailChangeRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .emailChange(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/EmailChangeConfirm
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  emailChangeConfirm(
    requestData: thisProto.APIEmailChangeConfirmRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .emailChangeConfirm(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/PasswordRecovery
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  passwordRecovery(
    requestData: thisProto.APIPasswordRecoveryRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .passwordRecovery(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/PasswordRecoveryCheckCode
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  passwordRecoveryCheckCode(
    requestData: thisProto.APIPasswordRecoveryCheckCodeRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .passwordRecoveryCheckCode(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/PasswordRecoveryConfirm
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APIPasswordRecoveryConfirmResponse>
   */
  passwordRecoveryConfirm(
    requestData: thisProto.APIPasswordRecoveryConfirmRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APIPasswordRecoveryConfirmResponse> {
    return this.$raw
      .passwordRecoveryConfirm(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary RPC for /goautowp.Users/SetPassword
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  setPassword(
    requestData: thisProto.APISetPasswordRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .setPassword(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
