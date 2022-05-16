/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
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
  GRPC_TRAFFIC_CLIENT_SETTINGS,
  GRPC_CONTACTS_CLIENT_SETTINGS,
  GRPC_USERS_CLIENT_SETTINGS,
  GRPC_ITEMS_CLIENT_SETTINGS,
  GRPC_COMMENTS_CLIENT_SETTINGS,
  GRPC_MAP_CLIENT_SETTINGS,
  GRPC_PICTURES_CLIENT_SETTINGS,
  GRPC_MESSAGING_CLIENT_SETTINGS
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
     * Unary call: /goautowp.Autowp/AclEnforce
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
     * Unary call: /goautowp.Autowp/CreateFeedback
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
     * Unary call: /goautowp.Autowp/GetBrandIcons
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
     * Unary call: /goautowp.Autowp/GetBrandVehicleTypes
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
     * Unary call: /goautowp.Autowp/GetForumsUserSummary
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
     * Unary call: /goautowp.Autowp/GetIP
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
     * Unary call: /goautowp.Autowp/GetPerspectives
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
     * Unary call: /goautowp.Autowp/GetPerspectivePages
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
     * Unary call: /goautowp.Autowp/GetReCaptchaConfig
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
     * Unary call: /goautowp.Autowp/GetSpecs
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
     * Unary call: /goautowp.Autowp/GetVehicleTypes
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
   * Unary call @/goautowp.Autowp/AclEnforce
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
   * Unary call @/goautowp.Autowp/CreateFeedback
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
   * Unary call @/goautowp.Autowp/GetBrandIcons
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
   * Unary call @/goautowp.Autowp/GetBrandVehicleTypes
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
   * Unary call @/goautowp.Autowp/GetForumsUserSummary
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
   * Unary call @/goautowp.Autowp/GetIP
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
   * Unary call @/goautowp.Autowp/GetPerspectives
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
   * Unary call @/goautowp.Autowp/GetPerspectivePages
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
   * Unary call @/goautowp.Autowp/GetReCaptchaConfig
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
   * Unary call @/goautowp.Autowp/GetSpecs
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
   * Unary call @/goautowp.Autowp/GetVehicleTypes
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
 * Service client implementation for goautowp.Traffic
 */
