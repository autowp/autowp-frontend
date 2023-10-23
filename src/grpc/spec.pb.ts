/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf000 from '@ngx-grpc/well-known-types';
import * as googleProtobuf001 from '@ngx-grpc/well-known-types';
import * as googleProtobuf002 from '@ngx-grpc/well-known-types';
import * as googleRpc003 from './google/rpc/error-details.pb';
export enum PictureItemType {
  PICTURE_UNKNOWN = 0,
  PICTURE_CONTENT = 1,
  PICTURE_AUTHOR = 2,
  PICTURE_COPYRIGHTS = 3
}
export enum ItemType {
  ITEM_TYPE_UNKNOWN = 0,
  ITEM_TYPE_VEHICLE = 1,
  ITEM_TYPE_ENGINE = 2,
  ITEM_TYPE_CATEGORY = 3,
  ITEM_TYPE_TWINS = 4,
  ITEM_TYPE_BRAND = 5,
  ITEM_TYPE_FACTORY = 6,
  ITEM_TYPE_MUSEUM = 7,
  ITEM_TYPE_PERSON = 8,
  ITEM_TYPE_COPYRIGHT = 9
}
export enum PictureStatus {
  PICTURE_STATUS_UNKNOWN = 0,
  PICTURE_STATUS_ACCEPTED = 1,
  PICTURE_STATUS_REMOVING = 2,
  PICTURE_STATUS_REMOVED = 3,
  PICTURE_STATUS_INBOX = 4
}
export enum ItemPictureType {
  ITEM_PICTURE_UNKNOWN = 0,
  ITEM_PICTURE_CONTENT = 1,
  ITEM_PICTURE_AUTHOR = 2,
  ITEM_PICTURE_COPYRIGHTS = 3
}
export enum CommentsType {
  UNKNOWN = 0,
  PICTURES_TYPE_ID = 1,
  ITEM_TYPE_ID = 2,
  VOTINGS_TYPE_ID = 3,
  ARTICLES_TYPE_ID = 4,
  FORUMS_TYPE_ID = 5
}
export enum ModeratorAttention {
  NONE = 0,
  REQUIRED = 1,
  COMPLETE = 2
}
/**
 * Message implementation for goautowp.ErrorDetails
 */
export class ErrorDetails implements GrpcMessage {
  static id = 'goautowp.ErrorDetails';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ErrorDetails();
    ErrorDetails.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ErrorDetails) {
    _instance.retryInfo = _instance.retryInfo || undefined;
    _instance.debugInfo = _instance.debugInfo || undefined;
    _instance.quotaFailure = _instance.quotaFailure || undefined;
    _instance.preconditionFailure = _instance.preconditionFailure || undefined;
    _instance.badRequest = _instance.badRequest || undefined;
    _instance.requestInfo = _instance.requestInfo || undefined;
    _instance.help = _instance.help || undefined;
    _instance.localizedMessage = _instance.localizedMessage || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ErrorDetails,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.retryInfo = new googleRpc003.RetryInfo();
          _reader.readMessage(
            _instance.retryInfo,
            googleRpc003.RetryInfo.deserializeBinaryFromReader
          );
          break;
        case 2:
          _instance.debugInfo = new googleRpc003.DebugInfo();
          _reader.readMessage(
            _instance.debugInfo,
            googleRpc003.DebugInfo.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.quotaFailure = new googleRpc003.QuotaFailure();
          _reader.readMessage(
            _instance.quotaFailure,
            googleRpc003.QuotaFailure.deserializeBinaryFromReader
          );
          break;
        case 4:
          _instance.preconditionFailure = new googleRpc003.PreconditionFailure();
          _reader.readMessage(
            _instance.preconditionFailure,
            googleRpc003.PreconditionFailure.deserializeBinaryFromReader
          );
          break;
        case 5:
          _instance.badRequest = new googleRpc003.BadRequest();
          _reader.readMessage(
            _instance.badRequest,
            googleRpc003.BadRequest.deserializeBinaryFromReader
          );
          break;
        case 6:
          _instance.requestInfo = new googleRpc003.RequestInfo();
          _reader.readMessage(
            _instance.requestInfo,
            googleRpc003.RequestInfo.deserializeBinaryFromReader
          );
          break;
        case 7:
          _instance.help = new googleRpc003.Help();
          _reader.readMessage(
            _instance.help,
            googleRpc003.Help.deserializeBinaryFromReader
          );
          break;
        case 8:
          _instance.localizedMessage = new googleRpc003.LocalizedMessage();
          _reader.readMessage(
            _instance.localizedMessage,
            googleRpc003.LocalizedMessage.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    ErrorDetails.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ErrorDetails,
    _writer: BinaryWriter
  ) {
    if (_instance.retryInfo) {
      _writer.writeMessage(
        1,
        _instance.retryInfo as any,
        googleRpc003.RetryInfo.serializeBinaryToWriter
      );
    }
    if (_instance.debugInfo) {
      _writer.writeMessage(
        2,
        _instance.debugInfo as any,
        googleRpc003.DebugInfo.serializeBinaryToWriter
      );
    }
    if (_instance.quotaFailure) {
      _writer.writeMessage(
        3,
        _instance.quotaFailure as any,
        googleRpc003.QuotaFailure.serializeBinaryToWriter
      );
    }
    if (_instance.preconditionFailure) {
      _writer.writeMessage(
        4,
        _instance.preconditionFailure as any,
        googleRpc003.PreconditionFailure.serializeBinaryToWriter
      );
    }
    if (_instance.badRequest) {
      _writer.writeMessage(
        5,
        _instance.badRequest as any,
        googleRpc003.BadRequest.serializeBinaryToWriter
      );
    }
    if (_instance.requestInfo) {
      _writer.writeMessage(
        6,
        _instance.requestInfo as any,
        googleRpc003.RequestInfo.serializeBinaryToWriter
      );
    }
    if (_instance.help) {
      _writer.writeMessage(
        7,
        _instance.help as any,
        googleRpc003.Help.serializeBinaryToWriter
      );
    }
    if (_instance.localizedMessage) {
      _writer.writeMessage(
        8,
        _instance.localizedMessage as any,
        googleRpc003.LocalizedMessage.serializeBinaryToWriter
      );
    }
  }

  private _retryInfo?: googleRpc003.RetryInfo;
  private _debugInfo?: googleRpc003.DebugInfo;
  private _quotaFailure?: googleRpc003.QuotaFailure;
  private _preconditionFailure?: googleRpc003.PreconditionFailure;
  private _badRequest?: googleRpc003.BadRequest;
  private _requestInfo?: googleRpc003.RequestInfo;
  private _help?: googleRpc003.Help;
  private _localizedMessage?: googleRpc003.LocalizedMessage;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ErrorDetails to deeply clone from
   */
  constructor(_value?: RecursivePartial<ErrorDetails.AsObject>) {
    _value = _value || {};
    this.retryInfo = _value.retryInfo
      ? new googleRpc003.RetryInfo(_value.retryInfo)
      : undefined;
    this.debugInfo = _value.debugInfo
      ? new googleRpc003.DebugInfo(_value.debugInfo)
      : undefined;
    this.quotaFailure = _value.quotaFailure
      ? new googleRpc003.QuotaFailure(_value.quotaFailure)
      : undefined;
    this.preconditionFailure = _value.preconditionFailure
      ? new googleRpc003.PreconditionFailure(_value.preconditionFailure)
      : undefined;
    this.badRequest = _value.badRequest
      ? new googleRpc003.BadRequest(_value.badRequest)
      : undefined;
    this.requestInfo = _value.requestInfo
      ? new googleRpc003.RequestInfo(_value.requestInfo)
      : undefined;
    this.help = _value.help ? new googleRpc003.Help(_value.help) : undefined;
    this.localizedMessage = _value.localizedMessage
      ? new googleRpc003.LocalizedMessage(_value.localizedMessage)
      : undefined;
    ErrorDetails.refineValues(this);
  }
  get retryInfo(): googleRpc003.RetryInfo | undefined {
    return this._retryInfo;
  }
  set retryInfo(value: googleRpc003.RetryInfo | undefined) {
    this._retryInfo = value;
  }
  get debugInfo(): googleRpc003.DebugInfo | undefined {
    return this._debugInfo;
  }
  set debugInfo(value: googleRpc003.DebugInfo | undefined) {
    this._debugInfo = value;
  }
  get quotaFailure(): googleRpc003.QuotaFailure | undefined {
    return this._quotaFailure;
  }
  set quotaFailure(value: googleRpc003.QuotaFailure | undefined) {
    this._quotaFailure = value;
  }
  get preconditionFailure(): googleRpc003.PreconditionFailure | undefined {
    return this._preconditionFailure;
  }
  set preconditionFailure(value: googleRpc003.PreconditionFailure | undefined) {
    this._preconditionFailure = value;
  }
  get badRequest(): googleRpc003.BadRequest | undefined {
    return this._badRequest;
  }
  set badRequest(value: googleRpc003.BadRequest | undefined) {
    this._badRequest = value;
  }
  get requestInfo(): googleRpc003.RequestInfo | undefined {
    return this._requestInfo;
  }
  set requestInfo(value: googleRpc003.RequestInfo | undefined) {
    this._requestInfo = value;
  }
  get help(): googleRpc003.Help | undefined {
    return this._help;
  }
  set help(value: googleRpc003.Help | undefined) {
    this._help = value;
  }
  get localizedMessage(): googleRpc003.LocalizedMessage | undefined {
    return this._localizedMessage;
  }
  set localizedMessage(value: googleRpc003.LocalizedMessage | undefined) {
    this._localizedMessage = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ErrorDetails.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ErrorDetails.AsObject {
    return {
      retryInfo: this.retryInfo ? this.retryInfo.toObject() : undefined,
      debugInfo: this.debugInfo ? this.debugInfo.toObject() : undefined,
      quotaFailure: this.quotaFailure
        ? this.quotaFailure.toObject()
        : undefined,
      preconditionFailure: this.preconditionFailure
        ? this.preconditionFailure.toObject()
        : undefined,
      badRequest: this.badRequest ? this.badRequest.toObject() : undefined,
      requestInfo: this.requestInfo ? this.requestInfo.toObject() : undefined,
      help: this.help ? this.help.toObject() : undefined,
      localizedMessage: this.localizedMessage
        ? this.localizedMessage.toObject()
        : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ErrorDetails.AsProtobufJSON {
    return {
      retryInfo: this.retryInfo ? this.retryInfo.toProtobufJSON(options) : null,
      debugInfo: this.debugInfo ? this.debugInfo.toProtobufJSON(options) : null,
      quotaFailure: this.quotaFailure
        ? this.quotaFailure.toProtobufJSON(options)
        : null,
      preconditionFailure: this.preconditionFailure
        ? this.preconditionFailure.toProtobufJSON(options)
        : null,
      badRequest: this.badRequest
        ? this.badRequest.toProtobufJSON(options)
        : null,
      requestInfo: this.requestInfo
        ? this.requestInfo.toProtobufJSON(options)
        : null,
      help: this.help ? this.help.toProtobufJSON(options) : null,
      localizedMessage: this.localizedMessage
        ? this.localizedMessage.toProtobufJSON(options)
        : null
    };
  }
}
export module ErrorDetails {
  /**
   * Standard JavaScript object representation for ErrorDetails
   */
  export interface AsObject {
    retryInfo?: googleRpc003.RetryInfo.AsObject;
    debugInfo?: googleRpc003.DebugInfo.AsObject;
    quotaFailure?: googleRpc003.QuotaFailure.AsObject;
    preconditionFailure?: googleRpc003.PreconditionFailure.AsObject;
    badRequest?: googleRpc003.BadRequest.AsObject;
    requestInfo?: googleRpc003.RequestInfo.AsObject;
    help?: googleRpc003.Help.AsObject;
    localizedMessage?: googleRpc003.LocalizedMessage.AsObject;
  }

  /**
   * Protobuf JSON representation for ErrorDetails
   */
  export interface AsProtobufJSON {
    retryInfo: googleRpc003.RetryInfo.AsProtobufJSON | null;
    debugInfo: googleRpc003.DebugInfo.AsProtobufJSON | null;
    quotaFailure: googleRpc003.QuotaFailure.AsProtobufJSON | null;
    preconditionFailure: googleRpc003.PreconditionFailure.AsProtobufJSON | null;
    badRequest: googleRpc003.BadRequest.AsProtobufJSON | null;
    requestInfo: googleRpc003.RequestInfo.AsProtobufJSON | null;
    help: googleRpc003.Help.AsProtobufJSON | null;
    localizedMessage: googleRpc003.LocalizedMessage.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.AttrAttributeID
 */
export class AttrAttributeID implements GrpcMessage {
  static id = 'goautowp.AttrAttributeID';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrAttributeID();
    AttrAttributeID.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrAttributeID) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrAttributeID,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrAttributeID.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrAttributeID,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrAttributeID to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrAttributeID.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    AttrAttributeID.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrAttributeID.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrAttributeID.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrAttributeID.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module AttrAttributeID {
  /**
   * Standard JavaScript object representation for AttrAttributeID
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for AttrAttributeID
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.AttrAttributesRequest
 */
export class AttrAttributesRequest implements GrpcMessage {
  static id = 'goautowp.AttrAttributesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrAttributesRequest();
    AttrAttributesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrAttributesRequest) {
    _instance.zoneId = _instance.zoneId || '0';
    _instance.parentId = _instance.parentId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrAttributesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.zoneId = _reader.readInt64String();
          break;
        case 2:
          _instance.parentId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrAttributesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrAttributesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.zoneId) {
      _writer.writeInt64String(1, _instance.zoneId);
    }
    if (_instance.parentId) {
      _writer.writeInt64String(2, _instance.parentId);
    }
  }

  private _zoneId: string;
  private _parentId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrAttributesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrAttributesRequest.AsObject>) {
    _value = _value || {};
    this.zoneId = _value.zoneId;
    this.parentId = _value.parentId;
    AttrAttributesRequest.refineValues(this);
  }
  get zoneId(): string {
    return this._zoneId;
  }
  set zoneId(value: string) {
    this._zoneId = value;
  }
  get parentId(): string {
    return this._parentId;
  }
  set parentId(value: string) {
    this._parentId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrAttributesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrAttributesRequest.AsObject {
    return {
      zoneId: this.zoneId,
      parentId: this.parentId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrAttributesRequest.AsProtobufJSON {
    return {
      zoneId: this.zoneId,
      parentId: this.parentId
    };
  }
}
export module AttrAttributesRequest {
  /**
   * Standard JavaScript object representation for AttrAttributesRequest
   */
  export interface AsObject {
    zoneId: string;
    parentId: string;
  }

  /**
   * Protobuf JSON representation for AttrAttributesRequest
   */
  export interface AsProtobufJSON {
    zoneId: string;
    parentId: string;
  }
}

/**
 * Message implementation for goautowp.AttrAttributesResponse
 */
export class AttrAttributesResponse implements GrpcMessage {
  static id = 'goautowp.AttrAttributesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrAttributesResponse();
    AttrAttributesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrAttributesResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrAttributesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new AttrAttribute();
          _reader.readMessage(
            messageInitializer1,
            AttrAttribute.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    AttrAttributesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrAttributesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        AttrAttribute.serializeBinaryToWriter
      );
    }
  }

  private _items?: AttrAttribute[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrAttributesResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrAttributesResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new AttrAttribute(m));
    AttrAttributesResponse.refineValues(this);
  }
  get items(): AttrAttribute[] | undefined {
    return this._items;
  }
  set items(value: AttrAttribute[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrAttributesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrAttributesResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrAttributesResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module AttrAttributesResponse {
  /**
   * Standard JavaScript object representation for AttrAttributesResponse
   */
  export interface AsObject {
    items?: AttrAttribute.AsObject[];
  }

  /**
   * Protobuf JSON representation for AttrAttributesResponse
   */
  export interface AsProtobufJSON {
    items: AttrAttribute.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.AttrAttribute
 */
export class AttrAttribute implements GrpcMessage {
  static id = 'goautowp.AttrAttribute';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrAttribute();
    AttrAttribute.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrAttribute) {
    _instance.id = _instance.id || '0';
    _instance.parentId = _instance.parentId || '0';
    _instance.name = _instance.name || '';
    _instance.description = _instance.description || '';
    _instance.typeId = _instance.typeId || 0;
    _instance.unitId = _instance.unitId || '0';
    _instance.isMultiple = _instance.isMultiple || false;
    _instance.precision = _instance.precision || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrAttribute,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.parentId = _reader.readInt64String();
          break;
        case 3:
          _instance.name = _reader.readString();
          break;
        case 4:
          _instance.description = _reader.readString();
          break;
        case 5:
          _instance.typeId = _reader.readEnum();
          break;
        case 6:
          _instance.unitId = _reader.readInt64String();
          break;
        case 7:
          _instance.isMultiple = _reader.readBool();
          break;
        case 8:
          _instance.precision = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrAttribute.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrAttribute,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.parentId) {
      _writer.writeInt64String(2, _instance.parentId);
    }
    if (_instance.name) {
      _writer.writeString(3, _instance.name);
    }
    if (_instance.description) {
      _writer.writeString(4, _instance.description);
    }
    if (_instance.typeId) {
      _writer.writeEnum(5, _instance.typeId);
    }
    if (_instance.unitId) {
      _writer.writeInt64String(6, _instance.unitId);
    }
    if (_instance.isMultiple) {
      _writer.writeBool(7, _instance.isMultiple);
    }
    if (_instance.precision) {
      _writer.writeInt32(8, _instance.precision);
    }
  }

  private _id: string;
  private _parentId: string;
  private _name: string;
  private _description: string;
  private _typeId: AttrAttributeType.ID;
  private _unitId: string;
  private _isMultiple: boolean;
  private _precision: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrAttribute to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrAttribute.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.parentId = _value.parentId;
    this.name = _value.name;
    this.description = _value.description;
    this.typeId = _value.typeId;
    this.unitId = _value.unitId;
    this.isMultiple = _value.isMultiple;
    this.precision = _value.precision;
    AttrAttribute.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get parentId(): string {
    return this._parentId;
  }
  set parentId(value: string) {
    this._parentId = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }
  get typeId(): AttrAttributeType.ID {
    return this._typeId;
  }
  set typeId(value: AttrAttributeType.ID) {
    this._typeId = value;
  }
  get unitId(): string {
    return this._unitId;
  }
  set unitId(value: string) {
    this._unitId = value;
  }
  get isMultiple(): boolean {
    return this._isMultiple;
  }
  set isMultiple(value: boolean) {
    this._isMultiple = value;
  }
  get precision(): number {
    return this._precision;
  }
  set precision(value: number) {
    this._precision = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrAttribute.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrAttribute.AsObject {
    return {
      id: this.id,
      parentId: this.parentId,
      name: this.name,
      description: this.description,
      typeId: this.typeId,
      unitId: this.unitId,
      isMultiple: this.isMultiple,
      precision: this.precision
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrAttribute.AsProtobufJSON {
    return {
      id: this.id,
      parentId: this.parentId,
      name: this.name,
      description: this.description,
      typeId:
        AttrAttributeType.ID[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ],
      unitId: this.unitId,
      isMultiple: this.isMultiple,
      precision: this.precision
    };
  }
}
export module AttrAttribute {
  /**
   * Standard JavaScript object representation for AttrAttribute
   */
  export interface AsObject {
    id: string;
    parentId: string;
    name: string;
    description: string;
    typeId: AttrAttributeType.ID;
    unitId: string;
    isMultiple: boolean;
    precision: number;
  }

  /**
   * Protobuf JSON representation for AttrAttribute
   */
  export interface AsProtobufJSON {
    id: string;
    parentId: string;
    name: string;
    description: string;
    typeId: string;
    unitId: string;
    isMultiple: boolean;
    precision: number;
  }
}

/**
 * Message implementation for goautowp.AttrListOptionsRequest
 */
export class AttrListOptionsRequest implements GrpcMessage {
  static id = 'goautowp.AttrListOptionsRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrListOptionsRequest();
    AttrListOptionsRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrListOptionsRequest) {
    _instance.attributeId = _instance.attributeId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrListOptionsRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.attributeId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrListOptionsRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrListOptionsRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.attributeId) {
      _writer.writeInt64String(1, _instance.attributeId);
    }
  }

  private _attributeId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrListOptionsRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrListOptionsRequest.AsObject>) {
    _value = _value || {};
    this.attributeId = _value.attributeId;
    AttrListOptionsRequest.refineValues(this);
  }
  get attributeId(): string {
    return this._attributeId;
  }
  set attributeId(value: string) {
    this._attributeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrListOptionsRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrListOptionsRequest.AsObject {
    return {
      attributeId: this.attributeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrListOptionsRequest.AsProtobufJSON {
    return {
      attributeId: this.attributeId
    };
  }
}
export module AttrListOptionsRequest {
  /**
   * Standard JavaScript object representation for AttrListOptionsRequest
   */
  export interface AsObject {
    attributeId: string;
  }

  /**
   * Protobuf JSON representation for AttrListOptionsRequest
   */
  export interface AsProtobufJSON {
    attributeId: string;
  }
}

/**
 * Message implementation for goautowp.AttrListOptionsResponse
 */
export class AttrListOptionsResponse implements GrpcMessage {
  static id = 'goautowp.AttrListOptionsResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrListOptionsResponse();
    AttrListOptionsResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrListOptionsResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrListOptionsResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new AttrListOption();
          _reader.readMessage(
            messageInitializer1,
            AttrListOption.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    AttrListOptionsResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrListOptionsResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        AttrListOption.serializeBinaryToWriter
      );
    }
  }

  private _items?: AttrListOption[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrListOptionsResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrListOptionsResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new AttrListOption(m));
    AttrListOptionsResponse.refineValues(this);
  }
  get items(): AttrListOption[] | undefined {
    return this._items;
  }
  set items(value: AttrListOption[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrListOptionsResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrListOptionsResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrListOptionsResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module AttrListOptionsResponse {
  /**
   * Standard JavaScript object representation for AttrListOptionsResponse
   */
  export interface AsObject {
    items?: AttrListOption.AsObject[];
  }

  /**
   * Protobuf JSON representation for AttrListOptionsResponse
   */
  export interface AsProtobufJSON {
    items: AttrListOption.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.AttrListOption
 */
export class AttrListOption implements GrpcMessage {
  static id = 'goautowp.AttrListOption';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrListOption();
    AttrListOption.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrListOption) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.attributeId = _instance.attributeId || '0';
    _instance.parentId = _instance.parentId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrListOption,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.attributeId = _reader.readInt64String();
          break;
        case 4:
          _instance.parentId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrListOption.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrListOption,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.attributeId) {
      _writer.writeInt64String(3, _instance.attributeId);
    }
    if (_instance.parentId) {
      _writer.writeInt64String(4, _instance.parentId);
    }
  }

  private _id: string;
  private _name: string;
  private _attributeId: string;
  private _parentId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrListOption to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrListOption.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.attributeId = _value.attributeId;
    this.parentId = _value.parentId;
    AttrListOption.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get attributeId(): string {
    return this._attributeId;
  }
  set attributeId(value: string) {
    this._attributeId = value;
  }
  get parentId(): string {
    return this._parentId;
  }
  set parentId(value: string) {
    this._parentId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrListOption.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrListOption.AsObject {
    return {
      id: this.id,
      name: this.name,
      attributeId: this.attributeId,
      parentId: this.parentId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrListOption.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      attributeId: this.attributeId,
      parentId: this.parentId
    };
  }
}
export module AttrListOption {
  /**
   * Standard JavaScript object representation for AttrListOption
   */
  export interface AsObject {
    id: string;
    name: string;
    attributeId: string;
    parentId: string;
  }

  /**
   * Protobuf JSON representation for AttrListOption
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    attributeId: string;
    parentId: string;
  }
}

/**
 * Message implementation for goautowp.AttrZoneAttributesRequest
 */
export class AttrZoneAttributesRequest implements GrpcMessage {
  static id = 'goautowp.AttrZoneAttributesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrZoneAttributesRequest();
    AttrZoneAttributesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrZoneAttributesRequest) {
    _instance.zoneId = _instance.zoneId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrZoneAttributesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.zoneId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrZoneAttributesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrZoneAttributesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.zoneId) {
      _writer.writeInt64String(1, _instance.zoneId);
    }
  }

  private _zoneId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrZoneAttributesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrZoneAttributesRequest.AsObject>) {
    _value = _value || {};
    this.zoneId = _value.zoneId;
    AttrZoneAttributesRequest.refineValues(this);
  }
  get zoneId(): string {
    return this._zoneId;
  }
  set zoneId(value: string) {
    this._zoneId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrZoneAttributesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrZoneAttributesRequest.AsObject {
    return {
      zoneId: this.zoneId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrZoneAttributesRequest.AsProtobufJSON {
    return {
      zoneId: this.zoneId
    };
  }
}
export module AttrZoneAttributesRequest {
  /**
   * Standard JavaScript object representation for AttrZoneAttributesRequest
   */
  export interface AsObject {
    zoneId: string;
  }

  /**
   * Protobuf JSON representation for AttrZoneAttributesRequest
   */
  export interface AsProtobufJSON {
    zoneId: string;
  }
}

/**
 * Message implementation for goautowp.AttrZoneAttributesResponse
 */
export class AttrZoneAttributesResponse implements GrpcMessage {
  static id = 'goautowp.AttrZoneAttributesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrZoneAttributesResponse();
    AttrZoneAttributesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrZoneAttributesResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrZoneAttributesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new AttrZoneAttribute();
          _reader.readMessage(
            messageInitializer1,
            AttrZoneAttribute.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    AttrZoneAttributesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrZoneAttributesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        AttrZoneAttribute.serializeBinaryToWriter
      );
    }
  }

  private _items?: AttrZoneAttribute[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrZoneAttributesResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrZoneAttributesResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new AttrZoneAttribute(m));
    AttrZoneAttributesResponse.refineValues(this);
  }
  get items(): AttrZoneAttribute[] | undefined {
    return this._items;
  }
  set items(value: AttrZoneAttribute[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrZoneAttributesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrZoneAttributesResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrZoneAttributesResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module AttrZoneAttributesResponse {
  /**
   * Standard JavaScript object representation for AttrZoneAttributesResponse
   */
  export interface AsObject {
    items?: AttrZoneAttribute.AsObject[];
  }

  /**
   * Protobuf JSON representation for AttrZoneAttributesResponse
   */
  export interface AsProtobufJSON {
    items: AttrZoneAttribute.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.AttrZoneAttribute
 */
export class AttrZoneAttribute implements GrpcMessage {
  static id = 'goautowp.AttrZoneAttribute';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrZoneAttribute();
    AttrZoneAttribute.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrZoneAttribute) {
    _instance.zoneId = _instance.zoneId || '0';
    _instance.attributeId = _instance.attributeId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrZoneAttribute,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.zoneId = _reader.readInt64String();
          break;
        case 2:
          _instance.attributeId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrZoneAttribute.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrZoneAttribute,
    _writer: BinaryWriter
  ) {
    if (_instance.zoneId) {
      _writer.writeInt64String(1, _instance.zoneId);
    }
    if (_instance.attributeId) {
      _writer.writeInt64String(2, _instance.attributeId);
    }
  }

  private _zoneId: string;
  private _attributeId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrZoneAttribute to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrZoneAttribute.AsObject>) {
    _value = _value || {};
    this.zoneId = _value.zoneId;
    this.attributeId = _value.attributeId;
    AttrZoneAttribute.refineValues(this);
  }
  get zoneId(): string {
    return this._zoneId;
  }
  set zoneId(value: string) {
    this._zoneId = value;
  }
  get attributeId(): string {
    return this._attributeId;
  }
  set attributeId(value: string) {
    this._attributeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrZoneAttribute.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrZoneAttribute.AsObject {
    return {
      zoneId: this.zoneId,
      attributeId: this.attributeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrZoneAttribute.AsProtobufJSON {
    return {
      zoneId: this.zoneId,
      attributeId: this.attributeId
    };
  }
}
export module AttrZoneAttribute {
  /**
   * Standard JavaScript object representation for AttrZoneAttribute
   */
  export interface AsObject {
    zoneId: string;
    attributeId: string;
  }

  /**
   * Protobuf JSON representation for AttrZoneAttribute
   */
  export interface AsProtobufJSON {
    zoneId: string;
    attributeId: string;
  }
}

/**
 * Message implementation for goautowp.AttrAttributeTypesResponse
 */
export class AttrAttributeTypesResponse implements GrpcMessage {
  static id = 'goautowp.AttrAttributeTypesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrAttributeTypesResponse();
    AttrAttributeTypesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrAttributeTypesResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrAttributeTypesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new AttrAttributeType();
          _reader.readMessage(
            messageInitializer1,
            AttrAttributeType.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    AttrAttributeTypesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrAttributeTypesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        AttrAttributeType.serializeBinaryToWriter
      );
    }
  }

  private _items?: AttrAttributeType[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrAttributeTypesResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrAttributeTypesResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new AttrAttributeType(m));
    AttrAttributeTypesResponse.refineValues(this);
  }
  get items(): AttrAttributeType[] | undefined {
    return this._items;
  }
  set items(value: AttrAttributeType[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrAttributeTypesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrAttributeTypesResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrAttributeTypesResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module AttrAttributeTypesResponse {
  /**
   * Standard JavaScript object representation for AttrAttributeTypesResponse
   */
  export interface AsObject {
    items?: AttrAttributeType.AsObject[];
  }

  /**
   * Protobuf JSON representation for AttrAttributeTypesResponse
   */
  export interface AsProtobufJSON {
    items: AttrAttributeType.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.AttrAttributeType
 */
export class AttrAttributeType implements GrpcMessage {
  static id = 'goautowp.AttrAttributeType';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrAttributeType();
    AttrAttributeType.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrAttributeType) {
    _instance.id = _instance.id || 0;
    _instance.name = _instance.name || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrAttributeType,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readEnum();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrAttributeType.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrAttributeType,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeEnum(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
  }

  private _id: AttrAttributeType.ID;
  private _name: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrAttributeType to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrAttributeType.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    AttrAttributeType.refineValues(this);
  }
  get id(): AttrAttributeType.ID {
    return this._id;
  }
  set id(value: AttrAttributeType.ID) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrAttributeType.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrAttributeType.AsObject {
    return {
      id: this.id,
      name: this.name
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrAttributeType.AsProtobufJSON {
    return {
      id:
        AttrAttributeType.ID[
          this.id === null || this.id === undefined ? 0 : this.id
        ],
      name: this.name
    };
  }
}
export module AttrAttributeType {
  /**
   * Standard JavaScript object representation for AttrAttributeType
   */
  export interface AsObject {
    id: AttrAttributeType.ID;
    name: string;
  }

  /**
   * Protobuf JSON representation for AttrAttributeType
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
  }
  export enum Id {
    UNKNOWN = 0,
    STRING = 1,
    INTEGER = 2,
    FLOAT = 3,
    TEXT = 4,
    BOOLEAN = 5,
    LIST = 6,
    TREE = 7
  }
}

/**
 * Message implementation for goautowp.AttrUnitsResponse
 */
export class AttrUnitsResponse implements GrpcMessage {
  static id = 'goautowp.AttrUnitsResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrUnitsResponse();
    AttrUnitsResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrUnitsResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrUnitsResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new AttrUnit();
          _reader.readMessage(
            messageInitializer1,
            AttrUnit.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    AttrUnitsResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrUnitsResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        AttrUnit.serializeBinaryToWriter
      );
    }
  }

  private _items?: AttrUnit[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrUnitsResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrUnitsResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new AttrUnit(m));
    AttrUnitsResponse.refineValues(this);
  }
  get items(): AttrUnit[] | undefined {
    return this._items;
  }
  set items(value: AttrUnit[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrUnitsResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrUnitsResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrUnitsResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module AttrUnitsResponse {
  /**
   * Standard JavaScript object representation for AttrUnitsResponse
   */
  export interface AsObject {
    items?: AttrUnit.AsObject[];
  }

  /**
   * Protobuf JSON representation for AttrUnitsResponse
   */
  export interface AsProtobufJSON {
    items: AttrUnit.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.AttrUnit
 */
export class AttrUnit implements GrpcMessage {
  static id = 'goautowp.AttrUnit';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrUnit();
    AttrUnit.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrUnit) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.abbr = _instance.abbr || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrUnit,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.abbr = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrUnit.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: AttrUnit, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.abbr) {
      _writer.writeString(3, _instance.abbr);
    }
  }

  private _id: string;
  private _name: string;
  private _abbr: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrUnit to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrUnit.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.abbr = _value.abbr;
    AttrUnit.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get abbr(): string {
    return this._abbr;
  }
  set abbr(value: string) {
    this._abbr = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrUnit.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrUnit.AsObject {
    return {
      id: this.id,
      name: this.name,
      abbr: this.abbr
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrUnit.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      abbr: this.abbr
    };
  }
}
export module AttrUnit {
  /**
   * Standard JavaScript object representation for AttrUnit
   */
  export interface AsObject {
    id: string;
    name: string;
    abbr: string;
  }

  /**
   * Protobuf JSON representation for AttrUnit
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    abbr: string;
  }
}

/**
 * Message implementation for goautowp.AttrZonesResponse
 */
export class AttrZonesResponse implements GrpcMessage {
  static id = 'goautowp.AttrZonesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrZonesResponse();
    AttrZonesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrZonesResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrZonesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new AttrZone();
          _reader.readMessage(
            messageInitializer1,
            AttrZone.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    AttrZonesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AttrZonesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        AttrZone.serializeBinaryToWriter
      );
    }
  }

  private _items?: AttrZone[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrZonesResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrZonesResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new AttrZone(m));
    AttrZonesResponse.refineValues(this);
  }
  get items(): AttrZone[] | undefined {
    return this._items;
  }
  set items(value: AttrZone[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrZonesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrZonesResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrZonesResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module AttrZonesResponse {
  /**
   * Standard JavaScript object representation for AttrZonesResponse
   */
  export interface AsObject {
    items?: AttrZone.AsObject[];
  }

  /**
   * Protobuf JSON representation for AttrZonesResponse
   */
  export interface AsProtobufJSON {
    items: AttrZone.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.AttrZone
 */
export class AttrZone implements GrpcMessage {
  static id = 'goautowp.AttrZone';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AttrZone();
    AttrZone.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AttrZone) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AttrZone,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AttrZone.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: AttrZone, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
  }

  private _id: string;
  private _name: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AttrZone to deeply clone from
   */
  constructor(_value?: RecursivePartial<AttrZone.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    AttrZone.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AttrZone.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AttrZone.AsObject {
    return {
      id: this.id,
      name: this.name
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AttrZone.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name
    };
  }
}
export module AttrZone {
  /**
   * Standard JavaScript object representation for AttrZone
   */
  export interface AsObject {
    id: string;
    name: string;
  }

  /**
   * Protobuf JSON representation for AttrZone
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
  }
}

/**
 * Message implementation for goautowp.PulseRequest
 */
export class PulseRequest implements GrpcMessage {
  static id = 'goautowp.PulseRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PulseRequest();
    PulseRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PulseRequest) {
    _instance.period = _instance.period || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PulseRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.period = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    PulseRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PulseRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.period) {
      _writer.writeEnum(1, _instance.period);
    }
  }

  private _period: PulseRequest.Period;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PulseRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<PulseRequest.AsObject>) {
    _value = _value || {};
    this.period = _value.period;
    PulseRequest.refineValues(this);
  }
  get period(): PulseRequest.Period {
    return this._period;
  }
  set period(value: PulseRequest.Period) {
    this._period = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PulseRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PulseRequest.AsObject {
    return {
      period: this.period
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PulseRequest.AsProtobufJSON {
    return {
      period:
        PulseRequest.Period[
          this.period === null || this.period === undefined ? 0 : this.period
        ]
    };
  }
}
export module PulseRequest {
  /**
   * Standard JavaScript object representation for PulseRequest
   */
  export interface AsObject {
    period: PulseRequest.Period;
  }

  /**
   * Protobuf JSON representation for PulseRequest
   */
  export interface AsProtobufJSON {
    period: string;
  }
  export enum Period {
    DEFAULT = 0,
    YEAR = 1,
    MONTH = 2
  }
}

/**
 * Message implementation for goautowp.PulseGrid
 */
export class PulseGrid implements GrpcMessage {
  static id = 'goautowp.PulseGrid';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PulseGrid();
    PulseGrid.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PulseGrid) {
    _instance.line = _instance.line || [];
    _instance.color = _instance.color || '';
    _instance.userId = _instance.userId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PulseGrid,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          (_instance.line = _instance.line || []).push(
            ...(_reader.readPackedFloat() || [])
          );
          break;
        case 2:
          _instance.color = _reader.readString();
          break;
        case 3:
          _instance.userId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    PulseGrid.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: PulseGrid, _writer: BinaryWriter) {
    if (_instance.line && _instance.line.length) {
      _writer.writePackedFloat(1, _instance.line);
    }
    if (_instance.color) {
      _writer.writeString(2, _instance.color);
    }
    if (_instance.userId) {
      _writer.writeInt64String(3, _instance.userId);
    }
  }

  private _line: number[];
  private _color: string;
  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PulseGrid to deeply clone from
   */
  constructor(_value?: RecursivePartial<PulseGrid.AsObject>) {
    _value = _value || {};
    this.line = (_value.line || []).slice();
    this.color = _value.color;
    this.userId = _value.userId;
    PulseGrid.refineValues(this);
  }
  get line(): number[] {
    return this._line;
  }
  set line(value: number[]) {
    this._line = value;
  }
  get color(): string {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PulseGrid.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PulseGrid.AsObject {
    return {
      line: (this.line || []).slice(),
      color: this.color,
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PulseGrid.AsProtobufJSON {
    return {
      line: (this.line || []).slice(),
      color: this.color,
      userId: this.userId
    };
  }
}
export module PulseGrid {
  /**
   * Standard JavaScript object representation for PulseGrid
   */
  export interface AsObject {
    line: number[];
    color: string;
    userId: string;
  }

  /**
   * Protobuf JSON representation for PulseGrid
   */
  export interface AsProtobufJSON {
    line: number[];
    color: string;
    userId: string;
  }
}

/**
 * Message implementation for goautowp.PulseLegend
 */
export class PulseLegend implements GrpcMessage {
  static id = 'goautowp.PulseLegend';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PulseLegend();
    PulseLegend.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PulseLegend) {
    _instance.userId = _instance.userId || '0';
    _instance.color = _instance.color || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PulseLegend,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        case 2:
          _instance.color = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    PulseLegend.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PulseLegend,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
    if (_instance.color) {
      _writer.writeString(2, _instance.color);
    }
  }

  private _userId: string;
  private _color: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PulseLegend to deeply clone from
   */
  constructor(_value?: RecursivePartial<PulseLegend.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    this.color = _value.color;
    PulseLegend.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get color(): string {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PulseLegend.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PulseLegend.AsObject {
    return {
      userId: this.userId,
      color: this.color
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PulseLegend.AsProtobufJSON {
    return {
      userId: this.userId,
      color: this.color
    };
  }
}
export module PulseLegend {
  /**
   * Standard JavaScript object representation for PulseLegend
   */
  export interface AsObject {
    userId: string;
    color: string;
  }

  /**
   * Protobuf JSON representation for PulseLegend
   */
  export interface AsProtobufJSON {
    userId: string;
    color: string;
  }
}

/**
 * Message implementation for goautowp.PulseResponse
 */
export class PulseResponse implements GrpcMessage {
  static id = 'goautowp.PulseResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PulseResponse();
    PulseResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PulseResponse) {
    _instance.grid = _instance.grid || [];
    _instance.legend = _instance.legend || [];
    _instance.labels = _instance.labels || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PulseResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new PulseGrid();
          _reader.readMessage(
            messageInitializer1,
            PulseGrid.deserializeBinaryFromReader
          );
          (_instance.grid = _instance.grid || []).push(messageInitializer1);
          break;
        case 2:
          const messageInitializer2 = new PulseLegend();
          _reader.readMessage(
            messageInitializer2,
            PulseLegend.deserializeBinaryFromReader
          );
          (_instance.legend = _instance.legend || []).push(messageInitializer2);
          break;
        case 3:
          (_instance.labels = _instance.labels || []).push(
            _reader.readString()
          );
          break;
        default:
          _reader.skipField();
      }
    }

    PulseResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PulseResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.grid && _instance.grid.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.grid as any,
        PulseGrid.serializeBinaryToWriter
      );
    }
    if (_instance.legend && _instance.legend.length) {
      _writer.writeRepeatedMessage(
        2,
        _instance.legend as any,
        PulseLegend.serializeBinaryToWriter
      );
    }
    if (_instance.labels && _instance.labels.length) {
      _writer.writeRepeatedString(3, _instance.labels);
    }
  }

  private _grid?: PulseGrid[];
  private _legend?: PulseLegend[];
  private _labels: string[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PulseResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<PulseResponse.AsObject>) {
    _value = _value || {};
    this.grid = (_value.grid || []).map(m => new PulseGrid(m));
    this.legend = (_value.legend || []).map(m => new PulseLegend(m));
    this.labels = (_value.labels || []).slice();
    PulseResponse.refineValues(this);
  }
  get grid(): PulseGrid[] | undefined {
    return this._grid;
  }
  set grid(value: PulseGrid[] | undefined) {
    this._grid = value;
  }
  get legend(): PulseLegend[] | undefined {
    return this._legend;
  }
  set legend(value: PulseLegend[] | undefined) {
    this._legend = value;
  }
  get labels(): string[] {
    return this._labels;
  }
  set labels(value: string[]) {
    this._labels = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PulseResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PulseResponse.AsObject {
    return {
      grid: (this.grid || []).map(m => m.toObject()),
      legend: (this.legend || []).map(m => m.toObject()),
      labels: (this.labels || []).slice()
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PulseResponse.AsProtobufJSON {
    return {
      grid: (this.grid || []).map(m => m.toProtobufJSON(options)),
      legend: (this.legend || []).map(m => m.toProtobufJSON(options)),
      labels: (this.labels || []).slice()
    };
  }
}
export module PulseResponse {
  /**
   * Standard JavaScript object representation for PulseResponse
   */
  export interface AsObject {
    grid?: PulseGrid.AsObject[];
    legend?: PulseLegend.AsObject[];
    labels: string[];
  }

  /**
   * Protobuf JSON representation for PulseResponse
   */
  export interface AsProtobufJSON {
    grid: PulseGrid.AsProtobufJSON[] | null;
    legend: PulseLegend.AsProtobufJSON[] | null;
    labels: string[];
  }
}

/**
 * Message implementation for goautowp.Spec
 */
export class Spec implements GrpcMessage {
  static id = 'goautowp.Spec';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Spec();
    Spec.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Spec) {
    _instance.id = _instance.id || 0;
    _instance.name = _instance.name || '';
    _instance.shortName = _instance.shortName || '';
    _instance.childs = _instance.childs || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Spec, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt32();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.shortName = _reader.readString();
          break;
        case 4:
          const messageInitializer4 = new Spec();
          _reader.readMessage(
            messageInitializer4,
            Spec.deserializeBinaryFromReader
          );
          (_instance.childs = _instance.childs || []).push(messageInitializer4);
          break;
        default:
          _reader.skipField();
      }
    }

    Spec.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Spec, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt32(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.shortName) {
      _writer.writeString(3, _instance.shortName);
    }
    if (_instance.childs && _instance.childs.length) {
      _writer.writeRepeatedMessage(
        4,
        _instance.childs as any,
        Spec.serializeBinaryToWriter
      );
    }
  }

  private _id: number;
  private _name: string;
  private _shortName: string;
  private _childs?: Spec[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Spec to deeply clone from
   */
  constructor(_value?: RecursivePartial<Spec.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.shortName = _value.shortName;
    this.childs = (_value.childs || []).map(m => new Spec(m));
    Spec.refineValues(this);
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get shortName(): string {
    return this._shortName;
  }
  set shortName(value: string) {
    this._shortName = value;
  }
  get childs(): Spec[] | undefined {
    return this._childs;
  }
  set childs(value: Spec[] | undefined) {
    this._childs = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Spec.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Spec.AsObject {
    return {
      id: this.id,
      name: this.name,
      shortName: this.shortName,
      childs: (this.childs || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Spec.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      shortName: this.shortName,
      childs: (this.childs || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module Spec {
  /**
   * Standard JavaScript object representation for Spec
   */
  export interface AsObject {
    id: number;
    name: string;
    shortName: string;
    childs?: Spec.AsObject[];
  }

  /**
   * Protobuf JSON representation for Spec
   */
  export interface AsProtobufJSON {
    id: number;
    name: string;
    shortName: string;
    childs: Spec.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.SpecsItems
 */
export class SpecsItems implements GrpcMessage {
  static id = 'goautowp.SpecsItems';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new SpecsItems();
    SpecsItems.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: SpecsItems) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: SpecsItems,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new Spec();
          _reader.readMessage(
            messageInitializer1,
            Spec.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    SpecsItems.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: SpecsItems, _writer: BinaryWriter) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        Spec.serializeBinaryToWriter
      );
    }
  }

  private _items?: Spec[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of SpecsItems to deeply clone from
   */
  constructor(_value?: RecursivePartial<SpecsItems.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new Spec(m));
    SpecsItems.refineValues(this);
  }
  get items(): Spec[] | undefined {
    return this._items;
  }
  set items(value: Spec[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    SpecsItems.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): SpecsItems.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): SpecsItems.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module SpecsItems {
  /**
   * Standard JavaScript object representation for SpecsItems
   */
  export interface AsObject {
    items?: Spec.AsObject[];
  }

  /**
   * Protobuf JSON representation for SpecsItems
   */
  export interface AsProtobufJSON {
    items: Spec.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.Perspective
 */
export class Perspective implements GrpcMessage {
  static id = 'goautowp.Perspective';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Perspective();
    Perspective.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Perspective) {
    _instance.id = _instance.id || 0;
    _instance.name = _instance.name || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Perspective,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt32();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    Perspective.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: Perspective,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt32(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
  }

  private _id: number;
  private _name: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Perspective to deeply clone from
   */
  constructor(_value?: RecursivePartial<Perspective.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    Perspective.refineValues(this);
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Perspective.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Perspective.AsObject {
    return {
      id: this.id,
      name: this.name
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Perspective.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name
    };
  }
}
export module Perspective {
  /**
   * Standard JavaScript object representation for Perspective
   */
  export interface AsObject {
    id: number;
    name: string;
  }

  /**
   * Protobuf JSON representation for Perspective
   */
  export interface AsProtobufJSON {
    id: number;
    name: string;
  }
}

/**
 * Message implementation for goautowp.PerspectivesItems
 */
export class PerspectivesItems implements GrpcMessage {
  static id = 'goautowp.PerspectivesItems';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PerspectivesItems();
    PerspectivesItems.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PerspectivesItems) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PerspectivesItems,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new Perspective();
          _reader.readMessage(
            messageInitializer1,
            Perspective.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    PerspectivesItems.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PerspectivesItems,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        Perspective.serializeBinaryToWriter
      );
    }
  }

  private _items?: Perspective[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PerspectivesItems to deeply clone from
   */
  constructor(_value?: RecursivePartial<PerspectivesItems.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new Perspective(m));
    PerspectivesItems.refineValues(this);
  }
  get items(): Perspective[] | undefined {
    return this._items;
  }
  set items(value: Perspective[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PerspectivesItems.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PerspectivesItems.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PerspectivesItems.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module PerspectivesItems {
  /**
   * Standard JavaScript object representation for PerspectivesItems
   */
  export interface AsObject {
    items?: Perspective.AsObject[];
  }

  /**
   * Protobuf JSON representation for PerspectivesItems
   */
  export interface AsProtobufJSON {
    items: Perspective.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.PerspectiveGroup
 */
export class PerspectiveGroup implements GrpcMessage {
  static id = 'goautowp.PerspectiveGroup';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PerspectiveGroup();
    PerspectiveGroup.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PerspectiveGroup) {
    _instance.id = _instance.id || 0;
    _instance.name = _instance.name || '';
    _instance.perspectives = _instance.perspectives || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PerspectiveGroup,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt32();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          const messageInitializer3 = new Perspective();
          _reader.readMessage(
            messageInitializer3,
            Perspective.deserializeBinaryFromReader
          );
          (_instance.perspectives = _instance.perspectives || []).push(
            messageInitializer3
          );
          break;
        default:
          _reader.skipField();
      }
    }

    PerspectiveGroup.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PerspectiveGroup,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt32(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.perspectives && _instance.perspectives.length) {
      _writer.writeRepeatedMessage(
        3,
        _instance.perspectives as any,
        Perspective.serializeBinaryToWriter
      );
    }
  }

  private _id: number;
  private _name: string;
  private _perspectives?: Perspective[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PerspectiveGroup to deeply clone from
   */
  constructor(_value?: RecursivePartial<PerspectiveGroup.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.perspectives = (_value.perspectives || []).map(
      m => new Perspective(m)
    );
    PerspectiveGroup.refineValues(this);
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get perspectives(): Perspective[] | undefined {
    return this._perspectives;
  }
  set perspectives(value: Perspective[] | undefined) {
    this._perspectives = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PerspectiveGroup.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PerspectiveGroup.AsObject {
    return {
      id: this.id,
      name: this.name,
      perspectives: (this.perspectives || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PerspectiveGroup.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      perspectives: (this.perspectives || []).map(m =>
        m.toProtobufJSON(options)
      )
    };
  }
}
export module PerspectiveGroup {
  /**
   * Standard JavaScript object representation for PerspectiveGroup
   */
  export interface AsObject {
    id: number;
    name: string;
    perspectives?: Perspective.AsObject[];
  }

  /**
   * Protobuf JSON representation for PerspectiveGroup
   */
  export interface AsProtobufJSON {
    id: number;
    name: string;
    perspectives: Perspective.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.PerspectivePage
 */
export class PerspectivePage implements GrpcMessage {
  static id = 'goautowp.PerspectivePage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PerspectivePage();
    PerspectivePage.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PerspectivePage) {
    _instance.id = _instance.id || 0;
    _instance.name = _instance.name || '';
    _instance.groups = _instance.groups || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PerspectivePage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt32();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          const messageInitializer3 = new PerspectiveGroup();
          _reader.readMessage(
            messageInitializer3,
            PerspectiveGroup.deserializeBinaryFromReader
          );
          (_instance.groups = _instance.groups || []).push(messageInitializer3);
          break;
        default:
          _reader.skipField();
      }
    }

    PerspectivePage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PerspectivePage,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt32(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.groups && _instance.groups.length) {
      _writer.writeRepeatedMessage(
        3,
        _instance.groups as any,
        PerspectiveGroup.serializeBinaryToWriter
      );
    }
  }

  private _id: number;
  private _name: string;
  private _groups?: PerspectiveGroup[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PerspectivePage to deeply clone from
   */
  constructor(_value?: RecursivePartial<PerspectivePage.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.groups = (_value.groups || []).map(m => new PerspectiveGroup(m));
    PerspectivePage.refineValues(this);
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get groups(): PerspectiveGroup[] | undefined {
    return this._groups;
  }
  set groups(value: PerspectiveGroup[] | undefined) {
    this._groups = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PerspectivePage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PerspectivePage.AsObject {
    return {
      id: this.id,
      name: this.name,
      groups: (this.groups || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PerspectivePage.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      groups: (this.groups || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module PerspectivePage {
  /**
   * Standard JavaScript object representation for PerspectivePage
   */
  export interface AsObject {
    id: number;
    name: string;
    groups?: PerspectiveGroup.AsObject[];
  }

  /**
   * Protobuf JSON representation for PerspectivePage
   */
  export interface AsProtobufJSON {
    id: number;
    name: string;
    groups: PerspectiveGroup.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.PerspectivePagesItems
 */
export class PerspectivePagesItems implements GrpcMessage {
  static id = 'goautowp.PerspectivePagesItems';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PerspectivePagesItems();
    PerspectivePagesItems.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PerspectivePagesItems) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PerspectivePagesItems,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new PerspectivePage();
          _reader.readMessage(
            messageInitializer1,
            PerspectivePage.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    PerspectivePagesItems.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PerspectivePagesItems,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        PerspectivePage.serializeBinaryToWriter
      );
    }
  }

  private _items?: PerspectivePage[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PerspectivePagesItems to deeply clone from
   */
  constructor(_value?: RecursivePartial<PerspectivePagesItems.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new PerspectivePage(m));
    PerspectivePagesItems.refineValues(this);
  }
  get items(): PerspectivePage[] | undefined {
    return this._items;
  }
  set items(value: PerspectivePage[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PerspectivePagesItems.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PerspectivePagesItems.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PerspectivePagesItems.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module PerspectivePagesItems {
  /**
   * Standard JavaScript object representation for PerspectivePagesItems
   */
  export interface AsObject {
    items?: PerspectivePage.AsObject[];
  }

  /**
   * Protobuf JSON representation for PerspectivePagesItems
   */
  export interface AsProtobufJSON {
    items: PerspectivePage.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.ReCaptchaConfig
 */
export class ReCaptchaConfig implements GrpcMessage {
  static id = 'goautowp.ReCaptchaConfig';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ReCaptchaConfig();
    ReCaptchaConfig.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ReCaptchaConfig) {
    _instance.publicKey = _instance.publicKey || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ReCaptchaConfig,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.publicKey = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ReCaptchaConfig.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ReCaptchaConfig,
    _writer: BinaryWriter
  ) {
    if (_instance.publicKey) {
      _writer.writeString(1, _instance.publicKey);
    }
  }

  private _publicKey: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ReCaptchaConfig to deeply clone from
   */
  constructor(_value?: RecursivePartial<ReCaptchaConfig.AsObject>) {
    _value = _value || {};
    this.publicKey = _value.publicKey;
    ReCaptchaConfig.refineValues(this);
  }
  get publicKey(): string {
    return this._publicKey;
  }
  set publicKey(value: string) {
    this._publicKey = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ReCaptchaConfig.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ReCaptchaConfig.AsObject {
    return {
      publicKey: this.publicKey
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ReCaptchaConfig.AsProtobufJSON {
    return {
      publicKey: this.publicKey
    };
  }
}
export module ReCaptchaConfig {
  /**
   * Standard JavaScript object representation for ReCaptchaConfig
   */
  export interface AsObject {
    publicKey: string;
  }

  /**
   * Protobuf JSON representation for ReCaptchaConfig
   */
  export interface AsProtobufJSON {
    publicKey: string;
  }
}

/**
 * Message implementation for goautowp.BrandIcons
 */
export class BrandIcons implements GrpcMessage {
  static id = 'goautowp.BrandIcons';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BrandIcons();
    BrandIcons.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BrandIcons) {
    _instance.image = _instance.image || '';
    _instance.css = _instance.css || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BrandIcons,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.image = _reader.readString();
          break;
        case 2:
          _instance.css = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    BrandIcons.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: BrandIcons, _writer: BinaryWriter) {
    if (_instance.image) {
      _writer.writeString(1, _instance.image);
    }
    if (_instance.css) {
      _writer.writeString(2, _instance.css);
    }
  }

  private _image: string;
  private _css: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BrandIcons to deeply clone from
   */
  constructor(_value?: RecursivePartial<BrandIcons.AsObject>) {
    _value = _value || {};
    this.image = _value.image;
    this.css = _value.css;
    BrandIcons.refineValues(this);
  }
  get image(): string {
    return this._image;
  }
  set image(value: string) {
    this._image = value;
  }
  get css(): string {
    return this._css;
  }
  set css(value: string) {
    this._css = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BrandIcons.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BrandIcons.AsObject {
    return {
      image: this.image,
      css: this.css
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): BrandIcons.AsProtobufJSON {
    return {
      image: this.image,
      css: this.css
    };
  }
}
export module BrandIcons {
  /**
   * Standard JavaScript object representation for BrandIcons
   */
  export interface AsObject {
    image: string;
    css: string;
  }

  /**
   * Protobuf JSON representation for BrandIcons
   */
  export interface AsProtobufJSON {
    image: string;
    css: string;
  }
}

/**
 * Message implementation for goautowp.AclEnforceRequest
 */
export class AclEnforceRequest implements GrpcMessage {
  static id = 'goautowp.AclEnforceRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AclEnforceRequest();
    AclEnforceRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AclEnforceRequest) {
    _instance.resource = _instance.resource || '';
    _instance.privilege = _instance.privilege || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AclEnforceRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.resource = _reader.readString();
          break;
        case 2:
          _instance.privilege = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AclEnforceRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AclEnforceRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.resource) {
      _writer.writeString(1, _instance.resource);
    }
    if (_instance.privilege) {
      _writer.writeString(2, _instance.privilege);
    }
  }

  private _resource: string;
  private _privilege: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AclEnforceRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<AclEnforceRequest.AsObject>) {
    _value = _value || {};
    this.resource = _value.resource;
    this.privilege = _value.privilege;
    AclEnforceRequest.refineValues(this);
  }
  get resource(): string {
    return this._resource;
  }
  set resource(value: string) {
    this._resource = value;
  }
  get privilege(): string {
    return this._privilege;
  }
  set privilege(value: string) {
    this._privilege = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AclEnforceRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AclEnforceRequest.AsObject {
    return {
      resource: this.resource,
      privilege: this.privilege
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AclEnforceRequest.AsProtobufJSON {
    return {
      resource: this.resource,
      privilege: this.privilege
    };
  }
}
export module AclEnforceRequest {
  /**
   * Standard JavaScript object representation for AclEnforceRequest
   */
  export interface AsObject {
    resource: string;
    privilege: string;
  }

  /**
   * Protobuf JSON representation for AclEnforceRequest
   */
  export interface AsProtobufJSON {
    resource: string;
    privilege: string;
  }
}

/**
 * Message implementation for goautowp.AclEnforceResult
 */
export class AclEnforceResult implements GrpcMessage {
  static id = 'goautowp.AclEnforceResult';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AclEnforceResult();
    AclEnforceResult.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AclEnforceResult) {
    _instance.result = _instance.result || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AclEnforceResult,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.result = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    AclEnforceResult.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AclEnforceResult,
    _writer: BinaryWriter
  ) {
    if (_instance.result) {
      _writer.writeBool(1, _instance.result);
    }
  }

  private _result: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AclEnforceResult to deeply clone from
   */
  constructor(_value?: RecursivePartial<AclEnforceResult.AsObject>) {
    _value = _value || {};
    this.result = _value.result;
    AclEnforceResult.refineValues(this);
  }
  get result(): boolean {
    return this._result;
  }
  set result(value: boolean) {
    this._result = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AclEnforceResult.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AclEnforceResult.AsObject {
    return {
      result: this.result
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AclEnforceResult.AsProtobufJSON {
    return {
      result: this.result
    };
  }
}
export module AclEnforceResult {
  /**
   * Standard JavaScript object representation for AclEnforceResult
   */
  export interface AsObject {
    result: boolean;
  }

  /**
   * Protobuf JSON representation for AclEnforceResult
   */
  export interface AsProtobufJSON {
    result: boolean;
  }
}

/**
 * Message implementation for goautowp.VehicleType
 */
export class VehicleType implements GrpcMessage {
  static id = 'goautowp.VehicleType';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new VehicleType();
    VehicleType.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: VehicleType) {
    _instance.id = _instance.id || 0;
    _instance.name = _instance.name || '';
    _instance.childs = _instance.childs || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: VehicleType,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt32();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 4:
          const messageInitializer4 = new VehicleType();
          _reader.readMessage(
            messageInitializer4,
            VehicleType.deserializeBinaryFromReader
          );
          (_instance.childs = _instance.childs || []).push(messageInitializer4);
          break;
        default:
          _reader.skipField();
      }
    }

    VehicleType.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: VehicleType,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt32(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.childs && _instance.childs.length) {
      _writer.writeRepeatedMessage(
        4,
        _instance.childs as any,
        VehicleType.serializeBinaryToWriter
      );
    }
  }

  private _id: number;
  private _name: string;
  private _childs?: VehicleType[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of VehicleType to deeply clone from
   */
  constructor(_value?: RecursivePartial<VehicleType.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.childs = (_value.childs || []).map(m => new VehicleType(m));
    VehicleType.refineValues(this);
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get childs(): VehicleType[] | undefined {
    return this._childs;
  }
  set childs(value: VehicleType[] | undefined) {
    this._childs = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    VehicleType.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): VehicleType.AsObject {
    return {
      id: this.id,
      name: this.name,
      childs: (this.childs || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): VehicleType.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      childs: (this.childs || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module VehicleType {
  /**
   * Standard JavaScript object representation for VehicleType
   */
  export interface AsObject {
    id: number;
    name: string;
    childs?: VehicleType.AsObject[];
  }

  /**
   * Protobuf JSON representation for VehicleType
   */
  export interface AsProtobufJSON {
    id: number;
    name: string;
    childs: VehicleType.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.VehicleTypeItems
 */
export class VehicleTypeItems implements GrpcMessage {
  static id = 'goautowp.VehicleTypeItems';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new VehicleTypeItems();
    VehicleTypeItems.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: VehicleTypeItems) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: VehicleTypeItems,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new VehicleType();
          _reader.readMessage(
            messageInitializer1,
            VehicleType.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    VehicleTypeItems.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: VehicleTypeItems,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        VehicleType.serializeBinaryToWriter
      );
    }
  }

  private _items?: VehicleType[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of VehicleTypeItems to deeply clone from
   */
  constructor(_value?: RecursivePartial<VehicleTypeItems.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new VehicleType(m));
    VehicleTypeItems.refineValues(this);
  }
  get items(): VehicleType[] | undefined {
    return this._items;
  }
  set items(value: VehicleType[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    VehicleTypeItems.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): VehicleTypeItems.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): VehicleTypeItems.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module VehicleTypeItems {
  /**
   * Standard JavaScript object representation for VehicleTypeItems
   */
  export interface AsObject {
    items?: VehicleType.AsObject[];
  }

  /**
   * Protobuf JSON representation for VehicleTypeItems
   */
  export interface AsProtobufJSON {
    items: VehicleType.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.GetBrandVehicleTypesRequest
 */
export class GetBrandVehicleTypesRequest implements GrpcMessage {
  static id = 'goautowp.GetBrandVehicleTypesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetBrandVehicleTypesRequest();
    GetBrandVehicleTypesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetBrandVehicleTypesRequest) {
    _instance.brandId = _instance.brandId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetBrandVehicleTypesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.brandId = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    GetBrandVehicleTypesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetBrandVehicleTypesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.brandId) {
      _writer.writeInt32(1, _instance.brandId);
    }
  }

  private _brandId: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetBrandVehicleTypesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetBrandVehicleTypesRequest.AsObject>) {
    _value = _value || {};
    this.brandId = _value.brandId;
    GetBrandVehicleTypesRequest.refineValues(this);
  }
  get brandId(): number {
    return this._brandId;
  }
  set brandId(value: number) {
    this._brandId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetBrandVehicleTypesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetBrandVehicleTypesRequest.AsObject {
    return {
      brandId: this.brandId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetBrandVehicleTypesRequest.AsProtobufJSON {
    return {
      brandId: this.brandId
    };
  }
}
export module GetBrandVehicleTypesRequest {
  /**
   * Standard JavaScript object representation for GetBrandVehicleTypesRequest
   */
  export interface AsObject {
    brandId: number;
  }

  /**
   * Protobuf JSON representation for GetBrandVehicleTypesRequest
   */
  export interface AsProtobufJSON {
    brandId: number;
  }
}

/**
 * Message implementation for goautowp.BrandVehicleTypeItems
 */
export class BrandVehicleTypeItems implements GrpcMessage {
  static id = 'goautowp.BrandVehicleTypeItems';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BrandVehicleTypeItems();
    BrandVehicleTypeItems.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BrandVehicleTypeItems) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BrandVehicleTypeItems,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new BrandVehicleType();
          _reader.readMessage(
            messageInitializer1,
            BrandVehicleType.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    BrandVehicleTypeItems.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: BrandVehicleTypeItems,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        BrandVehicleType.serializeBinaryToWriter
      );
    }
  }

  private _items?: BrandVehicleType[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BrandVehicleTypeItems to deeply clone from
   */
  constructor(_value?: RecursivePartial<BrandVehicleTypeItems.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new BrandVehicleType(m));
    BrandVehicleTypeItems.refineValues(this);
  }
  get items(): BrandVehicleType[] | undefined {
    return this._items;
  }
  set items(value: BrandVehicleType[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BrandVehicleTypeItems.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BrandVehicleTypeItems.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): BrandVehicleTypeItems.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module BrandVehicleTypeItems {
  /**
   * Standard JavaScript object representation for BrandVehicleTypeItems
   */
  export interface AsObject {
    items?: BrandVehicleType.AsObject[];
  }

  /**
   * Protobuf JSON representation for BrandVehicleTypeItems
   */
  export interface AsProtobufJSON {
    items: BrandVehicleType.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.BrandVehicleType
 */
export class BrandVehicleType implements GrpcMessage {
  static id = 'goautowp.BrandVehicleType';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BrandVehicleType();
    BrandVehicleType.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BrandVehicleType) {
    _instance.id = _instance.id || 0;
    _instance.name = _instance.name || '';
    _instance.catname = _instance.catname || '';
    _instance.itemsCount = _instance.itemsCount || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BrandVehicleType,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt32();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.catname = _reader.readString();
          break;
        case 4:
          _instance.itemsCount = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    BrandVehicleType.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: BrandVehicleType,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt32(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.catname) {
      _writer.writeString(3, _instance.catname);
    }
    if (_instance.itemsCount) {
      _writer.writeString(4, _instance.itemsCount);
    }
  }

  private _id: number;
  private _name: string;
  private _catname: string;
  private _itemsCount: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BrandVehicleType to deeply clone from
   */
  constructor(_value?: RecursivePartial<BrandVehicleType.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.catname = _value.catname;
    this.itemsCount = _value.itemsCount;
    BrandVehicleType.refineValues(this);
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get catname(): string {
    return this._catname;
  }
  set catname(value: string) {
    this._catname = value;
  }
  get itemsCount(): string {
    return this._itemsCount;
  }
  set itemsCount(value: string) {
    this._itemsCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BrandVehicleType.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BrandVehicleType.AsObject {
    return {
      id: this.id,
      name: this.name,
      catname: this.catname,
      itemsCount: this.itemsCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): BrandVehicleType.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      catname: this.catname,
      itemsCount: this.itemsCount
    };
  }
}
export module BrandVehicleType {
  /**
   * Standard JavaScript object representation for BrandVehicleType
   */
  export interface AsObject {
    id: number;
    name: string;
    catname: string;
    itemsCount: string;
  }

  /**
   * Protobuf JSON representation for BrandVehicleType
   */
  export interface AsProtobufJSON {
    id: number;
    name: string;
    catname: string;
    itemsCount: string;
  }
}

/**
 * Message implementation for goautowp.CreateContactRequest
 */
export class CreateContactRequest implements GrpcMessage {
  static id = 'goautowp.CreateContactRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CreateContactRequest();
    CreateContactRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CreateContactRequest) {
    _instance.userId = _instance.userId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CreateContactRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    CreateContactRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CreateContactRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
  }

  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CreateContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CreateContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    CreateContactRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CreateContactRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CreateContactRequest.AsObject {
    return {
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CreateContactRequest.AsProtobufJSON {
    return {
      userId: this.userId
    };
  }
}
export module CreateContactRequest {
  /**
   * Standard JavaScript object representation for CreateContactRequest
   */
  export interface AsObject {
    userId: string;
  }

  /**
   * Protobuf JSON representation for CreateContactRequest
   */
  export interface AsProtobufJSON {
    userId: string;
  }
}

/**
 * Message implementation for goautowp.DeleteContactRequest
 */
export class DeleteContactRequest implements GrpcMessage {
  static id = 'goautowp.DeleteContactRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new DeleteContactRequest();
    DeleteContactRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: DeleteContactRequest) {
    _instance.userId = _instance.userId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: DeleteContactRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    DeleteContactRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: DeleteContactRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
  }

  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of DeleteContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<DeleteContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    DeleteContactRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    DeleteContactRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): DeleteContactRequest.AsObject {
    return {
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): DeleteContactRequest.AsProtobufJSON {
    return {
      userId: this.userId
    };
  }
}
export module DeleteContactRequest {
  /**
   * Standard JavaScript object representation for DeleteContactRequest
   */
  export interface AsObject {
    userId: string;
  }

  /**
   * Protobuf JSON representation for DeleteContactRequest
   */
  export interface AsProtobufJSON {
    userId: string;
  }
}

/**
 * Message implementation for goautowp.GetContactRequest
 */
export class GetContactRequest implements GrpcMessage {
  static id = 'goautowp.GetContactRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetContactRequest();
    GetContactRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetContactRequest) {
    _instance.userId = _instance.userId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetContactRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    GetContactRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetContactRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
  }

  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    GetContactRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetContactRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetContactRequest.AsObject {
    return {
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetContactRequest.AsProtobufJSON {
    return {
      userId: this.userId
    };
  }
}
export module GetContactRequest {
  /**
   * Standard JavaScript object representation for GetContactRequest
   */
  export interface AsObject {
    userId: string;
  }

  /**
   * Protobuf JSON representation for GetContactRequest
   */
  export interface AsProtobufJSON {
    userId: string;
  }
}

/**
 * Message implementation for goautowp.APIImage
 */
export class APIImage implements GrpcMessage {
  static id = 'goautowp.APIImage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIImage();
    APIImage.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIImage) {
    _instance.id = _instance.id || 0;
    _instance.src = _instance.src || '';
    _instance.width = _instance.width || 0;
    _instance.height = _instance.height || 0;
    _instance.filesize = _instance.filesize || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIImage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt32();
          break;
        case 2:
          _instance.src = _reader.readString();
          break;
        case 3:
          _instance.width = _reader.readInt32();
          break;
        case 4:
          _instance.height = _reader.readInt32();
          break;
        case 5:
          _instance.filesize = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APIImage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: APIImage, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt32(1, _instance.id);
    }
    if (_instance.src) {
      _writer.writeString(2, _instance.src);
    }
    if (_instance.width) {
      _writer.writeInt32(3, _instance.width);
    }
    if (_instance.height) {
      _writer.writeInt32(4, _instance.height);
    }
    if (_instance.filesize) {
      _writer.writeInt32(5, _instance.filesize);
    }
  }

  private _id: number;
  private _src: string;
  private _width: number;
  private _height: number;
  private _filesize: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIImage to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIImage.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.src = _value.src;
    this.width = _value.width;
    this.height = _value.height;
    this.filesize = _value.filesize;
    APIImage.refineValues(this);
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get src(): string {
    return this._src;
  }
  set src(value: string) {
    this._src = value;
  }
  get width(): number {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
  }
  get height(): number {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
  }
  get filesize(): number {
    return this._filesize;
  }
  set filesize(value: number) {
    this._filesize = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIImage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIImage.AsObject {
    return {
      id: this.id,
      src: this.src,
      width: this.width,
      height: this.height,
      filesize: this.filesize
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIImage.AsProtobufJSON {
    return {
      id: this.id,
      src: this.src,
      width: this.width,
      height: this.height,
      filesize: this.filesize
    };
  }
}
export module APIImage {
  /**
   * Standard JavaScript object representation for APIImage
   */
  export interface AsObject {
    id: number;
    src: string;
    width: number;
    height: number;
    filesize: number;
  }

  /**
   * Protobuf JSON representation for APIImage
   */
  export interface AsProtobufJSON {
    id: number;
    src: string;
    width: number;
    height: number;
    filesize: number;
  }
}

/**
 * Message implementation for goautowp.APIUser
 */
export class APIUser implements GrpcMessage {
  static id = 'goautowp.APIUser';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIUser();
    APIUser.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIUser) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.deleted = _instance.deleted || false;
    _instance.longAway = _instance.longAway || false;
    _instance.green = _instance.green || false;
    _instance.route = _instance.route || [];
    _instance.identity = _instance.identity || '';
    _instance.avatar = _instance.avatar || undefined;
    _instance.gravatar = _instance.gravatar || '';
    _instance.lastOnline = _instance.lastOnline || undefined;
    _instance.specsWeight = _instance.specsWeight || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIUser,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.deleted = _reader.readBool();
          break;
        case 4:
          _instance.longAway = _reader.readBool();
          break;
        case 5:
          _instance.green = _reader.readBool();
          break;
        case 6:
          (_instance.route = _instance.route || []).push(_reader.readString());
          break;
        case 7:
          _instance.identity = _reader.readString();
          break;
        case 8:
          _instance.avatar = new APIImage();
          _reader.readMessage(
            _instance.avatar,
            APIImage.deserializeBinaryFromReader
          );
          break;
        case 9:
          _instance.gravatar = _reader.readString();
          break;
        case 10:
          _instance.lastOnline = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.lastOnline,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 11:
          _instance.specsWeight = _reader.readDouble();
          break;
        default:
          _reader.skipField();
      }
    }

    APIUser.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: APIUser, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.deleted) {
      _writer.writeBool(3, _instance.deleted);
    }
    if (_instance.longAway) {
      _writer.writeBool(4, _instance.longAway);
    }
    if (_instance.green) {
      _writer.writeBool(5, _instance.green);
    }
    if (_instance.route && _instance.route.length) {
      _writer.writeRepeatedString(6, _instance.route);
    }
    if (_instance.identity) {
      _writer.writeString(7, _instance.identity);
    }
    if (_instance.avatar) {
      _writer.writeMessage(
        8,
        _instance.avatar as any,
        APIImage.serializeBinaryToWriter
      );
    }
    if (_instance.gravatar) {
      _writer.writeString(9, _instance.gravatar);
    }
    if (_instance.lastOnline) {
      _writer.writeMessage(
        10,
        _instance.lastOnline as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.specsWeight) {
      _writer.writeDouble(11, _instance.specsWeight);
    }
  }

  private _id: string;
  private _name: string;
  private _deleted: boolean;
  private _longAway: boolean;
  private _green: boolean;
  private _route: string[];
  private _identity: string;
  private _avatar?: APIImage;
  private _gravatar: string;
  private _lastOnline?: googleProtobuf002.Timestamp;
  private _specsWeight: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIUser to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIUser.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.deleted = _value.deleted;
    this.longAway = _value.longAway;
    this.green = _value.green;
    this.route = (_value.route || []).slice();
    this.identity = _value.identity;
    this.avatar = _value.avatar ? new APIImage(_value.avatar) : undefined;
    this.gravatar = _value.gravatar;
    this.lastOnline = _value.lastOnline
      ? new googleProtobuf002.Timestamp(_value.lastOnline)
      : undefined;
    this.specsWeight = _value.specsWeight;
    APIUser.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get deleted(): boolean {
    return this._deleted;
  }
  set deleted(value: boolean) {
    this._deleted = value;
  }
  get longAway(): boolean {
    return this._longAway;
  }
  set longAway(value: boolean) {
    this._longAway = value;
  }
  get green(): boolean {
    return this._green;
  }
  set green(value: boolean) {
    this._green = value;
  }
  get route(): string[] {
    return this._route;
  }
  set route(value: string[]) {
    this._route = value;
  }
  get identity(): string {
    return this._identity;
  }
  set identity(value: string) {
    this._identity = value;
  }
  get avatar(): APIImage | undefined {
    return this._avatar;
  }
  set avatar(value: APIImage | undefined) {
    this._avatar = value;
  }
  get gravatar(): string {
    return this._gravatar;
  }
  set gravatar(value: string) {
    this._gravatar = value;
  }
  get lastOnline(): googleProtobuf002.Timestamp | undefined {
    return this._lastOnline;
  }
  set lastOnline(value: googleProtobuf002.Timestamp | undefined) {
    this._lastOnline = value;
  }
  get specsWeight(): number {
    return this._specsWeight;
  }
  set specsWeight(value: number) {
    this._specsWeight = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIUser.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIUser.AsObject {
    return {
      id: this.id,
      name: this.name,
      deleted: this.deleted,
      longAway: this.longAway,
      green: this.green,
      route: (this.route || []).slice(),
      identity: this.identity,
      avatar: this.avatar ? this.avatar.toObject() : undefined,
      gravatar: this.gravatar,
      lastOnline: this.lastOnline ? this.lastOnline.toObject() : undefined,
      specsWeight: this.specsWeight
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIUser.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      deleted: this.deleted,
      longAway: this.longAway,
      green: this.green,
      route: (this.route || []).slice(),
      identity: this.identity,
      avatar: this.avatar ? this.avatar.toProtobufJSON(options) : null,
      gravatar: this.gravatar,
      lastOnline: this.lastOnline
        ? this.lastOnline.toProtobufJSON(options)
        : null,
      specsWeight: this.specsWeight
    };
  }
}
export module APIUser {
  /**
   * Standard JavaScript object representation for APIUser
   */
  export interface AsObject {
    id: string;
    name: string;
    deleted: boolean;
    longAway: boolean;
    green: boolean;
    route: string[];
    identity: string;
    avatar?: APIImage.AsObject;
    gravatar: string;
    lastOnline?: googleProtobuf002.Timestamp.AsObject;
    specsWeight: number;
  }

  /**
   * Protobuf JSON representation for APIUser
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    deleted: boolean;
    longAway: boolean;
    green: boolean;
    route: string[];
    identity: string;
    avatar: APIImage.AsProtobufJSON | null;
    gravatar: string;
    lastOnline: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    specsWeight: number;
  }
}

/**
 * Message implementation for goautowp.Contact
 */
export class Contact implements GrpcMessage {
  static id = 'goautowp.Contact';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Contact();
    Contact.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Contact) {
    _instance.contactUserId = _instance.contactUserId || '0';
    _instance.user = _instance.user || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Contact,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.contactUserId = _reader.readInt64String();
          break;
        case 2:
          _instance.user = new APIUser();
          _reader.readMessage(
            _instance.user,
            APIUser.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    Contact.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Contact, _writer: BinaryWriter) {
    if (_instance.contactUserId) {
      _writer.writeInt64String(1, _instance.contactUserId);
    }
    if (_instance.user) {
      _writer.writeMessage(
        2,
        _instance.user as any,
        APIUser.serializeBinaryToWriter
      );
    }
  }

  private _contactUserId: string;
  private _user?: APIUser;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Contact to deeply clone from
   */
  constructor(_value?: RecursivePartial<Contact.AsObject>) {
    _value = _value || {};
    this.contactUserId = _value.contactUserId;
    this.user = _value.user ? new APIUser(_value.user) : undefined;
    Contact.refineValues(this);
  }
  get contactUserId(): string {
    return this._contactUserId;
  }
  set contactUserId(value: string) {
    this._contactUserId = value;
  }
  get user(): APIUser | undefined {
    return this._user;
  }
  set user(value: APIUser | undefined) {
    this._user = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Contact.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Contact.AsObject {
    return {
      contactUserId: this.contactUserId,
      user: this.user ? this.user.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Contact.AsProtobufJSON {
    return {
      contactUserId: this.contactUserId,
      user: this.user ? this.user.toProtobufJSON(options) : null
    };
  }
}
export module Contact {
  /**
   * Standard JavaScript object representation for Contact
   */
  export interface AsObject {
    contactUserId: string;
    user?: APIUser.AsObject;
  }

  /**
   * Protobuf JSON representation for Contact
   */
  export interface AsProtobufJSON {
    contactUserId: string;
    user: APIUser.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.ContactItems
 */
export class ContactItems implements GrpcMessage {
  static id = 'goautowp.ContactItems';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ContactItems();
    ContactItems.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ContactItems) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ContactItems,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new Contact();
          _reader.readMessage(
            messageInitializer1,
            Contact.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ContactItems.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ContactItems,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        Contact.serializeBinaryToWriter
      );
    }
  }

  private _items?: Contact[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ContactItems to deeply clone from
   */
  constructor(_value?: RecursivePartial<ContactItems.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new Contact(m));
    ContactItems.refineValues(this);
  }
  get items(): Contact[] | undefined {
    return this._items;
  }
  set items(value: Contact[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ContactItems.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ContactItems.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ContactItems.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module ContactItems {
  /**
   * Standard JavaScript object representation for ContactItems
   */
  export interface AsObject {
    items?: Contact.AsObject[];
  }

  /**
   * Protobuf JSON representation for ContactItems
   */
  export interface AsProtobufJSON {
    items: Contact.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.GetContactsRequest
 */
export class GetContactsRequest implements GrpcMessage {
  static id = 'goautowp.GetContactsRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetContactsRequest();
    GetContactsRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetContactsRequest) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetContactsRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    GetContactsRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetContactsRequest,
    _writer: BinaryWriter
  ) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetContactsRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetContactsRequest.AsObject>) {
    _value = _value || {};
    GetContactsRequest.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetContactsRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetContactsRequest.AsObject {
    return {};
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetContactsRequest.AsProtobufJSON {
    return {};
  }
}
export module GetContactsRequest {
  /**
   * Standard JavaScript object representation for GetContactsRequest
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for GetContactsRequest
   */
  export interface AsProtobufJSON {}
}

/**
 * Message implementation for goautowp.CommentVoteItems
 */
export class CommentVoteItems implements GrpcMessage {
  static id = 'goautowp.CommentVoteItems';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentVoteItems();
    CommentVoteItems.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentVoteItems) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentVoteItems,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new CommentVote();
          _reader.readMessage(
            messageInitializer1,
            CommentVote.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    CommentVoteItems.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentVoteItems,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        CommentVote.serializeBinaryToWriter
      );
    }
  }

  private _items?: CommentVote[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentVoteItems to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentVoteItems.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new CommentVote(m));
    CommentVoteItems.refineValues(this);
  }
  get items(): CommentVote[] | undefined {
    return this._items;
  }
  set items(value: CommentVote[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentVoteItems.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentVoteItems.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentVoteItems.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module CommentVoteItems {
  /**
   * Standard JavaScript object representation for CommentVoteItems
   */
  export interface AsObject {
    items?: CommentVote.AsObject[];
  }

  /**
   * Protobuf JSON representation for CommentVoteItems
   */
  export interface AsProtobufJSON {
    items: CommentVote.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.CommentVote
 */
export class CommentVote implements GrpcMessage {
  static id = 'goautowp.CommentVote';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentVote();
    CommentVote.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentVote) {
    _instance.value = _instance.value || 0;
    _instance.user = _instance.user || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentVote,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readEnum();
          break;
        case 2:
          _instance.user = new APIUser();
          _reader.readMessage(
            _instance.user,
            APIUser.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    CommentVote.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentVote,
    _writer: BinaryWriter
  ) {
    if (_instance.value) {
      _writer.writeEnum(1, _instance.value);
    }
    if (_instance.user) {
      _writer.writeMessage(
        2,
        _instance.user as any,
        APIUser.serializeBinaryToWriter
      );
    }
  }

  private _value: CommentVote.VoteValue;
  private _user?: APIUser;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentVote to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentVote.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    this.user = _value.user ? new APIUser(_value.user) : undefined;
    CommentVote.refineValues(this);
  }
  get value(): CommentVote.VoteValue {
    return this._value;
  }
  set value(value: CommentVote.VoteValue) {
    this._value = value;
  }
  get user(): APIUser | undefined {
    return this._user;
  }
  set user(value: APIUser | undefined) {
    this._user = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentVote.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentVote.AsObject {
    return {
      value: this.value,
      user: this.user ? this.user.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentVote.AsProtobufJSON {
    return {
      value:
        CommentVote.VoteValue[
          this.value === null || this.value === undefined ? 0 : this.value
        ],
      user: this.user ? this.user.toProtobufJSON(options) : null
    };
  }
}
export module CommentVote {
  /**
   * Standard JavaScript object representation for CommentVote
   */
  export interface AsObject {
    value: CommentVote.VoteValue;
    user?: APIUser.AsObject;
  }

  /**
   * Protobuf JSON representation for CommentVote
   */
  export interface AsProtobufJSON {
    value: string;
    user: APIUser.AsProtobufJSON | null;
  }
  export enum VoteValue {
    UNKNOWN = 0,
    POSITIVE = -1,
    NEGATIVE = 1
  }
}

/**
 * Message implementation for goautowp.APIBanItem
 */
export class APIBanItem implements GrpcMessage {
  static id = 'goautowp.APIBanItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIBanItem();
    APIBanItem.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIBanItem) {
    _instance.until = _instance.until || undefined;
    _instance.byUserId = _instance.byUserId || '0';
    _instance.byUser = _instance.byUser || undefined;
    _instance.reason = _instance.reason || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIBanItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.until = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.until,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 2:
          _instance.byUserId = _reader.readInt64String();
          break;
        case 3:
          _instance.byUser = new APIUser();
          _reader.readMessage(
            _instance.byUser,
            APIUser.deserializeBinaryFromReader
          );
          break;
        case 4:
          _instance.reason = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APIBanItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: APIBanItem, _writer: BinaryWriter) {
    if (_instance.until) {
      _writer.writeMessage(
        1,
        _instance.until as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.byUserId) {
      _writer.writeInt64String(2, _instance.byUserId);
    }
    if (_instance.byUser) {
      _writer.writeMessage(
        3,
        _instance.byUser as any,
        APIUser.serializeBinaryToWriter
      );
    }
    if (_instance.reason) {
      _writer.writeString(4, _instance.reason);
    }
  }

  private _until?: googleProtobuf002.Timestamp;
  private _byUserId: string;
  private _byUser?: APIUser;
  private _reason: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIBanItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIBanItem.AsObject>) {
    _value = _value || {};
    this.until = _value.until
      ? new googleProtobuf002.Timestamp(_value.until)
      : undefined;
    this.byUserId = _value.byUserId;
    this.byUser = _value.byUser ? new APIUser(_value.byUser) : undefined;
    this.reason = _value.reason;
    APIBanItem.refineValues(this);
  }
  get until(): googleProtobuf002.Timestamp | undefined {
    return this._until;
  }
  set until(value: googleProtobuf002.Timestamp | undefined) {
    this._until = value;
  }
  get byUserId(): string {
    return this._byUserId;
  }
  set byUserId(value: string) {
    this._byUserId = value;
  }
  get byUser(): APIUser | undefined {
    return this._byUser;
  }
  set byUser(value: APIUser | undefined) {
    this._byUser = value;
  }
  get reason(): string {
    return this._reason;
  }
  set reason(value: string) {
    this._reason = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIBanItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIBanItem.AsObject {
    return {
      until: this.until ? this.until.toObject() : undefined,
      byUserId: this.byUserId,
      byUser: this.byUser ? this.byUser.toObject() : undefined,
      reason: this.reason
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIBanItem.AsProtobufJSON {
    return {
      until: this.until ? this.until.toProtobufJSON(options) : null,
      byUserId: this.byUserId,
      byUser: this.byUser ? this.byUser.toProtobufJSON(options) : null,
      reason: this.reason
    };
  }
}
export module APIBanItem {
  /**
   * Standard JavaScript object representation for APIBanItem
   */
  export interface AsObject {
    until?: googleProtobuf002.Timestamp.AsObject;
    byUserId: string;
    byUser?: APIUser.AsObject;
    reason: string;
  }

  /**
   * Protobuf JSON representation for APIBanItem
   */
  export interface AsProtobufJSON {
    until: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    byUserId: string;
    byUser: APIUser.AsProtobufJSON | null;
    reason: string;
  }
}

/**
 * Message implementation for goautowp.APITrafficTopItem
 */
export class APITrafficTopItem implements GrpcMessage {
  static id = 'goautowp.APITrafficTopItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITrafficTopItem();
    APITrafficTopItem.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITrafficTopItem) {
    _instance.ip = _instance.ip || '';
    _instance.count = _instance.count || 0;
    _instance.ban = _instance.ban || undefined;
    _instance.inWhitelist = _instance.inWhitelist || false;
    _instance.whoisUrl = _instance.whoisUrl || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITrafficTopItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.ip = _reader.readString();
          break;
        case 2:
          _instance.count = _reader.readInt32();
          break;
        case 3:
          _instance.ban = new APIBanItem();
          _reader.readMessage(
            _instance.ban,
            APIBanItem.deserializeBinaryFromReader
          );
          break;
        case 4:
          _instance.inWhitelist = _reader.readBool();
          break;
        case 5:
          _instance.whoisUrl = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APITrafficTopItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITrafficTopItem,
    _writer: BinaryWriter
  ) {
    if (_instance.ip) {
      _writer.writeString(1, _instance.ip);
    }
    if (_instance.count) {
      _writer.writeInt32(2, _instance.count);
    }
    if (_instance.ban) {
      _writer.writeMessage(
        3,
        _instance.ban as any,
        APIBanItem.serializeBinaryToWriter
      );
    }
    if (_instance.inWhitelist) {
      _writer.writeBool(4, _instance.inWhitelist);
    }
    if (_instance.whoisUrl) {
      _writer.writeString(5, _instance.whoisUrl);
    }
  }

  private _ip: string;
  private _count: number;
  private _ban?: APIBanItem;
  private _inWhitelist: boolean;
  private _whoisUrl: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITrafficTopItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITrafficTopItem.AsObject>) {
    _value = _value || {};
    this.ip = _value.ip;
    this.count = _value.count;
    this.ban = _value.ban ? new APIBanItem(_value.ban) : undefined;
    this.inWhitelist = _value.inWhitelist;
    this.whoisUrl = _value.whoisUrl;
    APITrafficTopItem.refineValues(this);
  }
  get ip(): string {
    return this._ip;
  }
  set ip(value: string) {
    this._ip = value;
  }
  get count(): number {
    return this._count;
  }
  set count(value: number) {
    this._count = value;
  }
  get ban(): APIBanItem | undefined {
    return this._ban;
  }
  set ban(value: APIBanItem | undefined) {
    this._ban = value;
  }
  get inWhitelist(): boolean {
    return this._inWhitelist;
  }
  set inWhitelist(value: boolean) {
    this._inWhitelist = value;
  }
  get whoisUrl(): string {
    return this._whoisUrl;
  }
  set whoisUrl(value: string) {
    this._whoisUrl = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITrafficTopItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITrafficTopItem.AsObject {
    return {
      ip: this.ip,
      count: this.count,
      ban: this.ban ? this.ban.toObject() : undefined,
      inWhitelist: this.inWhitelist,
      whoisUrl: this.whoisUrl
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITrafficTopItem.AsProtobufJSON {
    return {
      ip: this.ip,
      count: this.count,
      ban: this.ban ? this.ban.toProtobufJSON(options) : null,
      inWhitelist: this.inWhitelist,
      whoisUrl: this.whoisUrl
    };
  }
}
export module APITrafficTopItem {
  /**
   * Standard JavaScript object representation for APITrafficTopItem
   */
  export interface AsObject {
    ip: string;
    count: number;
    ban?: APIBanItem.AsObject;
    inWhitelist: boolean;
    whoisUrl: string;
  }

  /**
   * Protobuf JSON representation for APITrafficTopItem
   */
  export interface AsProtobufJSON {
    ip: string;
    count: number;
    ban: APIBanItem.AsProtobufJSON | null;
    inWhitelist: boolean;
    whoisUrl: string;
  }
}

/**
 * Message implementation for goautowp.APITrafficTopResponse
 */
export class APITrafficTopResponse implements GrpcMessage {
  static id = 'goautowp.APITrafficTopResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITrafficTopResponse();
    APITrafficTopResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITrafficTopResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITrafficTopResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APITrafficTopItem();
          _reader.readMessage(
            messageInitializer1,
            APITrafficTopItem.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APITrafficTopResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITrafficTopResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APITrafficTopItem.serializeBinaryToWriter
      );
    }
  }

  private _items?: APITrafficTopItem[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITrafficTopResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITrafficTopResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APITrafficTopItem(m));
    APITrafficTopResponse.refineValues(this);
  }
  get items(): APITrafficTopItem[] | undefined {
    return this._items;
  }
  set items(value: APITrafficTopItem[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITrafficTopResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITrafficTopResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITrafficTopResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APITrafficTopResponse {
  /**
   * Standard JavaScript object representation for APITrafficTopResponse
   */
  export interface AsObject {
    items?: APITrafficTopItem.AsObject[];
  }

  /**
   * Protobuf JSON representation for APITrafficTopResponse
   */
  export interface AsProtobufJSON {
    items: APITrafficTopItem.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APIGetIPRequest
 */
export class APIGetIPRequest implements GrpcMessage {
  static id = 'goautowp.APIGetIPRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetIPRequest();
    APIGetIPRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetIPRequest) {
    _instance.ip = _instance.ip || '';
    _instance.fields = _instance.fields || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetIPRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.ip = _reader.readString();
          break;
        case 2:
          (_instance.fields = _instance.fields || []).push(
            _reader.readString()
          );
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetIPRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetIPRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.ip) {
      _writer.writeString(1, _instance.ip);
    }
    if (_instance.fields && _instance.fields.length) {
      _writer.writeRepeatedString(2, _instance.fields);
    }
  }

  private _ip: string;
  private _fields: string[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetIPRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetIPRequest.AsObject>) {
    _value = _value || {};
    this.ip = _value.ip;
    this.fields = (_value.fields || []).slice();
    APIGetIPRequest.refineValues(this);
  }
  get ip(): string {
    return this._ip;
  }
  set ip(value: string) {
    this._ip = value;
  }
  get fields(): string[] {
    return this._fields;
  }
  set fields(value: string[]) {
    this._fields = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetIPRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetIPRequest.AsObject {
    return {
      ip: this.ip,
      fields: (this.fields || []).slice()
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetIPRequest.AsProtobufJSON {
    return {
      ip: this.ip,
      fields: (this.fields || []).slice()
    };
  }
}
export module APIGetIPRequest {
  /**
   * Standard JavaScript object representation for APIGetIPRequest
   */
  export interface AsObject {
    ip: string;
    fields: string[];
  }

  /**
   * Protobuf JSON representation for APIGetIPRequest
   */
  export interface AsProtobufJSON {
    ip: string;
    fields: string[];
  }
}

/**
 * Message implementation for goautowp.APIIPRights
 */
export class APIIPRights implements GrpcMessage {
  static id = 'goautowp.APIIPRights';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIIPRights();
    APIIPRights.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIIPRights) {
    _instance.addToBlacklist = _instance.addToBlacklist || false;
    _instance.removeFromBlacklist = _instance.removeFromBlacklist || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIIPRights,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.addToBlacklist = _reader.readBool();
          break;
        case 2:
          _instance.removeFromBlacklist = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    APIIPRights.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIIPRights,
    _writer: BinaryWriter
  ) {
    if (_instance.addToBlacklist) {
      _writer.writeBool(1, _instance.addToBlacklist);
    }
    if (_instance.removeFromBlacklist) {
      _writer.writeBool(2, _instance.removeFromBlacklist);
    }
  }

  private _addToBlacklist: boolean;
  private _removeFromBlacklist: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIIPRights to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIIPRights.AsObject>) {
    _value = _value || {};
    this.addToBlacklist = _value.addToBlacklist;
    this.removeFromBlacklist = _value.removeFromBlacklist;
    APIIPRights.refineValues(this);
  }
  get addToBlacklist(): boolean {
    return this._addToBlacklist;
  }
  set addToBlacklist(value: boolean) {
    this._addToBlacklist = value;
  }
  get removeFromBlacklist(): boolean {
    return this._removeFromBlacklist;
  }
  set removeFromBlacklist(value: boolean) {
    this._removeFromBlacklist = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIIPRights.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIIPRights.AsObject {
    return {
      addToBlacklist: this.addToBlacklist,
      removeFromBlacklist: this.removeFromBlacklist
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIIPRights.AsProtobufJSON {
    return {
      addToBlacklist: this.addToBlacklist,
      removeFromBlacklist: this.removeFromBlacklist
    };
  }
}
export module APIIPRights {
  /**
   * Standard JavaScript object representation for APIIPRights
   */
  export interface AsObject {
    addToBlacklist: boolean;
    removeFromBlacklist: boolean;
  }

  /**
   * Protobuf JSON representation for APIIPRights
   */
  export interface AsProtobufJSON {
    addToBlacklist: boolean;
    removeFromBlacklist: boolean;
  }
}

/**
 * Message implementation for goautowp.APIIP
 */
export class APIIP implements GrpcMessage {
  static id = 'goautowp.APIIP';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIIP();
    APIIP.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIIP) {
    _instance.address = _instance.address || '';
    _instance.hostname = _instance.hostname || '';
    _instance.blacklist = _instance.blacklist || undefined;
    _instance.rights = _instance.rights || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: APIIP, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.address = _reader.readString();
          break;
        case 2:
          _instance.hostname = _reader.readString();
          break;
        case 3:
          _instance.blacklist = new APIBanItem();
          _reader.readMessage(
            _instance.blacklist,
            APIBanItem.deserializeBinaryFromReader
          );
          break;
        case 4:
          _instance.rights = new APIIPRights();
          _reader.readMessage(
            _instance.rights,
            APIIPRights.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    APIIP.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: APIIP, _writer: BinaryWriter) {
    if (_instance.address) {
      _writer.writeString(1, _instance.address);
    }
    if (_instance.hostname) {
      _writer.writeString(2, _instance.hostname);
    }
    if (_instance.blacklist) {
      _writer.writeMessage(
        3,
        _instance.blacklist as any,
        APIBanItem.serializeBinaryToWriter
      );
    }
    if (_instance.rights) {
      _writer.writeMessage(
        4,
        _instance.rights as any,
        APIIPRights.serializeBinaryToWriter
      );
    }
  }

  private _address: string;
  private _hostname: string;
  private _blacklist?: APIBanItem;
  private _rights?: APIIPRights;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIIP to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIIP.AsObject>) {
    _value = _value || {};
    this.address = _value.address;
    this.hostname = _value.hostname;
    this.blacklist = _value.blacklist
      ? new APIBanItem(_value.blacklist)
      : undefined;
    this.rights = _value.rights ? new APIIPRights(_value.rights) : undefined;
    APIIP.refineValues(this);
  }
  get address(): string {
    return this._address;
  }
  set address(value: string) {
    this._address = value;
  }
  get hostname(): string {
    return this._hostname;
  }
  set hostname(value: string) {
    this._hostname = value;
  }
  get blacklist(): APIBanItem | undefined {
    return this._blacklist;
  }
  set blacklist(value: APIBanItem | undefined) {
    this._blacklist = value;
  }
  get rights(): APIIPRights | undefined {
    return this._rights;
  }
  set rights(value: APIIPRights | undefined) {
    this._rights = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIIP.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIIP.AsObject {
    return {
      address: this.address,
      hostname: this.hostname,
      blacklist: this.blacklist ? this.blacklist.toObject() : undefined,
      rights: this.rights ? this.rights.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIIP.AsProtobufJSON {
    return {
      address: this.address,
      hostname: this.hostname,
      blacklist: this.blacklist ? this.blacklist.toProtobufJSON(options) : null,
      rights: this.rights ? this.rights.toProtobufJSON(options) : null
    };
  }
}
export module APIIP {
  /**
   * Standard JavaScript object representation for APIIP
   */
  export interface AsObject {
    address: string;
    hostname: string;
    blacklist?: APIBanItem.AsObject;
    rights?: APIIPRights.AsObject;
  }

  /**
   * Protobuf JSON representation for APIIP
   */
  export interface AsProtobufJSON {
    address: string;
    hostname: string;
    blacklist: APIBanItem.AsProtobufJSON | null;
    rights: APIIPRights.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.APICreateFeedbackRequest
 */
export class APICreateFeedbackRequest implements GrpcMessage {
  static id = 'goautowp.APICreateFeedbackRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICreateFeedbackRequest();
    APICreateFeedbackRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICreateFeedbackRequest) {
    _instance.name = _instance.name || '';
    _instance.email = _instance.email || '';
    _instance.message = _instance.message || '';
    _instance.captcha = _instance.captcha || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICreateFeedbackRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.name = _reader.readString();
          break;
        case 2:
          _instance.email = _reader.readString();
          break;
        case 3:
          _instance.message = _reader.readString();
          break;
        case 4:
          _instance.captcha = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APICreateFeedbackRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICreateFeedbackRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.name) {
      _writer.writeString(1, _instance.name);
    }
    if (_instance.email) {
      _writer.writeString(2, _instance.email);
    }
    if (_instance.message) {
      _writer.writeString(3, _instance.message);
    }
    if (_instance.captcha) {
      _writer.writeString(4, _instance.captcha);
    }
  }

  private _name: string;
  private _email: string;
  private _message: string;
  private _captcha: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICreateFeedbackRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICreateFeedbackRequest.AsObject>) {
    _value = _value || {};
    this.name = _value.name;
    this.email = _value.email;
    this.message = _value.message;
    this.captcha = _value.captcha;
    APICreateFeedbackRequest.refineValues(this);
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }
  get captcha(): string {
    return this._captcha;
  }
  set captcha(value: string) {
    this._captcha = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APICreateFeedbackRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICreateFeedbackRequest.AsObject {
    return {
      name: this.name,
      email: this.email,
      message: this.message,
      captcha: this.captcha
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APICreateFeedbackRequest.AsProtobufJSON {
    return {
      name: this.name,
      email: this.email,
      message: this.message,
      captcha: this.captcha
    };
  }
}
export module APICreateFeedbackRequest {
  /**
   * Standard JavaScript object representation for APICreateFeedbackRequest
   */
  export interface AsObject {
    name: string;
    email: string;
    message: string;
    captcha: string;
  }

  /**
   * Protobuf JSON representation for APICreateFeedbackRequest
   */
  export interface AsProtobufJSON {
    name: string;
    email: string;
    message: string;
    captcha: string;
  }
}

/**
 * Message implementation for goautowp.DeleteFromTrafficWhitelistRequest
 */
export class DeleteFromTrafficWhitelistRequest implements GrpcMessage {
  static id = 'goautowp.DeleteFromTrafficWhitelistRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new DeleteFromTrafficWhitelistRequest();
    DeleteFromTrafficWhitelistRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: DeleteFromTrafficWhitelistRequest) {
    _instance.ip = _instance.ip || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: DeleteFromTrafficWhitelistRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.ip = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    DeleteFromTrafficWhitelistRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: DeleteFromTrafficWhitelistRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.ip) {
      _writer.writeString(1, _instance.ip);
    }
  }

  private _ip: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of DeleteFromTrafficWhitelistRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<DeleteFromTrafficWhitelistRequest.AsObject>
  ) {
    _value = _value || {};
    this.ip = _value.ip;
    DeleteFromTrafficWhitelistRequest.refineValues(this);
  }
  get ip(): string {
    return this._ip;
  }
  set ip(value: string) {
    this._ip = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    DeleteFromTrafficWhitelistRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): DeleteFromTrafficWhitelistRequest.AsObject {
    return {
      ip: this.ip
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): DeleteFromTrafficWhitelistRequest.AsProtobufJSON {
    return {
      ip: this.ip
    };
  }
}
export module DeleteFromTrafficWhitelistRequest {
  /**
   * Standard JavaScript object representation for DeleteFromTrafficWhitelistRequest
   */
  export interface AsObject {
    ip: string;
  }

  /**
   * Protobuf JSON representation for DeleteFromTrafficWhitelistRequest
   */
  export interface AsProtobufJSON {
    ip: string;
  }
}

/**
 * Message implementation for goautowp.DeleteFromTrafficBlacklistRequest
 */
export class DeleteFromTrafficBlacklistRequest implements GrpcMessage {
  static id = 'goautowp.DeleteFromTrafficBlacklistRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new DeleteFromTrafficBlacklistRequest();
    DeleteFromTrafficBlacklistRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: DeleteFromTrafficBlacklistRequest) {
    _instance.ip = _instance.ip || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: DeleteFromTrafficBlacklistRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.ip = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    DeleteFromTrafficBlacklistRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: DeleteFromTrafficBlacklistRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.ip) {
      _writer.writeString(1, _instance.ip);
    }
  }

  private _ip: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of DeleteFromTrafficBlacklistRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<DeleteFromTrafficBlacklistRequest.AsObject>
  ) {
    _value = _value || {};
    this.ip = _value.ip;
    DeleteFromTrafficBlacklistRequest.refineValues(this);
  }
  get ip(): string {
    return this._ip;
  }
  set ip(value: string) {
    this._ip = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    DeleteFromTrafficBlacklistRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): DeleteFromTrafficBlacklistRequest.AsObject {
    return {
      ip: this.ip
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): DeleteFromTrafficBlacklistRequest.AsProtobufJSON {
    return {
      ip: this.ip
    };
  }
}
export module DeleteFromTrafficBlacklistRequest {
  /**
   * Standard JavaScript object representation for DeleteFromTrafficBlacklistRequest
   */
  export interface AsObject {
    ip: string;
  }

  /**
   * Protobuf JSON representation for DeleteFromTrafficBlacklistRequest
   */
  export interface AsProtobufJSON {
    ip: string;
  }
}

/**
 * Message implementation for goautowp.AddToTrafficBlacklistRequest
 */
export class AddToTrafficBlacklistRequest implements GrpcMessage {
  static id = 'goautowp.AddToTrafficBlacklistRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AddToTrafficBlacklistRequest();
    AddToTrafficBlacklistRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AddToTrafficBlacklistRequest) {
    _instance.ip = _instance.ip || '';
    _instance.period = _instance.period || 0;
    _instance.reason = _instance.reason || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AddToTrafficBlacklistRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.ip = _reader.readString();
          break;
        case 2:
          _instance.period = _reader.readInt32();
          break;
        case 3:
          _instance.reason = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AddToTrafficBlacklistRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AddToTrafficBlacklistRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.ip) {
      _writer.writeString(1, _instance.ip);
    }
    if (_instance.period) {
      _writer.writeInt32(2, _instance.period);
    }
    if (_instance.reason) {
      _writer.writeString(3, _instance.reason);
    }
  }

  private _ip: string;
  private _period: number;
  private _reason: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AddToTrafficBlacklistRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<AddToTrafficBlacklistRequest.AsObject>
  ) {
    _value = _value || {};
    this.ip = _value.ip;
    this.period = _value.period;
    this.reason = _value.reason;
    AddToTrafficBlacklistRequest.refineValues(this);
  }
  get ip(): string {
    return this._ip;
  }
  set ip(value: string) {
    this._ip = value;
  }
  get period(): number {
    return this._period;
  }
  set period(value: number) {
    this._period = value;
  }
  get reason(): string {
    return this._reason;
  }
  set reason(value: string) {
    this._reason = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AddToTrafficBlacklistRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AddToTrafficBlacklistRequest.AsObject {
    return {
      ip: this.ip,
      period: this.period,
      reason: this.reason
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AddToTrafficBlacklistRequest.AsProtobufJSON {
    return {
      ip: this.ip,
      period: this.period,
      reason: this.reason
    };
  }
}
export module AddToTrafficBlacklistRequest {
  /**
   * Standard JavaScript object representation for AddToTrafficBlacklistRequest
   */
  export interface AsObject {
    ip: string;
    period: number;
    reason: string;
  }

  /**
   * Protobuf JSON representation for AddToTrafficBlacklistRequest
   */
  export interface AsProtobufJSON {
    ip: string;
    period: number;
    reason: string;
  }
}

/**
 * Message implementation for goautowp.AddToTrafficWhitelistRequest
 */
export class AddToTrafficWhitelistRequest implements GrpcMessage {
  static id = 'goautowp.AddToTrafficWhitelistRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AddToTrafficWhitelistRequest();
    AddToTrafficWhitelistRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AddToTrafficWhitelistRequest) {
    _instance.ip = _instance.ip || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AddToTrafficWhitelistRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.ip = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AddToTrafficWhitelistRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AddToTrafficWhitelistRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.ip) {
      _writer.writeString(1, _instance.ip);
    }
  }

  private _ip: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AddToTrafficWhitelistRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<AddToTrafficWhitelistRequest.AsObject>
  ) {
    _value = _value || {};
    this.ip = _value.ip;
    AddToTrafficWhitelistRequest.refineValues(this);
  }
  get ip(): string {
    return this._ip;
  }
  set ip(value: string) {
    this._ip = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AddToTrafficWhitelistRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AddToTrafficWhitelistRequest.AsObject {
    return {
      ip: this.ip
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AddToTrafficWhitelistRequest.AsProtobufJSON {
    return {
      ip: this.ip
    };
  }
}
export module AddToTrafficWhitelistRequest {
  /**
   * Standard JavaScript object representation for AddToTrafficWhitelistRequest
   */
  export interface AsObject {
    ip: string;
  }

  /**
   * Protobuf JSON representation for AddToTrafficWhitelistRequest
   */
  export interface AsProtobufJSON {
    ip: string;
  }
}

/**
 * Message implementation for goautowp.APITrafficWhitelistItem
 */
export class APITrafficWhitelistItem implements GrpcMessage {
  static id = 'goautowp.APITrafficWhitelistItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITrafficWhitelistItem();
    APITrafficWhitelistItem.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITrafficWhitelistItem) {
    _instance.ip = _instance.ip || '';
    _instance.description = _instance.description || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITrafficWhitelistItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.ip = _reader.readString();
          break;
        case 2:
          _instance.description = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APITrafficWhitelistItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITrafficWhitelistItem,
    _writer: BinaryWriter
  ) {
    if (_instance.ip) {
      _writer.writeString(1, _instance.ip);
    }
    if (_instance.description) {
      _writer.writeString(2, _instance.description);
    }
  }

  private _ip: string;
  private _description: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITrafficWhitelistItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITrafficWhitelistItem.AsObject>) {
    _value = _value || {};
    this.ip = _value.ip;
    this.description = _value.description;
    APITrafficWhitelistItem.refineValues(this);
  }
  get ip(): string {
    return this._ip;
  }
  set ip(value: string) {
    this._ip = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITrafficWhitelistItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITrafficWhitelistItem.AsObject {
    return {
      ip: this.ip,
      description: this.description
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITrafficWhitelistItem.AsProtobufJSON {
    return {
      ip: this.ip,
      description: this.description
    };
  }
}
export module APITrafficWhitelistItem {
  /**
   * Standard JavaScript object representation for APITrafficWhitelistItem
   */
  export interface AsObject {
    ip: string;
    description: string;
  }

  /**
   * Protobuf JSON representation for APITrafficWhitelistItem
   */
  export interface AsProtobufJSON {
    ip: string;
    description: string;
  }
}

/**
 * Message implementation for goautowp.APITrafficWhitelistItems
 */
export class APITrafficWhitelistItems implements GrpcMessage {
  static id = 'goautowp.APITrafficWhitelistItems';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITrafficWhitelistItems();
    APITrafficWhitelistItems.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITrafficWhitelistItems) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITrafficWhitelistItems,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APITrafficWhitelistItem();
          _reader.readMessage(
            messageInitializer1,
            APITrafficWhitelistItem.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APITrafficWhitelistItems.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITrafficWhitelistItems,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APITrafficWhitelistItem.serializeBinaryToWriter
      );
    }
  }

  private _items?: APITrafficWhitelistItem[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITrafficWhitelistItems to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITrafficWhitelistItems.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APITrafficWhitelistItem(m));
    APITrafficWhitelistItems.refineValues(this);
  }
  get items(): APITrafficWhitelistItem[] | undefined {
    return this._items;
  }
  set items(value: APITrafficWhitelistItem[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITrafficWhitelistItems.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITrafficWhitelistItems.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITrafficWhitelistItems.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APITrafficWhitelistItems {
  /**
   * Standard JavaScript object representation for APITrafficWhitelistItems
   */
  export interface AsObject {
    items?: APITrafficWhitelistItem.AsObject[];
  }

  /**
   * Protobuf JSON representation for APITrafficWhitelistItems
   */
  export interface AsProtobufJSON {
    items: APITrafficWhitelistItem.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APIForumsUserSummary
 */
export class APIForumsUserSummary implements GrpcMessage {
  static id = 'goautowp.APIForumsUserSummary';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIForumsUserSummary();
    APIForumsUserSummary.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIForumsUserSummary) {
    _instance.subscriptionsCount = _instance.subscriptionsCount || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIForumsUserSummary,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.subscriptionsCount = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APIForumsUserSummary.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIForumsUserSummary,
    _writer: BinaryWriter
  ) {
    if (_instance.subscriptionsCount) {
      _writer.writeInt32(1, _instance.subscriptionsCount);
    }
  }

  private _subscriptionsCount: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIForumsUserSummary to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIForumsUserSummary.AsObject>) {
    _value = _value || {};
    this.subscriptionsCount = _value.subscriptionsCount;
    APIForumsUserSummary.refineValues(this);
  }
  get subscriptionsCount(): number {
    return this._subscriptionsCount;
  }
  set subscriptionsCount(value: number) {
    this._subscriptionsCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIForumsUserSummary.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIForumsUserSummary.AsObject {
    return {
      subscriptionsCount: this.subscriptionsCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIForumsUserSummary.AsProtobufJSON {
    return {
      subscriptionsCount: this.subscriptionsCount
    };
  }
}
export module APIForumsUserSummary {
  /**
   * Standard JavaScript object representation for APIForumsUserSummary
   */
  export interface AsObject {
    subscriptionsCount: number;
  }

  /**
   * Protobuf JSON representation for APIForumsUserSummary
   */
  export interface AsProtobufJSON {
    subscriptionsCount: number;
  }
}

/**
 * Message implementation for goautowp.APIGetForumsThemeRequest
 */
export class APIGetForumsThemeRequest implements GrpcMessage {
  static id = 'goautowp.APIGetForumsThemeRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetForumsThemeRequest();
    APIGetForumsThemeRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetForumsThemeRequest) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetForumsThemeRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetForumsThemeRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetForumsThemeRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetForumsThemeRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetForumsThemeRequest.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    APIGetForumsThemeRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetForumsThemeRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetForumsThemeRequest.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetForumsThemeRequest.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module APIGetForumsThemeRequest {
  /**
   * Standard JavaScript object representation for APIGetForumsThemeRequest
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for APIGetForumsThemeRequest
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.APIGetForumsTopicsRequest
 */
export class APIGetForumsTopicsRequest implements GrpcMessage {
  static id = 'goautowp.APIGetForumsTopicsRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetForumsTopicsRequest();
    APIGetForumsTopicsRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetForumsTopicsRequest) {
    _instance.themeId = _instance.themeId || '0';
    _instance.page = _instance.page || 0;
    _instance.subscription = _instance.subscription || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetForumsTopicsRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.themeId = _reader.readInt64String();
          break;
        case 2:
          _instance.page = _reader.readInt32();
          break;
        case 3:
          _instance.subscription = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetForumsTopicsRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetForumsTopicsRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.themeId) {
      _writer.writeInt64String(1, _instance.themeId);
    }
    if (_instance.page) {
      _writer.writeInt32(2, _instance.page);
    }
    if (_instance.subscription) {
      _writer.writeBool(3, _instance.subscription);
    }
  }

  private _themeId: string;
  private _page: number;
  private _subscription: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetForumsTopicsRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetForumsTopicsRequest.AsObject>) {
    _value = _value || {};
    this.themeId = _value.themeId;
    this.page = _value.page;
    this.subscription = _value.subscription;
    APIGetForumsTopicsRequest.refineValues(this);
  }
  get themeId(): string {
    return this._themeId;
  }
  set themeId(value: string) {
    this._themeId = value;
  }
  get page(): number {
    return this._page;
  }
  set page(value: number) {
    this._page = value;
  }
  get subscription(): boolean {
    return this._subscription;
  }
  set subscription(value: boolean) {
    this._subscription = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetForumsTopicsRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetForumsTopicsRequest.AsObject {
    return {
      themeId: this.themeId,
      page: this.page,
      subscription: this.subscription
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetForumsTopicsRequest.AsProtobufJSON {
    return {
      themeId: this.themeId,
      page: this.page,
      subscription: this.subscription
    };
  }
}
export module APIGetForumsTopicsRequest {
  /**
   * Standard JavaScript object representation for APIGetForumsTopicsRequest
   */
  export interface AsObject {
    themeId: string;
    page: number;
    subscription: boolean;
  }

  /**
   * Protobuf JSON representation for APIGetForumsTopicsRequest
   */
  export interface AsProtobufJSON {
    themeId: string;
    page: number;
    subscription: boolean;
  }
}

/**
 * Message implementation for goautowp.APIGetForumsTopicRequest
 */
export class APIGetForumsTopicRequest implements GrpcMessage {
  static id = 'goautowp.APIGetForumsTopicRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetForumsTopicRequest();
    APIGetForumsTopicRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetForumsTopicRequest) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetForumsTopicRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetForumsTopicRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetForumsTopicRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetForumsTopicRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetForumsTopicRequest.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    APIGetForumsTopicRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetForumsTopicRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetForumsTopicRequest.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetForumsTopicRequest.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module APIGetForumsTopicRequest {
  /**
   * Standard JavaScript object representation for APIGetForumsTopicRequest
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for APIGetForumsTopicRequest
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.APIGetForumsThemesRequest
 */
export class APIGetForumsThemesRequest implements GrpcMessage {
  static id = 'goautowp.APIGetForumsThemesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetForumsThemesRequest();
    APIGetForumsThemesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetForumsThemesRequest) {
    _instance.themeId = _instance.themeId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetForumsThemesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.themeId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetForumsThemesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetForumsThemesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.themeId) {
      _writer.writeInt64String(1, _instance.themeId);
    }
  }

  private _themeId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetForumsThemesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetForumsThemesRequest.AsObject>) {
    _value = _value || {};
    this.themeId = _value.themeId;
    APIGetForumsThemesRequest.refineValues(this);
  }
  get themeId(): string {
    return this._themeId;
  }
  set themeId(value: string) {
    this._themeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetForumsThemesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetForumsThemesRequest.AsObject {
    return {
      themeId: this.themeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetForumsThemesRequest.AsProtobufJSON {
    return {
      themeId: this.themeId
    };
  }
}
export module APIGetForumsThemesRequest {
  /**
   * Standard JavaScript object representation for APIGetForumsThemesRequest
   */
  export interface AsObject {
    themeId: string;
  }

  /**
   * Protobuf JSON representation for APIGetForumsThemesRequest
   */
  export interface AsProtobufJSON {
    themeId: string;
  }
}

/**
 * Message implementation for goautowp.APIForumsTheme
 */
export class APIForumsTheme implements GrpcMessage {
  static id = 'goautowp.APIForumsTheme';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIForumsTheme();
    APIForumsTheme.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIForumsTheme) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.topicsCount = _instance.topicsCount || 0;
    _instance.messagesCount = _instance.messagesCount || 0;
    _instance.disableTopics = _instance.disableTopics || false;
    _instance.description = _instance.description || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIForumsTheme,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.topicsCount = _reader.readInt32();
          break;
        case 4:
          _instance.messagesCount = _reader.readInt32();
          break;
        case 5:
          _instance.disableTopics = _reader.readBool();
          break;
        case 6:
          _instance.description = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APIForumsTheme.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIForumsTheme,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.topicsCount) {
      _writer.writeInt32(3, _instance.topicsCount);
    }
    if (_instance.messagesCount) {
      _writer.writeInt32(4, _instance.messagesCount);
    }
    if (_instance.disableTopics) {
      _writer.writeBool(5, _instance.disableTopics);
    }
    if (_instance.description) {
      _writer.writeString(6, _instance.description);
    }
  }

  private _id: string;
  private _name: string;
  private _topicsCount: number;
  private _messagesCount: number;
  private _disableTopics: boolean;
  private _description: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIForumsTheme to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIForumsTheme.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.topicsCount = _value.topicsCount;
    this.messagesCount = _value.messagesCount;
    this.disableTopics = _value.disableTopics;
    this.description = _value.description;
    APIForumsTheme.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get topicsCount(): number {
    return this._topicsCount;
  }
  set topicsCount(value: number) {
    this._topicsCount = value;
  }
  get messagesCount(): number {
    return this._messagesCount;
  }
  set messagesCount(value: number) {
    this._messagesCount = value;
  }
  get disableTopics(): boolean {
    return this._disableTopics;
  }
  set disableTopics(value: boolean) {
    this._disableTopics = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIForumsTheme.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIForumsTheme.AsObject {
    return {
      id: this.id,
      name: this.name,
      topicsCount: this.topicsCount,
      messagesCount: this.messagesCount,
      disableTopics: this.disableTopics,
      description: this.description
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIForumsTheme.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      topicsCount: this.topicsCount,
      messagesCount: this.messagesCount,
      disableTopics: this.disableTopics,
      description: this.description
    };
  }
}
export module APIForumsTheme {
  /**
   * Standard JavaScript object representation for APIForumsTheme
   */
  export interface AsObject {
    id: string;
    name: string;
    topicsCount: number;
    messagesCount: number;
    disableTopics: boolean;
    description: string;
  }

  /**
   * Protobuf JSON representation for APIForumsTheme
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    topicsCount: number;
    messagesCount: number;
    disableTopics: boolean;
    description: string;
  }
}

/**
 * Message implementation for goautowp.APIForumsThemes
 */
export class APIForumsThemes implements GrpcMessage {
  static id = 'goautowp.APIForumsThemes';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIForumsThemes();
    APIForumsThemes.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIForumsThemes) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIForumsThemes,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APIForumsTheme();
          _reader.readMessage(
            messageInitializer1,
            APIForumsTheme.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APIForumsThemes.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIForumsThemes,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APIForumsTheme.serializeBinaryToWriter
      );
    }
  }

  private _items?: APIForumsTheme[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIForumsThemes to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIForumsThemes.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APIForumsTheme(m));
    APIForumsThemes.refineValues(this);
  }
  get items(): APIForumsTheme[] | undefined {
    return this._items;
  }
  set items(value: APIForumsTheme[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIForumsThemes.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIForumsThemes.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIForumsThemes.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APIForumsThemes {
  /**
   * Standard JavaScript object representation for APIForumsThemes
   */
  export interface AsObject {
    items?: APIForumsTheme.AsObject[];
  }

  /**
   * Protobuf JSON representation for APIForumsThemes
   */
  export interface AsProtobufJSON {
    items: APIForumsTheme.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APIForumsTopic
 */
export class APIForumsTopic implements GrpcMessage {
  static id = 'goautowp.APIForumsTopic';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIForumsTopic();
    APIForumsTopic.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIForumsTopic) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.status = _instance.status || '';
    _instance.oldMessages = _instance.oldMessages || 0;
    _instance.newMessages = _instance.newMessages || 0;
    _instance.createdAt = _instance.createdAt || undefined;
    _instance.userId = _instance.userId || '0';
    _instance.themeId = _instance.themeId || '0';
    _instance.subscription = _instance.subscription || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIForumsTopic,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.status = _reader.readString();
          break;
        case 4:
          _instance.oldMessages = _reader.readInt32();
          break;
        case 5:
          _instance.newMessages = _reader.readInt32();
          break;
        case 6:
          _instance.createdAt = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.createdAt,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 7:
          _instance.userId = _reader.readInt64String();
          break;
        case 8:
          _instance.themeId = _reader.readInt64String();
          break;
        case 9:
          _instance.subscription = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    APIForumsTopic.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIForumsTopic,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.status) {
      _writer.writeString(3, _instance.status);
    }
    if (_instance.oldMessages) {
      _writer.writeInt32(4, _instance.oldMessages);
    }
    if (_instance.newMessages) {
      _writer.writeInt32(5, _instance.newMessages);
    }
    if (_instance.createdAt) {
      _writer.writeMessage(
        6,
        _instance.createdAt as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.userId) {
      _writer.writeInt64String(7, _instance.userId);
    }
    if (_instance.themeId) {
      _writer.writeInt64String(8, _instance.themeId);
    }
    if (_instance.subscription) {
      _writer.writeBool(9, _instance.subscription);
    }
  }

  private _id: string;
  private _name: string;
  private _status: string;
  private _oldMessages: number;
  private _newMessages: number;
  private _createdAt?: googleProtobuf002.Timestamp;
  private _userId: string;
  private _themeId: string;
  private _subscription: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIForumsTopic to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIForumsTopic.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.status = _value.status;
    this.oldMessages = _value.oldMessages;
    this.newMessages = _value.newMessages;
    this.createdAt = _value.createdAt
      ? new googleProtobuf002.Timestamp(_value.createdAt)
      : undefined;
    this.userId = _value.userId;
    this.themeId = _value.themeId;
    this.subscription = _value.subscription;
    APIForumsTopic.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get status(): string {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }
  get oldMessages(): number {
    return this._oldMessages;
  }
  set oldMessages(value: number) {
    this._oldMessages = value;
  }
  get newMessages(): number {
    return this._newMessages;
  }
  set newMessages(value: number) {
    this._newMessages = value;
  }
  get createdAt(): googleProtobuf002.Timestamp | undefined {
    return this._createdAt;
  }
  set createdAt(value: googleProtobuf002.Timestamp | undefined) {
    this._createdAt = value;
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get themeId(): string {
    return this._themeId;
  }
  set themeId(value: string) {
    this._themeId = value;
  }
  get subscription(): boolean {
    return this._subscription;
  }
  set subscription(value: boolean) {
    this._subscription = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIForumsTopic.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIForumsTopic.AsObject {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      oldMessages: this.oldMessages,
      newMessages: this.newMessages,
      createdAt: this.createdAt ? this.createdAt.toObject() : undefined,
      userId: this.userId,
      themeId: this.themeId,
      subscription: this.subscription
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIForumsTopic.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      oldMessages: this.oldMessages,
      newMessages: this.newMessages,
      createdAt: this.createdAt ? this.createdAt.toProtobufJSON(options) : null,
      userId: this.userId,
      themeId: this.themeId,
      subscription: this.subscription
    };
  }
}
export module APIForumsTopic {
  /**
   * Standard JavaScript object representation for APIForumsTopic
   */
  export interface AsObject {
    id: string;
    name: string;
    status: string;
    oldMessages: number;
    newMessages: number;
    createdAt?: googleProtobuf002.Timestamp.AsObject;
    userId: string;
    themeId: string;
    subscription: boolean;
  }

  /**
   * Protobuf JSON representation for APIForumsTopic
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    status: string;
    oldMessages: number;
    newMessages: number;
    createdAt: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    userId: string;
    themeId: string;
    subscription: boolean;
  }
}

/**
 * Message implementation for goautowp.APIForumsTopics
 */
export class APIForumsTopics implements GrpcMessage {
  static id = 'goautowp.APIForumsTopics';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIForumsTopics();
    APIForumsTopics.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIForumsTopics) {
    _instance.items = _instance.items || [];
    _instance.paginator = _instance.paginator || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIForumsTopics,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APIForumsTopic();
          _reader.readMessage(
            messageInitializer1,
            APIForumsTopic.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        case 2:
          _instance.paginator = new Pages();
          _reader.readMessage(
            _instance.paginator,
            Pages.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    APIForumsTopics.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIForumsTopics,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APIForumsTopic.serializeBinaryToWriter
      );
    }
    if (_instance.paginator) {
      _writer.writeMessage(
        2,
        _instance.paginator as any,
        Pages.serializeBinaryToWriter
      );
    }
  }

  private _items?: APIForumsTopic[];
  private _paginator?: Pages;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIForumsTopics to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIForumsTopics.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APIForumsTopic(m));
    this.paginator = _value.paginator ? new Pages(_value.paginator) : undefined;
    APIForumsTopics.refineValues(this);
  }
  get items(): APIForumsTopic[] | undefined {
    return this._items;
  }
  set items(value: APIForumsTopic[] | undefined) {
    this._items = value;
  }
  get paginator(): Pages | undefined {
    return this._paginator;
  }
  set paginator(value: Pages | undefined) {
    this._paginator = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIForumsTopics.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIForumsTopics.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject()),
      paginator: this.paginator ? this.paginator.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIForumsTopics.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options)),
      paginator: this.paginator ? this.paginator.toProtobufJSON(options) : null
    };
  }
}
export module APIForumsTopics {
  /**
   * Standard JavaScript object representation for APIForumsTopics
   */
  export interface AsObject {
    items?: APIForumsTopic.AsObject[];
    paginator?: Pages.AsObject;
  }

  /**
   * Protobuf JSON representation for APIForumsTopics
   */
  export interface AsProtobufJSON {
    items: APIForumsTopic.AsProtobufJSON[] | null;
    paginator: Pages.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.APICommentMessage
 */
export class APICommentMessage implements GrpcMessage {
  static id = 'goautowp.APICommentMessage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICommentMessage();
    APICommentMessage.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICommentMessage) {
    _instance.id = _instance.id || '0';
    _instance.createdAt = _instance.createdAt || undefined;
    _instance.userId = _instance.userId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICommentMessage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.createdAt = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.createdAt,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.userId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APICommentMessage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICommentMessage,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.createdAt) {
      _writer.writeMessage(
        2,
        _instance.createdAt as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.userId) {
      _writer.writeInt64String(3, _instance.userId);
    }
  }

  private _id: string;
  private _createdAt?: googleProtobuf002.Timestamp;
  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICommentMessage to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICommentMessage.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.createdAt = _value.createdAt
      ? new googleProtobuf002.Timestamp(_value.createdAt)
      : undefined;
    this.userId = _value.userId;
    APICommentMessage.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get createdAt(): googleProtobuf002.Timestamp | undefined {
    return this._createdAt;
  }
  set createdAt(value: googleProtobuf002.Timestamp | undefined) {
    this._createdAt = value;
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APICommentMessage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICommentMessage.AsObject {
    return {
      id: this.id,
      createdAt: this.createdAt ? this.createdAt.toObject() : undefined,
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APICommentMessage.AsProtobufJSON {
    return {
      id: this.id,
      createdAt: this.createdAt ? this.createdAt.toProtobufJSON(options) : null,
      userId: this.userId
    };
  }
}
export module APICommentMessage {
  /**
   * Standard JavaScript object representation for APICommentMessage
   */
  export interface AsObject {
    id: string;
    createdAt?: googleProtobuf002.Timestamp.AsObject;
    userId: string;
  }

  /**
   * Protobuf JSON representation for APICommentMessage
   */
  export interface AsProtobufJSON {
    id: string;
    createdAt: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    userId: string;
  }
}

/**
 * Message implementation for goautowp.APICreateTopicRequest
 */
export class APICreateTopicRequest implements GrpcMessage {
  static id = 'goautowp.APICreateTopicRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICreateTopicRequest();
    APICreateTopicRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICreateTopicRequest) {
    _instance.themeId = _instance.themeId || '0';
    _instance.name = _instance.name || '';
    _instance.message = _instance.message || '';
    _instance.moderatorAttention = _instance.moderatorAttention || false;
    _instance.subscription = _instance.subscription || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICreateTopicRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.themeId = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.message = _reader.readString();
          break;
        case 4:
          _instance.moderatorAttention = _reader.readBool();
          break;
        case 5:
          _instance.subscription = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    APICreateTopicRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICreateTopicRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.themeId) {
      _writer.writeInt64String(1, _instance.themeId);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.message) {
      _writer.writeString(3, _instance.message);
    }
    if (_instance.moderatorAttention) {
      _writer.writeBool(4, _instance.moderatorAttention);
    }
    if (_instance.subscription) {
      _writer.writeBool(5, _instance.subscription);
    }
  }

  private _themeId: string;
  private _name: string;
  private _message: string;
  private _moderatorAttention: boolean;
  private _subscription: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICreateTopicRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICreateTopicRequest.AsObject>) {
    _value = _value || {};
    this.themeId = _value.themeId;
    this.name = _value.name;
    this.message = _value.message;
    this.moderatorAttention = _value.moderatorAttention;
    this.subscription = _value.subscription;
    APICreateTopicRequest.refineValues(this);
  }
  get themeId(): string {
    return this._themeId;
  }
  set themeId(value: string) {
    this._themeId = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }
  get moderatorAttention(): boolean {
    return this._moderatorAttention;
  }
  set moderatorAttention(value: boolean) {
    this._moderatorAttention = value;
  }
  get subscription(): boolean {
    return this._subscription;
  }
  set subscription(value: boolean) {
    this._subscription = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APICreateTopicRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICreateTopicRequest.AsObject {
    return {
      themeId: this.themeId,
      name: this.name,
      message: this.message,
      moderatorAttention: this.moderatorAttention,
      subscription: this.subscription
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APICreateTopicRequest.AsProtobufJSON {
    return {
      themeId: this.themeId,
      name: this.name,
      message: this.message,
      moderatorAttention: this.moderatorAttention,
      subscription: this.subscription
    };
  }
}
export module APICreateTopicRequest {
  /**
   * Standard JavaScript object representation for APICreateTopicRequest
   */
  export interface AsObject {
    themeId: string;
    name: string;
    message: string;
    moderatorAttention: boolean;
    subscription: boolean;
  }

  /**
   * Protobuf JSON representation for APICreateTopicRequest
   */
  export interface AsProtobufJSON {
    themeId: string;
    name: string;
    message: string;
    moderatorAttention: boolean;
    subscription: boolean;
  }
}

/**
 * Message implementation for goautowp.APICreateTopicResponse
 */
export class APICreateTopicResponse implements GrpcMessage {
  static id = 'goautowp.APICreateTopicResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICreateTopicResponse();
    APICreateTopicResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICreateTopicResponse) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICreateTopicResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APICreateTopicResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICreateTopicResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICreateTopicResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICreateTopicResponse.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    APICreateTopicResponse.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APICreateTopicResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICreateTopicResponse.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APICreateTopicResponse.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module APICreateTopicResponse {
  /**
   * Standard JavaScript object representation for APICreateTopicResponse
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for APICreateTopicResponse
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.APISetTopicStatusRequest
 */
export class APISetTopicStatusRequest implements GrpcMessage {
  static id = 'goautowp.APISetTopicStatusRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APISetTopicStatusRequest();
    APISetTopicStatusRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APISetTopicStatusRequest) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APISetTopicStatusRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APISetTopicStatusRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APISetTopicStatusRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APISetTopicStatusRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APISetTopicStatusRequest.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    APISetTopicStatusRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APISetTopicStatusRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APISetTopicStatusRequest.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APISetTopicStatusRequest.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module APISetTopicStatusRequest {
  /**
   * Standard JavaScript object representation for APISetTopicStatusRequest
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for APISetTopicStatusRequest
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.APIMoveTopicRequest
 */
export class APIMoveTopicRequest implements GrpcMessage {
  static id = 'goautowp.APIMoveTopicRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIMoveTopicRequest();
    APIMoveTopicRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIMoveTopicRequest) {
    _instance.id = _instance.id || '0';
    _instance.themeId = _instance.themeId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIMoveTopicRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.themeId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIMoveTopicRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIMoveTopicRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.themeId) {
      _writer.writeInt64String(2, _instance.themeId);
    }
  }

  private _id: string;
  private _themeId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIMoveTopicRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIMoveTopicRequest.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.themeId = _value.themeId;
    APIMoveTopicRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get themeId(): string {
    return this._themeId;
  }
  set themeId(value: string) {
    this._themeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIMoveTopicRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIMoveTopicRequest.AsObject {
    return {
      id: this.id,
      themeId: this.themeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIMoveTopicRequest.AsProtobufJSON {
    return {
      id: this.id,
      themeId: this.themeId
    };
  }
}
export module APIMoveTopicRequest {
  /**
   * Standard JavaScript object representation for APIMoveTopicRequest
   */
  export interface AsObject {
    id: string;
    themeId: string;
  }

  /**
   * Protobuf JSON representation for APIMoveTopicRequest
   */
  export interface AsProtobufJSON {
    id: string;
    themeId: string;
  }
}

/**
 * Message implementation for goautowp.APIMessageNewCount
 */
export class APIMessageNewCount implements GrpcMessage {
  static id = 'goautowp.APIMessageNewCount';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIMessageNewCount();
    APIMessageNewCount.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIMessageNewCount) {
    _instance.count = _instance.count || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIMessageNewCount,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.count = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APIMessageNewCount.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIMessageNewCount,
    _writer: BinaryWriter
  ) {
    if (_instance.count) {
      _writer.writeInt32(1, _instance.count);
    }
  }

  private _count: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIMessageNewCount to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIMessageNewCount.AsObject>) {
    _value = _value || {};
    this.count = _value.count;
    APIMessageNewCount.refineValues(this);
  }
  get count(): number {
    return this._count;
  }
  set count(value: number) {
    this._count = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIMessageNewCount.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIMessageNewCount.AsObject {
    return {
      count: this.count
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIMessageNewCount.AsProtobufJSON {
    return {
      count: this.count
    };
  }
}
export module APIMessageNewCount {
  /**
   * Standard JavaScript object representation for APIMessageNewCount
   */
  export interface AsObject {
    count: number;
  }

  /**
   * Protobuf JSON representation for APIMessageNewCount
   */
  export interface AsProtobufJSON {
    count: number;
  }
}

/**
 * Message implementation for goautowp.APIMessageSummary
 */
export class APIMessageSummary implements GrpcMessage {
  static id = 'goautowp.APIMessageSummary';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIMessageSummary();
    APIMessageSummary.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIMessageSummary) {
    _instance.inboxCount = _instance.inboxCount || 0;
    _instance.inboxNewCount = _instance.inboxNewCount || 0;
    _instance.sentCount = _instance.sentCount || 0;
    _instance.systemCount = _instance.systemCount || 0;
    _instance.systemNewCount = _instance.systemNewCount || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIMessageSummary,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.inboxCount = _reader.readInt32();
          break;
        case 2:
          _instance.inboxNewCount = _reader.readInt32();
          break;
        case 3:
          _instance.sentCount = _reader.readInt32();
          break;
        case 4:
          _instance.systemCount = _reader.readInt32();
          break;
        case 5:
          _instance.systemNewCount = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APIMessageSummary.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIMessageSummary,
    _writer: BinaryWriter
  ) {
    if (_instance.inboxCount) {
      _writer.writeInt32(1, _instance.inboxCount);
    }
    if (_instance.inboxNewCount) {
      _writer.writeInt32(2, _instance.inboxNewCount);
    }
    if (_instance.sentCount) {
      _writer.writeInt32(3, _instance.sentCount);
    }
    if (_instance.systemCount) {
      _writer.writeInt32(4, _instance.systemCount);
    }
    if (_instance.systemNewCount) {
      _writer.writeInt32(5, _instance.systemNewCount);
    }
  }

  private _inboxCount: number;
  private _inboxNewCount: number;
  private _sentCount: number;
  private _systemCount: number;
  private _systemNewCount: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIMessageSummary to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIMessageSummary.AsObject>) {
    _value = _value || {};
    this.inboxCount = _value.inboxCount;
    this.inboxNewCount = _value.inboxNewCount;
    this.sentCount = _value.sentCount;
    this.systemCount = _value.systemCount;
    this.systemNewCount = _value.systemNewCount;
    APIMessageSummary.refineValues(this);
  }
  get inboxCount(): number {
    return this._inboxCount;
  }
  set inboxCount(value: number) {
    this._inboxCount = value;
  }
  get inboxNewCount(): number {
    return this._inboxNewCount;
  }
  set inboxNewCount(value: number) {
    this._inboxNewCount = value;
  }
  get sentCount(): number {
    return this._sentCount;
  }
  set sentCount(value: number) {
    this._sentCount = value;
  }
  get systemCount(): number {
    return this._systemCount;
  }
  set systemCount(value: number) {
    this._systemCount = value;
  }
  get systemNewCount(): number {
    return this._systemNewCount;
  }
  set systemNewCount(value: number) {
    this._systemNewCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIMessageSummary.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIMessageSummary.AsObject {
    return {
      inboxCount: this.inboxCount,
      inboxNewCount: this.inboxNewCount,
      sentCount: this.sentCount,
      systemCount: this.systemCount,
      systemNewCount: this.systemNewCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIMessageSummary.AsProtobufJSON {
    return {
      inboxCount: this.inboxCount,
      inboxNewCount: this.inboxNewCount,
      sentCount: this.sentCount,
      systemCount: this.systemCount,
      systemNewCount: this.systemNewCount
    };
  }
}
export module APIMessageSummary {
  /**
   * Standard JavaScript object representation for APIMessageSummary
   */
  export interface AsObject {
    inboxCount: number;
    inboxNewCount: number;
    sentCount: number;
    systemCount: number;
    systemNewCount: number;
  }

  /**
   * Protobuf JSON representation for APIMessageSummary
   */
  export interface AsProtobufJSON {
    inboxCount: number;
    inboxNewCount: number;
    sentCount: number;
    systemCount: number;
    systemNewCount: number;
  }
}

/**
 * Message implementation for goautowp.APIDeleteUserRequest
 */
export class APIDeleteUserRequest implements GrpcMessage {
  static id = 'goautowp.APIDeleteUserRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIDeleteUserRequest();
    APIDeleteUserRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIDeleteUserRequest) {
    _instance.userId = _instance.userId || '0';
    _instance.password = _instance.password || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIDeleteUserRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        case 2:
          _instance.password = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APIDeleteUserRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIDeleteUserRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
    if (_instance.password) {
      _writer.writeString(2, _instance.password);
    }
  }

  private _userId: string;
  private _password: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIDeleteUserRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIDeleteUserRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    this.password = _value.password;
    APIDeleteUserRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get password(): string {
    return this._password;
  }
  set password(value: string) {
    this._password = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIDeleteUserRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIDeleteUserRequest.AsObject {
    return {
      userId: this.userId,
      password: this.password
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIDeleteUserRequest.AsProtobufJSON {
    return {
      userId: this.userId,
      password: this.password
    };
  }
}
export module APIDeleteUserRequest {
  /**
   * Standard JavaScript object representation for APIDeleteUserRequest
   */
  export interface AsObject {
    userId: string;
    password: string;
  }

  /**
   * Protobuf JSON representation for APIDeleteUserRequest
   */
  export interface AsProtobufJSON {
    userId: string;
    password: string;
  }
}

/**
 * Message implementation for goautowp.APIMeRequest
 */
export class APIMeRequest implements GrpcMessage {
  static id = 'goautowp.APIMeRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIMeRequest();
    APIMeRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIMeRequest) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIMeRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    APIMeRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIMeRequest,
    _writer: BinaryWriter
  ) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIMeRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIMeRequest.AsObject>) {
    _value = _value || {};
    APIMeRequest.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIMeRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIMeRequest.AsObject {
    return {};
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIMeRequest.AsProtobufJSON {
    return {};
  }
}
export module APIMeRequest {
  /**
   * Standard JavaScript object representation for APIMeRequest
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for APIMeRequest
   */
  export interface AsProtobufJSON {}
}

/**
 * Message implementation for goautowp.APIGetUserRequest
 */
export class APIGetUserRequest implements GrpcMessage {
  static id = 'goautowp.APIGetUserRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetUserRequest();
    APIGetUserRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetUserRequest) {
    _instance.userId = _instance.userId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetUserRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetUserRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetUserRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
  }

  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetUserRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetUserRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    APIGetUserRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetUserRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetUserRequest.AsObject {
    return {
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetUserRequest.AsProtobufJSON {
    return {
      userId: this.userId
    };
  }
}
export module APIGetUserRequest {
  /**
   * Standard JavaScript object representation for APIGetUserRequest
   */
  export interface AsObject {
    userId: string;
  }

  /**
   * Protobuf JSON representation for APIGetUserRequest
   */
  export interface AsProtobufJSON {
    userId: string;
  }
}

/**
 * Message implementation for goautowp.GetTopBrandsListRequest
 */
export class GetTopBrandsListRequest implements GrpcMessage {
  static id = 'goautowp.GetTopBrandsListRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetTopBrandsListRequest();
    GetTopBrandsListRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetTopBrandsListRequest) {
    _instance.language = _instance.language || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetTopBrandsListRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.language = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    GetTopBrandsListRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetTopBrandsListRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.language) {
      _writer.writeString(1, _instance.language);
    }
  }

  private _language: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTopBrandsListRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTopBrandsListRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    GetTopBrandsListRequest.refineValues(this);
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetTopBrandsListRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetTopBrandsListRequest.AsObject {
    return {
      language: this.language
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetTopBrandsListRequest.AsProtobufJSON {
    return {
      language: this.language
    };
  }
}
export module GetTopBrandsListRequest {
  /**
   * Standard JavaScript object representation for GetTopBrandsListRequest
   */
  export interface AsObject {
    language: string;
  }

  /**
   * Protobuf JSON representation for GetTopBrandsListRequest
   */
  export interface AsProtobufJSON {
    language: string;
  }
}

/**
 * Message implementation for goautowp.APITopBrandsList
 */
export class APITopBrandsList implements GrpcMessage {
  static id = 'goautowp.APITopBrandsList';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopBrandsList();
    APITopBrandsList.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopBrandsList) {
    _instance.brands = _instance.brands || [];
    _instance.total = _instance.total || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopBrandsList,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APITopBrandsListItem();
          _reader.readMessage(
            messageInitializer1,
            APITopBrandsListItem.deserializeBinaryFromReader
          );
          (_instance.brands = _instance.brands || []).push(messageInitializer1);
          break;
        case 2:
          _instance.total = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APITopBrandsList.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopBrandsList,
    _writer: BinaryWriter
  ) {
    if (_instance.brands && _instance.brands.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.brands as any,
        APITopBrandsListItem.serializeBinaryToWriter
      );
    }
    if (_instance.total) {
      _writer.writeInt32(2, _instance.total);
    }
  }

  private _brands?: APITopBrandsListItem[];
  private _total: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopBrandsList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopBrandsList.AsObject>) {
    _value = _value || {};
    this.brands = (_value.brands || []).map(m => new APITopBrandsListItem(m));
    this.total = _value.total;
    APITopBrandsList.refineValues(this);
  }
  get brands(): APITopBrandsListItem[] | undefined {
    return this._brands;
  }
  set brands(value: APITopBrandsListItem[] | undefined) {
    this._brands = value;
  }
  get total(): number {
    return this._total;
  }
  set total(value: number) {
    this._total = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopBrandsList.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopBrandsList.AsObject {
    return {
      brands: (this.brands || []).map(m => m.toObject()),
      total: this.total
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopBrandsList.AsProtobufJSON {
    return {
      brands: (this.brands || []).map(m => m.toProtobufJSON(options)),
      total: this.total
    };
  }
}
export module APITopBrandsList {
  /**
   * Standard JavaScript object representation for APITopBrandsList
   */
  export interface AsObject {
    brands?: APITopBrandsListItem.AsObject[];
    total: number;
  }

  /**
   * Protobuf JSON representation for APITopBrandsList
   */
  export interface AsProtobufJSON {
    brands: APITopBrandsListItem.AsProtobufJSON[] | null;
    total: number;
  }
}

/**
 * Message implementation for goautowp.APITopBrandsListItem
 */
export class APITopBrandsListItem implements GrpcMessage {
  static id = 'goautowp.APITopBrandsListItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopBrandsListItem();
    APITopBrandsListItem.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopBrandsListItem) {
    _instance.id = _instance.id || '0';
    _instance.catname = _instance.catname || '';
    _instance.name = _instance.name || '';
    _instance.itemsCount = _instance.itemsCount || 0;
    _instance.newItemsCount = _instance.newItemsCount || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopBrandsListItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.catname = _reader.readString();
          break;
        case 3:
          _instance.name = _reader.readString();
          break;
        case 4:
          _instance.itemsCount = _reader.readInt32();
          break;
        case 5:
          _instance.newItemsCount = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APITopBrandsListItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopBrandsListItem,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.catname) {
      _writer.writeString(2, _instance.catname);
    }
    if (_instance.name) {
      _writer.writeString(3, _instance.name);
    }
    if (_instance.itemsCount) {
      _writer.writeInt32(4, _instance.itemsCount);
    }
    if (_instance.newItemsCount) {
      _writer.writeInt32(5, _instance.newItemsCount);
    }
  }

  private _id: string;
  private _catname: string;
  private _name: string;
  private _itemsCount: number;
  private _newItemsCount: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopBrandsListItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopBrandsListItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.catname = _value.catname;
    this.name = _value.name;
    this.itemsCount = _value.itemsCount;
    this.newItemsCount = _value.newItemsCount;
    APITopBrandsListItem.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get catname(): string {
    return this._catname;
  }
  set catname(value: string) {
    this._catname = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get itemsCount(): number {
    return this._itemsCount;
  }
  set itemsCount(value: number) {
    this._itemsCount = value;
  }
  get newItemsCount(): number {
    return this._newItemsCount;
  }
  set newItemsCount(value: number) {
    this._newItemsCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopBrandsListItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopBrandsListItem.AsObject {
    return {
      id: this.id,
      catname: this.catname,
      name: this.name,
      itemsCount: this.itemsCount,
      newItemsCount: this.newItemsCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopBrandsListItem.AsProtobufJSON {
    return {
      id: this.id,
      catname: this.catname,
      name: this.name,
      itemsCount: this.itemsCount,
      newItemsCount: this.newItemsCount
    };
  }
}
export module APITopBrandsListItem {
  /**
   * Standard JavaScript object representation for APITopBrandsListItem
   */
  export interface AsObject {
    id: string;
    catname: string;
    name: string;
    itemsCount: number;
    newItemsCount: number;
  }

  /**
   * Protobuf JSON representation for APITopBrandsListItem
   */
  export interface AsProtobufJSON {
    id: string;
    catname: string;
    name: string;
    itemsCount: number;
    newItemsCount: number;
  }
}

/**
 * Message implementation for goautowp.GetTopPersonsListRequest
 */
export class GetTopPersonsListRequest implements GrpcMessage {
  static id = 'goautowp.GetTopPersonsListRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetTopPersonsListRequest();
    GetTopPersonsListRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetTopPersonsListRequest) {
    _instance.language = _instance.language || '';
    _instance.pictureItemType = _instance.pictureItemType || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetTopPersonsListRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.language = _reader.readString();
          break;
        case 2:
          _instance.pictureItemType = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    GetTopPersonsListRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetTopPersonsListRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.language) {
      _writer.writeString(1, _instance.language);
    }
    if (_instance.pictureItemType) {
      _writer.writeEnum(2, _instance.pictureItemType);
    }
  }

  private _language: string;
  private _pictureItemType: PictureItemType;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTopPersonsListRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTopPersonsListRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    this.pictureItemType = _value.pictureItemType;
    GetTopPersonsListRequest.refineValues(this);
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }
  get pictureItemType(): PictureItemType {
    return this._pictureItemType;
  }
  set pictureItemType(value: PictureItemType) {
    this._pictureItemType = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetTopPersonsListRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetTopPersonsListRequest.AsObject {
    return {
      language: this.language,
      pictureItemType: this.pictureItemType
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetTopPersonsListRequest.AsProtobufJSON {
    return {
      language: this.language,
      pictureItemType:
        PictureItemType[
          this.pictureItemType === null || this.pictureItemType === undefined
            ? 0
            : this.pictureItemType
        ]
    };
  }
}
export module GetTopPersonsListRequest {
  /**
   * Standard JavaScript object representation for GetTopPersonsListRequest
   */
  export interface AsObject {
    language: string;
    pictureItemType: PictureItemType;
  }

  /**
   * Protobuf JSON representation for GetTopPersonsListRequest
   */
  export interface AsProtobufJSON {
    language: string;
    pictureItemType: string;
  }
}

/**
 * Message implementation for goautowp.GetTwinsBrandsListRequest
 */
export class GetTwinsBrandsListRequest implements GrpcMessage {
  static id = 'goautowp.GetTwinsBrandsListRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetTwinsBrandsListRequest();
    GetTwinsBrandsListRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetTwinsBrandsListRequest) {
    _instance.language = _instance.language || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetTwinsBrandsListRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.language = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    GetTwinsBrandsListRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetTwinsBrandsListRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.language) {
      _writer.writeString(1, _instance.language);
    }
  }

  private _language: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTwinsBrandsListRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTwinsBrandsListRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    GetTwinsBrandsListRequest.refineValues(this);
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetTwinsBrandsListRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetTwinsBrandsListRequest.AsObject {
    return {
      language: this.language
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetTwinsBrandsListRequest.AsProtobufJSON {
    return {
      language: this.language
    };
  }
}
export module GetTwinsBrandsListRequest {
  /**
   * Standard JavaScript object representation for GetTwinsBrandsListRequest
   */
  export interface AsObject {
    language: string;
  }

  /**
   * Protobuf JSON representation for GetTwinsBrandsListRequest
   */
  export interface AsProtobufJSON {
    language: string;
  }
}

/**
 * Message implementation for goautowp.GetTopTwinsBrandsListRequest
 */
export class GetTopTwinsBrandsListRequest implements GrpcMessage {
  static id = 'goautowp.GetTopTwinsBrandsListRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetTopTwinsBrandsListRequest();
    GetTopTwinsBrandsListRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetTopTwinsBrandsListRequest) {
    _instance.language = _instance.language || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetTopTwinsBrandsListRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.language = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    GetTopTwinsBrandsListRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetTopTwinsBrandsListRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.language) {
      _writer.writeString(1, _instance.language);
    }
  }

  private _language: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTopTwinsBrandsListRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<GetTopTwinsBrandsListRequest.AsObject>
  ) {
    _value = _value || {};
    this.language = _value.language;
    GetTopTwinsBrandsListRequest.refineValues(this);
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetTopTwinsBrandsListRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetTopTwinsBrandsListRequest.AsObject {
    return {
      language: this.language
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetTopTwinsBrandsListRequest.AsProtobufJSON {
    return {
      language: this.language
    };
  }
}
export module GetTopTwinsBrandsListRequest {
  /**
   * Standard JavaScript object representation for GetTopTwinsBrandsListRequest
   */
  export interface AsObject {
    language: string;
  }

  /**
   * Protobuf JSON representation for GetTopTwinsBrandsListRequest
   */
  export interface AsProtobufJSON {
    language: string;
  }
}

/**
 * Message implementation for goautowp.GetTopCategoriesListRequest
 */
export class GetTopCategoriesListRequest implements GrpcMessage {
  static id = 'goautowp.GetTopCategoriesListRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetTopCategoriesListRequest();
    GetTopCategoriesListRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetTopCategoriesListRequest) {
    _instance.language = _instance.language || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetTopCategoriesListRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.language = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    GetTopCategoriesListRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetTopCategoriesListRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.language) {
      _writer.writeString(1, _instance.language);
    }
  }

  private _language: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTopCategoriesListRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTopCategoriesListRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    GetTopCategoriesListRequest.refineValues(this);
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetTopCategoriesListRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetTopCategoriesListRequest.AsObject {
    return {
      language: this.language
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetTopCategoriesListRequest.AsProtobufJSON {
    return {
      language: this.language
    };
  }
}
export module GetTopCategoriesListRequest {
  /**
   * Standard JavaScript object representation for GetTopCategoriesListRequest
   */
  export interface AsObject {
    language: string;
  }

  /**
   * Protobuf JSON representation for GetTopCategoriesListRequest
   */
  export interface AsProtobufJSON {
    language: string;
  }
}

/**
 * Message implementation for goautowp.GetTopFactoriesListRequest
 */
export class GetTopFactoriesListRequest implements GrpcMessage {
  static id = 'goautowp.GetTopFactoriesListRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetTopFactoriesListRequest();
    GetTopFactoriesListRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetTopFactoriesListRequest) {
    _instance.language = _instance.language || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetTopFactoriesListRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.language = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    GetTopFactoriesListRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetTopFactoriesListRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.language) {
      _writer.writeString(1, _instance.language);
    }
  }

  private _language: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTopFactoriesListRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTopFactoriesListRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    GetTopFactoriesListRequest.refineValues(this);
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetTopFactoriesListRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetTopFactoriesListRequest.AsObject {
    return {
      language: this.language
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetTopFactoriesListRequest.AsProtobufJSON {
    return {
      language: this.language
    };
  }
}
export module GetTopFactoriesListRequest {
  /**
   * Standard JavaScript object representation for GetTopFactoriesListRequest
   */
  export interface AsObject {
    language: string;
  }

  /**
   * Protobuf JSON representation for GetTopFactoriesListRequest
   */
  export interface AsProtobufJSON {
    language: string;
  }
}

/**
 * Message implementation for goautowp.APITopPersonsList
 */
export class APITopPersonsList implements GrpcMessage {
  static id = 'goautowp.APITopPersonsList';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopPersonsList();
    APITopPersonsList.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopPersonsList) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopPersonsList,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APITopPersonsListItem();
          _reader.readMessage(
            messageInitializer1,
            APITopPersonsListItem.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APITopPersonsList.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopPersonsList,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APITopPersonsListItem.serializeBinaryToWriter
      );
    }
  }

  private _items?: APITopPersonsListItem[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopPersonsList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopPersonsList.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APITopPersonsListItem(m));
    APITopPersonsList.refineValues(this);
  }
  get items(): APITopPersonsListItem[] | undefined {
    return this._items;
  }
  set items(value: APITopPersonsListItem[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopPersonsList.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopPersonsList.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopPersonsList.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APITopPersonsList {
  /**
   * Standard JavaScript object representation for APITopPersonsList
   */
  export interface AsObject {
    items?: APITopPersonsListItem.AsObject[];
  }

  /**
   * Protobuf JSON representation for APITopPersonsList
   */
  export interface AsProtobufJSON {
    items: APITopPersonsListItem.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APITopPersonsListItem
 */
export class APITopPersonsListItem implements GrpcMessage {
  static id = 'goautowp.APITopPersonsListItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopPersonsListItem();
    APITopPersonsListItem.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopPersonsListItem) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopPersonsListItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 3:
          _instance.name = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APITopPersonsListItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopPersonsListItem,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(3, _instance.name);
    }
  }

  private _id: string;
  private _name: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopPersonsListItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopPersonsListItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    APITopPersonsListItem.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopPersonsListItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopPersonsListItem.AsObject {
    return {
      id: this.id,
      name: this.name
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopPersonsListItem.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name
    };
  }
}
export module APITopPersonsListItem {
  /**
   * Standard JavaScript object representation for APITopPersonsListItem
   */
  export interface AsObject {
    id: string;
    name: string;
  }

  /**
   * Protobuf JSON representation for APITopPersonsListItem
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
  }
}

/**
 * Message implementation for goautowp.APITwinsBrandsListItem
 */
export class APITwinsBrandsListItem implements GrpcMessage {
  static id = 'goautowp.APITwinsBrandsListItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITwinsBrandsListItem();
    APITwinsBrandsListItem.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITwinsBrandsListItem) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.catname = _instance.catname || '';
    _instance.count = _instance.count || 0;
    _instance.newCount = _instance.newCount || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITwinsBrandsListItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.catname = _reader.readString();
          break;
        case 4:
          _instance.count = _reader.readInt32();
          break;
        case 5:
          _instance.newCount = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APITwinsBrandsListItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITwinsBrandsListItem,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.catname) {
      _writer.writeString(3, _instance.catname);
    }
    if (_instance.count) {
      _writer.writeInt32(4, _instance.count);
    }
    if (_instance.newCount) {
      _writer.writeInt32(5, _instance.newCount);
    }
  }

  private _id: string;
  private _name: string;
  private _catname: string;
  private _count: number;
  private _newCount: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITwinsBrandsListItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITwinsBrandsListItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.catname = _value.catname;
    this.count = _value.count;
    this.newCount = _value.newCount;
    APITwinsBrandsListItem.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get catname(): string {
    return this._catname;
  }
  set catname(value: string) {
    this._catname = value;
  }
  get count(): number {
    return this._count;
  }
  set count(value: number) {
    this._count = value;
  }
  get newCount(): number {
    return this._newCount;
  }
  set newCount(value: number) {
    this._newCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITwinsBrandsListItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITwinsBrandsListItem.AsObject {
    return {
      id: this.id,
      name: this.name,
      catname: this.catname,
      count: this.count,
      newCount: this.newCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITwinsBrandsListItem.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      catname: this.catname,
      count: this.count,
      newCount: this.newCount
    };
  }
}
export module APITwinsBrandsListItem {
  /**
   * Standard JavaScript object representation for APITwinsBrandsListItem
   */
  export interface AsObject {
    id: string;
    name: string;
    catname: string;
    count: number;
    newCount: number;
  }

  /**
   * Protobuf JSON representation for APITwinsBrandsListItem
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    catname: string;
    count: number;
    newCount: number;
  }
}

/**
 * Message implementation for goautowp.APITwinsBrandsList
 */
export class APITwinsBrandsList implements GrpcMessage {
  static id = 'goautowp.APITwinsBrandsList';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITwinsBrandsList();
    APITwinsBrandsList.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITwinsBrandsList) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITwinsBrandsList,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APITwinsBrandsListItem();
          _reader.readMessage(
            messageInitializer1,
            APITwinsBrandsListItem.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APITwinsBrandsList.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITwinsBrandsList,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APITwinsBrandsListItem.serializeBinaryToWriter
      );
    }
  }

  private _items?: APITwinsBrandsListItem[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITwinsBrandsList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITwinsBrandsList.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APITwinsBrandsListItem(m));
    APITwinsBrandsList.refineValues(this);
  }
  get items(): APITwinsBrandsListItem[] | undefined {
    return this._items;
  }
  set items(value: APITwinsBrandsListItem[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITwinsBrandsList.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITwinsBrandsList.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITwinsBrandsList.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APITwinsBrandsList {
  /**
   * Standard JavaScript object representation for APITwinsBrandsList
   */
  export interface AsObject {
    items?: APITwinsBrandsListItem.AsObject[];
  }

  /**
   * Protobuf JSON representation for APITwinsBrandsList
   */
  export interface AsProtobufJSON {
    items: APITwinsBrandsListItem.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APITopTwinsBrandsList
 */
export class APITopTwinsBrandsList implements GrpcMessage {
  static id = 'goautowp.APITopTwinsBrandsList';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopTwinsBrandsList();
    APITopTwinsBrandsList.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopTwinsBrandsList) {
    _instance.items = _instance.items || [];
    _instance.count = _instance.count || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopTwinsBrandsList,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APITwinsBrandsListItem();
          _reader.readMessage(
            messageInitializer1,
            APITwinsBrandsListItem.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        case 2:
          _instance.count = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APITopTwinsBrandsList.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopTwinsBrandsList,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APITwinsBrandsListItem.serializeBinaryToWriter
      );
    }
    if (_instance.count) {
      _writer.writeInt32(2, _instance.count);
    }
  }

  private _items?: APITwinsBrandsListItem[];
  private _count: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopTwinsBrandsList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopTwinsBrandsList.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APITwinsBrandsListItem(m));
    this.count = _value.count;
    APITopTwinsBrandsList.refineValues(this);
  }
  get items(): APITwinsBrandsListItem[] | undefined {
    return this._items;
  }
  set items(value: APITwinsBrandsListItem[] | undefined) {
    this._items = value;
  }
  get count(): number {
    return this._count;
  }
  set count(value: number) {
    this._count = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopTwinsBrandsList.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopTwinsBrandsList.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject()),
      count: this.count
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopTwinsBrandsList.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options)),
      count: this.count
    };
  }
}
export module APITopTwinsBrandsList {
  /**
   * Standard JavaScript object representation for APITopTwinsBrandsList
   */
  export interface AsObject {
    items?: APITwinsBrandsListItem.AsObject[];
    count: number;
  }

  /**
   * Protobuf JSON representation for APITopTwinsBrandsList
   */
  export interface AsProtobufJSON {
    items: APITwinsBrandsListItem.AsProtobufJSON[] | null;
    count: number;
  }
}

/**
 * Message implementation for goautowp.APITopCategoriesList
 */
export class APITopCategoriesList implements GrpcMessage {
  static id = 'goautowp.APITopCategoriesList';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopCategoriesList();
    APITopCategoriesList.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopCategoriesList) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopCategoriesList,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APITopCategoriesListItem();
          _reader.readMessage(
            messageInitializer1,
            APITopCategoriesListItem.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APITopCategoriesList.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopCategoriesList,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APITopCategoriesListItem.serializeBinaryToWriter
      );
    }
  }

  private _items?: APITopCategoriesListItem[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopCategoriesList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopCategoriesList.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APITopCategoriesListItem(m));
    APITopCategoriesList.refineValues(this);
  }
  get items(): APITopCategoriesListItem[] | undefined {
    return this._items;
  }
  set items(value: APITopCategoriesListItem[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopCategoriesList.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopCategoriesList.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopCategoriesList.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APITopCategoriesList {
  /**
   * Standard JavaScript object representation for APITopCategoriesList
   */
  export interface AsObject {
    items?: APITopCategoriesListItem.AsObject[];
  }

  /**
   * Protobuf JSON representation for APITopCategoriesList
   */
  export interface AsProtobufJSON {
    items: APITopCategoriesListItem.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APITopCategoriesListItem
 */
export class APITopCategoriesListItem implements GrpcMessage {
  static id = 'goautowp.APITopCategoriesListItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopCategoriesListItem();
    APITopCategoriesListItem.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopCategoriesListItem) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.catname = _instance.catname || '';
    _instance.count = _instance.count || 0;
    _instance.newCount = _instance.newCount || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopCategoriesListItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.catname = _reader.readString();
          break;
        case 4:
          _instance.count = _reader.readInt32();
          break;
        case 5:
          _instance.newCount = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APITopCategoriesListItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopCategoriesListItem,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.catname) {
      _writer.writeString(3, _instance.catname);
    }
    if (_instance.count) {
      _writer.writeInt32(4, _instance.count);
    }
    if (_instance.newCount) {
      _writer.writeInt32(5, _instance.newCount);
    }
  }

  private _id: string;
  private _name: string;
  private _catname: string;
  private _count: number;
  private _newCount: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopCategoriesListItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopCategoriesListItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.catname = _value.catname;
    this.count = _value.count;
    this.newCount = _value.newCount;
    APITopCategoriesListItem.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get catname(): string {
    return this._catname;
  }
  set catname(value: string) {
    this._catname = value;
  }
  get count(): number {
    return this._count;
  }
  set count(value: number) {
    this._count = value;
  }
  get newCount(): number {
    return this._newCount;
  }
  set newCount(value: number) {
    this._newCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopCategoriesListItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopCategoriesListItem.AsObject {
    return {
      id: this.id,
      name: this.name,
      catname: this.catname,
      count: this.count,
      newCount: this.newCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopCategoriesListItem.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      catname: this.catname,
      count: this.count,
      newCount: this.newCount
    };
  }
}
export module APITopCategoriesListItem {
  /**
   * Standard JavaScript object representation for APITopCategoriesListItem
   */
  export interface AsObject {
    id: string;
    name: string;
    catname: string;
    count: number;
    newCount: number;
  }

  /**
   * Protobuf JSON representation for APITopCategoriesListItem
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    catname: string;
    count: number;
    newCount: number;
  }
}

/**
 * Message implementation for goautowp.APITopFactoriesList
 */
export class APITopFactoriesList implements GrpcMessage {
  static id = 'goautowp.APITopFactoriesList';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopFactoriesList();
    APITopFactoriesList.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopFactoriesList) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopFactoriesList,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APITopFactoriesListItem();
          _reader.readMessage(
            messageInitializer1,
            APITopFactoriesListItem.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APITopFactoriesList.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopFactoriesList,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APITopFactoriesListItem.serializeBinaryToWriter
      );
    }
  }

  private _items?: APITopFactoriesListItem[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopFactoriesList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopFactoriesList.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APITopFactoriesListItem(m));
    APITopFactoriesList.refineValues(this);
  }
  get items(): APITopFactoriesListItem[] | undefined {
    return this._items;
  }
  set items(value: APITopFactoriesListItem[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopFactoriesList.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopFactoriesList.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopFactoriesList.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APITopFactoriesList {
  /**
   * Standard JavaScript object representation for APITopFactoriesList
   */
  export interface AsObject {
    items?: APITopFactoriesListItem.AsObject[];
  }

  /**
   * Protobuf JSON representation for APITopFactoriesList
   */
  export interface AsProtobufJSON {
    items: APITopFactoriesListItem.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APITopFactoriesListItem
 */
export class APITopFactoriesListItem implements GrpcMessage {
  static id = 'goautowp.APITopFactoriesListItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopFactoriesListItem();
    APITopFactoriesListItem.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopFactoriesListItem) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.count = _instance.count || 0;
    _instance.newCount = _instance.newCount || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITopFactoriesListItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.count = _reader.readInt32();
          break;
        case 4:
          _instance.newCount = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APITopFactoriesListItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopFactoriesListItem,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.count) {
      _writer.writeInt32(3, _instance.count);
    }
    if (_instance.newCount) {
      _writer.writeInt32(4, _instance.newCount);
    }
  }

  private _id: string;
  private _name: string;
  private _count: number;
  private _newCount: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopFactoriesListItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopFactoriesListItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.count = _value.count;
    this.newCount = _value.newCount;
    APITopFactoriesListItem.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get count(): number {
    return this._count;
  }
  set count(value: number) {
    this._count = value;
  }
  get newCount(): number {
    return this._newCount;
  }
  set newCount(value: number) {
    this._newCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopFactoriesListItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopFactoriesListItem.AsObject {
    return {
      id: this.id,
      name: this.name,
      count: this.count,
      newCount: this.newCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITopFactoriesListItem.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      count: this.count,
      newCount: this.newCount
    };
  }
}
export module APITopFactoriesListItem {
  /**
   * Standard JavaScript object representation for APITopFactoriesListItem
   */
  export interface AsObject {
    id: string;
    name: string;
    count: number;
    newCount: number;
  }

  /**
   * Protobuf JSON representation for APITopFactoriesListItem
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    count: number;
    newCount: number;
  }
}

/**
 * Message implementation for goautowp.ItemPicturesRequest
 */
export class ItemPicturesRequest implements GrpcMessage {
  static id = 'goautowp.ItemPicturesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ItemPicturesRequest();
    ItemPicturesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ItemPicturesRequest) {
    _instance.typeId = _instance.typeId || 0;
    _instance.pictures = _instance.pictures || undefined;
    _instance.perspectiveId = _instance.perspectiveId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ItemPicturesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.typeId = _reader.readEnum();
          break;
        case 2:
          _instance.pictures = new PicturesRequest();
          _reader.readMessage(
            _instance.pictures,
            PicturesRequest.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.perspectiveId = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    ItemPicturesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ItemPicturesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.typeId) {
      _writer.writeEnum(1, _instance.typeId);
    }
    if (_instance.pictures) {
      _writer.writeMessage(
        2,
        _instance.pictures as any,
        PicturesRequest.serializeBinaryToWriter
      );
    }
    if (_instance.perspectiveId) {
      _writer.writeInt32(3, _instance.perspectiveId);
    }
  }

  private _typeId: ItemPictureType;
  private _pictures?: PicturesRequest;
  private _perspectiveId: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ItemPicturesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ItemPicturesRequest.AsObject>) {
    _value = _value || {};
    this.typeId = _value.typeId;
    this.pictures = _value.pictures
      ? new PicturesRequest(_value.pictures)
      : undefined;
    this.perspectiveId = _value.perspectiveId;
    ItemPicturesRequest.refineValues(this);
  }
  get typeId(): ItemPictureType {
    return this._typeId;
  }
  set typeId(value: ItemPictureType) {
    this._typeId = value;
  }
  get pictures(): PicturesRequest | undefined {
    return this._pictures;
  }
  set pictures(value: PicturesRequest | undefined) {
    this._pictures = value;
  }
  get perspectiveId(): number {
    return this._perspectiveId;
  }
  set perspectiveId(value: number) {
    this._perspectiveId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ItemPicturesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ItemPicturesRequest.AsObject {
    return {
      typeId: this.typeId,
      pictures: this.pictures ? this.pictures.toObject() : undefined,
      perspectiveId: this.perspectiveId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ItemPicturesRequest.AsProtobufJSON {
    return {
      typeId:
        ItemPictureType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ],
      pictures: this.pictures ? this.pictures.toProtobufJSON(options) : null,
      perspectiveId: this.perspectiveId
    };
  }
}
export module ItemPicturesRequest {
  /**
   * Standard JavaScript object representation for ItemPicturesRequest
   */
  export interface AsObject {
    typeId: ItemPictureType;
    pictures?: PicturesRequest.AsObject;
    perspectiveId: number;
  }

  /**
   * Protobuf JSON representation for ItemPicturesRequest
   */
  export interface AsProtobufJSON {
    typeId: string;
    pictures: PicturesRequest.AsProtobufJSON | null;
    perspectiveId: number;
  }
}

/**
 * Message implementation for goautowp.PicturesRequest
 */
export class PicturesRequest implements GrpcMessage {
  static id = 'goautowp.PicturesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PicturesRequest();
    PicturesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PicturesRequest) {
    _instance.status = _instance.status || 0;
    _instance.itemPicture = _instance.itemPicture || undefined;
    _instance.ownerId = _instance.ownerId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PicturesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.status = _reader.readEnum();
          break;
        case 2:
          _instance.itemPicture = new ItemPicturesRequest();
          _reader.readMessage(
            _instance.itemPicture,
            ItemPicturesRequest.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.ownerId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    PicturesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PicturesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.status) {
      _writer.writeEnum(1, _instance.status);
    }
    if (_instance.itemPicture) {
      _writer.writeMessage(
        2,
        _instance.itemPicture as any,
        ItemPicturesRequest.serializeBinaryToWriter
      );
    }
    if (_instance.ownerId) {
      _writer.writeInt64String(3, _instance.ownerId);
    }
  }

  private _status: PictureStatus;
  private _itemPicture?: ItemPicturesRequest;
  private _ownerId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PicturesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<PicturesRequest.AsObject>) {
    _value = _value || {};
    this.status = _value.status;
    this.itemPicture = _value.itemPicture
      ? new ItemPicturesRequest(_value.itemPicture)
      : undefined;
    this.ownerId = _value.ownerId;
    PicturesRequest.refineValues(this);
  }
  get status(): PictureStatus {
    return this._status;
  }
  set status(value: PictureStatus) {
    this._status = value;
  }
  get itemPicture(): ItemPicturesRequest | undefined {
    return this._itemPicture;
  }
  set itemPicture(value: ItemPicturesRequest | undefined) {
    this._itemPicture = value;
  }
  get ownerId(): string {
    return this._ownerId;
  }
  set ownerId(value: string) {
    this._ownerId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PicturesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PicturesRequest.AsObject {
    return {
      status: this.status,
      itemPicture: this.itemPicture ? this.itemPicture.toObject() : undefined,
      ownerId: this.ownerId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PicturesRequest.AsProtobufJSON {
    return {
      status:
        PictureStatus[
          this.status === null || this.status === undefined ? 0 : this.status
        ],
      itemPicture: this.itemPicture
        ? this.itemPicture.toProtobufJSON(options)
        : null,
      ownerId: this.ownerId
    };
  }
}
export module PicturesRequest {
  /**
   * Standard JavaScript object representation for PicturesRequest
   */
  export interface AsObject {
    status: PictureStatus;
    itemPicture?: ItemPicturesRequest.AsObject;
    ownerId: string;
  }

  /**
   * Protobuf JSON representation for PicturesRequest
   */
  export interface AsProtobufJSON {
    status: string;
    itemPicture: ItemPicturesRequest.AsProtobufJSON | null;
    ownerId: string;
  }
}

/**
 * Message implementation for goautowp.PictureFields
 */
export class PictureFields implements GrpcMessage {
  static id = 'goautowp.PictureFields';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PictureFields();
    PictureFields.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PictureFields) {
    _instance.nameText = _instance.nameText || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PictureFields,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.nameText = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    PictureFields.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PictureFields,
    _writer: BinaryWriter
  ) {
    if (_instance.nameText) {
      _writer.writeBool(1, _instance.nameText);
    }
  }

  private _nameText: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PictureFields to deeply clone from
   */
  constructor(_value?: RecursivePartial<PictureFields.AsObject>) {
    _value = _value || {};
    this.nameText = _value.nameText;
    PictureFields.refineValues(this);
  }
  get nameText(): boolean {
    return this._nameText;
  }
  set nameText(value: boolean) {
    this._nameText = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PictureFields.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PictureFields.AsObject {
    return {
      nameText: this.nameText
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PictureFields.AsProtobufJSON {
    return {
      nameText: this.nameText
    };
  }
}
export module PictureFields {
  /**
   * Standard JavaScript object representation for PictureFields
   */
  export interface AsObject {
    nameText: boolean;
  }

  /**
   * Protobuf JSON representation for PictureFields
   */
  export interface AsProtobufJSON {
    nameText: boolean;
  }
}

/**
 * Message implementation for goautowp.PreviewPicturesFields
 */
export class PreviewPicturesFields implements GrpcMessage {
  static id = 'goautowp.PreviewPicturesFields';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PreviewPicturesFields();
    PreviewPicturesFields.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PreviewPicturesFields) {
    _instance.route = _instance.route || false;
    _instance.picture = _instance.picture || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PreviewPicturesFields,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.route = _reader.readBool();
          break;
        case 2:
          _instance.picture = new PictureFields();
          _reader.readMessage(
            _instance.picture,
            PictureFields.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    PreviewPicturesFields.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PreviewPicturesFields,
    _writer: BinaryWriter
  ) {
    if (_instance.route) {
      _writer.writeBool(1, _instance.route);
    }
    if (_instance.picture) {
      _writer.writeMessage(
        2,
        _instance.picture as any,
        PictureFields.serializeBinaryToWriter
      );
    }
  }

  private _route: boolean;
  private _picture?: PictureFields;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PreviewPicturesFields to deeply clone from
   */
  constructor(_value?: RecursivePartial<PreviewPicturesFields.AsObject>) {
    _value = _value || {};
    this.route = _value.route;
    this.picture = _value.picture
      ? new PictureFields(_value.picture)
      : undefined;
    PreviewPicturesFields.refineValues(this);
  }
  get route(): boolean {
    return this._route;
  }
  set route(value: boolean) {
    this._route = value;
  }
  get picture(): PictureFields | undefined {
    return this._picture;
  }
  set picture(value: PictureFields | undefined) {
    this._picture = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PreviewPicturesFields.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PreviewPicturesFields.AsObject {
    return {
      route: this.route,
      picture: this.picture ? this.picture.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PreviewPicturesFields.AsProtobufJSON {
    return {
      route: this.route,
      picture: this.picture ? this.picture.toProtobufJSON(options) : null
    };
  }
}
export module PreviewPicturesFields {
  /**
   * Standard JavaScript object representation for PreviewPicturesFields
   */
  export interface AsObject {
    route: boolean;
    picture?: PictureFields.AsObject;
  }

  /**
   * Protobuf JSON representation for PreviewPicturesFields
   */
  export interface AsProtobufJSON {
    route: boolean;
    picture: PictureFields.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.ItemFields
 */
export class ItemFields implements GrpcMessage {
  static id = 'goautowp.ItemFields';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ItemFields();
    ItemFields.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ItemFields) {
    _instance.nameOnly = _instance.nameOnly || false;
    _instance.nameDefault = _instance.nameDefault || false;
    _instance.nameHtml = _instance.nameHtml || false;
    _instance.nameText = _instance.nameText || false;
    _instance.description = _instance.description || false;
    _instance.hasText = _instance.hasText || false;
    _instance.previewPictures = _instance.previewPictures || undefined;
    _instance.totalPictures = _instance.totalPictures || false;
    _instance.descendantsCount = _instance.descendantsCount || false;
    _instance.currentPicturesCount = _instance.currentPicturesCount || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ItemFields,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.nameOnly = _reader.readBool();
          break;
        case 2:
          _instance.nameDefault = _reader.readBool();
          break;
        case 3:
          _instance.nameHtml = _reader.readBool();
          break;
        case 4:
          _instance.nameText = _reader.readBool();
          break;
        case 5:
          _instance.description = _reader.readBool();
          break;
        case 6:
          _instance.hasText = _reader.readBool();
          break;
        case 7:
          _instance.previewPictures = new PreviewPicturesFields();
          _reader.readMessage(
            _instance.previewPictures,
            PreviewPicturesFields.deserializeBinaryFromReader
          );
          break;
        case 8:
          _instance.totalPictures = _reader.readBool();
          break;
        case 9:
          _instance.descendantsCount = _reader.readBool();
          break;
        case 10:
          _instance.currentPicturesCount = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    ItemFields.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: ItemFields, _writer: BinaryWriter) {
    if (_instance.nameOnly) {
      _writer.writeBool(1, _instance.nameOnly);
    }
    if (_instance.nameDefault) {
      _writer.writeBool(2, _instance.nameDefault);
    }
    if (_instance.nameHtml) {
      _writer.writeBool(3, _instance.nameHtml);
    }
    if (_instance.nameText) {
      _writer.writeBool(4, _instance.nameText);
    }
    if (_instance.description) {
      _writer.writeBool(5, _instance.description);
    }
    if (_instance.hasText) {
      _writer.writeBool(6, _instance.hasText);
    }
    if (_instance.previewPictures) {
      _writer.writeMessage(
        7,
        _instance.previewPictures as any,
        PreviewPicturesFields.serializeBinaryToWriter
      );
    }
    if (_instance.totalPictures) {
      _writer.writeBool(8, _instance.totalPictures);
    }
    if (_instance.descendantsCount) {
      _writer.writeBool(9, _instance.descendantsCount);
    }
    if (_instance.currentPicturesCount) {
      _writer.writeBool(10, _instance.currentPicturesCount);
    }
  }

  private _nameOnly: boolean;
  private _nameDefault: boolean;
  private _nameHtml: boolean;
  private _nameText: boolean;
  private _description: boolean;
  private _hasText: boolean;
  private _previewPictures?: PreviewPicturesFields;
  private _totalPictures: boolean;
  private _descendantsCount: boolean;
  private _currentPicturesCount: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ItemFields to deeply clone from
   */
  constructor(_value?: RecursivePartial<ItemFields.AsObject>) {
    _value = _value || {};
    this.nameOnly = _value.nameOnly;
    this.nameDefault = _value.nameDefault;
    this.nameHtml = _value.nameHtml;
    this.nameText = _value.nameText;
    this.description = _value.description;
    this.hasText = _value.hasText;
    this.previewPictures = _value.previewPictures
      ? new PreviewPicturesFields(_value.previewPictures)
      : undefined;
    this.totalPictures = _value.totalPictures;
    this.descendantsCount = _value.descendantsCount;
    this.currentPicturesCount = _value.currentPicturesCount;
    ItemFields.refineValues(this);
  }
  get nameOnly(): boolean {
    return this._nameOnly;
  }
  set nameOnly(value: boolean) {
    this._nameOnly = value;
  }
  get nameDefault(): boolean {
    return this._nameDefault;
  }
  set nameDefault(value: boolean) {
    this._nameDefault = value;
  }
  get nameHtml(): boolean {
    return this._nameHtml;
  }
  set nameHtml(value: boolean) {
    this._nameHtml = value;
  }
  get nameText(): boolean {
    return this._nameText;
  }
  set nameText(value: boolean) {
    this._nameText = value;
  }
  get description(): boolean {
    return this._description;
  }
  set description(value: boolean) {
    this._description = value;
  }
  get hasText(): boolean {
    return this._hasText;
  }
  set hasText(value: boolean) {
    this._hasText = value;
  }
  get previewPictures(): PreviewPicturesFields | undefined {
    return this._previewPictures;
  }
  set previewPictures(value: PreviewPicturesFields | undefined) {
    this._previewPictures = value;
  }
  get totalPictures(): boolean {
    return this._totalPictures;
  }
  set totalPictures(value: boolean) {
    this._totalPictures = value;
  }
  get descendantsCount(): boolean {
    return this._descendantsCount;
  }
  set descendantsCount(value: boolean) {
    this._descendantsCount = value;
  }
  get currentPicturesCount(): boolean {
    return this._currentPicturesCount;
  }
  set currentPicturesCount(value: boolean) {
    this._currentPicturesCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ItemFields.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ItemFields.AsObject {
    return {
      nameOnly: this.nameOnly,
      nameDefault: this.nameDefault,
      nameHtml: this.nameHtml,
      nameText: this.nameText,
      description: this.description,
      hasText: this.hasText,
      previewPictures: this.previewPictures
        ? this.previewPictures.toObject()
        : undefined,
      totalPictures: this.totalPictures,
      descendantsCount: this.descendantsCount,
      currentPicturesCount: this.currentPicturesCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ItemFields.AsProtobufJSON {
    return {
      nameOnly: this.nameOnly,
      nameDefault: this.nameDefault,
      nameHtml: this.nameHtml,
      nameText: this.nameText,
      description: this.description,
      hasText: this.hasText,
      previewPictures: this.previewPictures
        ? this.previewPictures.toProtobufJSON(options)
        : null,
      totalPictures: this.totalPictures,
      descendantsCount: this.descendantsCount,
      currentPicturesCount: this.currentPicturesCount
    };
  }
}
export module ItemFields {
  /**
   * Standard JavaScript object representation for ItemFields
   */
  export interface AsObject {
    nameOnly: boolean;
    nameDefault: boolean;
    nameHtml: boolean;
    nameText: boolean;
    description: boolean;
    hasText: boolean;
    previewPictures?: PreviewPicturesFields.AsObject;
    totalPictures: boolean;
    descendantsCount: boolean;
    currentPicturesCount: boolean;
  }

  /**
   * Protobuf JSON representation for ItemFields
   */
  export interface AsProtobufJSON {
    nameOnly: boolean;
    nameDefault: boolean;
    nameHtml: boolean;
    nameText: boolean;
    description: boolean;
    hasText: boolean;
    previewPictures: PreviewPicturesFields.AsProtobufJSON | null;
    totalPictures: boolean;
    descendantsCount: boolean;
    currentPicturesCount: boolean;
  }
}

/**
 * Message implementation for goautowp.ItemRequest
 */
export class ItemRequest implements GrpcMessage {
  static id = 'goautowp.ItemRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ItemRequest();
    ItemRequest.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ItemRequest) {
    _instance.language = _instance.language || '';
    _instance.id = _instance.id || '0';
    _instance.fields = _instance.fields || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ItemRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.language = _reader.readString();
          break;
        case 2:
          _instance.id = _reader.readInt64String();
          break;
        case 3:
          _instance.fields = new ItemFields();
          _reader.readMessage(
            _instance.fields,
            ItemFields.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    ItemRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ItemRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.language) {
      _writer.writeString(1, _instance.language);
    }
    if (_instance.id) {
      _writer.writeInt64String(2, _instance.id);
    }
    if (_instance.fields) {
      _writer.writeMessage(
        3,
        _instance.fields as any,
        ItemFields.serializeBinaryToWriter
      );
    }
  }

  private _language: string;
  private _id: string;
  private _fields?: ItemFields;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ItemRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ItemRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    this.id = _value.id;
    this.fields = _value.fields ? new ItemFields(_value.fields) : undefined;
    ItemRequest.refineValues(this);
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get fields(): ItemFields | undefined {
    return this._fields;
  }
  set fields(value: ItemFields | undefined) {
    this._fields = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ItemRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ItemRequest.AsObject {
    return {
      language: this.language,
      id: this.id,
      fields: this.fields ? this.fields.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ItemRequest.AsProtobufJSON {
    return {
      language: this.language,
      id: this.id,
      fields: this.fields ? this.fields.toProtobufJSON(options) : null
    };
  }
}
export module ItemRequest {
  /**
   * Standard JavaScript object representation for ItemRequest
   */
  export interface AsObject {
    language: string;
    id: string;
    fields?: ItemFields.AsObject;
  }

  /**
   * Protobuf JSON representation for ItemRequest
   */
  export interface AsProtobufJSON {
    language: string;
    id: string;
    fields: ItemFields.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.ListItemsRequest
 */
export class ListItemsRequest implements GrpcMessage {
  static id = 'goautowp.ListItemsRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ListItemsRequest();
    ListItemsRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ListItemsRequest) {
    _instance.language = _instance.language || '';
    _instance.fields = _instance.fields || undefined;
    _instance.typeId = _instance.typeId || 0;
    _instance.descendantPictures = _instance.descendantPictures || undefined;
    _instance.previewPictures = _instance.previewPictures || undefined;
    _instance.limit = _instance.limit || 0;
    _instance.noParent = _instance.noParent || false;
    _instance.catname = _instance.catname || '';
    _instance.order = _instance.order || 0;
    _instance.name = _instance.name || '';
    _instance.page = _instance.page || 0;
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ListItemsRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.language = _reader.readString();
          break;
        case 2:
          _instance.fields = new ItemFields();
          _reader.readMessage(
            _instance.fields,
            ItemFields.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.typeId = _reader.readEnum();
          break;
        case 4:
          _instance.descendantPictures = new ItemPicturesRequest();
          _reader.readMessage(
            _instance.descendantPictures,
            ItemPicturesRequest.deserializeBinaryFromReader
          );
          break;
        case 5:
          _instance.previewPictures = new ItemPicturesRequest();
          _reader.readMessage(
            _instance.previewPictures,
            ItemPicturesRequest.deserializeBinaryFromReader
          );
          break;
        case 6:
          _instance.limit = _reader.readUint32();
          break;
        case 7:
          _instance.noParent = _reader.readBool();
          break;
        case 8:
          _instance.catname = _reader.readString();
          break;
        case 9:
          _instance.order = _reader.readEnum();
          break;
        case 10:
          _instance.name = _reader.readString();
          break;
        case 11:
          _instance.page = _reader.readUint32();
          break;
        case 12:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    ListItemsRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ListItemsRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.language) {
      _writer.writeString(1, _instance.language);
    }
    if (_instance.fields) {
      _writer.writeMessage(
        2,
        _instance.fields as any,
        ItemFields.serializeBinaryToWriter
      );
    }
    if (_instance.typeId) {
      _writer.writeEnum(3, _instance.typeId);
    }
    if (_instance.descendantPictures) {
      _writer.writeMessage(
        4,
        _instance.descendantPictures as any,
        ItemPicturesRequest.serializeBinaryToWriter
      );
    }
    if (_instance.previewPictures) {
      _writer.writeMessage(
        5,
        _instance.previewPictures as any,
        ItemPicturesRequest.serializeBinaryToWriter
      );
    }
    if (_instance.limit) {
      _writer.writeUint32(6, _instance.limit);
    }
    if (_instance.noParent) {
      _writer.writeBool(7, _instance.noParent);
    }
    if (_instance.catname) {
      _writer.writeString(8, _instance.catname);
    }
    if (_instance.order) {
      _writer.writeEnum(9, _instance.order);
    }
    if (_instance.name) {
      _writer.writeString(10, _instance.name);
    }
    if (_instance.page) {
      _writer.writeUint32(11, _instance.page);
    }
    if (_instance.id) {
      _writer.writeInt64String(12, _instance.id);
    }
  }

  private _language: string;
  private _fields?: ItemFields;
  private _typeId: ItemType;
  private _descendantPictures?: ItemPicturesRequest;
  private _previewPictures?: ItemPicturesRequest;
  private _limit: number;
  private _noParent: boolean;
  private _catname: string;
  private _order: ListItemsRequest.Order;
  private _name: string;
  private _page: number;
  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ListItemsRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ListItemsRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    this.fields = _value.fields ? new ItemFields(_value.fields) : undefined;
    this.typeId = _value.typeId;
    this.descendantPictures = _value.descendantPictures
      ? new ItemPicturesRequest(_value.descendantPictures)
      : undefined;
    this.previewPictures = _value.previewPictures
      ? new ItemPicturesRequest(_value.previewPictures)
      : undefined;
    this.limit = _value.limit;
    this.noParent = _value.noParent;
    this.catname = _value.catname;
    this.order = _value.order;
    this.name = _value.name;
    this.page = _value.page;
    this.id = _value.id;
    ListItemsRequest.refineValues(this);
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }
  get fields(): ItemFields | undefined {
    return this._fields;
  }
  set fields(value: ItemFields | undefined) {
    this._fields = value;
  }
  get typeId(): ItemType {
    return this._typeId;
  }
  set typeId(value: ItemType) {
    this._typeId = value;
  }
  get descendantPictures(): ItemPicturesRequest | undefined {
    return this._descendantPictures;
  }
  set descendantPictures(value: ItemPicturesRequest | undefined) {
    this._descendantPictures = value;
  }
  get previewPictures(): ItemPicturesRequest | undefined {
    return this._previewPictures;
  }
  set previewPictures(value: ItemPicturesRequest | undefined) {
    this._previewPictures = value;
  }
  get limit(): number {
    return this._limit;
  }
  set limit(value: number) {
    this._limit = value;
  }
  get noParent(): boolean {
    return this._noParent;
  }
  set noParent(value: boolean) {
    this._noParent = value;
  }
  get catname(): string {
    return this._catname;
  }
  set catname(value: string) {
    this._catname = value;
  }
  get order(): ListItemsRequest.Order {
    return this._order;
  }
  set order(value: ListItemsRequest.Order) {
    this._order = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get page(): number {
    return this._page;
  }
  set page(value: number) {
    this._page = value;
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ListItemsRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ListItemsRequest.AsObject {
    return {
      language: this.language,
      fields: this.fields ? this.fields.toObject() : undefined,
      typeId: this.typeId,
      descendantPictures: this.descendantPictures
        ? this.descendantPictures.toObject()
        : undefined,
      previewPictures: this.previewPictures
        ? this.previewPictures.toObject()
        : undefined,
      limit: this.limit,
      noParent: this.noParent,
      catname: this.catname,
      order: this.order,
      name: this.name,
      page: this.page,
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ListItemsRequest.AsProtobufJSON {
    return {
      language: this.language,
      fields: this.fields ? this.fields.toProtobufJSON(options) : null,
      typeId:
        ItemType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ],
      descendantPictures: this.descendantPictures
        ? this.descendantPictures.toProtobufJSON(options)
        : null,
      previewPictures: this.previewPictures
        ? this.previewPictures.toProtobufJSON(options)
        : null,
      limit: this.limit,
      noParent: this.noParent,
      catname: this.catname,
      order:
        ListItemsRequest.Order[
          this.order === null || this.order === undefined ? 0 : this.order
        ],
      name: this.name,
      page: this.page,
      id: this.id
    };
  }
}
export module ListItemsRequest {
  /**
   * Standard JavaScript object representation for ListItemsRequest
   */
  export interface AsObject {
    language: string;
    fields?: ItemFields.AsObject;
    typeId: ItemType;
    descendantPictures?: ItemPicturesRequest.AsObject;
    previewPictures?: ItemPicturesRequest.AsObject;
    limit: number;
    noParent: boolean;
    catname: string;
    order: ListItemsRequest.Order;
    name: string;
    page: number;
    id: string;
  }

  /**
   * Protobuf JSON representation for ListItemsRequest
   */
  export interface AsProtobufJSON {
    language: string;
    fields: ItemFields.AsProtobufJSON | null;
    typeId: string;
    descendantPictures: ItemPicturesRequest.AsProtobufJSON | null;
    previewPictures: ItemPicturesRequest.AsProtobufJSON | null;
    limit: number;
    noParent: boolean;
    catname: string;
    order: string;
    name: string;
    page: number;
    id: string;
  }
  export enum Order {
    DEFAULT = 0,
    NAME_NAT = 1,
    NAME = 2
  }
}

/**
 * Message implementation for goautowp.GetTreeRequest
 */
export class GetTreeRequest implements GrpcMessage {
  static id = 'goautowp.GetTreeRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetTreeRequest();
    GetTreeRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetTreeRequest) {
    _instance.id = _instance.id || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetTreeRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    GetTreeRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetTreeRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeString(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTreeRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTreeRequest.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    GetTreeRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetTreeRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetTreeRequest.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetTreeRequest.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module GetTreeRequest {
  /**
   * Standard JavaScript object representation for GetTreeRequest
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for GetTreeRequest
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.APITreeItem
 */
export class APITreeItem implements GrpcMessage {
  static id = 'goautowp.APITreeItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITreeItem();
    APITreeItem.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITreeItem) {
    _instance.id = _instance.id || '';
    _instance.name = _instance.name || '';
    _instance.childs = _instance.childs || [];
    _instance.type = _instance.type || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APITreeItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readString();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          const messageInitializer3 = new APITreeItem();
          _reader.readMessage(
            messageInitializer3,
            APITreeItem.deserializeBinaryFromReader
          );
          (_instance.childs = _instance.childs || []).push(messageInitializer3);
          break;
        case 4:
          _instance.type = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APITreeItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITreeItem,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeString(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.childs && _instance.childs.length) {
      _writer.writeRepeatedMessage(
        3,
        _instance.childs as any,
        APITreeItem.serializeBinaryToWriter
      );
    }
    if (_instance.type) {
      _writer.writeInt32(4, _instance.type);
    }
  }

  private _id: string;
  private _name: string;
  private _childs?: APITreeItem[];
  private _type: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITreeItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITreeItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.childs = (_value.childs || []).map(m => new APITreeItem(m));
    this.type = _value.type;
    APITreeItem.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get childs(): APITreeItem[] | undefined {
    return this._childs;
  }
  set childs(value: APITreeItem[] | undefined) {
    this._childs = value;
  }
  get type(): number {
    return this._type;
  }
  set type(value: number) {
    this._type = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITreeItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITreeItem.AsObject {
    return {
      id: this.id,
      name: this.name,
      childs: (this.childs || []).map(m => m.toObject()),
      type: this.type
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APITreeItem.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      childs: (this.childs || []).map(m => m.toProtobufJSON(options)),
      type: this.type
    };
  }
}
export module APITreeItem {
  /**
   * Standard JavaScript object representation for APITreeItem
   */
  export interface AsObject {
    id: string;
    name: string;
    childs?: APITreeItem.AsObject[];
    type: number;
  }

  /**
   * Protobuf JSON representation for APITreeItem
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    childs: APITreeItem.AsProtobufJSON[] | null;
    type: number;
  }
}

/**
 * Message implementation for goautowp.APIItem
 */
export class APIItem implements GrpcMessage {
  static id = 'goautowp.APIItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIItem();
    APIItem.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIItem) {
    _instance.id = _instance.id || '0';
    _instance.catname = _instance.catname || '';
    _instance.nameOnly = _instance.nameOnly || '';
    _instance.nameText = _instance.nameText || '';
    _instance.nameHtml = _instance.nameHtml || '';
    _instance.descendantsCount = _instance.descendantsCount || 0;
    _instance.engineItemId = _instance.engineItemId || '0';
    _instance.itemTypeId = _instance.itemTypeId || 0;
    _instance.description = _instance.description || '';
    _instance.isConcept = _instance.isConcept || false;
    _instance.isConceptInherit = _instance.isConceptInherit || false;
    _instance.specId = _instance.specId || '0';
    _instance.fullText = _instance.fullText || '';
    _instance.currentPicturesCount = _instance.currentPicturesCount || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIItem,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.catname = _reader.readString();
          break;
        case 3:
          _instance.nameOnly = _reader.readString();
          break;
        case 4:
          _instance.nameText = _reader.readString();
          break;
        case 5:
          _instance.nameHtml = _reader.readString();
          break;
        case 6:
          _instance.descendantsCount = _reader.readInt32();
          break;
        case 7:
          _instance.engineItemId = _reader.readInt64String();
          break;
        case 8:
          _instance.itemTypeId = _reader.readEnum();
          break;
        case 9:
          _instance.description = _reader.readString();
          break;
        case 10:
          _instance.isConcept = _reader.readBool();
          break;
        case 11:
          _instance.isConceptInherit = _reader.readBool();
          break;
        case 12:
          _instance.specId = _reader.readInt64String();
          break;
        case 13:
          _instance.fullText = _reader.readString();
          break;
        case 14:
          _instance.currentPicturesCount = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APIItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: APIItem, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.catname) {
      _writer.writeString(2, _instance.catname);
    }
    if (_instance.nameOnly) {
      _writer.writeString(3, _instance.nameOnly);
    }
    if (_instance.nameText) {
      _writer.writeString(4, _instance.nameText);
    }
    if (_instance.nameHtml) {
      _writer.writeString(5, _instance.nameHtml);
    }
    if (_instance.descendantsCount) {
      _writer.writeInt32(6, _instance.descendantsCount);
    }
    if (_instance.engineItemId) {
      _writer.writeInt64String(7, _instance.engineItemId);
    }
    if (_instance.itemTypeId) {
      _writer.writeEnum(8, _instance.itemTypeId);
    }
    if (_instance.description) {
      _writer.writeString(9, _instance.description);
    }
    if (_instance.isConcept) {
      _writer.writeBool(10, _instance.isConcept);
    }
    if (_instance.isConceptInherit) {
      _writer.writeBool(11, _instance.isConceptInherit);
    }
    if (_instance.specId) {
      _writer.writeInt64String(12, _instance.specId);
    }
    if (_instance.fullText) {
      _writer.writeString(13, _instance.fullText);
    }
    if (_instance.currentPicturesCount) {
      _writer.writeInt32(14, _instance.currentPicturesCount);
    }
  }

  private _id: string;
  private _catname: string;
  private _nameOnly: string;
  private _nameText: string;
  private _nameHtml: string;
  private _descendantsCount: number;
  private _engineItemId: string;
  private _itemTypeId: ItemType;
  private _description: string;
  private _isConcept: boolean;
  private _isConceptInherit: boolean;
  private _specId: string;
  private _fullText: string;
  private _currentPicturesCount: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.catname = _value.catname;
    this.nameOnly = _value.nameOnly;
    this.nameText = _value.nameText;
    this.nameHtml = _value.nameHtml;
    this.descendantsCount = _value.descendantsCount;
    this.engineItemId = _value.engineItemId;
    this.itemTypeId = _value.itemTypeId;
    this.description = _value.description;
    this.isConcept = _value.isConcept;
    this.isConceptInherit = _value.isConceptInherit;
    this.specId = _value.specId;
    this.fullText = _value.fullText;
    this.currentPicturesCount = _value.currentPicturesCount;
    APIItem.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get catname(): string {
    return this._catname;
  }
  set catname(value: string) {
    this._catname = value;
  }
  get nameOnly(): string {
    return this._nameOnly;
  }
  set nameOnly(value: string) {
    this._nameOnly = value;
  }
  get nameText(): string {
    return this._nameText;
  }
  set nameText(value: string) {
    this._nameText = value;
  }
  get nameHtml(): string {
    return this._nameHtml;
  }
  set nameHtml(value: string) {
    this._nameHtml = value;
  }
  get descendantsCount(): number {
    return this._descendantsCount;
  }
  set descendantsCount(value: number) {
    this._descendantsCount = value;
  }
  get engineItemId(): string {
    return this._engineItemId;
  }
  set engineItemId(value: string) {
    this._engineItemId = value;
  }
  get itemTypeId(): ItemType {
    return this._itemTypeId;
  }
  set itemTypeId(value: ItemType) {
    this._itemTypeId = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }
  get isConcept(): boolean {
    return this._isConcept;
  }
  set isConcept(value: boolean) {
    this._isConcept = value;
  }
  get isConceptInherit(): boolean {
    return this._isConceptInherit;
  }
  set isConceptInherit(value: boolean) {
    this._isConceptInherit = value;
  }
  get specId(): string {
    return this._specId;
  }
  set specId(value: string) {
    this._specId = value;
  }
  get fullText(): string {
    return this._fullText;
  }
  set fullText(value: string) {
    this._fullText = value;
  }
  get currentPicturesCount(): number {
    return this._currentPicturesCount;
  }
  set currentPicturesCount(value: number) {
    this._currentPicturesCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIItem.AsObject {
    return {
      id: this.id,
      catname: this.catname,
      nameOnly: this.nameOnly,
      nameText: this.nameText,
      nameHtml: this.nameHtml,
      descendantsCount: this.descendantsCount,
      engineItemId: this.engineItemId,
      itemTypeId: this.itemTypeId,
      description: this.description,
      isConcept: this.isConcept,
      isConceptInherit: this.isConceptInherit,
      specId: this.specId,
      fullText: this.fullText,
      currentPicturesCount: this.currentPicturesCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIItem.AsProtobufJSON {
    return {
      id: this.id,
      catname: this.catname,
      nameOnly: this.nameOnly,
      nameText: this.nameText,
      nameHtml: this.nameHtml,
      descendantsCount: this.descendantsCount,
      engineItemId: this.engineItemId,
      itemTypeId:
        ItemType[
          this.itemTypeId === null || this.itemTypeId === undefined
            ? 0
            : this.itemTypeId
        ],
      description: this.description,
      isConcept: this.isConcept,
      isConceptInherit: this.isConceptInherit,
      specId: this.specId,
      fullText: this.fullText,
      currentPicturesCount: this.currentPicturesCount
    };
  }
}
export module APIItem {
  /**
   * Standard JavaScript object representation for APIItem
   */
  export interface AsObject {
    id: string;
    catname: string;
    nameOnly: string;
    nameText: string;
    nameHtml: string;
    descendantsCount: number;
    engineItemId: string;
    itemTypeId: ItemType;
    description: string;
    isConcept: boolean;
    isConceptInherit: boolean;
    specId: string;
    fullText: string;
    currentPicturesCount: number;
  }

  /**
   * Protobuf JSON representation for APIItem
   */
  export interface AsProtobufJSON {
    id: string;
    catname: string;
    nameOnly: string;
    nameText: string;
    nameHtml: string;
    descendantsCount: number;
    engineItemId: string;
    itemTypeId: string;
    description: string;
    isConcept: boolean;
    isConceptInherit: boolean;
    specId: string;
    fullText: string;
    currentPicturesCount: number;
  }
}

/**
 * Message implementation for goautowp.APIItemList
 */
export class APIItemList implements GrpcMessage {
  static id = 'goautowp.APIItemList';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIItemList();
    APIItemList.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIItemList) {
    _instance.items = _instance.items || [];
    _instance.paginator = _instance.paginator || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIItemList,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APIItem();
          _reader.readMessage(
            messageInitializer1,
            APIItem.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        case 2:
          _instance.paginator = new Pages();
          _reader.readMessage(
            _instance.paginator,
            Pages.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    APIItemList.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIItemList,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APIItem.serializeBinaryToWriter
      );
    }
    if (_instance.paginator) {
      _writer.writeMessage(
        2,
        _instance.paginator as any,
        Pages.serializeBinaryToWriter
      );
    }
  }

  private _items?: APIItem[];
  private _paginator?: Pages;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItemList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItemList.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APIItem(m));
    this.paginator = _value.paginator ? new Pages(_value.paginator) : undefined;
    APIItemList.refineValues(this);
  }
  get items(): APIItem[] | undefined {
    return this._items;
  }
  set items(value: APIItem[] | undefined) {
    this._items = value;
  }
  get paginator(): Pages | undefined {
    return this._paginator;
  }
  set paginator(value: Pages | undefined) {
    this._paginator = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIItemList.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIItemList.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject()),
      paginator: this.paginator ? this.paginator.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIItemList.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options)),
      paginator: this.paginator ? this.paginator.toProtobufJSON(options) : null
    };
  }
}
export module APIItemList {
  /**
   * Standard JavaScript object representation for APIItemList
   */
  export interface AsObject {
    items?: APIItem.AsObject[];
    paginator?: Pages.AsObject;
  }

  /**
   * Protobuf JSON representation for APIItemList
   */
  export interface AsProtobufJSON {
    items: APIItem.AsProtobufJSON[] | null;
    paginator: Pages.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.CommentsSubscribeRequest
 */
export class CommentsSubscribeRequest implements GrpcMessage {
  static id = 'goautowp.CommentsSubscribeRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentsSubscribeRequest();
    CommentsSubscribeRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentsSubscribeRequest) {
    _instance.itemId = _instance.itemId || '0';
    _instance.typeId = _instance.typeId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentsSubscribeRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.typeId = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    CommentsSubscribeRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentsSubscribeRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.typeId) {
      _writer.writeEnum(2, _instance.typeId);
    }
  }

  private _itemId: string;
  private _typeId: CommentsType;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentsSubscribeRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentsSubscribeRequest.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.typeId = _value.typeId;
    CommentsSubscribeRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get typeId(): CommentsType {
    return this._typeId;
  }
  set typeId(value: CommentsType) {
    this._typeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentsSubscribeRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentsSubscribeRequest.AsObject {
    return {
      itemId: this.itemId,
      typeId: this.typeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentsSubscribeRequest.AsProtobufJSON {
    return {
      itemId: this.itemId,
      typeId:
        CommentsType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ]
    };
  }
}
export module CommentsSubscribeRequest {
  /**
   * Standard JavaScript object representation for CommentsSubscribeRequest
   */
  export interface AsObject {
    itemId: string;
    typeId: CommentsType;
  }

  /**
   * Protobuf JSON representation for CommentsSubscribeRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
    typeId: string;
  }
}

/**
 * Message implementation for goautowp.CommentsUnSubscribeRequest
 */
export class CommentsUnSubscribeRequest implements GrpcMessage {
  static id = 'goautowp.CommentsUnSubscribeRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentsUnSubscribeRequest();
    CommentsUnSubscribeRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentsUnSubscribeRequest) {
    _instance.itemId = _instance.itemId || '0';
    _instance.typeId = _instance.typeId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentsUnSubscribeRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.typeId = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    CommentsUnSubscribeRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentsUnSubscribeRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.typeId) {
      _writer.writeEnum(2, _instance.typeId);
    }
  }

  private _itemId: string;
  private _typeId: CommentsType;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentsUnSubscribeRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentsUnSubscribeRequest.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.typeId = _value.typeId;
    CommentsUnSubscribeRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get typeId(): CommentsType {
    return this._typeId;
  }
  set typeId(value: CommentsType) {
    this._typeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentsUnSubscribeRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentsUnSubscribeRequest.AsObject {
    return {
      itemId: this.itemId,
      typeId: this.typeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentsUnSubscribeRequest.AsProtobufJSON {
    return {
      itemId: this.itemId,
      typeId:
        CommentsType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ]
    };
  }
}
export module CommentsUnSubscribeRequest {
  /**
   * Standard JavaScript object representation for CommentsUnSubscribeRequest
   */
  export interface AsObject {
    itemId: string;
    typeId: CommentsType;
  }

  /**
   * Protobuf JSON representation for CommentsUnSubscribeRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
    typeId: string;
  }
}

/**
 * Message implementation for goautowp.GetCommentVotesRequest
 */
export class GetCommentVotesRequest implements GrpcMessage {
  static id = 'goautowp.GetCommentVotesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetCommentVotesRequest();
    GetCommentVotesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetCommentVotesRequest) {
    _instance.commentId = _instance.commentId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetCommentVotesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.commentId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    GetCommentVotesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetCommentVotesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.commentId) {
      _writer.writeInt64String(1, _instance.commentId);
    }
  }

  private _commentId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetCommentVotesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetCommentVotesRequest.AsObject>) {
    _value = _value || {};
    this.commentId = _value.commentId;
    GetCommentVotesRequest.refineValues(this);
  }
  get commentId(): string {
    return this._commentId;
  }
  set commentId(value: string) {
    this._commentId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetCommentVotesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetCommentVotesRequest.AsObject {
    return {
      commentId: this.commentId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetCommentVotesRequest.AsProtobufJSON {
    return {
      commentId: this.commentId
    };
  }
}
export module GetCommentVotesRequest {
  /**
   * Standard JavaScript object representation for GetCommentVotesRequest
   */
  export interface AsObject {
    commentId: string;
  }

  /**
   * Protobuf JSON representation for GetCommentVotesRequest
   */
  export interface AsProtobufJSON {
    commentId: string;
  }
}

/**
 * Message implementation for goautowp.CommentsViewRequest
 */
export class CommentsViewRequest implements GrpcMessage {
  static id = 'goautowp.CommentsViewRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentsViewRequest();
    CommentsViewRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentsViewRequest) {
    _instance.itemId = _instance.itemId || '0';
    _instance.typeId = _instance.typeId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentsViewRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.typeId = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    CommentsViewRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentsViewRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.typeId) {
      _writer.writeEnum(2, _instance.typeId);
    }
  }

  private _itemId: string;
  private _typeId: CommentsType;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentsViewRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentsViewRequest.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.typeId = _value.typeId;
    CommentsViewRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get typeId(): CommentsType {
    return this._typeId;
  }
  set typeId(value: CommentsType) {
    this._typeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentsViewRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentsViewRequest.AsObject {
    return {
      itemId: this.itemId,
      typeId: this.typeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentsViewRequest.AsProtobufJSON {
    return {
      itemId: this.itemId,
      typeId:
        CommentsType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ]
    };
  }
}
export module CommentsViewRequest {
  /**
   * Standard JavaScript object representation for CommentsViewRequest
   */
  export interface AsObject {
    itemId: string;
    typeId: CommentsType;
  }

  /**
   * Protobuf JSON representation for CommentsViewRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
    typeId: string;
  }
}

/**
 * Message implementation for goautowp.CommentsSetDeletedRequest
 */
export class CommentsSetDeletedRequest implements GrpcMessage {
  static id = 'goautowp.CommentsSetDeletedRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentsSetDeletedRequest();
    CommentsSetDeletedRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentsSetDeletedRequest) {
    _instance.commentId = _instance.commentId || '0';
    _instance.deleted = _instance.deleted || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentsSetDeletedRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.commentId = _reader.readInt64String();
          break;
        case 2:
          _instance.deleted = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    CommentsSetDeletedRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentsSetDeletedRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.commentId) {
      _writer.writeInt64String(1, _instance.commentId);
    }
    if (_instance.deleted) {
      _writer.writeBool(2, _instance.deleted);
    }
  }

  private _commentId: string;
  private _deleted: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentsSetDeletedRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentsSetDeletedRequest.AsObject>) {
    _value = _value || {};
    this.commentId = _value.commentId;
    this.deleted = _value.deleted;
    CommentsSetDeletedRequest.refineValues(this);
  }
  get commentId(): string {
    return this._commentId;
  }
  set commentId(value: string) {
    this._commentId = value;
  }
  get deleted(): boolean {
    return this._deleted;
  }
  set deleted(value: boolean) {
    this._deleted = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentsSetDeletedRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentsSetDeletedRequest.AsObject {
    return {
      commentId: this.commentId,
      deleted: this.deleted
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentsSetDeletedRequest.AsProtobufJSON {
    return {
      commentId: this.commentId,
      deleted: this.deleted
    };
  }
}
export module CommentsSetDeletedRequest {
  /**
   * Standard JavaScript object representation for CommentsSetDeletedRequest
   */
  export interface AsObject {
    commentId: string;
    deleted: boolean;
  }

  /**
   * Protobuf JSON representation for CommentsSetDeletedRequest
   */
  export interface AsProtobufJSON {
    commentId: string;
    deleted: boolean;
  }
}

/**
 * Message implementation for goautowp.CommentsMoveCommentRequest
 */
export class CommentsMoveCommentRequest implements GrpcMessage {
  static id = 'goautowp.CommentsMoveCommentRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentsMoveCommentRequest();
    CommentsMoveCommentRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentsMoveCommentRequest) {
    _instance.commentId = _instance.commentId || '0';
    _instance.itemId = _instance.itemId || '0';
    _instance.typeId = _instance.typeId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentsMoveCommentRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.commentId = _reader.readInt64String();
          break;
        case 2:
          _instance.itemId = _reader.readInt64String();
          break;
        case 3:
          _instance.typeId = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    CommentsMoveCommentRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentsMoveCommentRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.commentId) {
      _writer.writeInt64String(1, _instance.commentId);
    }
    if (_instance.itemId) {
      _writer.writeInt64String(2, _instance.itemId);
    }
    if (_instance.typeId) {
      _writer.writeEnum(3, _instance.typeId);
    }
  }

  private _commentId: string;
  private _itemId: string;
  private _typeId: CommentsType;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentsMoveCommentRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentsMoveCommentRequest.AsObject>) {
    _value = _value || {};
    this.commentId = _value.commentId;
    this.itemId = _value.itemId;
    this.typeId = _value.typeId;
    CommentsMoveCommentRequest.refineValues(this);
  }
  get commentId(): string {
    return this._commentId;
  }
  set commentId(value: string) {
    this._commentId = value;
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get typeId(): CommentsType {
    return this._typeId;
  }
  set typeId(value: CommentsType) {
    this._typeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentsMoveCommentRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentsMoveCommentRequest.AsObject {
    return {
      commentId: this.commentId,
      itemId: this.itemId,
      typeId: this.typeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentsMoveCommentRequest.AsProtobufJSON {
    return {
      commentId: this.commentId,
      itemId: this.itemId,
      typeId:
        CommentsType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ]
    };
  }
}
export module CommentsMoveCommentRequest {
  /**
   * Standard JavaScript object representation for CommentsMoveCommentRequest
   */
  export interface AsObject {
    commentId: string;
    itemId: string;
    typeId: CommentsType;
  }

  /**
   * Protobuf JSON representation for CommentsMoveCommentRequest
   */
  export interface AsProtobufJSON {
    commentId: string;
    itemId: string;
    typeId: string;
  }
}

/**
 * Message implementation for goautowp.CommentsVoteCommentRequest
 */
export class CommentsVoteCommentRequest implements GrpcMessage {
  static id = 'goautowp.CommentsVoteCommentRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentsVoteCommentRequest();
    CommentsVoteCommentRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentsVoteCommentRequest) {
    _instance.commentId = _instance.commentId || '0';
    _instance.vote = _instance.vote || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentsVoteCommentRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.commentId = _reader.readInt64String();
          break;
        case 2:
          _instance.vote = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    CommentsVoteCommentRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentsVoteCommentRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.commentId) {
      _writer.writeInt64String(1, _instance.commentId);
    }
    if (_instance.vote) {
      _writer.writeInt32(2, _instance.vote);
    }
  }

  private _commentId: string;
  private _vote: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentsVoteCommentRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentsVoteCommentRequest.AsObject>) {
    _value = _value || {};
    this.commentId = _value.commentId;
    this.vote = _value.vote;
    CommentsVoteCommentRequest.refineValues(this);
  }
  get commentId(): string {
    return this._commentId;
  }
  set commentId(value: string) {
    this._commentId = value;
  }
  get vote(): number {
    return this._vote;
  }
  set vote(value: number) {
    this._vote = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentsVoteCommentRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentsVoteCommentRequest.AsObject {
    return {
      commentId: this.commentId,
      vote: this.vote
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentsVoteCommentRequest.AsProtobufJSON {
    return {
      commentId: this.commentId,
      vote: this.vote
    };
  }
}
export module CommentsVoteCommentRequest {
  /**
   * Standard JavaScript object representation for CommentsVoteCommentRequest
   */
  export interface AsObject {
    commentId: string;
    vote: number;
  }

  /**
   * Protobuf JSON representation for CommentsVoteCommentRequest
   */
  export interface AsProtobufJSON {
    commentId: string;
    vote: number;
  }
}

/**
 * Message implementation for goautowp.CommentsVoteCommentResponse
 */
export class CommentsVoteCommentResponse implements GrpcMessage {
  static id = 'goautowp.CommentsVoteCommentResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentsVoteCommentResponse();
    CommentsVoteCommentResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentsVoteCommentResponse) {
    _instance.votes = _instance.votes || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentsVoteCommentResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.votes = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    CommentsVoteCommentResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentsVoteCommentResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.votes) {
      _writer.writeInt32(1, _instance.votes);
    }
  }

  private _votes: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentsVoteCommentResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentsVoteCommentResponse.AsObject>) {
    _value = _value || {};
    this.votes = _value.votes;
    CommentsVoteCommentResponse.refineValues(this);
  }
  get votes(): number {
    return this._votes;
  }
  set votes(value: number) {
    this._votes = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentsVoteCommentResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentsVoteCommentResponse.AsObject {
    return {
      votes: this.votes
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentsVoteCommentResponse.AsProtobufJSON {
    return {
      votes: this.votes
    };
  }
}
export module CommentsVoteCommentResponse {
  /**
   * Standard JavaScript object representation for CommentsVoteCommentResponse
   */
  export interface AsObject {
    votes: number;
  }

  /**
   * Protobuf JSON representation for CommentsVoteCommentResponse
   */
  export interface AsProtobufJSON {
    votes: number;
  }
}

/**
 * Message implementation for goautowp.MapGetPointsRequest
 */
export class MapGetPointsRequest implements GrpcMessage {
  static id = 'goautowp.MapGetPointsRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MapGetPointsRequest();
    MapGetPointsRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MapGetPointsRequest) {
    _instance.pointsOnly = _instance.pointsOnly || false;
    _instance.bounds = _instance.bounds || '';
    _instance.language = _instance.language || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MapGetPointsRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.pointsOnly = _reader.readBool();
          break;
        case 2:
          _instance.bounds = _reader.readString();
          break;
        case 3:
          _instance.language = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    MapGetPointsRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: MapGetPointsRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.pointsOnly) {
      _writer.writeBool(1, _instance.pointsOnly);
    }
    if (_instance.bounds) {
      _writer.writeString(2, _instance.bounds);
    }
    if (_instance.language) {
      _writer.writeString(3, _instance.language);
    }
  }

  private _pointsOnly: boolean;
  private _bounds: string;
  private _language: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MapGetPointsRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<MapGetPointsRequest.AsObject>) {
    _value = _value || {};
    this.pointsOnly = _value.pointsOnly;
    this.bounds = _value.bounds;
    this.language = _value.language;
    MapGetPointsRequest.refineValues(this);
  }
  get pointsOnly(): boolean {
    return this._pointsOnly;
  }
  set pointsOnly(value: boolean) {
    this._pointsOnly = value;
  }
  get bounds(): string {
    return this._bounds;
  }
  set bounds(value: string) {
    this._bounds = value;
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MapGetPointsRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MapGetPointsRequest.AsObject {
    return {
      pointsOnly: this.pointsOnly,
      bounds: this.bounds,
      language: this.language
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MapGetPointsRequest.AsProtobufJSON {
    return {
      pointsOnly: this.pointsOnly,
      bounds: this.bounds,
      language: this.language
    };
  }
}
export module MapGetPointsRequest {
  /**
   * Standard JavaScript object representation for MapGetPointsRequest
   */
  export interface AsObject {
    pointsOnly: boolean;
    bounds: string;
    language: string;
  }

  /**
   * Protobuf JSON representation for MapGetPointsRequest
   */
  export interface AsProtobufJSON {
    pointsOnly: boolean;
    bounds: string;
    language: string;
  }
}

/**
 * Message implementation for goautowp.Point
 */
export class Point implements GrpcMessage {
  static id = 'goautowp.Point';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Point();
    Point.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Point) {
    _instance.lat = _instance.lat || 0;
    _instance.lng = _instance.lng || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Point, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.lat = _reader.readDouble();
          break;
        case 2:
          _instance.lng = _reader.readDouble();
          break;
        default:
          _reader.skipField();
      }
    }

    Point.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Point, _writer: BinaryWriter) {
    if (_instance.lat) {
      _writer.writeDouble(1, _instance.lat);
    }
    if (_instance.lng) {
      _writer.writeDouble(2, _instance.lng);
    }
  }

  private _lat: number;
  private _lng: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Point to deeply clone from
   */
  constructor(_value?: RecursivePartial<Point.AsObject>) {
    _value = _value || {};
    this.lat = _value.lat;
    this.lng = _value.lng;
    Point.refineValues(this);
  }
  get lat(): number {
    return this._lat;
  }
  set lat(value: number) {
    this._lat = value;
  }
  get lng(): number {
    return this._lng;
  }
  set lng(value: number) {
    this._lng = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Point.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Point.AsObject {
    return {
      lat: this.lat,
      lng: this.lng
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Point.AsProtobufJSON {
    return {
      lat: this.lat,
      lng: this.lng
    };
  }
}
export module Point {
  /**
   * Standard JavaScript object representation for Point
   */
  export interface AsObject {
    lat: number;
    lng: number;
  }

  /**
   * Protobuf JSON representation for Point
   */
  export interface AsProtobufJSON {
    lat: number;
    lng: number;
  }
}

/**
 * Message implementation for goautowp.MapPoints
 */
export class MapPoints implements GrpcMessage {
  static id = 'goautowp.MapPoints';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MapPoints();
    MapPoints.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MapPoints) {
    _instance.points = _instance.points || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MapPoints,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new MapPoint();
          _reader.readMessage(
            messageInitializer1,
            MapPoint.deserializeBinaryFromReader
          );
          (_instance.points = _instance.points || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    MapPoints.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: MapPoints, _writer: BinaryWriter) {
    if (_instance.points && _instance.points.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.points as any,
        MapPoint.serializeBinaryToWriter
      );
    }
  }

  private _points?: MapPoint[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MapPoints to deeply clone from
   */
  constructor(_value?: RecursivePartial<MapPoints.AsObject>) {
    _value = _value || {};
    this.points = (_value.points || []).map(m => new MapPoint(m));
    MapPoints.refineValues(this);
  }
  get points(): MapPoint[] | undefined {
    return this._points;
  }
  set points(value: MapPoint[] | undefined) {
    this._points = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MapPoints.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MapPoints.AsObject {
    return {
      points: (this.points || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MapPoints.AsProtobufJSON {
    return {
      points: (this.points || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module MapPoints {
  /**
   * Standard JavaScript object representation for MapPoints
   */
  export interface AsObject {
    points?: MapPoint.AsObject[];
  }

  /**
   * Protobuf JSON representation for MapPoints
   */
  export interface AsProtobufJSON {
    points: MapPoint.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.MapPoint
 */
export class MapPoint implements GrpcMessage {
  static id = 'goautowp.MapPoint';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MapPoint();
    MapPoint.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MapPoint) {
    _instance.location = _instance.location || undefined;
    _instance.id = _instance.id || '';
    _instance.name = _instance.name || '';
    _instance.url = _instance.url || [];
    _instance.image = _instance.image || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MapPoint,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.location = new Point();
          _reader.readMessage(
            _instance.location,
            Point.deserializeBinaryFromReader
          );
          break;
        case 2:
          _instance.id = _reader.readString();
          break;
        case 3:
          _instance.name = _reader.readString();
          break;
        case 4:
          (_instance.url = _instance.url || []).push(_reader.readString());
          break;
        case 5:
          _instance.image = new APIImage();
          _reader.readMessage(
            _instance.image,
            APIImage.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    MapPoint.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: MapPoint, _writer: BinaryWriter) {
    if (_instance.location) {
      _writer.writeMessage(
        1,
        _instance.location as any,
        Point.serializeBinaryToWriter
      );
    }
    if (_instance.id) {
      _writer.writeString(2, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(3, _instance.name);
    }
    if (_instance.url && _instance.url.length) {
      _writer.writeRepeatedString(4, _instance.url);
    }
    if (_instance.image) {
      _writer.writeMessage(
        5,
        _instance.image as any,
        APIImage.serializeBinaryToWriter
      );
    }
  }

  private _location?: Point;
  private _id: string;
  private _name: string;
  private _url: string[];
  private _image?: APIImage;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MapPoint to deeply clone from
   */
  constructor(_value?: RecursivePartial<MapPoint.AsObject>) {
    _value = _value || {};
    this.location = _value.location ? new Point(_value.location) : undefined;
    this.id = _value.id;
    this.name = _value.name;
    this.url = (_value.url || []).slice();
    this.image = _value.image ? new APIImage(_value.image) : undefined;
    MapPoint.refineValues(this);
  }
  get location(): Point | undefined {
    return this._location;
  }
  set location(value: Point | undefined) {
    this._location = value;
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get url(): string[] {
    return this._url;
  }
  set url(value: string[]) {
    this._url = value;
  }
  get image(): APIImage | undefined {
    return this._image;
  }
  set image(value: APIImage | undefined) {
    this._image = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MapPoint.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MapPoint.AsObject {
    return {
      location: this.location ? this.location.toObject() : undefined,
      id: this.id,
      name: this.name,
      url: (this.url || []).slice(),
      image: this.image ? this.image.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MapPoint.AsProtobufJSON {
    return {
      location: this.location ? this.location.toProtobufJSON(options) : null,
      id: this.id,
      name: this.name,
      url: (this.url || []).slice(),
      image: this.image ? this.image.toProtobufJSON(options) : null
    };
  }
}
export module MapPoint {
  /**
   * Standard JavaScript object representation for MapPoint
   */
  export interface AsObject {
    location?: Point.AsObject;
    id: string;
    name: string;
    url: string[];
    image?: APIImage.AsObject;
  }

  /**
   * Protobuf JSON representation for MapPoint
   */
  export interface AsProtobufJSON {
    location: Point.AsProtobufJSON | null;
    id: string;
    name: string;
    url: string[];
    image: APIImage.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.PicturesViewRequest
 */
export class PicturesViewRequest implements GrpcMessage {
  static id = 'goautowp.PicturesViewRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PicturesViewRequest();
    PicturesViewRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PicturesViewRequest) {
    _instance.pictureId = _instance.pictureId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PicturesViewRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.pictureId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    PicturesViewRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PicturesViewRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.pictureId) {
      _writer.writeInt64String(1, _instance.pictureId);
    }
  }

  private _pictureId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PicturesViewRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<PicturesViewRequest.AsObject>) {
    _value = _value || {};
    this.pictureId = _value.pictureId;
    PicturesViewRequest.refineValues(this);
  }
  get pictureId(): string {
    return this._pictureId;
  }
  set pictureId(value: string) {
    this._pictureId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PicturesViewRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PicturesViewRequest.AsObject {
    return {
      pictureId: this.pictureId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PicturesViewRequest.AsProtobufJSON {
    return {
      pictureId: this.pictureId
    };
  }
}
export module PicturesViewRequest {
  /**
   * Standard JavaScript object representation for PicturesViewRequest
   */
  export interface AsObject {
    pictureId: string;
  }

  /**
   * Protobuf JSON representation for PicturesViewRequest
   */
  export interface AsProtobufJSON {
    pictureId: string;
  }
}

/**
 * Message implementation for goautowp.PicturesVoteRequest
 */
export class PicturesVoteRequest implements GrpcMessage {
  static id = 'goautowp.PicturesVoteRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PicturesVoteRequest();
    PicturesVoteRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PicturesVoteRequest) {
    _instance.pictureId = _instance.pictureId || '0';
    _instance.value = _instance.value || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PicturesVoteRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.pictureId = _reader.readInt64String();
          break;
        case 2:
          _instance.value = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    PicturesVoteRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PicturesVoteRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.pictureId) {
      _writer.writeInt64String(1, _instance.pictureId);
    }
    if (_instance.value) {
      _writer.writeInt32(2, _instance.value);
    }
  }

  private _pictureId: string;
  private _value: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PicturesVoteRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<PicturesVoteRequest.AsObject>) {
    _value = _value || {};
    this.pictureId = _value.pictureId;
    this.value = _value.value;
    PicturesVoteRequest.refineValues(this);
  }
  get pictureId(): string {
    return this._pictureId;
  }
  set pictureId(value: string) {
    this._pictureId = value;
  }
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    this._value = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PicturesVoteRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PicturesVoteRequest.AsObject {
    return {
      pictureId: this.pictureId,
      value: this.value
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PicturesVoteRequest.AsProtobufJSON {
    return {
      pictureId: this.pictureId,
      value: this.value
    };
  }
}
export module PicturesVoteRequest {
  /**
   * Standard JavaScript object representation for PicturesVoteRequest
   */
  export interface AsObject {
    pictureId: string;
    value: number;
  }

  /**
   * Protobuf JSON representation for PicturesVoteRequest
   */
  export interface AsProtobufJSON {
    pictureId: string;
    value: number;
  }
}

/**
 * Message implementation for goautowp.PicturesVoteSummary
 */
export class PicturesVoteSummary implements GrpcMessage {
  static id = 'goautowp.PicturesVoteSummary';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new PicturesVoteSummary();
    PicturesVoteSummary.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: PicturesVoteSummary) {
    _instance.value = _instance.value || 0;
    _instance.positive = _instance.positive || 0;
    _instance.negative = _instance.negative || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: PicturesVoteSummary,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.value = _reader.readInt32();
          break;
        case 2:
          _instance.positive = _reader.readInt32();
          break;
        case 3:
          _instance.negative = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    PicturesVoteSummary.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: PicturesVoteSummary,
    _writer: BinaryWriter
  ) {
    if (_instance.value) {
      _writer.writeInt32(1, _instance.value);
    }
    if (_instance.positive) {
      _writer.writeInt32(2, _instance.positive);
    }
    if (_instance.negative) {
      _writer.writeInt32(3, _instance.negative);
    }
  }

  private _value: number;
  private _positive: number;
  private _negative: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PicturesVoteSummary to deeply clone from
   */
  constructor(_value?: RecursivePartial<PicturesVoteSummary.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    this.positive = _value.positive;
    this.negative = _value.negative;
    PicturesVoteSummary.refineValues(this);
  }
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    this._value = value;
  }
  get positive(): number {
    return this._positive;
  }
  set positive(value: number) {
    this._positive = value;
  }
  get negative(): number {
    return this._negative;
  }
  set negative(value: number) {
    this._negative = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    PicturesVoteSummary.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): PicturesVoteSummary.AsObject {
    return {
      value: this.value,
      positive: this.positive,
      negative: this.negative
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): PicturesVoteSummary.AsProtobufJSON {
    return {
      value: this.value,
      positive: this.positive,
      negative: this.negative
    };
  }
}
export module PicturesVoteSummary {
  /**
   * Standard JavaScript object representation for PicturesVoteSummary
   */
  export interface AsObject {
    value: number;
    positive: number;
    negative: number;
  }

  /**
   * Protobuf JSON representation for PicturesVoteSummary
   */
  export interface AsProtobufJSON {
    value: number;
    positive: number;
    negative: number;
  }
}

/**
 * Message implementation for goautowp.ModerVoteTemplate
 */
export class ModerVoteTemplate implements GrpcMessage {
  static id = 'goautowp.ModerVoteTemplate';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ModerVoteTemplate();
    ModerVoteTemplate.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ModerVoteTemplate) {
    _instance.id = _instance.id || '0';
    _instance.userId = _instance.userId || '0';
    _instance.message = _instance.message || '';
    _instance.vote = _instance.vote || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ModerVoteTemplate,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.userId = _reader.readInt64String();
          break;
        case 3:
          _instance.message = _reader.readString();
          break;
        case 4:
          _instance.vote = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    ModerVoteTemplate.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ModerVoteTemplate,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.userId) {
      _writer.writeInt64String(2, _instance.userId);
    }
    if (_instance.message) {
      _writer.writeString(3, _instance.message);
    }
    if (_instance.vote) {
      _writer.writeInt32(4, _instance.vote);
    }
  }

  private _id: string;
  private _userId: string;
  private _message: string;
  private _vote: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ModerVoteTemplate to deeply clone from
   */
  constructor(_value?: RecursivePartial<ModerVoteTemplate.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.userId = _value.userId;
    this.message = _value.message;
    this.vote = _value.vote;
    ModerVoteTemplate.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }
  get vote(): number {
    return this._vote;
  }
  set vote(value: number) {
    this._vote = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ModerVoteTemplate.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ModerVoteTemplate.AsObject {
    return {
      id: this.id,
      userId: this.userId,
      message: this.message,
      vote: this.vote
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ModerVoteTemplate.AsProtobufJSON {
    return {
      id: this.id,
      userId: this.userId,
      message: this.message,
      vote: this.vote
    };
  }
}
export module ModerVoteTemplate {
  /**
   * Standard JavaScript object representation for ModerVoteTemplate
   */
  export interface AsObject {
    id: string;
    userId: string;
    message: string;
    vote: number;
  }

  /**
   * Protobuf JSON representation for ModerVoteTemplate
   */
  export interface AsProtobufJSON {
    id: string;
    userId: string;
    message: string;
    vote: number;
  }
}

/**
 * Message implementation for goautowp.ModerVoteTemplates
 */
export class ModerVoteTemplates implements GrpcMessage {
  static id = 'goautowp.ModerVoteTemplates';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ModerVoteTemplates();
    ModerVoteTemplates.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ModerVoteTemplates) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ModerVoteTemplates,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new ModerVoteTemplate();
          _reader.readMessage(
            messageInitializer1,
            ModerVoteTemplate.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ModerVoteTemplates.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ModerVoteTemplates,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        ModerVoteTemplate.serializeBinaryToWriter
      );
    }
  }

  private _items?: ModerVoteTemplate[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ModerVoteTemplates to deeply clone from
   */
  constructor(_value?: RecursivePartial<ModerVoteTemplates.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new ModerVoteTemplate(m));
    ModerVoteTemplates.refineValues(this);
  }
  get items(): ModerVoteTemplate[] | undefined {
    return this._items;
  }
  set items(value: ModerVoteTemplate[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ModerVoteTemplates.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ModerVoteTemplates.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ModerVoteTemplates.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module ModerVoteTemplates {
  /**
   * Standard JavaScript object representation for ModerVoteTemplates
   */
  export interface AsObject {
    items?: ModerVoteTemplate.AsObject[];
  }

  /**
   * Protobuf JSON representation for ModerVoteTemplates
   */
  export interface AsProtobufJSON {
    items: ModerVoteTemplate.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.DeleteModerVoteTemplateRequest
 */
export class DeleteModerVoteTemplateRequest implements GrpcMessage {
  static id = 'goautowp.DeleteModerVoteTemplateRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new DeleteModerVoteTemplateRequest();
    DeleteModerVoteTemplateRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: DeleteModerVoteTemplateRequest) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: DeleteModerVoteTemplateRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    DeleteModerVoteTemplateRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: DeleteModerVoteTemplateRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of DeleteModerVoteTemplateRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<DeleteModerVoteTemplateRequest.AsObject>
  ) {
    _value = _value || {};
    this.id = _value.id;
    DeleteModerVoteTemplateRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    DeleteModerVoteTemplateRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): DeleteModerVoteTemplateRequest.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): DeleteModerVoteTemplateRequest.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module DeleteModerVoteTemplateRequest {
  /**
   * Standard JavaScript object representation for DeleteModerVoteTemplateRequest
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for DeleteModerVoteTemplateRequest
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.MessagingDeleteMessage
 */
export class MessagingDeleteMessage implements GrpcMessage {
  static id = 'goautowp.MessagingDeleteMessage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MessagingDeleteMessage();
    MessagingDeleteMessage.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MessagingDeleteMessage) {
    _instance.messageId = _instance.messageId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MessagingDeleteMessage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.messageId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    MessagingDeleteMessage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: MessagingDeleteMessage,
    _writer: BinaryWriter
  ) {
    if (_instance.messageId) {
      _writer.writeInt64String(1, _instance.messageId);
    }
  }

  private _messageId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MessagingDeleteMessage to deeply clone from
   */
  constructor(_value?: RecursivePartial<MessagingDeleteMessage.AsObject>) {
    _value = _value || {};
    this.messageId = _value.messageId;
    MessagingDeleteMessage.refineValues(this);
  }
  get messageId(): string {
    return this._messageId;
  }
  set messageId(value: string) {
    this._messageId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MessagingDeleteMessage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MessagingDeleteMessage.AsObject {
    return {
      messageId: this.messageId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MessagingDeleteMessage.AsProtobufJSON {
    return {
      messageId: this.messageId
    };
  }
}
export module MessagingDeleteMessage {
  /**
   * Standard JavaScript object representation for MessagingDeleteMessage
   */
  export interface AsObject {
    messageId: string;
  }

  /**
   * Protobuf JSON representation for MessagingDeleteMessage
   */
  export interface AsProtobufJSON {
    messageId: string;
  }
}

/**
 * Message implementation for goautowp.MessagingClearFolder
 */
export class MessagingClearFolder implements GrpcMessage {
  static id = 'goautowp.MessagingClearFolder';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MessagingClearFolder();
    MessagingClearFolder.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MessagingClearFolder) {
    _instance.folder = _instance.folder || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MessagingClearFolder,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.folder = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    MessagingClearFolder.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: MessagingClearFolder,
    _writer: BinaryWriter
  ) {
    if (_instance.folder) {
      _writer.writeString(1, _instance.folder);
    }
  }

  private _folder: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MessagingClearFolder to deeply clone from
   */
  constructor(_value?: RecursivePartial<MessagingClearFolder.AsObject>) {
    _value = _value || {};
    this.folder = _value.folder;
    MessagingClearFolder.refineValues(this);
  }
  get folder(): string {
    return this._folder;
  }
  set folder(value: string) {
    this._folder = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MessagingClearFolder.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MessagingClearFolder.AsObject {
    return {
      folder: this.folder
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MessagingClearFolder.AsProtobufJSON {
    return {
      folder: this.folder
    };
  }
}
export module MessagingClearFolder {
  /**
   * Standard JavaScript object representation for MessagingClearFolder
   */
  export interface AsObject {
    folder: string;
  }

  /**
   * Protobuf JSON representation for MessagingClearFolder
   */
  export interface AsProtobufJSON {
    folder: string;
  }
}

/**
 * Message implementation for goautowp.MessagingCreateMessage
 */
export class MessagingCreateMessage implements GrpcMessage {
  static id = 'goautowp.MessagingCreateMessage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MessagingCreateMessage();
    MessagingCreateMessage.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MessagingCreateMessage) {
    _instance.userId = _instance.userId || '0';
    _instance.text = _instance.text || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MessagingCreateMessage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        case 2:
          _instance.text = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    MessagingCreateMessage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: MessagingCreateMessage,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
    if (_instance.text) {
      _writer.writeString(2, _instance.text);
    }
  }

  private _userId: string;
  private _text: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MessagingCreateMessage to deeply clone from
   */
  constructor(_value?: RecursivePartial<MessagingCreateMessage.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    this.text = _value.text;
    MessagingCreateMessage.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MessagingCreateMessage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MessagingCreateMessage.AsObject {
    return {
      userId: this.userId,
      text: this.text
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MessagingCreateMessage.AsProtobufJSON {
    return {
      userId: this.userId,
      text: this.text
    };
  }
}
export module MessagingCreateMessage {
  /**
   * Standard JavaScript object representation for MessagingCreateMessage
   */
  export interface AsObject {
    userId: string;
    text: string;
  }

  /**
   * Protobuf JSON representation for MessagingCreateMessage
   */
  export interface AsProtobufJSON {
    userId: string;
    text: string;
  }
}

/**
 * Message implementation for goautowp.APIMessage
 */
export class APIMessage implements GrpcMessage {
  static id = 'goautowp.APIMessage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIMessage();
    APIMessage.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIMessage) {
    _instance.id = _instance.id || '0';
    _instance.text = _instance.text || '';
    _instance.isNew = _instance.isNew || false;
    _instance.canDelete = _instance.canDelete || false;
    _instance.canReply = _instance.canReply || false;
    _instance.date = _instance.date || undefined;
    _instance.allMessagesLink = _instance.allMessagesLink || false;
    _instance.dialogCount = _instance.dialogCount || 0;
    _instance.authorId = _instance.authorId || '0';
    _instance.toUserId = _instance.toUserId || '0';
    _instance.dialogWithUserId = _instance.dialogWithUserId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIMessage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.text = _reader.readString();
          break;
        case 3:
          _instance.isNew = _reader.readBool();
          break;
        case 4:
          _instance.canDelete = _reader.readBool();
          break;
        case 5:
          _instance.canReply = _reader.readBool();
          break;
        case 6:
          _instance.date = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.date,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 7:
          _instance.allMessagesLink = _reader.readBool();
          break;
        case 8:
          _instance.dialogCount = _reader.readInt32();
          break;
        case 9:
          _instance.authorId = _reader.readInt64String();
          break;
        case 10:
          _instance.toUserId = _reader.readInt64String();
          break;
        case 11:
          _instance.dialogWithUserId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIMessage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: APIMessage, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.text) {
      _writer.writeString(2, _instance.text);
    }
    if (_instance.isNew) {
      _writer.writeBool(3, _instance.isNew);
    }
    if (_instance.canDelete) {
      _writer.writeBool(4, _instance.canDelete);
    }
    if (_instance.canReply) {
      _writer.writeBool(5, _instance.canReply);
    }
    if (_instance.date) {
      _writer.writeMessage(
        6,
        _instance.date as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.allMessagesLink) {
      _writer.writeBool(7, _instance.allMessagesLink);
    }
    if (_instance.dialogCount) {
      _writer.writeInt32(8, _instance.dialogCount);
    }
    if (_instance.authorId) {
      _writer.writeInt64String(9, _instance.authorId);
    }
    if (_instance.toUserId) {
      _writer.writeInt64String(10, _instance.toUserId);
    }
    if (_instance.dialogWithUserId) {
      _writer.writeInt64String(11, _instance.dialogWithUserId);
    }
  }

  private _id: string;
  private _text: string;
  private _isNew: boolean;
  private _canDelete: boolean;
  private _canReply: boolean;
  private _date?: googleProtobuf002.Timestamp;
  private _allMessagesLink: boolean;
  private _dialogCount: number;
  private _authorId: string;
  private _toUserId: string;
  private _dialogWithUserId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIMessage to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIMessage.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.text = _value.text;
    this.isNew = _value.isNew;
    this.canDelete = _value.canDelete;
    this.canReply = _value.canReply;
    this.date = _value.date
      ? new googleProtobuf002.Timestamp(_value.date)
      : undefined;
    this.allMessagesLink = _value.allMessagesLink;
    this.dialogCount = _value.dialogCount;
    this.authorId = _value.authorId;
    this.toUserId = _value.toUserId;
    this.dialogWithUserId = _value.dialogWithUserId;
    APIMessage.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value;
  }
  get isNew(): boolean {
    return this._isNew;
  }
  set isNew(value: boolean) {
    this._isNew = value;
  }
  get canDelete(): boolean {
    return this._canDelete;
  }
  set canDelete(value: boolean) {
    this._canDelete = value;
  }
  get canReply(): boolean {
    return this._canReply;
  }
  set canReply(value: boolean) {
    this._canReply = value;
  }
  get date(): googleProtobuf002.Timestamp | undefined {
    return this._date;
  }
  set date(value: googleProtobuf002.Timestamp | undefined) {
    this._date = value;
  }
  get allMessagesLink(): boolean {
    return this._allMessagesLink;
  }
  set allMessagesLink(value: boolean) {
    this._allMessagesLink = value;
  }
  get dialogCount(): number {
    return this._dialogCount;
  }
  set dialogCount(value: number) {
    this._dialogCount = value;
  }
  get authorId(): string {
    return this._authorId;
  }
  set authorId(value: string) {
    this._authorId = value;
  }
  get toUserId(): string {
    return this._toUserId;
  }
  set toUserId(value: string) {
    this._toUserId = value;
  }
  get dialogWithUserId(): string {
    return this._dialogWithUserId;
  }
  set dialogWithUserId(value: string) {
    this._dialogWithUserId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIMessage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIMessage.AsObject {
    return {
      id: this.id,
      text: this.text,
      isNew: this.isNew,
      canDelete: this.canDelete,
      canReply: this.canReply,
      date: this.date ? this.date.toObject() : undefined,
      allMessagesLink: this.allMessagesLink,
      dialogCount: this.dialogCount,
      authorId: this.authorId,
      toUserId: this.toUserId,
      dialogWithUserId: this.dialogWithUserId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIMessage.AsProtobufJSON {
    return {
      id: this.id,
      text: this.text,
      isNew: this.isNew,
      canDelete: this.canDelete,
      canReply: this.canReply,
      date: this.date ? this.date.toProtobufJSON(options) : null,
      allMessagesLink: this.allMessagesLink,
      dialogCount: this.dialogCount,
      authorId: this.authorId,
      toUserId: this.toUserId,
      dialogWithUserId: this.dialogWithUserId
    };
  }
}
export module APIMessage {
  /**
   * Standard JavaScript object representation for APIMessage
   */
  export interface AsObject {
    id: string;
    text: string;
    isNew: boolean;
    canDelete: boolean;
    canReply: boolean;
    date?: googleProtobuf002.Timestamp.AsObject;
    allMessagesLink: boolean;
    dialogCount: number;
    authorId: string;
    toUserId: string;
    dialogWithUserId: string;
  }

  /**
   * Protobuf JSON representation for APIMessage
   */
  export interface AsProtobufJSON {
    id: string;
    text: string;
    isNew: boolean;
    canDelete: boolean;
    canReply: boolean;
    date: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    allMessagesLink: boolean;
    dialogCount: number;
    authorId: string;
    toUserId: string;
    dialogWithUserId: string;
  }
}

/**
 * Message implementation for goautowp.MessagingGetMessagesRequest
 */
export class MessagingGetMessagesRequest implements GrpcMessage {
  static id = 'goautowp.MessagingGetMessagesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MessagingGetMessagesRequest();
    MessagingGetMessagesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MessagingGetMessagesRequest) {
    _instance.userId = _instance.userId || '0';
    _instance.folder = _instance.folder || '';
    _instance.page = _instance.page || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MessagingGetMessagesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        case 2:
          _instance.folder = _reader.readString();
          break;
        case 3:
          _instance.page = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    MessagingGetMessagesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: MessagingGetMessagesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
    if (_instance.folder) {
      _writer.writeString(2, _instance.folder);
    }
    if (_instance.page) {
      _writer.writeInt32(3, _instance.page);
    }
  }

  private _userId: string;
  private _folder: string;
  private _page: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MessagingGetMessagesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<MessagingGetMessagesRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    this.folder = _value.folder;
    this.page = _value.page;
    MessagingGetMessagesRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get folder(): string {
    return this._folder;
  }
  set folder(value: string) {
    this._folder = value;
  }
  get page(): number {
    return this._page;
  }
  set page(value: number) {
    this._page = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MessagingGetMessagesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MessagingGetMessagesRequest.AsObject {
    return {
      userId: this.userId,
      folder: this.folder,
      page: this.page
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MessagingGetMessagesRequest.AsProtobufJSON {
    return {
      userId: this.userId,
      folder: this.folder,
      page: this.page
    };
  }
}
export module MessagingGetMessagesRequest {
  /**
   * Standard JavaScript object representation for MessagingGetMessagesRequest
   */
  export interface AsObject {
    userId: string;
    folder: string;
    page: number;
  }

  /**
   * Protobuf JSON representation for MessagingGetMessagesRequest
   */
  export interface AsProtobufJSON {
    userId: string;
    folder: string;
    page: number;
  }
}

/**
 * Message implementation for goautowp.MessagingGetMessagesResponse
 */
export class MessagingGetMessagesResponse implements GrpcMessage {
  static id = 'goautowp.MessagingGetMessagesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new MessagingGetMessagesResponse();
    MessagingGetMessagesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: MessagingGetMessagesResponse) {
    _instance.items = _instance.items || [];
    _instance.paginator = _instance.paginator || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: MessagingGetMessagesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APIMessage();
          _reader.readMessage(
            messageInitializer1,
            APIMessage.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        case 2:
          _instance.paginator = new Pages();
          _reader.readMessage(
            _instance.paginator,
            Pages.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    MessagingGetMessagesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: MessagingGetMessagesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APIMessage.serializeBinaryToWriter
      );
    }
    if (_instance.paginator) {
      _writer.writeMessage(
        2,
        _instance.paginator as any,
        Pages.serializeBinaryToWriter
      );
    }
  }

  private _items?: APIMessage[];
  private _paginator?: Pages;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of MessagingGetMessagesResponse to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<MessagingGetMessagesResponse.AsObject>
  ) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APIMessage(m));
    this.paginator = _value.paginator ? new Pages(_value.paginator) : undefined;
    MessagingGetMessagesResponse.refineValues(this);
  }
  get items(): APIMessage[] | undefined {
    return this._items;
  }
  set items(value: APIMessage[] | undefined) {
    this._items = value;
  }
  get paginator(): Pages | undefined {
    return this._paginator;
  }
  set paginator(value: Pages | undefined) {
    this._paginator = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    MessagingGetMessagesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): MessagingGetMessagesResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject()),
      paginator: this.paginator ? this.paginator.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): MessagingGetMessagesResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options)),
      paginator: this.paginator ? this.paginator.toProtobufJSON(options) : null
    };
  }
}
export module MessagingGetMessagesResponse {
  /**
   * Standard JavaScript object representation for MessagingGetMessagesResponse
   */
  export interface AsObject {
    items?: APIMessage.AsObject[];
    paginator?: Pages.AsObject;
  }

  /**
   * Protobuf JSON representation for MessagingGetMessagesResponse
   */
  export interface AsProtobufJSON {
    items: APIMessage.AsProtobufJSON[] | null;
    paginator: Pages.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.Pages
 */
export class Pages implements GrpcMessage {
  static id = 'goautowp.Pages';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Pages();
    Pages.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Pages) {
    _instance.pageCount = _instance.pageCount || 0;
    _instance.first = _instance.first || 0;
    _instance.current = _instance.current || 0;
    _instance.next = _instance.next || 0;
    _instance.previous = _instance.previous || 0;
    _instance.firstPageInRange = _instance.firstPageInRange || 0;
    _instance.lastPageInRange = _instance.lastPageInRange || 0;
    _instance.pagesInRange = _instance.pagesInRange || [];
    _instance.totalItemCount = _instance.totalItemCount || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: Pages, _reader: BinaryReader) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.pageCount = _reader.readInt32();
          break;
        case 2:
          _instance.first = _reader.readInt32();
          break;
        case 3:
          _instance.current = _reader.readInt32();
          break;
        case 5:
          _instance.next = _reader.readInt32();
          break;
        case 6:
          _instance.previous = _reader.readInt32();
          break;
        case 7:
          _instance.firstPageInRange = _reader.readInt32();
          break;
        case 8:
          _instance.lastPageInRange = _reader.readInt32();
          break;
        case 9:
          (_instance.pagesInRange = _instance.pagesInRange || []).push(
            ...(_reader.readPackedInt32() || [])
          );
          break;
        case 10:
          _instance.totalItemCount = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    Pages.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Pages, _writer: BinaryWriter) {
    if (_instance.pageCount) {
      _writer.writeInt32(1, _instance.pageCount);
    }
    if (_instance.first) {
      _writer.writeInt32(2, _instance.first);
    }
    if (_instance.current) {
      _writer.writeInt32(3, _instance.current);
    }
    if (_instance.next) {
      _writer.writeInt32(5, _instance.next);
    }
    if (_instance.previous) {
      _writer.writeInt32(6, _instance.previous);
    }
    if (_instance.firstPageInRange) {
      _writer.writeInt32(7, _instance.firstPageInRange);
    }
    if (_instance.lastPageInRange) {
      _writer.writeInt32(8, _instance.lastPageInRange);
    }
    if (_instance.pagesInRange && _instance.pagesInRange.length) {
      _writer.writePackedInt32(9, _instance.pagesInRange);
    }
    if (_instance.totalItemCount) {
      _writer.writeInt32(10, _instance.totalItemCount);
    }
  }

  private _pageCount: number;
  private _first: number;
  private _current: number;
  private _next: number;
  private _previous: number;
  private _firstPageInRange: number;
  private _lastPageInRange: number;
  private _pagesInRange: number[];
  private _totalItemCount: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Pages to deeply clone from
   */
  constructor(_value?: RecursivePartial<Pages.AsObject>) {
    _value = _value || {};
    this.pageCount = _value.pageCount;
    this.first = _value.first;
    this.current = _value.current;
    this.next = _value.next;
    this.previous = _value.previous;
    this.firstPageInRange = _value.firstPageInRange;
    this.lastPageInRange = _value.lastPageInRange;
    this.pagesInRange = (_value.pagesInRange || []).slice();
    this.totalItemCount = _value.totalItemCount;
    Pages.refineValues(this);
  }
  get pageCount(): number {
    return this._pageCount;
  }
  set pageCount(value: number) {
    this._pageCount = value;
  }
  get first(): number {
    return this._first;
  }
  set first(value: number) {
    this._first = value;
  }
  get current(): number {
    return this._current;
  }
  set current(value: number) {
    this._current = value;
  }
  get next(): number {
    return this._next;
  }
  set next(value: number) {
    this._next = value;
  }
  get previous(): number {
    return this._previous;
  }
  set previous(value: number) {
    this._previous = value;
  }
  get firstPageInRange(): number {
    return this._firstPageInRange;
  }
  set firstPageInRange(value: number) {
    this._firstPageInRange = value;
  }
  get lastPageInRange(): number {
    return this._lastPageInRange;
  }
  set lastPageInRange(value: number) {
    this._lastPageInRange = value;
  }
  get pagesInRange(): number[] {
    return this._pagesInRange;
  }
  set pagesInRange(value: number[]) {
    this._pagesInRange = value;
  }
  get totalItemCount(): number {
    return this._totalItemCount;
  }
  set totalItemCount(value: number) {
    this._totalItemCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Pages.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Pages.AsObject {
    return {
      pageCount: this.pageCount,
      first: this.first,
      current: this.current,
      next: this.next,
      previous: this.previous,
      firstPageInRange: this.firstPageInRange,
      lastPageInRange: this.lastPageInRange,
      pagesInRange: (this.pagesInRange || []).slice(),
      totalItemCount: this.totalItemCount
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Pages.AsProtobufJSON {
    return {
      pageCount: this.pageCount,
      first: this.first,
      current: this.current,
      next: this.next,
      previous: this.previous,
      firstPageInRange: this.firstPageInRange,
      lastPageInRange: this.lastPageInRange,
      pagesInRange: (this.pagesInRange || []).slice(),
      totalItemCount: this.totalItemCount
    };
  }
}
export module Pages {
  /**
   * Standard JavaScript object representation for Pages
   */
  export interface AsObject {
    pageCount: number;
    first: number;
    current: number;
    next: number;
    previous: number;
    firstPageInRange: number;
    lastPageInRange: number;
    pagesInRange: number[];
    totalItemCount: number;
  }

  /**
   * Protobuf JSON representation for Pages
   */
  export interface AsProtobufJSON {
    pageCount: number;
    first: number;
    current: number;
    next: number;
    previous: number;
    firstPageInRange: number;
    lastPageInRange: number;
    pagesInRange: number[];
    totalItemCount: number;
  }
}

/**
 * Message implementation for goautowp.VODDataResponse
 */
export class VODDataResponse implements GrpcMessage {
  static id = 'goautowp.VODDataResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new VODDataResponse();
    VODDataResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: VODDataResponse) {
    _instance.dates = _instance.dates || [];
    _instance.sum = _instance.sum || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: VODDataResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new VODDataDate();
          _reader.readMessage(
            messageInitializer1,
            VODDataDate.deserializeBinaryFromReader
          );
          (_instance.dates = _instance.dates || []).push(messageInitializer1);
          break;
        case 2:
          _instance.sum = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    VODDataResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: VODDataResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.dates && _instance.dates.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.dates as any,
        VODDataDate.serializeBinaryToWriter
      );
    }
    if (_instance.sum) {
      _writer.writeInt32(2, _instance.sum);
    }
  }

  private _dates?: VODDataDate[];
  private _sum: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of VODDataResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<VODDataResponse.AsObject>) {
    _value = _value || {};
    this.dates = (_value.dates || []).map(m => new VODDataDate(m));
    this.sum = _value.sum;
    VODDataResponse.refineValues(this);
  }
  get dates(): VODDataDate[] | undefined {
    return this._dates;
  }
  set dates(value: VODDataDate[] | undefined) {
    this._dates = value;
  }
  get sum(): number {
    return this._sum;
  }
  set sum(value: number) {
    this._sum = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    VODDataResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): VODDataResponse.AsObject {
    return {
      dates: (this.dates || []).map(m => m.toObject()),
      sum: this.sum
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): VODDataResponse.AsProtobufJSON {
    return {
      dates: (this.dates || []).map(m => m.toProtobufJSON(options)),
      sum: this.sum
    };
  }
}
export module VODDataResponse {
  /**
   * Standard JavaScript object representation for VODDataResponse
   */
  export interface AsObject {
    dates?: VODDataDate.AsObject[];
    sum: number;
  }

  /**
   * Protobuf JSON representation for VODDataResponse
   */
  export interface AsProtobufJSON {
    dates: VODDataDate.AsProtobufJSON[] | null;
    sum: number;
  }
}

/**
 * Message implementation for goautowp.VODDataDate
 */
export class VODDataDate implements GrpcMessage {
  static id = 'goautowp.VODDataDate';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new VODDataDate();
    VODDataDate.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: VODDataDate) {
    _instance.date = _instance.date || undefined;
    _instance.free = _instance.free || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: VODDataDate,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.date = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.date,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 2:
          _instance.free = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    VODDataDate.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: VODDataDate,
    _writer: BinaryWriter
  ) {
    if (_instance.date) {
      _writer.writeMessage(
        1,
        _instance.date as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.free) {
      _writer.writeBool(2, _instance.free);
    }
  }

  private _date?: googleProtobuf002.Timestamp;
  private _free: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of VODDataDate to deeply clone from
   */
  constructor(_value?: RecursivePartial<VODDataDate.AsObject>) {
    _value = _value || {};
    this.date = _value.date
      ? new googleProtobuf002.Timestamp(_value.date)
      : undefined;
    this.free = _value.free;
    VODDataDate.refineValues(this);
  }
  get date(): googleProtobuf002.Timestamp | undefined {
    return this._date;
  }
  set date(value: googleProtobuf002.Timestamp | undefined) {
    this._date = value;
  }
  get free(): boolean {
    return this._free;
  }
  set free(value: boolean) {
    this._free = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    VODDataDate.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): VODDataDate.AsObject {
    return {
      date: this.date ? this.date.toObject() : undefined,
      free: this.free
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): VODDataDate.AsProtobufJSON {
    return {
      date: this.date ? this.date.toProtobufJSON(options) : null,
      free: this.free
    };
  }
}
export module VODDataDate {
  /**
   * Standard JavaScript object representation for VODDataDate
   */
  export interface AsObject {
    date?: googleProtobuf002.Timestamp.AsObject;
    free: boolean;
  }

  /**
   * Protobuf JSON representation for VODDataDate
   */
  export interface AsProtobufJSON {
    date: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    free: boolean;
  }
}

/**
 * Message implementation for goautowp.AboutDataResponse
 */
export class AboutDataResponse implements GrpcMessage {
  static id = 'goautowp.AboutDataResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AboutDataResponse();
    AboutDataResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AboutDataResponse) {
    _instance.developer = _instance.developer || '';
    _instance.frTranslator = _instance.frTranslator || '';
    _instance.zhTranslator = _instance.zhTranslator || '';
    _instance.beTranslator = _instance.beTranslator || '';
    _instance.ptBrTranslator = _instance.ptBrTranslator || '';
    _instance.contributors = _instance.contributors || [];
    _instance.totalPictures = _instance.totalPictures || 0;
    _instance.picturesSize = _instance.picturesSize || 0;
    _instance.totalUsers = _instance.totalUsers || 0;
    _instance.totalItems = _instance.totalItems || 0;
    _instance.totalComments = _instance.totalComments || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AboutDataResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.developer = _reader.readString();
          break;
        case 2:
          _instance.frTranslator = _reader.readString();
          break;
        case 3:
          _instance.zhTranslator = _reader.readString();
          break;
        case 4:
          _instance.beTranslator = _reader.readString();
          break;
        case 5:
          _instance.ptBrTranslator = _reader.readString();
          break;
        case 6:
          (_instance.contributors = _instance.contributors || []).push(
            _reader.readString()
          );
          break;
        case 7:
          _instance.totalPictures = _reader.readInt32();
          break;
        case 8:
          _instance.picturesSize = _reader.readInt32();
          break;
        case 9:
          _instance.totalUsers = _reader.readInt32();
          break;
        case 10:
          _instance.totalItems = _reader.readInt32();
          break;
        case 11:
          _instance.totalComments = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    AboutDataResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AboutDataResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.developer) {
      _writer.writeString(1, _instance.developer);
    }
    if (_instance.frTranslator) {
      _writer.writeString(2, _instance.frTranslator);
    }
    if (_instance.zhTranslator) {
      _writer.writeString(3, _instance.zhTranslator);
    }
    if (_instance.beTranslator) {
      _writer.writeString(4, _instance.beTranslator);
    }
    if (_instance.ptBrTranslator) {
      _writer.writeString(5, _instance.ptBrTranslator);
    }
    if (_instance.contributors && _instance.contributors.length) {
      _writer.writeRepeatedString(6, _instance.contributors);
    }
    if (_instance.totalPictures) {
      _writer.writeInt32(7, _instance.totalPictures);
    }
    if (_instance.picturesSize) {
      _writer.writeInt32(8, _instance.picturesSize);
    }
    if (_instance.totalUsers) {
      _writer.writeInt32(9, _instance.totalUsers);
    }
    if (_instance.totalItems) {
      _writer.writeInt32(10, _instance.totalItems);
    }
    if (_instance.totalComments) {
      _writer.writeInt32(11, _instance.totalComments);
    }
  }

  private _developer: string;
  private _frTranslator: string;
  private _zhTranslator: string;
  private _beTranslator: string;
  private _ptBrTranslator: string;
  private _contributors: string[];
  private _totalPictures: number;
  private _picturesSize: number;
  private _totalUsers: number;
  private _totalItems: number;
  private _totalComments: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AboutDataResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AboutDataResponse.AsObject>) {
    _value = _value || {};
    this.developer = _value.developer;
    this.frTranslator = _value.frTranslator;
    this.zhTranslator = _value.zhTranslator;
    this.beTranslator = _value.beTranslator;
    this.ptBrTranslator = _value.ptBrTranslator;
    this.contributors = (_value.contributors || []).slice();
    this.totalPictures = _value.totalPictures;
    this.picturesSize = _value.picturesSize;
    this.totalUsers = _value.totalUsers;
    this.totalItems = _value.totalItems;
    this.totalComments = _value.totalComments;
    AboutDataResponse.refineValues(this);
  }
  get developer(): string {
    return this._developer;
  }
  set developer(value: string) {
    this._developer = value;
  }
  get frTranslator(): string {
    return this._frTranslator;
  }
  set frTranslator(value: string) {
    this._frTranslator = value;
  }
  get zhTranslator(): string {
    return this._zhTranslator;
  }
  set zhTranslator(value: string) {
    this._zhTranslator = value;
  }
  get beTranslator(): string {
    return this._beTranslator;
  }
  set beTranslator(value: string) {
    this._beTranslator = value;
  }
  get ptBrTranslator(): string {
    return this._ptBrTranslator;
  }
  set ptBrTranslator(value: string) {
    this._ptBrTranslator = value;
  }
  get contributors(): string[] {
    return this._contributors;
  }
  set contributors(value: string[]) {
    this._contributors = value;
  }
  get totalPictures(): number {
    return this._totalPictures;
  }
  set totalPictures(value: number) {
    this._totalPictures = value;
  }
  get picturesSize(): number {
    return this._picturesSize;
  }
  set picturesSize(value: number) {
    this._picturesSize = value;
  }
  get totalUsers(): number {
    return this._totalUsers;
  }
  set totalUsers(value: number) {
    this._totalUsers = value;
  }
  get totalItems(): number {
    return this._totalItems;
  }
  set totalItems(value: number) {
    this._totalItems = value;
  }
  get totalComments(): number {
    return this._totalComments;
  }
  set totalComments(value: number) {
    this._totalComments = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AboutDataResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AboutDataResponse.AsObject {
    return {
      developer: this.developer,
      frTranslator: this.frTranslator,
      zhTranslator: this.zhTranslator,
      beTranslator: this.beTranslator,
      ptBrTranslator: this.ptBrTranslator,
      contributors: (this.contributors || []).slice(),
      totalPictures: this.totalPictures,
      picturesSize: this.picturesSize,
      totalUsers: this.totalUsers,
      totalItems: this.totalItems,
      totalComments: this.totalComments
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AboutDataResponse.AsProtobufJSON {
    return {
      developer: this.developer,
      frTranslator: this.frTranslator,
      zhTranslator: this.zhTranslator,
      beTranslator: this.beTranslator,
      ptBrTranslator: this.ptBrTranslator,
      contributors: (this.contributors || []).slice(),
      totalPictures: this.totalPictures,
      picturesSize: this.picturesSize,
      totalUsers: this.totalUsers,
      totalItems: this.totalItems,
      totalComments: this.totalComments
    };
  }
}
export module AboutDataResponse {
  /**
   * Standard JavaScript object representation for AboutDataResponse
   */
  export interface AsObject {
    developer: string;
    frTranslator: string;
    zhTranslator: string;
    beTranslator: string;
    ptBrTranslator: string;
    contributors: string[];
    totalPictures: number;
    picturesSize: number;
    totalUsers: number;
    totalItems: number;
    totalComments: number;
  }

  /**
   * Protobuf JSON representation for AboutDataResponse
   */
  export interface AsProtobufJSON {
    developer: string;
    frTranslator: string;
    zhTranslator: string;
    beTranslator: string;
    ptBrTranslator: string;
    contributors: string[];
    totalPictures: number;
    picturesSize: number;
    totalUsers: number;
    totalItems: number;
    totalComments: number;
  }
}

/**
 * Message implementation for goautowp.APIUserPreferencesRequest
 */
export class APIUserPreferencesRequest implements GrpcMessage {
  static id = 'goautowp.APIUserPreferencesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIUserPreferencesRequest();
    APIUserPreferencesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIUserPreferencesRequest) {
    _instance.userId = _instance.userId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIUserPreferencesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIUserPreferencesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIUserPreferencesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeInt64String(1, _instance.userId);
    }
  }

  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIUserPreferencesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIUserPreferencesRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    APIUserPreferencesRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIUserPreferencesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIUserPreferencesRequest.AsObject {
    return {
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIUserPreferencesRequest.AsProtobufJSON {
    return {
      userId: this.userId
    };
  }
}
export module APIUserPreferencesRequest {
  /**
   * Standard JavaScript object representation for APIUserPreferencesRequest
   */
  export interface AsObject {
    userId: string;
  }

  /**
   * Protobuf JSON representation for APIUserPreferencesRequest
   */
  export interface AsProtobufJSON {
    userId: string;
  }
}

/**
 * Message implementation for goautowp.APIUserPreferencesResponse
 */
export class APIUserPreferencesResponse implements GrpcMessage {
  static id = 'goautowp.APIUserPreferencesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIUserPreferencesResponse();
    APIUserPreferencesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIUserPreferencesResponse) {
    _instance.disableCommentsNotifications =
      _instance.disableCommentsNotifications || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIUserPreferencesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.disableCommentsNotifications = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    APIUserPreferencesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIUserPreferencesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.disableCommentsNotifications) {
      _writer.writeBool(1, _instance.disableCommentsNotifications);
    }
  }

  private _disableCommentsNotifications: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIUserPreferencesResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIUserPreferencesResponse.AsObject>) {
    _value = _value || {};
    this.disableCommentsNotifications = _value.disableCommentsNotifications;
    APIUserPreferencesResponse.refineValues(this);
  }
  get disableCommentsNotifications(): boolean {
    return this._disableCommentsNotifications;
  }
  set disableCommentsNotifications(value: boolean) {
    this._disableCommentsNotifications = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIUserPreferencesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIUserPreferencesResponse.AsObject {
    return {
      disableCommentsNotifications: this.disableCommentsNotifications
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIUserPreferencesResponse.AsProtobufJSON {
    return {
      disableCommentsNotifications: this.disableCommentsNotifications
    };
  }
}
export module APIUserPreferencesResponse {
  /**
   * Standard JavaScript object representation for APIUserPreferencesResponse
   */
  export interface AsObject {
    disableCommentsNotifications: boolean;
  }

  /**
   * Protobuf JSON representation for APIUserPreferencesResponse
   */
  export interface AsProtobufJSON {
    disableCommentsNotifications: boolean;
  }
}

/**
 * Message implementation for goautowp.APIUsersRequest
 */
export class APIUsersRequest implements GrpcMessage {
  static id = 'goautowp.APIUsersRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIUsersRequest();
    APIUsersRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIUsersRequest) {
    _instance.isOnline = _instance.isOnline || false;
    _instance.limit = _instance.limit || '0';
    _instance.page = _instance.page || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIUsersRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 2:
          _instance.isOnline = _reader.readBool();
          break;
        case 3:
          _instance.limit = _reader.readUint64String();
          break;
        case 4:
          _instance.page = _reader.readUint64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIUsersRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIUsersRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.isOnline) {
      _writer.writeBool(2, _instance.isOnline);
    }
    if (_instance.limit) {
      _writer.writeUint64String(3, _instance.limit);
    }
    if (_instance.page) {
      _writer.writeUint64String(4, _instance.page);
    }
  }

  private _isOnline: boolean;
  private _limit: string;
  private _page: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIUsersRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIUsersRequest.AsObject>) {
    _value = _value || {};
    this.isOnline = _value.isOnline;
    this.limit = _value.limit;
    this.page = _value.page;
    APIUsersRequest.refineValues(this);
  }
  get isOnline(): boolean {
    return this._isOnline;
  }
  set isOnline(value: boolean) {
    this._isOnline = value;
  }
  get limit(): string {
    return this._limit;
  }
  set limit(value: string) {
    this._limit = value;
  }
  get page(): string {
    return this._page;
  }
  set page(value: string) {
    this._page = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIUsersRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIUsersRequest.AsObject {
    return {
      isOnline: this.isOnline,
      limit: this.limit,
      page: this.page
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIUsersRequest.AsProtobufJSON {
    return {
      isOnline: this.isOnline,
      limit: this.limit,
      page: this.page
    };
  }
}
export module APIUsersRequest {
  /**
   * Standard JavaScript object representation for APIUsersRequest
   */
  export interface AsObject {
    isOnline: boolean;
    limit: string;
    page: string;
  }

  /**
   * Protobuf JSON representation for APIUsersRequest
   */
  export interface AsProtobufJSON {
    isOnline: boolean;
    limit: string;
    page: string;
  }
}

/**
 * Message implementation for goautowp.APIUsersResponse
 */
export class APIUsersResponse implements GrpcMessage {
  static id = 'goautowp.APIUsersResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIUsersResponse();
    APIUsersResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIUsersResponse) {
    _instance.items = _instance.items || [];
    _instance.paginator = _instance.paginator || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIUsersResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APIUser();
          _reader.readMessage(
            messageInitializer1,
            APIUser.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        case 2:
          _instance.paginator = new Pages();
          _reader.readMessage(
            _instance.paginator,
            Pages.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    APIUsersResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIUsersResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APIUser.serializeBinaryToWriter
      );
    }
    if (_instance.paginator) {
      _writer.writeMessage(
        2,
        _instance.paginator as any,
        Pages.serializeBinaryToWriter
      );
    }
  }

  private _items?: APIUser[];
  private _paginator?: Pages;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIUsersResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIUsersResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APIUser(m));
    this.paginator = _value.paginator ? new Pages(_value.paginator) : undefined;
    APIUsersResponse.refineValues(this);
  }
  get items(): APIUser[] | undefined {
    return this._items;
  }
  set items(value: APIUser[] | undefined) {
    this._items = value;
  }
  get paginator(): Pages | undefined {
    return this._paginator;
  }
  set paginator(value: Pages | undefined) {
    this._paginator = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIUsersResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIUsersResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject()),
      paginator: this.paginator ? this.paginator.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIUsersResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options)),
      paginator: this.paginator ? this.paginator.toProtobufJSON(options) : null
    };
  }
}
export module APIUsersResponse {
  /**
   * Standard JavaScript object representation for APIUsersResponse
   */
  export interface AsObject {
    items?: APIUser.AsObject[];
    paginator?: Pages.AsObject;
  }

  /**
   * Protobuf JSON representation for APIUsersResponse
   */
  export interface AsProtobufJSON {
    items: APIUser.AsProtobufJSON[] | null;
    paginator: Pages.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.ArticlesRequest
 */
export class ArticlesRequest implements GrpcMessage {
  static id = 'goautowp.ArticlesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ArticlesRequest();
    ArticlesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ArticlesRequest) {
    _instance.limit = _instance.limit || '0';
    _instance.page = _instance.page || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ArticlesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.limit = _reader.readUint64String();
          break;
        case 2:
          _instance.page = _reader.readUint64String();
          break;
        default:
          _reader.skipField();
      }
    }

    ArticlesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ArticlesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.limit) {
      _writer.writeUint64String(1, _instance.limit);
    }
    if (_instance.page) {
      _writer.writeUint64String(2, _instance.page);
    }
  }

  private _limit: string;
  private _page: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ArticlesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ArticlesRequest.AsObject>) {
    _value = _value || {};
    this.limit = _value.limit;
    this.page = _value.page;
    ArticlesRequest.refineValues(this);
  }
  get limit(): string {
    return this._limit;
  }
  set limit(value: string) {
    this._limit = value;
  }
  get page(): string {
    return this._page;
  }
  set page(value: string) {
    this._page = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ArticlesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ArticlesRequest.AsObject {
    return {
      limit: this.limit,
      page: this.page
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ArticlesRequest.AsProtobufJSON {
    return {
      limit: this.limit,
      page: this.page
    };
  }
}
export module ArticlesRequest {
  /**
   * Standard JavaScript object representation for ArticlesRequest
   */
  export interface AsObject {
    limit: string;
    page: string;
  }

  /**
   * Protobuf JSON representation for ArticlesRequest
   */
  export interface AsProtobufJSON {
    limit: string;
    page: string;
  }
}

/**
 * Message implementation for goautowp.ArticlesResponse
 */
export class ArticlesResponse implements GrpcMessage {
  static id = 'goautowp.ArticlesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ArticlesResponse();
    ArticlesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ArticlesResponse) {
    _instance.items = _instance.items || [];
    _instance.paginator = _instance.paginator || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ArticlesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new Article();
          _reader.readMessage(
            messageInitializer1,
            Article.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        case 2:
          _instance.paginator = new Pages();
          _reader.readMessage(
            _instance.paginator,
            Pages.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    ArticlesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ArticlesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        Article.serializeBinaryToWriter
      );
    }
    if (_instance.paginator) {
      _writer.writeMessage(
        2,
        _instance.paginator as any,
        Pages.serializeBinaryToWriter
      );
    }
  }

  private _items?: Article[];
  private _paginator?: Pages;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ArticlesResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<ArticlesResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new Article(m));
    this.paginator = _value.paginator ? new Pages(_value.paginator) : undefined;
    ArticlesResponse.refineValues(this);
  }
  get items(): Article[] | undefined {
    return this._items;
  }
  set items(value: Article[] | undefined) {
    this._items = value;
  }
  get paginator(): Pages | undefined {
    return this._paginator;
  }
  set paginator(value: Pages | undefined) {
    this._paginator = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ArticlesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ArticlesResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject()),
      paginator: this.paginator ? this.paginator.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ArticlesResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options)),
      paginator: this.paginator ? this.paginator.toProtobufJSON(options) : null
    };
  }
}
export module ArticlesResponse {
  /**
   * Standard JavaScript object representation for ArticlesResponse
   */
  export interface AsObject {
    items?: Article.AsObject[];
    paginator?: Pages.AsObject;
  }

  /**
   * Protobuf JSON representation for ArticlesResponse
   */
  export interface AsProtobufJSON {
    items: Article.AsProtobufJSON[] | null;
    paginator: Pages.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.Article
 */
export class Article implements GrpcMessage {
  static id = 'goautowp.Article';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Article();
    Article.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Article) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.authorId = _instance.authorId || '0';
    _instance.catname = _instance.catname || '';
    _instance.date = _instance.date || undefined;
    _instance.html = _instance.html || '';
    _instance.previewUrl = _instance.previewUrl || '';
    _instance.description = _instance.description || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Article,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.authorId = _reader.readInt64String();
          break;
        case 4:
          _instance.catname = _reader.readString();
          break;
        case 5:
          _instance.date = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.date,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 6:
          _instance.html = _reader.readString();
          break;
        case 7:
          _instance.previewUrl = _reader.readString();
          break;
        case 8:
          _instance.description = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    Article.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Article, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.authorId) {
      _writer.writeInt64String(3, _instance.authorId);
    }
    if (_instance.catname) {
      _writer.writeString(4, _instance.catname);
    }
    if (_instance.date) {
      _writer.writeMessage(
        5,
        _instance.date as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.html) {
      _writer.writeString(6, _instance.html);
    }
    if (_instance.previewUrl) {
      _writer.writeString(7, _instance.previewUrl);
    }
    if (_instance.description) {
      _writer.writeString(8, _instance.description);
    }
  }

  private _id: string;
  private _name: string;
  private _authorId: string;
  private _catname: string;
  private _date?: googleProtobuf002.Timestamp;
  private _html: string;
  private _previewUrl: string;
  private _description: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Article to deeply clone from
   */
  constructor(_value?: RecursivePartial<Article.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.authorId = _value.authorId;
    this.catname = _value.catname;
    this.date = _value.date
      ? new googleProtobuf002.Timestamp(_value.date)
      : undefined;
    this.html = _value.html;
    this.previewUrl = _value.previewUrl;
    this.description = _value.description;
    Article.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get authorId(): string {
    return this._authorId;
  }
  set authorId(value: string) {
    this._authorId = value;
  }
  get catname(): string {
    return this._catname;
  }
  set catname(value: string) {
    this._catname = value;
  }
  get date(): googleProtobuf002.Timestamp | undefined {
    return this._date;
  }
  set date(value: googleProtobuf002.Timestamp | undefined) {
    this._date = value;
  }
  get html(): string {
    return this._html;
  }
  set html(value: string) {
    this._html = value;
  }
  get previewUrl(): string {
    return this._previewUrl;
  }
  set previewUrl(value: string) {
    this._previewUrl = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Article.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Article.AsObject {
    return {
      id: this.id,
      name: this.name,
      authorId: this.authorId,
      catname: this.catname,
      date: this.date ? this.date.toObject() : undefined,
      html: this.html,
      previewUrl: this.previewUrl,
      description: this.description
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): Article.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      authorId: this.authorId,
      catname: this.catname,
      date: this.date ? this.date.toProtobufJSON(options) : null,
      html: this.html,
      previewUrl: this.previewUrl,
      description: this.description
    };
  }
}
export module Article {
  /**
   * Standard JavaScript object representation for Article
   */
  export interface AsObject {
    id: string;
    name: string;
    authorId: string;
    catname: string;
    date?: googleProtobuf002.Timestamp.AsObject;
    html: string;
    previewUrl: string;
    description: string;
  }

  /**
   * Protobuf JSON representation for Article
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    authorId: string;
    catname: string;
    date: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    html: string;
    previewUrl: string;
    description: string;
  }
}

/**
 * Message implementation for goautowp.ArticleByCatnameRequest
 */
export class ArticleByCatnameRequest implements GrpcMessage {
  static id = 'goautowp.ArticleByCatnameRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ArticleByCatnameRequest();
    ArticleByCatnameRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ArticleByCatnameRequest) {
    _instance.catname = _instance.catname || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ArticleByCatnameRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.catname = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ArticleByCatnameRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ArticleByCatnameRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.catname) {
      _writer.writeString(1, _instance.catname);
    }
  }

  private _catname: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ArticleByCatnameRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<ArticleByCatnameRequest.AsObject>) {
    _value = _value || {};
    this.catname = _value.catname;
    ArticleByCatnameRequest.refineValues(this);
  }
  get catname(): string {
    return this._catname;
  }
  set catname(value: string) {
    this._catname = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ArticleByCatnameRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ArticleByCatnameRequest.AsObject {
    return {
      catname: this.catname
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ArticleByCatnameRequest.AsProtobufJSON {
    return {
      catname: this.catname
    };
  }
}
export module ArticleByCatnameRequest {
  /**
   * Standard JavaScript object representation for ArticleByCatnameRequest
   */
  export interface AsObject {
    catname: string;
  }

  /**
   * Protobuf JSON representation for ArticleByCatnameRequest
   */
  export interface AsProtobufJSON {
    catname: string;
  }
}

/**
 * Message implementation for goautowp.APIContentLanguages
 */
export class APIContentLanguages implements GrpcMessage {
  static id = 'goautowp.APIContentLanguages';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIContentLanguages();
    APIContentLanguages.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIContentLanguages) {
    _instance.languages = _instance.languages || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIContentLanguages,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          (_instance.languages = _instance.languages || []).push(
            _reader.readString()
          );
          break;
        default:
          _reader.skipField();
      }
    }

    APIContentLanguages.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIContentLanguages,
    _writer: BinaryWriter
  ) {
    if (_instance.languages && _instance.languages.length) {
      _writer.writeRepeatedString(1, _instance.languages);
    }
  }

  private _languages: string[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIContentLanguages to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIContentLanguages.AsObject>) {
    _value = _value || {};
    this.languages = (_value.languages || []).slice();
    APIContentLanguages.refineValues(this);
  }
  get languages(): string[] {
    return this._languages;
  }
  set languages(value: string[]) {
    this._languages = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIContentLanguages.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIContentLanguages.AsObject {
    return {
      languages: (this.languages || []).slice()
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIContentLanguages.AsProtobufJSON {
    return {
      languages: (this.languages || []).slice()
    };
  }
}
export module APIContentLanguages {
  /**
   * Standard JavaScript object representation for APIContentLanguages
   */
  export interface AsObject {
    languages: string[];
  }

  /**
   * Protobuf JSON representation for APIContentLanguages
   */
  export interface AsProtobufJSON {
    languages: string[];
  }
}

/**
 * Message implementation for goautowp.APIItemLinkRequest
 */
export class APIItemLinkRequest implements GrpcMessage {
  static id = 'goautowp.APIItemLinkRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIItemLinkRequest();
    APIItemLinkRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIItemLinkRequest) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIItemLinkRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIItemLinkRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIItemLinkRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItemLinkRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItemLinkRequest.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    APIItemLinkRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIItemLinkRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIItemLinkRequest.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIItemLinkRequest.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module APIItemLinkRequest {
  /**
   * Standard JavaScript object representation for APIItemLinkRequest
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for APIItemLinkRequest
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.APIGetItemLinksRequest
 */
export class APIGetItemLinksRequest implements GrpcMessage {
  static id = 'goautowp.APIGetItemLinksRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetItemLinksRequest();
    APIGetItemLinksRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetItemLinksRequest) {
    _instance.itemId = _instance.itemId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetItemLinksRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetItemLinksRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetItemLinksRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
  }

  private _itemId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetItemLinksRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetItemLinksRequest.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    APIGetItemLinksRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetItemLinksRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetItemLinksRequest.AsObject {
    return {
      itemId: this.itemId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetItemLinksRequest.AsProtobufJSON {
    return {
      itemId: this.itemId
    };
  }
}
export module APIGetItemLinksRequest {
  /**
   * Standard JavaScript object representation for APIGetItemLinksRequest
   */
  export interface AsObject {
    itemId: string;
  }

  /**
   * Protobuf JSON representation for APIGetItemLinksRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
  }
}

/**
 * Message implementation for goautowp.APIItemLinksResponse
 */
export class APIItemLinksResponse implements GrpcMessage {
  static id = 'goautowp.APIItemLinksResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIItemLinksResponse();
    APIItemLinksResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIItemLinksResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIItemLinksResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APIItemLink();
          _reader.readMessage(
            messageInitializer1,
            APIItemLink.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APIItemLinksResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIItemLinksResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APIItemLink.serializeBinaryToWriter
      );
    }
  }

  private _items?: APIItemLink[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItemLinksResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItemLinksResponse.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APIItemLink(m));
    APIItemLinksResponse.refineValues(this);
  }
  get items(): APIItemLink[] | undefined {
    return this._items;
  }
  set items(value: APIItemLink[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIItemLinksResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIItemLinksResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIItemLinksResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APIItemLinksResponse {
  /**
   * Standard JavaScript object representation for APIItemLinksResponse
   */
  export interface AsObject {
    items?: APIItemLink.AsObject[];
  }

  /**
   * Protobuf JSON representation for APIItemLinksResponse
   */
  export interface AsProtobufJSON {
    items: APIItemLink.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APIItemLink
 */
export class APIItemLink implements GrpcMessage {
  static id = 'goautowp.APIItemLink';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIItemLink();
    APIItemLink.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIItemLink) {
    _instance.id = _instance.id || '0';
    _instance.name = _instance.name || '';
    _instance.url = _instance.url || '';
    _instance.type = _instance.type || '';
    _instance.itemId = _instance.itemId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIItemLink,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.url = _reader.readString();
          break;
        case 4:
          _instance.type = _reader.readString();
          break;
        case 5:
          _instance.itemId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIItemLink.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIItemLink,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.url) {
      _writer.writeString(3, _instance.url);
    }
    if (_instance.type) {
      _writer.writeString(4, _instance.type);
    }
    if (_instance.itemId) {
      _writer.writeInt64String(5, _instance.itemId);
    }
  }

  private _id: string;
  private _name: string;
  private _url: string;
  private _type: string;
  private _itemId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItemLink to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItemLink.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.url = _value.url;
    this.type = _value.type;
    this.itemId = _value.itemId;
    APIItemLink.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get url(): string {
    return this._url;
  }
  set url(value: string) {
    this._url = value;
  }
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIItemLink.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIItemLink.AsObject {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      type: this.type,
      itemId: this.itemId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIItemLink.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      type: this.type,
      itemId: this.itemId
    };
  }
}
export module APIItemLink {
  /**
   * Standard JavaScript object representation for APIItemLink
   */
  export interface AsObject {
    id: string;
    name: string;
    url: string;
    type: string;
    itemId: string;
  }

  /**
   * Protobuf JSON representation for APIItemLink
   */
  export interface AsProtobufJSON {
    id: string;
    name: string;
    url: string;
    type: string;
    itemId: string;
  }
}

/**
 * Message implementation for goautowp.APICreateItemLinkResponse
 */
export class APICreateItemLinkResponse implements GrpcMessage {
  static id = 'goautowp.APICreateItemLinkResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICreateItemLinkResponse();
    APICreateItemLinkResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICreateItemLinkResponse) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICreateItemLinkResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APICreateItemLinkResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICreateItemLinkResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICreateItemLinkResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICreateItemLinkResponse.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    APICreateItemLinkResponse.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APICreateItemLinkResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICreateItemLinkResponse.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APICreateItemLinkResponse.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module APICreateItemLinkResponse {
  /**
   * Standard JavaScript object representation for APICreateItemLinkResponse
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for APICreateItemLinkResponse
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.APIGetItemVehicleTypesRequest
 */
export class APIGetItemVehicleTypesRequest implements GrpcMessage {
  static id = 'goautowp.APIGetItemVehicleTypesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetItemVehicleTypesRequest();
    APIGetItemVehicleTypesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetItemVehicleTypesRequest) {
    _instance.itemId = _instance.itemId || '0';
    _instance.vehicleTypeId = _instance.vehicleTypeId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetItemVehicleTypesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.vehicleTypeId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetItemVehicleTypesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetItemVehicleTypesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.vehicleTypeId) {
      _writer.writeInt64String(2, _instance.vehicleTypeId);
    }
  }

  private _itemId: string;
  private _vehicleTypeId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetItemVehicleTypesRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<APIGetItemVehicleTypesRequest.AsObject>
  ) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.vehicleTypeId = _value.vehicleTypeId;
    APIGetItemVehicleTypesRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get vehicleTypeId(): string {
    return this._vehicleTypeId;
  }
  set vehicleTypeId(value: string) {
    this._vehicleTypeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetItemVehicleTypesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetItemVehicleTypesRequest.AsObject {
    return {
      itemId: this.itemId,
      vehicleTypeId: this.vehicleTypeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetItemVehicleTypesRequest.AsProtobufJSON {
    return {
      itemId: this.itemId,
      vehicleTypeId: this.vehicleTypeId
    };
  }
}
export module APIGetItemVehicleTypesRequest {
  /**
   * Standard JavaScript object representation for APIGetItemVehicleTypesRequest
   */
  export interface AsObject {
    itemId: string;
    vehicleTypeId: string;
  }

  /**
   * Protobuf JSON representation for APIGetItemVehicleTypesRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
    vehicleTypeId: string;
  }
}

/**
 * Message implementation for goautowp.APIItemVehicleType
 */
export class APIItemVehicleType implements GrpcMessage {
  static id = 'goautowp.APIItemVehicleType';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIItemVehicleType();
    APIItemVehicleType.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIItemVehicleType) {
    _instance.itemId = _instance.itemId || '0';
    _instance.vehicleTypeId = _instance.vehicleTypeId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIItemVehicleType,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.vehicleTypeId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIItemVehicleType.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIItemVehicleType,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.vehicleTypeId) {
      _writer.writeInt64String(2, _instance.vehicleTypeId);
    }
  }

  private _itemId: string;
  private _vehicleTypeId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItemVehicleType to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItemVehicleType.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.vehicleTypeId = _value.vehicleTypeId;
    APIItemVehicleType.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get vehicleTypeId(): string {
    return this._vehicleTypeId;
  }
  set vehicleTypeId(value: string) {
    this._vehicleTypeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIItemVehicleType.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIItemVehicleType.AsObject {
    return {
      itemId: this.itemId,
      vehicleTypeId: this.vehicleTypeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIItemVehicleType.AsProtobufJSON {
    return {
      itemId: this.itemId,
      vehicleTypeId: this.vehicleTypeId
    };
  }
}
export module APIItemVehicleType {
  /**
   * Standard JavaScript object representation for APIItemVehicleType
   */
  export interface AsObject {
    itemId: string;
    vehicleTypeId: string;
  }

  /**
   * Protobuf JSON representation for APIItemVehicleType
   */
  export interface AsProtobufJSON {
    itemId: string;
    vehicleTypeId: string;
  }
}

/**
 * Message implementation for goautowp.APIGetItemVehicleTypesResponse
 */
export class APIGetItemVehicleTypesResponse implements GrpcMessage {
  static id = 'goautowp.APIGetItemVehicleTypesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetItemVehicleTypesResponse();
    APIGetItemVehicleTypesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetItemVehicleTypesResponse) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetItemVehicleTypesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APIItemVehicleType();
          _reader.readMessage(
            messageInitializer1,
            APIItemVehicleType.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetItemVehicleTypesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetItemVehicleTypesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APIItemVehicleType.serializeBinaryToWriter
      );
    }
  }

  private _items?: APIItemVehicleType[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetItemVehicleTypesResponse to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<APIGetItemVehicleTypesResponse.AsObject>
  ) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APIItemVehicleType(m));
    APIGetItemVehicleTypesResponse.refineValues(this);
  }
  get items(): APIItemVehicleType[] | undefined {
    return this._items;
  }
  set items(value: APIItemVehicleType[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetItemVehicleTypesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetItemVehicleTypesResponse.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetItemVehicleTypesResponse.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APIGetItemVehicleTypesResponse {
  /**
   * Standard JavaScript object representation for APIGetItemVehicleTypesResponse
   */
  export interface AsObject {
    items?: APIItemVehicleType.AsObject[];
  }

  /**
   * Protobuf JSON representation for APIGetItemVehicleTypesResponse
   */
  export interface AsProtobufJSON {
    items: APIItemVehicleType.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.APIItemVehicleTypeRequest
 */
export class APIItemVehicleTypeRequest implements GrpcMessage {
  static id = 'goautowp.APIItemVehicleTypeRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIItemVehicleTypeRequest();
    APIItemVehicleTypeRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIItemVehicleTypeRequest) {
    _instance.itemId = _instance.itemId || '0';
    _instance.vehicleTypeId = _instance.vehicleTypeId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIItemVehicleTypeRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.vehicleTypeId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIItemVehicleTypeRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIItemVehicleTypeRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.vehicleTypeId) {
      _writer.writeInt64String(2, _instance.vehicleTypeId);
    }
  }

  private _itemId: string;
  private _vehicleTypeId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItemVehicleTypeRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItemVehicleTypeRequest.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.vehicleTypeId = _value.vehicleTypeId;
    APIItemVehicleTypeRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get vehicleTypeId(): string {
    return this._vehicleTypeId;
  }
  set vehicleTypeId(value: string) {
    this._vehicleTypeId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIItemVehicleTypeRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIItemVehicleTypeRequest.AsObject {
    return {
      itemId: this.itemId,
      vehicleTypeId: this.vehicleTypeId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIItemVehicleTypeRequest.AsProtobufJSON {
    return {
      itemId: this.itemId,
      vehicleTypeId: this.vehicleTypeId
    };
  }
}
export module APIItemVehicleTypeRequest {
  /**
   * Standard JavaScript object representation for APIItemVehicleTypeRequest
   */
  export interface AsObject {
    itemId: string;
    vehicleTypeId: string;
  }

  /**
   * Protobuf JSON representation for APIItemVehicleTypeRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
    vehicleTypeId: string;
  }
}

/**
 * Message implementation for goautowp.APIGetItemLanguagesRequest
 */
export class APIGetItemLanguagesRequest implements GrpcMessage {
  static id = 'goautowp.APIGetItemLanguagesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetItemLanguagesRequest();
    APIGetItemLanguagesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetItemLanguagesRequest) {
    _instance.itemId = _instance.itemId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetItemLanguagesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetItemLanguagesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetItemLanguagesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
  }

  private _itemId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetItemLanguagesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetItemLanguagesRequest.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    APIGetItemLanguagesRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetItemLanguagesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetItemLanguagesRequest.AsObject {
    return {
      itemId: this.itemId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetItemLanguagesRequest.AsProtobufJSON {
    return {
      itemId: this.itemId
    };
  }
}
export module APIGetItemLanguagesRequest {
  /**
   * Standard JavaScript object representation for APIGetItemLanguagesRequest
   */
  export interface AsObject {
    itemId: string;
  }

  /**
   * Protobuf JSON representation for APIGetItemLanguagesRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
  }
}

/**
 * Message implementation for goautowp.ItemLanguages
 */
export class ItemLanguages implements GrpcMessage {
  static id = 'goautowp.ItemLanguages';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ItemLanguages();
    ItemLanguages.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ItemLanguages) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ItemLanguages,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new ItemLanguage();
          _reader.readMessage(
            messageInitializer1,
            ItemLanguage.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ItemLanguages.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ItemLanguages,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        ItemLanguage.serializeBinaryToWriter
      );
    }
  }

  private _items?: ItemLanguage[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ItemLanguages to deeply clone from
   */
  constructor(_value?: RecursivePartial<ItemLanguages.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new ItemLanguage(m));
    ItemLanguages.refineValues(this);
  }
  get items(): ItemLanguage[] | undefined {
    return this._items;
  }
  set items(value: ItemLanguage[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ItemLanguages.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ItemLanguages.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ItemLanguages.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module ItemLanguages {
  /**
   * Standard JavaScript object representation for ItemLanguages
   */
  export interface AsObject {
    items?: ItemLanguage.AsObject[];
  }

  /**
   * Protobuf JSON representation for ItemLanguages
   */
  export interface AsProtobufJSON {
    items: ItemLanguage.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.ItemLanguage
 */
export class ItemLanguage implements GrpcMessage {
  static id = 'goautowp.ItemLanguage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ItemLanguage();
    ItemLanguage.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ItemLanguage) {
    _instance.itemId = _instance.itemId || '0';
    _instance.language = _instance.language || '';
    _instance.name = _instance.name || '';
    _instance.textId = _instance.textId || '0';
    _instance.text = _instance.text || '';
    _instance.fullTextId = _instance.fullTextId || '0';
    _instance.fullText = _instance.fullText || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ItemLanguage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.language = _reader.readString();
          break;
        case 3:
          _instance.name = _reader.readString();
          break;
        case 4:
          _instance.textId = _reader.readInt64String();
          break;
        case 5:
          _instance.text = _reader.readString();
          break;
        case 6:
          _instance.fullTextId = _reader.readInt64String();
          break;
        case 7:
          _instance.fullText = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ItemLanguage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ItemLanguage,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.language) {
      _writer.writeString(2, _instance.language);
    }
    if (_instance.name) {
      _writer.writeString(3, _instance.name);
    }
    if (_instance.textId) {
      _writer.writeInt64String(4, _instance.textId);
    }
    if (_instance.text) {
      _writer.writeString(5, _instance.text);
    }
    if (_instance.fullTextId) {
      _writer.writeInt64String(6, _instance.fullTextId);
    }
    if (_instance.fullText) {
      _writer.writeString(7, _instance.fullText);
    }
  }

  private _itemId: string;
  private _language: string;
  private _name: string;
  private _textId: string;
  private _text: string;
  private _fullTextId: string;
  private _fullText: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ItemLanguage to deeply clone from
   */
  constructor(_value?: RecursivePartial<ItemLanguage.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.language = _value.language;
    this.name = _value.name;
    this.textId = _value.textId;
    this.text = _value.text;
    this.fullTextId = _value.fullTextId;
    this.fullText = _value.fullText;
    ItemLanguage.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get textId(): string {
    return this._textId;
  }
  set textId(value: string) {
    this._textId = value;
  }
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value;
  }
  get fullTextId(): string {
    return this._fullTextId;
  }
  set fullTextId(value: string) {
    this._fullTextId = value;
  }
  get fullText(): string {
    return this._fullText;
  }
  set fullText(value: string) {
    this._fullText = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ItemLanguage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ItemLanguage.AsObject {
    return {
      itemId: this.itemId,
      language: this.language,
      name: this.name,
      textId: this.textId,
      text: this.text,
      fullTextId: this.fullTextId,
      fullText: this.fullText
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ItemLanguage.AsProtobufJSON {
    return {
      itemId: this.itemId,
      language: this.language,
      name: this.name,
      textId: this.textId,
      text: this.text,
      fullTextId: this.fullTextId,
      fullText: this.fullText
    };
  }
}
export module ItemLanguage {
  /**
   * Standard JavaScript object representation for ItemLanguage
   */
  export interface AsObject {
    itemId: string;
    language: string;
    name: string;
    textId: string;
    text: string;
    fullTextId: string;
    fullText: string;
  }

  /**
   * Protobuf JSON representation for ItemLanguage
   */
  export interface AsProtobufJSON {
    itemId: string;
    language: string;
    name: string;
    textId: string;
    text: string;
    fullTextId: string;
    fullText: string;
  }
}

/**
 * Message implementation for goautowp.APIGetItemParentLanguagesRequest
 */
export class APIGetItemParentLanguagesRequest implements GrpcMessage {
  static id = 'goautowp.APIGetItemParentLanguagesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetItemParentLanguagesRequest();
    APIGetItemParentLanguagesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetItemParentLanguagesRequest) {
    _instance.itemId = _instance.itemId || '0';
    _instance.parentId = _instance.parentId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetItemParentLanguagesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.parentId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetItemParentLanguagesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetItemParentLanguagesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.parentId) {
      _writer.writeInt64String(2, _instance.parentId);
    }
  }

  private _itemId: string;
  private _parentId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetItemParentLanguagesRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<APIGetItemParentLanguagesRequest.AsObject>
  ) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.parentId = _value.parentId;
    APIGetItemParentLanguagesRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get parentId(): string {
    return this._parentId;
  }
  set parentId(value: string) {
    this._parentId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetItemParentLanguagesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetItemParentLanguagesRequest.AsObject {
    return {
      itemId: this.itemId,
      parentId: this.parentId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetItemParentLanguagesRequest.AsProtobufJSON {
    return {
      itemId: this.itemId,
      parentId: this.parentId
    };
  }
}
export module APIGetItemParentLanguagesRequest {
  /**
   * Standard JavaScript object representation for APIGetItemParentLanguagesRequest
   */
  export interface AsObject {
    itemId: string;
    parentId: string;
  }

  /**
   * Protobuf JSON representation for APIGetItemParentLanguagesRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
    parentId: string;
  }
}

/**
 * Message implementation for goautowp.ItemParentLanguages
 */
export class ItemParentLanguages implements GrpcMessage {
  static id = 'goautowp.ItemParentLanguages';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ItemParentLanguages();
    ItemParentLanguages.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ItemParentLanguages) {
    _instance.items = _instance.items || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ItemParentLanguages,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new ItemParentLanguage();
          _reader.readMessage(
            messageInitializer1,
            ItemParentLanguage.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        default:
          _reader.skipField();
      }
    }

    ItemParentLanguages.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ItemParentLanguages,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        ItemParentLanguage.serializeBinaryToWriter
      );
    }
  }

  private _items?: ItemParentLanguage[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ItemParentLanguages to deeply clone from
   */
  constructor(_value?: RecursivePartial<ItemParentLanguages.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new ItemParentLanguage(m));
    ItemParentLanguages.refineValues(this);
  }
  get items(): ItemParentLanguage[] | undefined {
    return this._items;
  }
  set items(value: ItemParentLanguage[] | undefined) {
    this._items = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ItemParentLanguages.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ItemParentLanguages.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ItemParentLanguages.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module ItemParentLanguages {
  /**
   * Standard JavaScript object representation for ItemParentLanguages
   */
  export interface AsObject {
    items?: ItemParentLanguage.AsObject[];
  }

  /**
   * Protobuf JSON representation for ItemParentLanguages
   */
  export interface AsProtobufJSON {
    items: ItemParentLanguage.AsProtobufJSON[] | null;
  }
}

/**
 * Message implementation for goautowp.ItemParentLanguage
 */
export class ItemParentLanguage implements GrpcMessage {
  static id = 'goautowp.ItemParentLanguage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new ItemParentLanguage();
    ItemParentLanguage.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: ItemParentLanguage) {
    _instance.itemId = _instance.itemId || '0';
    _instance.parentId = _instance.parentId || '0';
    _instance.name = _instance.name || '';
    _instance.language = _instance.language || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: ItemParentLanguage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.parentId = _reader.readInt64String();
          break;
        case 3:
          _instance.name = _reader.readString();
          break;
        case 4:
          _instance.language = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    ItemParentLanguage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: ItemParentLanguage,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.parentId) {
      _writer.writeInt64String(2, _instance.parentId);
    }
    if (_instance.name) {
      _writer.writeString(3, _instance.name);
    }
    if (_instance.language) {
      _writer.writeString(4, _instance.language);
    }
  }

  private _itemId: string;
  private _parentId: string;
  private _name: string;
  private _language: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ItemParentLanguage to deeply clone from
   */
  constructor(_value?: RecursivePartial<ItemParentLanguage.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.parentId = _value.parentId;
    this.name = _value.name;
    this.language = _value.language;
    ItemParentLanguage.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get parentId(): string {
    return this._parentId;
  }
  set parentId(value: string) {
    this._parentId = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get language(): string {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    ItemParentLanguage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): ItemParentLanguage.AsObject {
    return {
      itemId: this.itemId,
      parentId: this.parentId,
      name: this.name,
      language: this.language
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): ItemParentLanguage.AsProtobufJSON {
    return {
      itemId: this.itemId,
      parentId: this.parentId,
      name: this.name,
      language: this.language
    };
  }
}
export module ItemParentLanguage {
  /**
   * Standard JavaScript object representation for ItemParentLanguage
   */
  export interface AsObject {
    itemId: string;
    parentId: string;
    name: string;
    language: string;
  }

  /**
   * Protobuf JSON representation for ItemParentLanguage
   */
  export interface AsProtobufJSON {
    itemId: string;
    parentId: string;
    name: string;
    language: string;
  }
}

/**
 * Message implementation for goautowp.AddCommentRequest
 */
export class AddCommentRequest implements GrpcMessage {
  static id = 'goautowp.AddCommentRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AddCommentRequest();
    AddCommentRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AddCommentRequest) {
    _instance.itemId = _instance.itemId || '0';
    _instance.typeId = _instance.typeId || 0;
    _instance.message = _instance.message || '';
    _instance.moderatorAttention = _instance.moderatorAttention || false;
    _instance.parentId = _instance.parentId || '0';
    _instance.resolve = _instance.resolve || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AddCommentRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.itemId = _reader.readInt64String();
          break;
        case 2:
          _instance.typeId = _reader.readEnum();
          break;
        case 3:
          _instance.message = _reader.readString();
          break;
        case 4:
          _instance.moderatorAttention = _reader.readBool();
          break;
        case 5:
          _instance.parentId = _reader.readInt64String();
          break;
        case 6:
          _instance.resolve = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    AddCommentRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AddCommentRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.itemId) {
      _writer.writeInt64String(1, _instance.itemId);
    }
    if (_instance.typeId) {
      _writer.writeEnum(2, _instance.typeId);
    }
    if (_instance.message) {
      _writer.writeString(3, _instance.message);
    }
    if (_instance.moderatorAttention) {
      _writer.writeBool(4, _instance.moderatorAttention);
    }
    if (_instance.parentId) {
      _writer.writeInt64String(5, _instance.parentId);
    }
    if (_instance.resolve) {
      _writer.writeBool(6, _instance.resolve);
    }
  }

  private _itemId: string;
  private _typeId: CommentsType;
  private _message: string;
  private _moderatorAttention: boolean;
  private _parentId: string;
  private _resolve: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AddCommentRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<AddCommentRequest.AsObject>) {
    _value = _value || {};
    this.itemId = _value.itemId;
    this.typeId = _value.typeId;
    this.message = _value.message;
    this.moderatorAttention = _value.moderatorAttention;
    this.parentId = _value.parentId;
    this.resolve = _value.resolve;
    AddCommentRequest.refineValues(this);
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get typeId(): CommentsType {
    return this._typeId;
  }
  set typeId(value: CommentsType) {
    this._typeId = value;
  }
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }
  get moderatorAttention(): boolean {
    return this._moderatorAttention;
  }
  set moderatorAttention(value: boolean) {
    this._moderatorAttention = value;
  }
  get parentId(): string {
    return this._parentId;
  }
  set parentId(value: string) {
    this._parentId = value;
  }
  get resolve(): boolean {
    return this._resolve;
  }
  set resolve(value: boolean) {
    this._resolve = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AddCommentRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AddCommentRequest.AsObject {
    return {
      itemId: this.itemId,
      typeId: this.typeId,
      message: this.message,
      moderatorAttention: this.moderatorAttention,
      parentId: this.parentId,
      resolve: this.resolve
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AddCommentRequest.AsProtobufJSON {
    return {
      itemId: this.itemId,
      typeId:
        CommentsType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ],
      message: this.message,
      moderatorAttention: this.moderatorAttention,
      parentId: this.parentId,
      resolve: this.resolve
    };
  }
}
export module AddCommentRequest {
  /**
   * Standard JavaScript object representation for AddCommentRequest
   */
  export interface AsObject {
    itemId: string;
    typeId: CommentsType;
    message: string;
    moderatorAttention: boolean;
    parentId: string;
    resolve: boolean;
  }

  /**
   * Protobuf JSON representation for AddCommentRequest
   */
  export interface AsProtobufJSON {
    itemId: string;
    typeId: string;
    message: string;
    moderatorAttention: boolean;
    parentId: string;
    resolve: boolean;
  }
}

/**
 * Message implementation for goautowp.GetMessagePageRequest
 */
export class GetMessagePageRequest implements GrpcMessage {
  static id = 'goautowp.GetMessagePageRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetMessagePageRequest();
    GetMessagePageRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetMessagePageRequest) {
    _instance.messageId = _instance.messageId || '0';
    _instance.perPage = _instance.perPage || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetMessagePageRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.messageId = _reader.readInt64String();
          break;
        case 2:
          _instance.perPage = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    GetMessagePageRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetMessagePageRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.messageId) {
      _writer.writeInt64String(1, _instance.messageId);
    }
    if (_instance.perPage) {
      _writer.writeInt32(2, _instance.perPage);
    }
  }

  private _messageId: string;
  private _perPage: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetMessagePageRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetMessagePageRequest.AsObject>) {
    _value = _value || {};
    this.messageId = _value.messageId;
    this.perPage = _value.perPage;
    GetMessagePageRequest.refineValues(this);
  }
  get messageId(): string {
    return this._messageId;
  }
  set messageId(value: string) {
    this._messageId = value;
  }
  get perPage(): number {
    return this._perPage;
  }
  set perPage(value: number) {
    this._perPage = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetMessagePageRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetMessagePageRequest.AsObject {
    return {
      messageId: this.messageId,
      perPage: this.perPage
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetMessagePageRequest.AsProtobufJSON {
    return {
      messageId: this.messageId,
      perPage: this.perPage
    };
  }
}
export module GetMessagePageRequest {
  /**
   * Standard JavaScript object representation for GetMessagePageRequest
   */
  export interface AsObject {
    messageId: string;
    perPage: number;
  }

  /**
   * Protobuf JSON representation for GetMessagePageRequest
   */
  export interface AsProtobufJSON {
    messageId: string;
    perPage: number;
  }
}

/**
 * Message implementation for goautowp.CommentMessageFields
 */
export class CommentMessageFields implements GrpcMessage {
  static id = 'goautowp.CommentMessageFields';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CommentMessageFields();
    CommentMessageFields.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CommentMessageFields) {
    _instance.preview = _instance.preview || false;
    _instance.route = _instance.route || false;
    _instance.text = _instance.text || false;
    _instance.vote = _instance.vote || false;
    _instance.userVote = _instance.userVote || false;
    _instance.replies = _instance.replies || false;
    _instance.status = _instance.status || false;
    _instance.isNew = _instance.isNew || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CommentMessageFields,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.preview = _reader.readBool();
          break;
        case 2:
          _instance.route = _reader.readBool();
          break;
        case 3:
          _instance.text = _reader.readBool();
          break;
        case 4:
          _instance.vote = _reader.readBool();
          break;
        case 5:
          _instance.userVote = _reader.readBool();
          break;
        case 6:
          _instance.replies = _reader.readBool();
          break;
        case 7:
          _instance.status = _reader.readBool();
          break;
        case 8:
          _instance.isNew = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    CommentMessageFields.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CommentMessageFields,
    _writer: BinaryWriter
  ) {
    if (_instance.preview) {
      _writer.writeBool(1, _instance.preview);
    }
    if (_instance.route) {
      _writer.writeBool(2, _instance.route);
    }
    if (_instance.text) {
      _writer.writeBool(3, _instance.text);
    }
    if (_instance.vote) {
      _writer.writeBool(4, _instance.vote);
    }
    if (_instance.userVote) {
      _writer.writeBool(5, _instance.userVote);
    }
    if (_instance.replies) {
      _writer.writeBool(6, _instance.replies);
    }
    if (_instance.status) {
      _writer.writeBool(7, _instance.status);
    }
    if (_instance.isNew) {
      _writer.writeBool(8, _instance.isNew);
    }
  }

  private _preview: boolean;
  private _route: boolean;
  private _text: boolean;
  private _vote: boolean;
  private _userVote: boolean;
  private _replies: boolean;
  private _status: boolean;
  private _isNew: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentMessageFields to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentMessageFields.AsObject>) {
    _value = _value || {};
    this.preview = _value.preview;
    this.route = _value.route;
    this.text = _value.text;
    this.vote = _value.vote;
    this.userVote = _value.userVote;
    this.replies = _value.replies;
    this.status = _value.status;
    this.isNew = _value.isNew;
    CommentMessageFields.refineValues(this);
  }
  get preview(): boolean {
    return this._preview;
  }
  set preview(value: boolean) {
    this._preview = value;
  }
  get route(): boolean {
    return this._route;
  }
  set route(value: boolean) {
    this._route = value;
  }
  get text(): boolean {
    return this._text;
  }
  set text(value: boolean) {
    this._text = value;
  }
  get vote(): boolean {
    return this._vote;
  }
  set vote(value: boolean) {
    this._vote = value;
  }
  get userVote(): boolean {
    return this._userVote;
  }
  set userVote(value: boolean) {
    this._userVote = value;
  }
  get replies(): boolean {
    return this._replies;
  }
  set replies(value: boolean) {
    this._replies = value;
  }
  get status(): boolean {
    return this._status;
  }
  set status(value: boolean) {
    this._status = value;
  }
  get isNew(): boolean {
    return this._isNew;
  }
  set isNew(value: boolean) {
    this._isNew = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CommentMessageFields.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CommentMessageFields.AsObject {
    return {
      preview: this.preview,
      route: this.route,
      text: this.text,
      vote: this.vote,
      userVote: this.userVote,
      replies: this.replies,
      status: this.status,
      isNew: this.isNew
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CommentMessageFields.AsProtobufJSON {
    return {
      preview: this.preview,
      route: this.route,
      text: this.text,
      vote: this.vote,
      userVote: this.userVote,
      replies: this.replies,
      status: this.status,
      isNew: this.isNew
    };
  }
}
export module CommentMessageFields {
  /**
   * Standard JavaScript object representation for CommentMessageFields
   */
  export interface AsObject {
    preview: boolean;
    route: boolean;
    text: boolean;
    vote: boolean;
    userVote: boolean;
    replies: boolean;
    status: boolean;
    isNew: boolean;
  }

  /**
   * Protobuf JSON representation for CommentMessageFields
   */
  export interface AsProtobufJSON {
    preview: boolean;
    route: boolean;
    text: boolean;
    vote: boolean;
    userVote: boolean;
    replies: boolean;
    status: boolean;
    isNew: boolean;
  }
}

/**
 * Message implementation for goautowp.GetMessageRequest
 */
export class GetMessageRequest implements GrpcMessage {
  static id = 'goautowp.GetMessageRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetMessageRequest();
    GetMessageRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetMessageRequest) {
    _instance.id = _instance.id || '0';
    _instance.fields = _instance.fields || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetMessageRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.fields = new CommentMessageFields();
          _reader.readMessage(
            _instance.fields,
            CommentMessageFields.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    GetMessageRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetMessageRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.fields) {
      _writer.writeMessage(
        2,
        _instance.fields as any,
        CommentMessageFields.serializeBinaryToWriter
      );
    }
  }

  private _id: string;
  private _fields?: CommentMessageFields;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetMessageRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetMessageRequest.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.fields = _value.fields
      ? new CommentMessageFields(_value.fields)
      : undefined;
    GetMessageRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get fields(): CommentMessageFields | undefined {
    return this._fields;
  }
  set fields(value: CommentMessageFields | undefined) {
    this._fields = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetMessageRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetMessageRequest.AsObject {
    return {
      id: this.id,
      fields: this.fields ? this.fields.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetMessageRequest.AsProtobufJSON {
    return {
      id: this.id,
      fields: this.fields ? this.fields.toProtobufJSON(options) : null
    };
  }
}
export module GetMessageRequest {
  /**
   * Standard JavaScript object representation for GetMessageRequest
   */
  export interface AsObject {
    id: string;
    fields?: CommentMessageFields.AsObject;
  }

  /**
   * Protobuf JSON representation for GetMessageRequest
   */
  export interface AsProtobufJSON {
    id: string;
    fields: CommentMessageFields.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.GetMessagesRequest
 */
export class GetMessagesRequest implements GrpcMessage {
  static id = 'goautowp.GetMessagesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetMessagesRequest();
    GetMessagesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetMessagesRequest) {
    _instance.fields = _instance.fields || undefined;
    _instance.itemId = _instance.itemId || '0';
    _instance.typeId = _instance.typeId || 0;
    _instance.parentId = _instance.parentId || '0';
    _instance.noParents = _instance.noParents || false;
    _instance.userId = _instance.userId || '0';
    _instance.order = _instance.order || 0;
    _instance.userIdentity = _instance.userIdentity || '';
    _instance.moderatorAttention = _instance.moderatorAttention || 0;
    _instance.picturesOfItemId = _instance.picturesOfItemId || '0';
    _instance.limit = _instance.limit || 0;
    _instance.page = _instance.page || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetMessagesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.fields = new CommentMessageFields();
          _reader.readMessage(
            _instance.fields,
            CommentMessageFields.deserializeBinaryFromReader
          );
          break;
        case 2:
          _instance.itemId = _reader.readInt64String();
          break;
        case 3:
          _instance.typeId = _reader.readEnum();
          break;
        case 4:
          _instance.parentId = _reader.readInt64String();
          break;
        case 5:
          _instance.noParents = _reader.readBool();
          break;
        case 6:
          _instance.userId = _reader.readInt64String();
          break;
        case 7:
          _instance.order = _reader.readEnum();
          break;
        case 8:
          _instance.userIdentity = _reader.readString();
          break;
        case 9:
          _instance.moderatorAttention = _reader.readEnum();
          break;
        case 10:
          _instance.picturesOfItemId = _reader.readInt64String();
          break;
        case 11:
          _instance.limit = _reader.readInt32();
          break;
        case 12:
          _instance.page = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    GetMessagesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetMessagesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.fields) {
      _writer.writeMessage(
        1,
        _instance.fields as any,
        CommentMessageFields.serializeBinaryToWriter
      );
    }
    if (_instance.itemId) {
      _writer.writeInt64String(2, _instance.itemId);
    }
    if (_instance.typeId) {
      _writer.writeEnum(3, _instance.typeId);
    }
    if (_instance.parentId) {
      _writer.writeInt64String(4, _instance.parentId);
    }
    if (_instance.noParents) {
      _writer.writeBool(5, _instance.noParents);
    }
    if (_instance.userId) {
      _writer.writeInt64String(6, _instance.userId);
    }
    if (_instance.order) {
      _writer.writeEnum(7, _instance.order);
    }
    if (_instance.userIdentity) {
      _writer.writeString(8, _instance.userIdentity);
    }
    if (_instance.moderatorAttention) {
      _writer.writeEnum(9, _instance.moderatorAttention);
    }
    if (_instance.picturesOfItemId) {
      _writer.writeInt64String(10, _instance.picturesOfItemId);
    }
    if (_instance.limit) {
      _writer.writeInt32(11, _instance.limit);
    }
    if (_instance.page) {
      _writer.writeInt32(12, _instance.page);
    }
  }

  private _fields?: CommentMessageFields;
  private _itemId: string;
  private _typeId: CommentsType;
  private _parentId: string;
  private _noParents: boolean;
  private _userId: string;
  private _order: GetMessagesRequest.Order;
  private _userIdentity: string;
  private _moderatorAttention: ModeratorAttention;
  private _picturesOfItemId: string;
  private _limit: number;
  private _page: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetMessagesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetMessagesRequest.AsObject>) {
    _value = _value || {};
    this.fields = _value.fields
      ? new CommentMessageFields(_value.fields)
      : undefined;
    this.itemId = _value.itemId;
    this.typeId = _value.typeId;
    this.parentId = _value.parentId;
    this.noParents = _value.noParents;
    this.userId = _value.userId;
    this.order = _value.order;
    this.userIdentity = _value.userIdentity;
    this.moderatorAttention = _value.moderatorAttention;
    this.picturesOfItemId = _value.picturesOfItemId;
    this.limit = _value.limit;
    this.page = _value.page;
    GetMessagesRequest.refineValues(this);
  }
  get fields(): CommentMessageFields | undefined {
    return this._fields;
  }
  set fields(value: CommentMessageFields | undefined) {
    this._fields = value;
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get typeId(): CommentsType {
    return this._typeId;
  }
  set typeId(value: CommentsType) {
    this._typeId = value;
  }
  get parentId(): string {
    return this._parentId;
  }
  set parentId(value: string) {
    this._parentId = value;
  }
  get noParents(): boolean {
    return this._noParents;
  }
  set noParents(value: boolean) {
    this._noParents = value;
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get order(): GetMessagesRequest.Order {
    return this._order;
  }
  set order(value: GetMessagesRequest.Order) {
    this._order = value;
  }
  get userIdentity(): string {
    return this._userIdentity;
  }
  set userIdentity(value: string) {
    this._userIdentity = value;
  }
  get moderatorAttention(): ModeratorAttention {
    return this._moderatorAttention;
  }
  set moderatorAttention(value: ModeratorAttention) {
    this._moderatorAttention = value;
  }
  get picturesOfItemId(): string {
    return this._picturesOfItemId;
  }
  set picturesOfItemId(value: string) {
    this._picturesOfItemId = value;
  }
  get limit(): number {
    return this._limit;
  }
  set limit(value: number) {
    this._limit = value;
  }
  get page(): number {
    return this._page;
  }
  set page(value: number) {
    this._page = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetMessagesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetMessagesRequest.AsObject {
    return {
      fields: this.fields ? this.fields.toObject() : undefined,
      itemId: this.itemId,
      typeId: this.typeId,
      parentId: this.parentId,
      noParents: this.noParents,
      userId: this.userId,
      order: this.order,
      userIdentity: this.userIdentity,
      moderatorAttention: this.moderatorAttention,
      picturesOfItemId: this.picturesOfItemId,
      limit: this.limit,
      page: this.page
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): GetMessagesRequest.AsProtobufJSON {
    return {
      fields: this.fields ? this.fields.toProtobufJSON(options) : null,
      itemId: this.itemId,
      typeId:
        CommentsType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ],
      parentId: this.parentId,
      noParents: this.noParents,
      userId: this.userId,
      order:
        GetMessagesRequest.Order[
          this.order === null || this.order === undefined ? 0 : this.order
        ],
      userIdentity: this.userIdentity,
      moderatorAttention:
        ModeratorAttention[
          this.moderatorAttention === null ||
          this.moderatorAttention === undefined
            ? 0
            : this.moderatorAttention
        ],
      picturesOfItemId: this.picturesOfItemId,
      limit: this.limit,
      page: this.page
    };
  }
}
export module GetMessagesRequest {
  /**
   * Standard JavaScript object representation for GetMessagesRequest
   */
  export interface AsObject {
    fields?: CommentMessageFields.AsObject;
    itemId: string;
    typeId: CommentsType;
    parentId: string;
    noParents: boolean;
    userId: string;
    order: GetMessagesRequest.Order;
    userIdentity: string;
    moderatorAttention: ModeratorAttention;
    picturesOfItemId: string;
    limit: number;
    page: number;
  }

  /**
   * Protobuf JSON representation for GetMessagesRequest
   */
  export interface AsProtobufJSON {
    fields: CommentMessageFields.AsProtobufJSON | null;
    itemId: string;
    typeId: string;
    parentId: string;
    noParents: boolean;
    userId: string;
    order: string;
    userIdentity: string;
    moderatorAttention: string;
    picturesOfItemId: string;
    limit: number;
    page: number;
  }
  export enum Order {
    DEFAULT = 0,
    VOTE_DESC = 1,
    VOTE_ASC = 2,
    DATE_DESC = 3,
    DATE_ASC = 4
  }
}

/**
 * Message implementation for goautowp.APICommentsMessagePage
 */
export class APICommentsMessagePage implements GrpcMessage {
  static id = 'goautowp.APICommentsMessagePage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICommentsMessagePage();
    APICommentsMessagePage.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICommentsMessagePage) {
    _instance.typeId = _instance.typeId || 0;
    _instance.itemId = _instance.itemId || '0';
    _instance.page = _instance.page || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICommentsMessagePage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.typeId = _reader.readEnum();
          break;
        case 2:
          _instance.itemId = _reader.readInt64String();
          break;
        case 3:
          _instance.page = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    APICommentsMessagePage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICommentsMessagePage,
    _writer: BinaryWriter
  ) {
    if (_instance.typeId) {
      _writer.writeEnum(1, _instance.typeId);
    }
    if (_instance.itemId) {
      _writer.writeInt64String(2, _instance.itemId);
    }
    if (_instance.page) {
      _writer.writeInt32(3, _instance.page);
    }
  }

  private _typeId: CommentsType;
  private _itemId: string;
  private _page: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICommentsMessagePage to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICommentsMessagePage.AsObject>) {
    _value = _value || {};
    this.typeId = _value.typeId;
    this.itemId = _value.itemId;
    this.page = _value.page;
    APICommentsMessagePage.refineValues(this);
  }
  get typeId(): CommentsType {
    return this._typeId;
  }
  set typeId(value: CommentsType) {
    this._typeId = value;
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get page(): number {
    return this._page;
  }
  set page(value: number) {
    this._page = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APICommentsMessagePage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICommentsMessagePage.AsObject {
    return {
      typeId: this.typeId,
      itemId: this.itemId,
      page: this.page
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APICommentsMessagePage.AsProtobufJSON {
    return {
      typeId:
        CommentsType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ],
      itemId: this.itemId,
      page: this.page
    };
  }
}
export module APICommentsMessagePage {
  /**
   * Standard JavaScript object representation for APICommentsMessagePage
   */
  export interface AsObject {
    typeId: CommentsType;
    itemId: string;
    page: number;
  }

  /**
   * Protobuf JSON representation for APICommentsMessagePage
   */
  export interface AsProtobufJSON {
    typeId: string;
    itemId: string;
    page: number;
  }
}

/**
 * Message implementation for goautowp.APICommentsMessages
 */
export class APICommentsMessages implements GrpcMessage {
  static id = 'goautowp.APICommentsMessages';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICommentsMessages();
    APICommentsMessages.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICommentsMessages) {
    _instance.items = _instance.items || [];
    _instance.paginator = _instance.paginator || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICommentsMessages,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new APICommentsMessage();
          _reader.readMessage(
            messageInitializer1,
            APICommentsMessage.deserializeBinaryFromReader
          );
          (_instance.items = _instance.items || []).push(messageInitializer1);
          break;
        case 2:
          _instance.paginator = new Pages();
          _reader.readMessage(
            _instance.paginator,
            Pages.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    APICommentsMessages.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICommentsMessages,
    _writer: BinaryWriter
  ) {
    if (_instance.items && _instance.items.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.items as any,
        APICommentsMessage.serializeBinaryToWriter
      );
    }
    if (_instance.paginator) {
      _writer.writeMessage(
        2,
        _instance.paginator as any,
        Pages.serializeBinaryToWriter
      );
    }
  }

  private _items?: APICommentsMessage[];
  private _paginator?: Pages;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICommentsMessages to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICommentsMessages.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APICommentsMessage(m));
    this.paginator = _value.paginator ? new Pages(_value.paginator) : undefined;
    APICommentsMessages.refineValues(this);
  }
  get items(): APICommentsMessage[] | undefined {
    return this._items;
  }
  set items(value: APICommentsMessage[] | undefined) {
    this._items = value;
  }
  get paginator(): Pages | undefined {
    return this._paginator;
  }
  set paginator(value: Pages | undefined) {
    this._paginator = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APICommentsMessages.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICommentsMessages.AsObject {
    return {
      items: (this.items || []).map(m => m.toObject()),
      paginator: this.paginator ? this.paginator.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APICommentsMessages.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options)),
      paginator: this.paginator ? this.paginator.toProtobufJSON(options) : null
    };
  }
}
export module APICommentsMessages {
  /**
   * Standard JavaScript object representation for APICommentsMessages
   */
  export interface AsObject {
    items?: APICommentsMessage.AsObject[];
    paginator?: Pages.AsObject;
  }

  /**
   * Protobuf JSON representation for APICommentsMessages
   */
  export interface AsProtobufJSON {
    items: APICommentsMessage.AsProtobufJSON[] | null;
    paginator: Pages.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for goautowp.APICommentsMessage
 */
export class APICommentsMessage implements GrpcMessage {
  static id = 'goautowp.APICommentsMessage';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICommentsMessage();
    APICommentsMessage.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICommentsMessage) {
    _instance.id = _instance.id || '0';
    _instance.typeId = _instance.typeId || 0;
    _instance.itemId = _instance.itemId || '0';
    _instance.parentId = _instance.parentId || '0';
    _instance.createdAt = _instance.createdAt || undefined;
    _instance.deleted = _instance.deleted || false;
    _instance.moderatorAttention = _instance.moderatorAttention || 0;
    _instance.isNew = _instance.isNew || false;
    _instance.authorId = _instance.authorId || '0';
    _instance.ip = _instance.ip || '';
    _instance.text = _instance.text || '';
    _instance.vote = _instance.vote || 0;
    _instance.preview = _instance.preview || '';
    _instance.route = _instance.route || [];
    _instance.userVote = _instance.userVote || 0;
    _instance.replies = _instance.replies || [];
    _instance.pictureStatus = _instance.pictureStatus || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICommentsMessage,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.typeId = _reader.readEnum();
          break;
        case 3:
          _instance.itemId = _reader.readInt64String();
          break;
        case 4:
          _instance.parentId = _reader.readInt64String();
          break;
        case 5:
          _instance.createdAt = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.createdAt,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 6:
          _instance.deleted = _reader.readBool();
          break;
        case 7:
          _instance.moderatorAttention = _reader.readEnum();
          break;
        case 8:
          _instance.isNew = _reader.readBool();
          break;
        case 9:
          _instance.authorId = _reader.readInt64String();
          break;
        case 10:
          _instance.ip = _reader.readString();
          break;
        case 11:
          _instance.text = _reader.readString();
          break;
        case 12:
          _instance.vote = _reader.readInt32();
          break;
        case 13:
          _instance.preview = _reader.readString();
          break;
        case 14:
          (_instance.route = _instance.route || []).push(_reader.readString());
          break;
        case 15:
          _instance.userVote = _reader.readInt32();
          break;
        case 16:
          const messageInitializer16 = new APICommentsMessage();
          _reader.readMessage(
            messageInitializer16,
            APICommentsMessage.deserializeBinaryFromReader
          );
          (_instance.replies = _instance.replies || []).push(
            messageInitializer16
          );
          break;
        case 17:
          _instance.pictureStatus = _reader.readEnum();
          break;
        default:
          _reader.skipField();
      }
    }

    APICommentsMessage.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICommentsMessage,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.typeId) {
      _writer.writeEnum(2, _instance.typeId);
    }
    if (_instance.itemId) {
      _writer.writeInt64String(3, _instance.itemId);
    }
    if (_instance.parentId) {
      _writer.writeInt64String(4, _instance.parentId);
    }
    if (_instance.createdAt) {
      _writer.writeMessage(
        5,
        _instance.createdAt as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.deleted) {
      _writer.writeBool(6, _instance.deleted);
    }
    if (_instance.moderatorAttention) {
      _writer.writeEnum(7, _instance.moderatorAttention);
    }
    if (_instance.isNew) {
      _writer.writeBool(8, _instance.isNew);
    }
    if (_instance.authorId) {
      _writer.writeInt64String(9, _instance.authorId);
    }
    if (_instance.ip) {
      _writer.writeString(10, _instance.ip);
    }
    if (_instance.text) {
      _writer.writeString(11, _instance.text);
    }
    if (_instance.vote) {
      _writer.writeInt32(12, _instance.vote);
    }
    if (_instance.preview) {
      _writer.writeString(13, _instance.preview);
    }
    if (_instance.route && _instance.route.length) {
      _writer.writeRepeatedString(14, _instance.route);
    }
    if (_instance.userVote) {
      _writer.writeInt32(15, _instance.userVote);
    }
    if (_instance.replies && _instance.replies.length) {
      _writer.writeRepeatedMessage(
        16,
        _instance.replies as any,
        APICommentsMessage.serializeBinaryToWriter
      );
    }
    if (_instance.pictureStatus) {
      _writer.writeEnum(17, _instance.pictureStatus);
    }
  }

  private _id: string;
  private _typeId: CommentsType;
  private _itemId: string;
  private _parentId: string;
  private _createdAt?: googleProtobuf002.Timestamp;
  private _deleted: boolean;
  private _moderatorAttention: ModeratorAttention;
  private _isNew: boolean;
  private _authorId: string;
  private _ip: string;
  private _text: string;
  private _vote: number;
  private _preview: string;
  private _route: string[];
  private _userVote: number;
  private _replies?: APICommentsMessage[];
  private _pictureStatus: PictureStatus;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICommentsMessage to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICommentsMessage.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.typeId = _value.typeId;
    this.itemId = _value.itemId;
    this.parentId = _value.parentId;
    this.createdAt = _value.createdAt
      ? new googleProtobuf002.Timestamp(_value.createdAt)
      : undefined;
    this.deleted = _value.deleted;
    this.moderatorAttention = _value.moderatorAttention;
    this.isNew = _value.isNew;
    this.authorId = _value.authorId;
    this.ip = _value.ip;
    this.text = _value.text;
    this.vote = _value.vote;
    this.preview = _value.preview;
    this.route = (_value.route || []).slice();
    this.userVote = _value.userVote;
    this.replies = (_value.replies || []).map(m => new APICommentsMessage(m));
    this.pictureStatus = _value.pictureStatus;
    APICommentsMessage.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get typeId(): CommentsType {
    return this._typeId;
  }
  set typeId(value: CommentsType) {
    this._typeId = value;
  }
  get itemId(): string {
    return this._itemId;
  }
  set itemId(value: string) {
    this._itemId = value;
  }
  get parentId(): string {
    return this._parentId;
  }
  set parentId(value: string) {
    this._parentId = value;
  }
  get createdAt(): googleProtobuf002.Timestamp | undefined {
    return this._createdAt;
  }
  set createdAt(value: googleProtobuf002.Timestamp | undefined) {
    this._createdAt = value;
  }
  get deleted(): boolean {
    return this._deleted;
  }
  set deleted(value: boolean) {
    this._deleted = value;
  }
  get moderatorAttention(): ModeratorAttention {
    return this._moderatorAttention;
  }
  set moderatorAttention(value: ModeratorAttention) {
    this._moderatorAttention = value;
  }
  get isNew(): boolean {
    return this._isNew;
  }
  set isNew(value: boolean) {
    this._isNew = value;
  }
  get authorId(): string {
    return this._authorId;
  }
  set authorId(value: string) {
    this._authorId = value;
  }
  get ip(): string {
    return this._ip;
  }
  set ip(value: string) {
    this._ip = value;
  }
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value;
  }
  get vote(): number {
    return this._vote;
  }
  set vote(value: number) {
    this._vote = value;
  }
  get preview(): string {
    return this._preview;
  }
  set preview(value: string) {
    this._preview = value;
  }
  get route(): string[] {
    return this._route;
  }
  set route(value: string[]) {
    this._route = value;
  }
  get userVote(): number {
    return this._userVote;
  }
  set userVote(value: number) {
    this._userVote = value;
  }
  get replies(): APICommentsMessage[] | undefined {
    return this._replies;
  }
  set replies(value: APICommentsMessage[] | undefined) {
    this._replies = value;
  }
  get pictureStatus(): PictureStatus {
    return this._pictureStatus;
  }
  set pictureStatus(value: PictureStatus) {
    this._pictureStatus = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APICommentsMessage.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICommentsMessage.AsObject {
    return {
      id: this.id,
      typeId: this.typeId,
      itemId: this.itemId,
      parentId: this.parentId,
      createdAt: this.createdAt ? this.createdAt.toObject() : undefined,
      deleted: this.deleted,
      moderatorAttention: this.moderatorAttention,
      isNew: this.isNew,
      authorId: this.authorId,
      ip: this.ip,
      text: this.text,
      vote: this.vote,
      preview: this.preview,
      route: (this.route || []).slice(),
      userVote: this.userVote,
      replies: (this.replies || []).map(m => m.toObject()),
      pictureStatus: this.pictureStatus
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APICommentsMessage.AsProtobufJSON {
    return {
      id: this.id,
      typeId:
        CommentsType[
          this.typeId === null || this.typeId === undefined ? 0 : this.typeId
        ],
      itemId: this.itemId,
      parentId: this.parentId,
      createdAt: this.createdAt ? this.createdAt.toProtobufJSON(options) : null,
      deleted: this.deleted,
      moderatorAttention:
        ModeratorAttention[
          this.moderatorAttention === null ||
          this.moderatorAttention === undefined
            ? 0
            : this.moderatorAttention
        ],
      isNew: this.isNew,
      authorId: this.authorId,
      ip: this.ip,
      text: this.text,
      vote: this.vote,
      preview: this.preview,
      route: (this.route || []).slice(),
      userVote: this.userVote,
      replies: (this.replies || []).map(m => m.toProtobufJSON(options)),
      pictureStatus:
        PictureStatus[
          this.pictureStatus === null || this.pictureStatus === undefined
            ? 0
            : this.pictureStatus
        ]
    };
  }
}
export module APICommentsMessage {
  /**
   * Standard JavaScript object representation for APICommentsMessage
   */
  export interface AsObject {
    id: string;
    typeId: CommentsType;
    itemId: string;
    parentId: string;
    createdAt?: googleProtobuf002.Timestamp.AsObject;
    deleted: boolean;
    moderatorAttention: ModeratorAttention;
    isNew: boolean;
    authorId: string;
    ip: string;
    text: string;
    vote: number;
    preview: string;
    route: string[];
    userVote: number;
    replies?: APICommentsMessage.AsObject[];
    pictureStatus: PictureStatus;
  }

  /**
   * Protobuf JSON representation for APICommentsMessage
   */
  export interface AsProtobufJSON {
    id: string;
    typeId: string;
    itemId: string;
    parentId: string;
    createdAt: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    deleted: boolean;
    moderatorAttention: string;
    isNew: boolean;
    authorId: string;
    ip: string;
    text: string;
    vote: number;
    preview: string;
    route: string[];
    userVote: number;
    replies: APICommentsMessage.AsProtobufJSON[] | null;
    pictureStatus: string;
  }
}

/**
 * Message implementation for goautowp.AddCommentResponse
 */
export class AddCommentResponse implements GrpcMessage {
  static id = 'goautowp.AddCommentResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AddCommentResponse();
    AddCommentResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AddCommentResponse) {
    _instance.id = _instance.id || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AddCommentResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    AddCommentResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AddCommentResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
  }

  private _id: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AddCommentResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AddCommentResponse.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    AddCommentResponse.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AddCommentResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AddCommentResponse.AsObject {
    return {
      id: this.id
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): AddCommentResponse.AsProtobufJSON {
    return {
      id: this.id
    };
  }
}
export module AddCommentResponse {
  /**
   * Standard JavaScript object representation for AddCommentResponse
   */
  export interface AsObject {
    id: string;
  }

  /**
   * Protobuf JSON representation for AddCommentResponse
   */
  export interface AsProtobufJSON {
    id: string;
  }
}

/**
 * Message implementation for goautowp.APIGetTextRequest
 */
export class APIGetTextRequest implements GrpcMessage {
  static id = 'goautowp.APIGetTextRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetTextRequest();
    APIGetTextRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetTextRequest) {
    _instance.id = _instance.id || '0';
    _instance.revision = _instance.revision || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetTextRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.id = _reader.readInt64String();
          break;
        case 2:
          _instance.revision = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetTextRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetTextRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.id) {
      _writer.writeInt64String(1, _instance.id);
    }
    if (_instance.revision) {
      _writer.writeInt64String(2, _instance.revision);
    }
  }

  private _id: string;
  private _revision: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetTextRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetTextRequest.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.revision = _value.revision;
    APIGetTextRequest.refineValues(this);
  }
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get revision(): string {
    return this._revision;
  }
  set revision(value: string) {
    this._revision = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetTextRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetTextRequest.AsObject {
    return {
      id: this.id,
      revision: this.revision
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetTextRequest.AsProtobufJSON {
    return {
      id: this.id,
      revision: this.revision
    };
  }
}
export module APIGetTextRequest {
  /**
   * Standard JavaScript object representation for APIGetTextRequest
   */
  export interface AsObject {
    id: string;
    revision: string;
  }

  /**
   * Protobuf JSON representation for APIGetTextRequest
   */
  export interface AsProtobufJSON {
    id: string;
    revision: string;
  }
}

/**
 * Message implementation for goautowp.TextRevision
 */
export class TextRevision implements GrpcMessage {
  static id = 'goautowp.TextRevision';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new TextRevision();
    TextRevision.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: TextRevision) {
    _instance.text = _instance.text || '';
    _instance.revision = _instance.revision || '0';
    _instance.userId = _instance.userId || '0';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: TextRevision,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.text = _reader.readString();
          break;
        case 2:
          _instance.revision = _reader.readInt64String();
          break;
        case 3:
          _instance.userId = _reader.readInt64String();
          break;
        default:
          _reader.skipField();
      }
    }

    TextRevision.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: TextRevision,
    _writer: BinaryWriter
  ) {
    if (_instance.text) {
      _writer.writeString(1, _instance.text);
    }
    if (_instance.revision) {
      _writer.writeInt64String(2, _instance.revision);
    }
    if (_instance.userId) {
      _writer.writeInt64String(3, _instance.userId);
    }
  }

  private _text: string;
  private _revision: string;
  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of TextRevision to deeply clone from
   */
  constructor(_value?: RecursivePartial<TextRevision.AsObject>) {
    _value = _value || {};
    this.text = _value.text;
    this.revision = _value.revision;
    this.userId = _value.userId;
    TextRevision.refineValues(this);
  }
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value;
  }
  get revision(): string {
    return this._revision;
  }
  set revision(value: string) {
    this._revision = value;
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    TextRevision.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): TextRevision.AsObject {
    return {
      text: this.text,
      revision: this.revision,
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): TextRevision.AsProtobufJSON {
    return {
      text: this.text,
      revision: this.revision,
      userId: this.userId
    };
  }
}
export module TextRevision {
  /**
   * Standard JavaScript object representation for TextRevision
   */
  export interface AsObject {
    text: string;
    revision: string;
    userId: string;
  }

  /**
   * Protobuf JSON representation for TextRevision
   */
  export interface AsProtobufJSON {
    text: string;
    revision: string;
    userId: string;
  }
}

/**
 * Message implementation for goautowp.APIGetTextResponse
 */
export class APIGetTextResponse implements GrpcMessage {
  static id = 'goautowp.APIGetTextResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIGetTextResponse();
    APIGetTextResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIGetTextResponse) {
    _instance.current = _instance.current || undefined;
    _instance.prev = _instance.prev || undefined;
    _instance.next = _instance.next || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIGetTextResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.current = new TextRevision();
          _reader.readMessage(
            _instance.current,
            TextRevision.deserializeBinaryFromReader
          );
          break;
        case 2:
          _instance.prev = new TextRevision();
          _reader.readMessage(
            _instance.prev,
            TextRevision.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.next = new TextRevision();
          _reader.readMessage(
            _instance.next,
            TextRevision.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    APIGetTextResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIGetTextResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.current) {
      _writer.writeMessage(
        1,
        _instance.current as any,
        TextRevision.serializeBinaryToWriter
      );
    }
    if (_instance.prev) {
      _writer.writeMessage(
        2,
        _instance.prev as any,
        TextRevision.serializeBinaryToWriter
      );
    }
    if (_instance.next) {
      _writer.writeMessage(
        3,
        _instance.next as any,
        TextRevision.serializeBinaryToWriter
      );
    }
  }

  private _current?: TextRevision;
  private _prev?: TextRevision;
  private _next?: TextRevision;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetTextResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetTextResponse.AsObject>) {
    _value = _value || {};
    this.current = _value.current
      ? new TextRevision(_value.current)
      : undefined;
    this.prev = _value.prev ? new TextRevision(_value.prev) : undefined;
    this.next = _value.next ? new TextRevision(_value.next) : undefined;
    APIGetTextResponse.refineValues(this);
  }
  get current(): TextRevision | undefined {
    return this._current;
  }
  set current(value: TextRevision | undefined) {
    this._current = value;
  }
  get prev(): TextRevision | undefined {
    return this._prev;
  }
  set prev(value: TextRevision | undefined) {
    this._prev = value;
  }
  get next(): TextRevision | undefined {
    return this._next;
  }
  set next(value: TextRevision | undefined) {
    this._next = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIGetTextResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIGetTextResponse.AsObject {
    return {
      current: this.current ? this.current.toObject() : undefined,
      prev: this.prev ? this.prev.toObject() : undefined,
      next: this.next ? this.next.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): APIGetTextResponse.AsProtobufJSON {
    return {
      current: this.current ? this.current.toProtobufJSON(options) : null,
      prev: this.prev ? this.prev.toProtobufJSON(options) : null,
      next: this.next ? this.next.toProtobufJSON(options) : null
    };
  }
}
export module APIGetTextResponse {
  /**
   * Standard JavaScript object representation for APIGetTextResponse
   */
  export interface AsObject {
    current?: TextRevision.AsObject;
    prev?: TextRevision.AsObject;
    next?: TextRevision.AsObject;
  }

  /**
   * Protobuf JSON representation for APIGetTextResponse
   */
  export interface AsProtobufJSON {
    current: TextRevision.AsProtobufJSON | null;
    prev: TextRevision.AsProtobufJSON | null;
    next: TextRevision.AsProtobufJSON | null;
  }
}