@Injectable({ providedIn: 'any' })
export class TrafficClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /goautowp.Traffic/AddToBlacklist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    addToBlacklist: (
      requestData: thisProto.AddToTrafficBlacklistRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Traffic/AddToBlacklist',
        requestData,
        requestMetadata,
        requestClass: thisProto.AddToTrafficBlacklistRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Traffic/AddToWhitelist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    addToWhitelist: (
      requestData: thisProto.AddToTrafficWhitelistRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Traffic/AddToWhitelist',
        requestData,
        requestMetadata,
        requestClass: thisProto.AddToTrafficWhitelistRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Traffic/DeleteFromBlacklist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    deleteFromBlacklist: (
      requestData: thisProto.DeleteFromTrafficBlacklistRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Traffic/DeleteFromBlacklist',
        requestData,
        requestMetadata,
        requestClass: thisProto.DeleteFromTrafficBlacklistRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Traffic/DeleteFromWhitelist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    deleteFromWhitelist: (
      requestData: thisProto.DeleteFromTrafficWhitelistRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Traffic/DeleteFromWhitelist',
        requestData,
        requestMetadata,
        requestClass: thisProto.DeleteFromTrafficWhitelistRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Traffic/GetTop
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITrafficTopResponse>>
     */
    getTop: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITrafficTopResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Traffic/GetTop',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APITrafficTopResponse
      });
    },
    /**
     * Unary call: /goautowp.Traffic/GetWhitelist
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITrafficWhitelistItems>>
     */
    getWhitelist: (
      requestData: googleProtobuf001.Empty,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITrafficWhitelistItems>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Traffic/GetWhitelist',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APITrafficWhitelistItems
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_TRAFFIC_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Traffic', settings);
  }

  /**
   * Unary call @/goautowp.Traffic/AddToBlacklist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  addToBlacklist(
    requestData: thisProto.AddToTrafficBlacklistRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .addToBlacklist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Traffic/AddToWhitelist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  addToWhitelist(
    requestData: thisProto.AddToTrafficWhitelistRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .addToWhitelist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Traffic/DeleteFromBlacklist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  deleteFromBlacklist(
    requestData: thisProto.DeleteFromTrafficBlacklistRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .deleteFromBlacklist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Traffic/DeleteFromWhitelist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  deleteFromWhitelist(
    requestData: thisProto.DeleteFromTrafficWhitelistRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .deleteFromWhitelist(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Traffic/GetTop
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITrafficTopResponse>
   */
  getTop(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITrafficTopResponse> {
    return this.$raw
      .getTop(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Traffic/GetWhitelist
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITrafficWhitelistItems>
   */
  getWhitelist(
    requestData: googleProtobuf001.Empty,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITrafficWhitelistItems> {
    return this.$raw
      .getWhitelist(requestData, requestMetadata)
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
     * Unary call: /goautowp.Contacts/CreateContact
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
     * Unary call: /goautowp.Contacts/DeleteContact
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
     * Unary call: /goautowp.Contacts/GetContact
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
     * Unary call: /goautowp.Contacts/GetContacts
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
   * Unary call @/goautowp.Contacts/CreateContact
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
   * Unary call @/goautowp.Contacts/DeleteContact
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
   * Unary call @/goautowp.Contacts/GetContact
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
   * Unary call @/goautowp.Contacts/GetContacts
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
     * Unary call: /goautowp.Users/DeleteUser
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
     * Unary call: /goautowp.Users/GetUser
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
     * Unary call: /goautowp.Users/Me
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APIUser>>
     */
    me: (
      requestData: thisProto.APIMeRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APIUser>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Users/Me',
        requestData,
        requestMetadata,
        requestClass: thisProto.APIMeRequest,
        responseClass: thisProto.APIUser
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
   * Unary call @/goautowp.Users/DeleteUser
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
   * Unary call @/goautowp.Users/GetUser
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
   * Unary call @/goautowp.Users/Me
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APIUser>
   */
  me(
    requestData: thisProto.APIMeRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APIUser> {
    return this.$raw
      .me(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
/**
 * Service client implementation for goautowp.Items
 */
@Injectable({ providedIn: 'any' })
export class ItemsClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /goautowp.Items/GetTopBrandsList
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITopBrandsList>>
     */
    getTopBrandsList: (
      requestData: thisProto.GetTopBrandsListRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITopBrandsList>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Items/GetTopBrandsList',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetTopBrandsListRequest,
        responseClass: thisProto.APITopBrandsList
      });
    },
    /**
     * Unary call: /goautowp.Items/GetTopPersonsList
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITopPersonsList>>
     */
    getTopPersonsList: (
      requestData: thisProto.GetTopPersonsListRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITopPersonsList>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Items/GetTopPersonsList',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetTopPersonsListRequest,
        responseClass: thisProto.APITopPersonsList
      });
    },
    /**
     * Unary call: /goautowp.Items/GetTopFactoriesList
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITopFactoriesList>>
     */
    getTopFactoriesList: (
      requestData: thisProto.GetTopFactoriesListRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITopFactoriesList>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Items/GetTopFactoriesList',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetTopFactoriesListRequest,
        responseClass: thisProto.APITopFactoriesList
      });
    },
    /**
     * Unary call: /goautowp.Items/GetTopCategoriesList
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITopCategoriesList>>
     */
    getTopCategoriesList: (
      requestData: thisProto.GetTopCategoriesListRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITopCategoriesList>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Items/GetTopCategoriesList',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetTopCategoriesListRequest,
        responseClass: thisProto.APITopCategoriesList
      });
    },
    /**
     * Unary call: /goautowp.Items/GetTopTwinsBrandsList
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APITopTwinsBrandsList>>
     */
    getTopTwinsBrandsList: (
      requestData: thisProto.GetTopTwinsBrandsListRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APITopTwinsBrandsList>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Items/GetTopTwinsBrandsList',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetTopTwinsBrandsListRequest,
        responseClass: thisProto.APITopTwinsBrandsList
      });
    },
    /**
     * Unary call: /goautowp.Items/List
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.APIItemList>>
     */
    list: (
      requestData: thisProto.ListItemsRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.APIItemList>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Items/List',
        requestData,
        requestMetadata,
        requestClass: thisProto.ListItemsRequest,
        responseClass: thisProto.APIItemList
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_ITEMS_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Items', settings);
  }

  /**
   * Unary call @/goautowp.Items/GetTopBrandsList
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITopBrandsList>
   */
  getTopBrandsList(
    requestData: thisProto.GetTopBrandsListRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITopBrandsList> {
    return this.$raw
      .getTopBrandsList(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Items/GetTopPersonsList
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITopPersonsList>
   */
  getTopPersonsList(
    requestData: thisProto.GetTopPersonsListRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITopPersonsList> {
    return this.$raw
      .getTopPersonsList(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Items/GetTopFactoriesList
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITopFactoriesList>
   */
  getTopFactoriesList(
    requestData: thisProto.GetTopFactoriesListRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITopFactoriesList> {
    return this.$raw
      .getTopFactoriesList(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Items/GetTopCategoriesList
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITopCategoriesList>
   */
  getTopCategoriesList(
    requestData: thisProto.GetTopCategoriesListRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITopCategoriesList> {
    return this.$raw
      .getTopCategoriesList(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Items/GetTopTwinsBrandsList
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APITopTwinsBrandsList>
   */
  getTopTwinsBrandsList(
    requestData: thisProto.GetTopTwinsBrandsListRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APITopTwinsBrandsList> {
    return this.$raw
      .getTopTwinsBrandsList(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Items/List
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.APIItemList>
   */
  list(
    requestData: thisProto.ListItemsRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.APIItemList> {
    return this.$raw
      .list(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
/**
 * Service client implementation for goautowp.Comments
 */
@Injectable({ providedIn: 'any' })
export class CommentsClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /goautowp.Comments/GetCommentVotes
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
        path: '/goautowp.Comments/GetCommentVotes',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetCommentVotesRequest,
        responseClass: thisProto.CommentVoteItems
      });
    },
    /**
     * Unary call: /goautowp.Comments/Subscribe
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    subscribe: (
      requestData: thisProto.CommentsSubscribeRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Comments/Subscribe',
        requestData,
        requestMetadata,
        requestClass: thisProto.CommentsSubscribeRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Comments/UnSubscribe
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    unSubscribe: (
      requestData: thisProto.CommentsUnSubscribeRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Comments/UnSubscribe',
        requestData,
        requestMetadata,
        requestClass: thisProto.CommentsUnSubscribeRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Comments/View
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    view: (
      requestData: thisProto.CommentsViewRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Comments/View',
        requestData,
        requestMetadata,
        requestClass: thisProto.CommentsViewRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Comments/SetDeleted
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    setDeleted: (
      requestData: thisProto.CommentsSetDeletedRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Comments/SetDeleted',
        requestData,
        requestMetadata,
        requestClass: thisProto.CommentsSetDeletedRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Comments/MoveComment
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    moveComment: (
      requestData: thisProto.CommentsMoveCommentRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Comments/MoveComment',
        requestData,
        requestMetadata,
        requestClass: thisProto.CommentsMoveCommentRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Comments/VoteComment
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.CommentsVoteCommentResponse>>
     */
    voteComment: (
      requestData: thisProto.CommentsVoteCommentRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.CommentsVoteCommentResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Comments/VoteComment',
        requestData,
        requestMetadata,
        requestClass: thisProto.CommentsVoteCommentRequest,
        responseClass: thisProto.CommentsVoteCommentResponse
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_COMMENTS_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Comments', settings);
  }

  /**
   * Unary call @/goautowp.Comments/GetCommentVotes
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
   * Unary call @/goautowp.Comments/Subscribe
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  subscribe(
    requestData: thisProto.CommentsSubscribeRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .subscribe(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Comments/UnSubscribe
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  unSubscribe(
    requestData: thisProto.CommentsUnSubscribeRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .unSubscribe(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Comments/View
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  view(
    requestData: thisProto.CommentsViewRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .view(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Comments/SetDeleted
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  setDeleted(
    requestData: thisProto.CommentsSetDeletedRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .setDeleted(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Comments/MoveComment
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  moveComment(
    requestData: thisProto.CommentsMoveCommentRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .moveComment(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Comments/VoteComment
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.CommentsVoteCommentResponse>
   */
  voteComment(
    requestData: thisProto.CommentsVoteCommentRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.CommentsVoteCommentResponse> {
    return this.$raw
      .voteComment(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
/**
 * Service client implementation for goautowp.Map
 */
@Injectable({ providedIn: 'any' })
export class MapClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /goautowp.Map/GetPoints
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.MapPoints>>
     */
    getPoints: (
      requestData: thisProto.MapGetPointsRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.MapPoints>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Map/GetPoints',
        requestData,
        requestMetadata,
        requestClass: thisProto.MapGetPointsRequest,
        responseClass: thisProto.MapPoints
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_MAP_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Map', settings);
  }

  /**
   * Unary call @/goautowp.Map/GetPoints
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.MapPoints>
   */
  getPoints(
    requestData: thisProto.MapGetPointsRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.MapPoints> {
    return this.$raw
      .getPoints(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
/**
 * Service client implementation for goautowp.Pictures
 */
@Injectable({ providedIn: 'any' })
export class PicturesClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /goautowp.Pictures/View
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    view: (
      requestData: thisProto.PicturesViewRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Pictures/View',
        requestData,
        requestMetadata,
        requestClass: thisProto.PicturesViewRequest,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Pictures/Vote
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.PicturesVoteSummary>>
     */
    vote: (
      requestData: thisProto.PicturesVoteRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.PicturesVoteSummary>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Pictures/Vote',
        requestData,
        requestMetadata,
        requestClass: thisProto.PicturesVoteRequest,
        responseClass: thisProto.PicturesVoteSummary
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_PICTURES_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Pictures', settings);
  }

  /**
   * Unary call @/goautowp.Pictures/View
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  view(
    requestData: thisProto.PicturesViewRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .view(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Pictures/Vote
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.PicturesVoteSummary>
   */
  vote(
    requestData: thisProto.PicturesVoteRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.PicturesVoteSummary> {
    return this.$raw
      .vote(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
/**
 * Service client implementation for goautowp.Messaging
 */
@Injectable({ providedIn: 'any' })
export class MessagingClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /goautowp.Messaging/GetMessagesNewCount
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
        path: '/goautowp.Messaging/GetMessagesNewCount',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APIMessageNewCount
      });
    },
    /**
     * Unary call: /goautowp.Messaging/GetMessagesSummary
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
        path: '/goautowp.Messaging/GetMessagesSummary',
        requestData,
        requestMetadata,
        requestClass: googleProtobuf001.Empty,
        responseClass: thisProto.APIMessageSummary
      });
    },
    /**
     * Unary call: /goautowp.Messaging/DeleteMessage
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    deleteMessage: (
      requestData: thisProto.MessagingDeleteMessage,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Messaging/DeleteMessage',
        requestData,
        requestMetadata,
        requestClass: thisProto.MessagingDeleteMessage,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Messaging/ClearFolder
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    clearFolder: (
      requestData: thisProto.MessagingClearFolder,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Messaging/ClearFolder',
        requestData,
        requestMetadata,
        requestClass: thisProto.MessagingClearFolder,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Messaging/CreateMessage
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<googleProtobuf001.Empty>>
     */
    createMessage: (
      requestData: thisProto.MessagingCreateMessage,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<googleProtobuf001.Empty>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Messaging/CreateMessage',
        requestData,
        requestMetadata,
        requestClass: thisProto.MessagingCreateMessage,
        responseClass: googleProtobuf001.Empty
      });
    },
    /**
     * Unary call: /goautowp.Messaging/GetMessages
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.MessagingGetMessagesResponse>>
     */
    getMessages: (
      requestData: thisProto.MessagingGetMessagesRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.MessagingGetMessagesResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/goautowp.Messaging/GetMessages',
        requestData,
        requestMetadata,
        requestClass: thisProto.MessagingGetMessagesRequest,
        responseClass: thisProto.MessagingGetMessagesResponse
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_MESSAGING_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('goautowp.Messaging', settings);
  }

  /**
   * Unary call @/goautowp.Messaging/GetMessagesNewCount
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
   * Unary call @/goautowp.Messaging/GetMessagesSummary
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
   * Unary call @/goautowp.Messaging/DeleteMessage
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  deleteMessage(
    requestData: thisProto.MessagingDeleteMessage,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .deleteMessage(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Messaging/ClearFolder
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  clearFolder(
    requestData: thisProto.MessagingClearFolder,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .clearFolder(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Messaging/CreateMessage
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<googleProtobuf001.Empty>
   */
  createMessage(
    requestData: thisProto.MessagingCreateMessage,
    requestMetadata = new GrpcMetadata()
  ): Observable<googleProtobuf001.Empty> {
    return this.$raw
      .createMessage(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/goautowp.Messaging/GetMessages
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.MessagingGetMessagesResponse>
   */
  getMessages(
    requestData: thisProto.MessagingGetMessagesRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.MessagingGetMessagesResponse> {
    return this.$raw
      .getMessages(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
