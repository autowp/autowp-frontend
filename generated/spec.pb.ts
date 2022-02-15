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
    retryInfo?: googleRpc003.RetryInfo.AsProtobufJSON | null;
    debugInfo?: googleRpc003.DebugInfo.AsProtobufJSON | null;
    quotaFailure?: googleRpc003.QuotaFailure.AsProtobufJSON | null;
    preconditionFailure?: googleRpc003.PreconditionFailure.AsProtobufJSON | null;
    badRequest?: googleRpc003.BadRequest.AsProtobufJSON | null;
    requestInfo?: googleRpc003.RequestInfo.AsProtobufJSON | null;
    help?: googleRpc003.Help.AsProtobufJSON | null;
    localizedMessage?: googleRpc003.LocalizedMessage.AsProtobufJSON | null;
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

  private _id?: number;
  private _name?: string;
  private _shortName?: string;
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
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get shortName(): string | undefined {
    return this._shortName;
  }
  set shortName(value: string | undefined) {
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
    id?: number;
    name?: string;
    shortName?: string;
    childs?: Spec.AsObject[];
  }

  /**
   * Protobuf JSON representation for Spec
   */
  export interface AsProtobufJSON {
    id?: number;
    name?: string;
    shortName?: string;
    childs?: Spec.AsProtobufJSON[] | null;
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
    items?: Spec.AsProtobufJSON[] | null;
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

  private _id?: number;
  private _name?: string;

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
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
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
    id?: number;
    name?: string;
  }

  /**
   * Protobuf JSON representation for Perspective
   */
  export interface AsProtobufJSON {
    id?: number;
    name?: string;
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
    items?: Perspective.AsProtobufJSON[] | null;
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

  private _id?: number;
  private _name?: string;
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
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
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
    id?: number;
    name?: string;
    perspectives?: Perspective.AsObject[];
  }

  /**
   * Protobuf JSON representation for PerspectiveGroup
   */
  export interface AsProtobufJSON {
    id?: number;
    name?: string;
    perspectives?: Perspective.AsProtobufJSON[] | null;
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

  private _id?: number;
  private _name?: string;
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
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
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
    id?: number;
    name?: string;
    groups?: PerspectiveGroup.AsObject[];
  }

  /**
   * Protobuf JSON representation for PerspectivePage
   */
  export interface AsProtobufJSON {
    id?: number;
    name?: string;
    groups?: PerspectiveGroup.AsProtobufJSON[] | null;
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
    items?: PerspectivePage.AsProtobufJSON[] | null;
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

  private _publicKey?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ReCaptchaConfig to deeply clone from
   */
  constructor(_value?: RecursivePartial<ReCaptchaConfig.AsObject>) {
    _value = _value || {};
    this.publicKey = _value.publicKey;
    ReCaptchaConfig.refineValues(this);
  }
  get publicKey(): string | undefined {
    return this._publicKey;
  }
  set publicKey(value: string | undefined) {
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
    publicKey?: string;
  }

  /**
   * Protobuf JSON representation for ReCaptchaConfig
   */
  export interface AsProtobufJSON {
    publicKey?: string;
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

  private _image?: string;
  private _css?: string;

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
  get image(): string | undefined {
    return this._image;
  }
  set image(value: string | undefined) {
    this._image = value;
  }
  get css(): string | undefined {
    return this._css;
  }
  set css(value: string | undefined) {
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
    image?: string;
    css?: string;
  }

  /**
   * Protobuf JSON representation for BrandIcons
   */
  export interface AsProtobufJSON {
    image?: string;
    css?: string;
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

  private _resource?: string;
  private _privilege?: string;

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
  get resource(): string | undefined {
    return this._resource;
  }
  set resource(value: string | undefined) {
    this._resource = value;
  }
  get privilege(): string | undefined {
    return this._privilege;
  }
  set privilege(value: string | undefined) {
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
    resource?: string;
    privilege?: string;
  }

  /**
   * Protobuf JSON representation for AclEnforceRequest
   */
  export interface AsProtobufJSON {
    resource?: string;
    privilege?: string;
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

  private _result?: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AclEnforceResult to deeply clone from
   */
  constructor(_value?: RecursivePartial<AclEnforceResult.AsObject>) {
    _value = _value || {};
    this.result = _value.result;
    AclEnforceResult.refineValues(this);
  }
  get result(): boolean | undefined {
    return this._result;
  }
  set result(value: boolean | undefined) {
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
    result?: boolean;
  }

  /**
   * Protobuf JSON representation for AclEnforceResult
   */
  export interface AsProtobufJSON {
    result?: boolean;
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

  private _id?: number;
  private _name?: string;
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
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
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
    id?: number;
    name?: string;
    childs?: VehicleType.AsObject[];
  }

  /**
   * Protobuf JSON representation for VehicleType
   */
  export interface AsProtobufJSON {
    id?: number;
    name?: string;
    childs?: VehicleType.AsProtobufJSON[] | null;
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
    items?: VehicleType.AsProtobufJSON[] | null;
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

  private _brandId?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetBrandVehicleTypesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetBrandVehicleTypesRequest.AsObject>) {
    _value = _value || {};
    this.brandId = _value.brandId;
    GetBrandVehicleTypesRequest.refineValues(this);
  }
  get brandId(): number | undefined {
    return this._brandId;
  }
  set brandId(value: number | undefined) {
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
    brandId?: number;
  }

  /**
   * Protobuf JSON representation for GetBrandVehicleTypesRequest
   */
  export interface AsProtobufJSON {
    brandId?: number;
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
    items?: BrandVehicleType.AsProtobufJSON[] | null;
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

  private _id?: number;
  private _name?: string;
  private _catname?: string;
  private _itemsCount?: string;

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
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get catname(): string | undefined {
    return this._catname;
  }
  set catname(value: string | undefined) {
    this._catname = value;
  }
  get itemsCount(): string | undefined {
    return this._itemsCount;
  }
  set itemsCount(value: string | undefined) {
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
    id?: number;
    name?: string;
    catname?: string;
    itemsCount?: string;
  }

  /**
   * Protobuf JSON representation for BrandVehicleType
   */
  export interface AsProtobufJSON {
    id?: number;
    name?: string;
    catname?: string;
    itemsCount?: string;
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

  private _userId?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CreateContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CreateContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    CreateContactRequest.refineValues(this);
  }
  get userId(): string | undefined {
    return this._userId;
  }
  set userId(value: string | undefined) {
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
    userId?: string;
  }

  /**
   * Protobuf JSON representation for CreateContactRequest
   */
  export interface AsProtobufJSON {
    userId?: string;
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

  private _userId?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of DeleteContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<DeleteContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    DeleteContactRequest.refineValues(this);
  }
  get userId(): string | undefined {
    return this._userId;
  }
  set userId(value: string | undefined) {
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
    userId?: string;
  }

  /**
   * Protobuf JSON representation for DeleteContactRequest
   */
  export interface AsProtobufJSON {
    userId?: string;
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

  private _userId?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    GetContactRequest.refineValues(this);
  }
  get userId(): string | undefined {
    return this._userId;
  }
  set userId(value: string | undefined) {
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
    userId?: string;
  }

  /**
   * Protobuf JSON representation for GetContactRequest
   */
  export interface AsProtobufJSON {
    userId?: string;
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

  private _id?: number;
  private _src?: string;
  private _width?: number;
  private _height?: number;
  private _filesize?: number;

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
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }
  get src(): string | undefined {
    return this._src;
  }
  set src(value: string | undefined) {
    this._src = value;
  }
  get width(): number | undefined {
    return this._width;
  }
  set width(value: number | undefined) {
    this._width = value;
  }
  get height(): number | undefined {
    return this._height;
  }
  set height(value: number | undefined) {
    this._height = value;
  }
  get filesize(): number | undefined {
    return this._filesize;
  }
  set filesize(value: number | undefined) {
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
    id?: number;
    src?: string;
    width?: number;
    height?: number;
    filesize?: number;
  }

  /**
   * Protobuf JSON representation for APIImage
   */
  export interface AsProtobufJSON {
    id?: number;
    src?: string;
    width?: number;
    height?: number;
    filesize?: number;
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

  private _id?: string;
  private _name?: string;
  private _deleted?: boolean;
  private _longAway?: boolean;
  private _green?: boolean;
  private _route?: string[];
  private _identity?: string;
  private _avatar?: APIImage;
  private _gravatar?: string;
  private _lastOnline?: googleProtobuf002.Timestamp;
  private _specsWeight?: number;

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
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get deleted(): boolean | undefined {
    return this._deleted;
  }
  set deleted(value: boolean | undefined) {
    this._deleted = value;
  }
  get longAway(): boolean | undefined {
    return this._longAway;
  }
  set longAway(value: boolean | undefined) {
    this._longAway = value;
  }
  get green(): boolean | undefined {
    return this._green;
  }
  set green(value: boolean | undefined) {
    this._green = value;
  }
  get route(): string[] | undefined {
    return this._route;
  }
  set route(value: string[] | undefined) {
    this._route = value;
  }
  get identity(): string | undefined {
    return this._identity;
  }
  set identity(value: string | undefined) {
    this._identity = value;
  }
  get avatar(): APIImage | undefined {
    return this._avatar;
  }
  set avatar(value: APIImage | undefined) {
    this._avatar = value;
  }
  get gravatar(): string | undefined {
    return this._gravatar;
  }
  set gravatar(value: string | undefined) {
    this._gravatar = value;
  }
  get lastOnline(): googleProtobuf002.Timestamp | undefined {
    return this._lastOnline;
  }
  set lastOnline(value: googleProtobuf002.Timestamp | undefined) {
    this._lastOnline = value;
  }
  get specsWeight(): number | undefined {
    return this._specsWeight;
  }
  set specsWeight(value: number | undefined) {
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
    id?: string;
    name?: string;
    deleted?: boolean;
    longAway?: boolean;
    green?: boolean;
    route?: string[];
    identity?: string;
    avatar?: APIImage.AsObject;
    gravatar?: string;
    lastOnline?: googleProtobuf002.Timestamp.AsObject;
    specsWeight?: number;
  }

  /**
   * Protobuf JSON representation for APIUser
   */
  export interface AsProtobufJSON {
    id?: string;
    name?: string;
    deleted?: boolean;
    longAway?: boolean;
    green?: boolean;
    route?: string[];
    identity?: string;
    avatar?: APIImage.AsProtobufJSON | null;
    gravatar?: string;
    lastOnline?: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    specsWeight?: number;
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

  private _contactUserId?: string;
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
  get contactUserId(): string | undefined {
    return this._contactUserId;
  }
  set contactUserId(value: string | undefined) {
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
    contactUserId?: string;
    user?: APIUser.AsObject;
  }

  /**
   * Protobuf JSON representation for Contact
   */
  export interface AsProtobufJSON {
    contactUserId?: string;
    user?: APIUser.AsProtobufJSON | null;
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
    items?: Contact.AsProtobufJSON[] | null;
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
  static refineValues(_instance: GetContactsRequest) {
    _instance.fields = _instance.fields || [];
  }

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
        case 1:
          (_instance.fields = _instance.fields || []).push(
            _reader.readString()
          );
          break;
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
  ) {
    if (_instance.fields && _instance.fields.length) {
      _writer.writeRepeatedString(1, _instance.fields);
    }
  }

  private _fields?: string[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetContactsRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetContactsRequest.AsObject>) {
    _value = _value || {};
    this.fields = (_value.fields || []).slice();
    GetContactsRequest.refineValues(this);
  }
  get fields(): string[] | undefined {
    return this._fields;
  }
  set fields(value: string[] | undefined) {
    this._fields = value;
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
    return {
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
  ): GetContactsRequest.AsProtobufJSON {
    return {
      fields: (this.fields || []).slice()
    };
  }
}
export module GetContactsRequest {
  /**
   * Standard JavaScript object representation for GetContactsRequest
   */
  export interface AsObject {
    fields?: string[];
  }

  /**
   * Protobuf JSON representation for GetContactsRequest
   */
  export interface AsProtobufJSON {
    fields?: string[];
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
    _instance.commentId = _instance.commentId || 0;
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
          _instance.commentId = _reader.readInt32();
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
      _writer.writeInt32(1, _instance.commentId);
    }
  }

  private _commentId?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetCommentVotesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetCommentVotesRequest.AsObject>) {
    _value = _value || {};
    this.commentId = _value.commentId;
    GetCommentVotesRequest.refineValues(this);
  }
  get commentId(): number | undefined {
    return this._commentId;
  }
  set commentId(value: number | undefined) {
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
    commentId?: number;
  }

  /**
   * Protobuf JSON representation for GetCommentVotesRequest
   */
  export interface AsProtobufJSON {
    commentId?: number;
  }
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
    items?: CommentVote.AsProtobufJSON[] | null;
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

  private _value?: CommentVote.VoteValue;
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
  get value(): CommentVote.VoteValue | undefined {
    return this._value;
  }
  set value(value: CommentVote.VoteValue | undefined) {
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
    value?: CommentVote.VoteValue;
    user?: APIUser.AsObject;
  }

  /**
   * Protobuf JSON representation for CommentVote
   */
  export interface AsProtobufJSON {
    value?: string;
    user?: APIUser.AsProtobufJSON | null;
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
  private _byUserId?: string;
  private _byUser?: APIUser;
  private _reason?: string;

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
  get byUserId(): string | undefined {
    return this._byUserId;
  }
  set byUserId(value: string | undefined) {
    this._byUserId = value;
  }
  get byUser(): APIUser | undefined {
    return this._byUser;
  }
  set byUser(value: APIUser | undefined) {
    this._byUser = value;
  }
  get reason(): string | undefined {
    return this._reason;
  }
  set reason(value: string | undefined) {
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
    byUserId?: string;
    byUser?: APIUser.AsObject;
    reason?: string;
  }

  /**
   * Protobuf JSON representation for APIBanItem
   */
  export interface AsProtobufJSON {
    until?: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    byUserId?: string;
    byUser?: APIUser.AsProtobufJSON | null;
    reason?: string;
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

  private _ip?: string;
  private _count?: number;
  private _ban?: APIBanItem;
  private _inWhitelist?: boolean;
  private _whoisUrl?: string;

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
  get ip(): string | undefined {
    return this._ip;
  }
  set ip(value: string | undefined) {
    this._ip = value;
  }
  get count(): number | undefined {
    return this._count;
  }
  set count(value: number | undefined) {
    this._count = value;
  }
  get ban(): APIBanItem | undefined {
    return this._ban;
  }
  set ban(value: APIBanItem | undefined) {
    this._ban = value;
  }
  get inWhitelist(): boolean | undefined {
    return this._inWhitelist;
  }
  set inWhitelist(value: boolean | undefined) {
    this._inWhitelist = value;
  }
  get whoisUrl(): string | undefined {
    return this._whoisUrl;
  }
  set whoisUrl(value: string | undefined) {
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
    ip?: string;
    count?: number;
    ban?: APIBanItem.AsObject;
    inWhitelist?: boolean;
    whoisUrl?: string;
  }

  /**
   * Protobuf JSON representation for APITrafficTopItem
   */
  export interface AsProtobufJSON {
    ip?: string;
    count?: number;
    ban?: APIBanItem.AsProtobufJSON | null;
    inWhitelist?: boolean;
    whoisUrl?: string;
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
    items?: APITrafficTopItem.AsProtobufJSON[] | null;
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

  private _ip?: string;
  private _fields?: string[];

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
  get ip(): string | undefined {
    return this._ip;
  }
  set ip(value: string | undefined) {
    this._ip = value;
  }
  get fields(): string[] | undefined {
    return this._fields;
  }
  set fields(value: string[] | undefined) {
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
    ip?: string;
    fields?: string[];
  }

  /**
   * Protobuf JSON representation for APIGetIPRequest
   */
  export interface AsProtobufJSON {
    ip?: string;
    fields?: string[];
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

  private _addToBlacklist?: boolean;
  private _removeFromBlacklist?: boolean;

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
  get addToBlacklist(): boolean | undefined {
    return this._addToBlacklist;
  }
  set addToBlacklist(value: boolean | undefined) {
    this._addToBlacklist = value;
  }
  get removeFromBlacklist(): boolean | undefined {
    return this._removeFromBlacklist;
  }
  set removeFromBlacklist(value: boolean | undefined) {
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
    addToBlacklist?: boolean;
    removeFromBlacklist?: boolean;
  }

  /**
   * Protobuf JSON representation for APIIPRights
   */
  export interface AsProtobufJSON {
    addToBlacklist?: boolean;
    removeFromBlacklist?: boolean;
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

  private _address?: string;
  private _hostname?: string;
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
  get address(): string | undefined {
    return this._address;
  }
  set address(value: string | undefined) {
    this._address = value;
  }
  get hostname(): string | undefined {
    return this._hostname;
  }
  set hostname(value: string | undefined) {
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
    address?: string;
    hostname?: string;
    blacklist?: APIBanItem.AsObject;
    rights?: APIIPRights.AsObject;
  }

  /**
   * Protobuf JSON representation for APIIP
   */
  export interface AsProtobufJSON {
    address?: string;
    hostname?: string;
    blacklist?: APIBanItem.AsProtobufJSON | null;
    rights?: APIIPRights.AsProtobufJSON | null;
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

  private _name?: string;
  private _email?: string;
  private _message?: string;
  private _captcha?: string;

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
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get email(): string | undefined {
    return this._email;
  }
  set email(value: string | undefined) {
    this._email = value;
  }
  get message(): string | undefined {
    return this._message;
  }
  set message(value: string | undefined) {
    this._message = value;
  }
  get captcha(): string | undefined {
    return this._captcha;
  }
  set captcha(value: string | undefined) {
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
    name?: string;
    email?: string;
    message?: string;
    captcha?: string;
  }

  /**
   * Protobuf JSON representation for APICreateFeedbackRequest
   */
  export interface AsProtobufJSON {
    name?: string;
    email?: string;
    message?: string;
    captcha?: string;
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

  private _ip?: string;

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
  get ip(): string | undefined {
    return this._ip;
  }
  set ip(value: string | undefined) {
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
    ip?: string;
  }

  /**
   * Protobuf JSON representation for DeleteFromTrafficWhitelistRequest
   */
  export interface AsProtobufJSON {
    ip?: string;
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

  private _ip?: string;

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
  get ip(): string | undefined {
    return this._ip;
  }
  set ip(value: string | undefined) {
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
    ip?: string;
  }

  /**
   * Protobuf JSON representation for DeleteFromTrafficBlacklistRequest
   */
  export interface AsProtobufJSON {
    ip?: string;
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

  private _ip?: string;
  private _period?: number;
  private _reason?: string;

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
  get ip(): string | undefined {
    return this._ip;
  }
  set ip(value: string | undefined) {
    this._ip = value;
  }
  get period(): number | undefined {
    return this._period;
  }
  set period(value: number | undefined) {
    this._period = value;
  }
  get reason(): string | undefined {
    return this._reason;
  }
  set reason(value: string | undefined) {
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
    ip?: string;
    period?: number;
    reason?: string;
  }

  /**
   * Protobuf JSON representation for AddToTrafficBlacklistRequest
   */
  export interface AsProtobufJSON {
    ip?: string;
    period?: number;
    reason?: string;
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

  private _ip?: string;

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
  get ip(): string | undefined {
    return this._ip;
  }
  set ip(value: string | undefined) {
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
    ip?: string;
  }

  /**
   * Protobuf JSON representation for AddToTrafficWhitelistRequest
   */
  export interface AsProtobufJSON {
    ip?: string;
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

  private _ip?: string;
  private _description?: string;

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
  get ip(): string | undefined {
    return this._ip;
  }
  set ip(value: string | undefined) {
    this._ip = value;
  }
  get description(): string | undefined {
    return this._description;
  }
  set description(value: string | undefined) {
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
    ip?: string;
    description?: string;
  }

  /**
   * Protobuf JSON representation for APITrafficWhitelistItem
   */
  export interface AsProtobufJSON {
    ip?: string;
    description?: string;
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
    items?: APITrafficWhitelistItem.AsProtobufJSON[] | null;
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

  private _subscriptionsCount?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIForumsUserSummary to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIForumsUserSummary.AsObject>) {
    _value = _value || {};
    this.subscriptionsCount = _value.subscriptionsCount;
    APIForumsUserSummary.refineValues(this);
  }
  get subscriptionsCount(): number | undefined {
    return this._subscriptionsCount;
  }
  set subscriptionsCount(value: number | undefined) {
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
    subscriptionsCount?: number;
  }

  /**
   * Protobuf JSON representation for APIForumsUserSummary
   */
  export interface AsProtobufJSON {
    subscriptionsCount?: number;
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

  private _count?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIMessageNewCount to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIMessageNewCount.AsObject>) {
    _value = _value || {};
    this.count = _value.count;
    APIMessageNewCount.refineValues(this);
  }
  get count(): number | undefined {
    return this._count;
  }
  set count(value: number | undefined) {
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
    count?: number;
  }

  /**
   * Protobuf JSON representation for APIMessageNewCount
   */
  export interface AsProtobufJSON {
    count?: number;
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

  private _inboxCount?: number;
  private _inboxNewCount?: number;
  private _sentCount?: number;
  private _systemCount?: number;
  private _systemNewCount?: number;

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
  get inboxCount(): number | undefined {
    return this._inboxCount;
  }
  set inboxCount(value: number | undefined) {
    this._inboxCount = value;
  }
  get inboxNewCount(): number | undefined {
    return this._inboxNewCount;
  }
  set inboxNewCount(value: number | undefined) {
    this._inboxNewCount = value;
  }
  get sentCount(): number | undefined {
    return this._sentCount;
  }
  set sentCount(value: number | undefined) {
    this._sentCount = value;
  }
  get systemCount(): number | undefined {
    return this._systemCount;
  }
  set systemCount(value: number | undefined) {
    this._systemCount = value;
  }
  get systemNewCount(): number | undefined {
    return this._systemNewCount;
  }
  set systemNewCount(value: number | undefined) {
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
    inboxCount?: number;
    inboxNewCount?: number;
    sentCount?: number;
    systemCount?: number;
    systemNewCount?: number;
  }

  /**
   * Protobuf JSON representation for APIMessageSummary
   */
  export interface AsProtobufJSON {
    inboxCount?: number;
    inboxNewCount?: number;
    sentCount?: number;
    systemCount?: number;
    systemNewCount?: number;
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

  private _userId?: string;
  private _password?: string;

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
  get userId(): string | undefined {
    return this._userId;
  }
  set userId(value: string | undefined) {
    this._userId = value;
  }
  get password(): string | undefined {
    return this._password;
  }
  set password(value: string | undefined) {
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
    userId?: string;
    password?: string;
  }

  /**
   * Protobuf JSON representation for APIDeleteUserRequest
   */
  export interface AsProtobufJSON {
    userId?: string;
    password?: string;
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
  static refineValues(_instance: APIMeRequest) {
    _instance.fields = _instance.fields || [];
  }

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
        case 1:
          (_instance.fields = _instance.fields || []).push(
            _reader.readString()
          );
          break;
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
  ) {
    if (_instance.fields && _instance.fields.length) {
      _writer.writeRepeatedString(1, _instance.fields);
    }
  }

  private _fields?: string[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIMeRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIMeRequest.AsObject>) {
    _value = _value || {};
    this.fields = (_value.fields || []).slice();
    APIMeRequest.refineValues(this);
  }
  get fields(): string[] | undefined {
    return this._fields;
  }
  set fields(value: string[] | undefined) {
    this._fields = value;
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
    return {
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
  ): APIMeRequest.AsProtobufJSON {
    return {
      fields: (this.fields || []).slice()
    };
  }
}
export module APIMeRequest {
  /**
   * Standard JavaScript object representation for APIMeRequest
   */
  export interface AsObject {
    fields?: string[];
  }

  /**
   * Protobuf JSON representation for APIMeRequest
   */
  export interface AsProtobufJSON {
    fields?: string[];
  }
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
    _instance.fields = _instance.fields || [];
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
        case 2:
          (_instance.fields = _instance.fields || []).push(
            _reader.readString()
          );
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
    if (_instance.fields && _instance.fields.length) {
      _writer.writeRepeatedString(2, _instance.fields);
    }
  }

  private _userId?: string;
  private _fields?: string[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIGetUserRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIGetUserRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    this.fields = (_value.fields || []).slice();
    APIGetUserRequest.refineValues(this);
  }
  get userId(): string | undefined {
    return this._userId;
  }
  set userId(value: string | undefined) {
    this._userId = value;
  }
  get fields(): string[] | undefined {
    return this._fields;
  }
  set fields(value: string[] | undefined) {
    this._fields = value;
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
      userId: this.userId,
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
  ): APIGetUserRequest.AsProtobufJSON {
    return {
      userId: this.userId,
      fields: (this.fields || []).slice()
    };
  }
}
export module APIGetUserRequest {
  /**
   * Standard JavaScript object representation for APIGetUserRequest
   */
  export interface AsObject {
    userId?: string;
    fields?: string[];
  }

  /**
   * Protobuf JSON representation for APIGetUserRequest
   */
  export interface AsProtobufJSON {
    userId?: string;
    fields?: string[];
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

  private _language?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTopBrandsListRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTopBrandsListRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    GetTopBrandsListRequest.refineValues(this);
  }
  get language(): string | undefined {
    return this._language;
  }
  set language(value: string | undefined) {
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
    language?: string;
  }

  /**
   * Protobuf JSON representation for GetTopBrandsListRequest
   */
  export interface AsProtobufJSON {
    language?: string;
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
  private _total?: number;

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
  get total(): number | undefined {
    return this._total;
  }
  set total(value: number | undefined) {
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
    total?: number;
  }

  /**
   * Protobuf JSON representation for APITopBrandsList
   */
  export interface AsProtobufJSON {
    brands?: APITopBrandsListItem.AsProtobufJSON[] | null;
    total?: number;
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

  private _id?: string;
  private _catname?: string;
  private _name?: string;
  private _itemsCount?: number;
  private _newItemsCount?: number;

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
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }
  get catname(): string | undefined {
    return this._catname;
  }
  set catname(value: string | undefined) {
    this._catname = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get itemsCount(): number | undefined {
    return this._itemsCount;
  }
  set itemsCount(value: number | undefined) {
    this._itemsCount = value;
  }
  get newItemsCount(): number | undefined {
    return this._newItemsCount;
  }
  set newItemsCount(value: number | undefined) {
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
    id?: string;
    catname?: string;
    name?: string;
    itemsCount?: number;
    newItemsCount?: number;
  }

  /**
   * Protobuf JSON representation for APITopBrandsListItem
   */
  export interface AsProtobufJSON {
    id?: string;
    catname?: string;
    name?: string;
    itemsCount?: number;
    newItemsCount?: number;
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

  private _language?: string;
  private _pictureItemType?: PictureItemType;

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
  get language(): string | undefined {
    return this._language;
  }
  set language(value: string | undefined) {
    this._language = value;
  }
  get pictureItemType(): PictureItemType | undefined {
    return this._pictureItemType;
  }
  set pictureItemType(value: PictureItemType | undefined) {
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
    language?: string;
    pictureItemType?: PictureItemType;
  }

  /**
   * Protobuf JSON representation for GetTopPersonsListRequest
   */
  export interface AsProtobufJSON {
    language?: string;
    pictureItemType?: string;
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

  private _language?: string;

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
  get language(): string | undefined {
    return this._language;
  }
  set language(value: string | undefined) {
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
    language?: string;
  }

  /**
   * Protobuf JSON representation for GetTopTwinsBrandsListRequest
   */
  export interface AsProtobufJSON {
    language?: string;
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

  private _language?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTopCategoriesListRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTopCategoriesListRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    GetTopCategoriesListRequest.refineValues(this);
  }
  get language(): string | undefined {
    return this._language;
  }
  set language(value: string | undefined) {
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
    language?: string;
  }

  /**
   * Protobuf JSON representation for GetTopCategoriesListRequest
   */
  export interface AsProtobufJSON {
    language?: string;
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

  private _language?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetTopFactoriesListRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetTopFactoriesListRequest.AsObject>) {
    _value = _value || {};
    this.language = _value.language;
    GetTopFactoriesListRequest.refineValues(this);
  }
  get language(): string | undefined {
    return this._language;
  }
  set language(value: string | undefined) {
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
    language?: string;
  }

  /**
   * Protobuf JSON representation for GetTopFactoriesListRequest
   */
  export interface AsProtobufJSON {
    language?: string;
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
    items?: APITopPersonsListItem.AsProtobufJSON[] | null;
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

  private _id?: string;
  private _name?: string;

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
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
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
    id?: string;
    name?: string;
  }

  /**
   * Protobuf JSON representation for APITopPersonsListItem
   */
  export interface AsProtobufJSON {
    id?: string;
    name?: string;
  }
}

/**
 * Message implementation for goautowp.APITopTwinsBrandsListItem
 */
export class APITopTwinsBrandsListItem implements GrpcMessage {
  static id = 'goautowp.APITopTwinsBrandsListItem';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APITopTwinsBrandsListItem();
    APITopTwinsBrandsListItem.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APITopTwinsBrandsListItem) {
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
    _instance: APITopTwinsBrandsListItem,
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

    APITopTwinsBrandsListItem.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APITopTwinsBrandsListItem,
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

  private _id?: string;
  private _name?: string;
  private _catname?: string;
  private _count?: number;
  private _newCount?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopTwinsBrandsListItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopTwinsBrandsListItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.catname = _value.catname;
    this.count = _value.count;
    this.newCount = _value.newCount;
    APITopTwinsBrandsListItem.refineValues(this);
  }
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get catname(): string | undefined {
    return this._catname;
  }
  set catname(value: string | undefined) {
    this._catname = value;
  }
  get count(): number | undefined {
    return this._count;
  }
  set count(value: number | undefined) {
    this._count = value;
  }
  get newCount(): number | undefined {
    return this._newCount;
  }
  set newCount(value: number | undefined) {
    this._newCount = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APITopTwinsBrandsListItem.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APITopTwinsBrandsListItem.AsObject {
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
  ): APITopTwinsBrandsListItem.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      catname: this.catname,
      count: this.count,
      newCount: this.newCount
    };
  }
}
export module APITopTwinsBrandsListItem {
  /**
   * Standard JavaScript object representation for APITopTwinsBrandsListItem
   */
  export interface AsObject {
    id?: string;
    name?: string;
    catname?: string;
    count?: number;
    newCount?: number;
  }

  /**
   * Protobuf JSON representation for APITopTwinsBrandsListItem
   */
  export interface AsProtobufJSON {
    id?: string;
    name?: string;
    catname?: string;
    count?: number;
    newCount?: number;
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
          const messageInitializer1 = new APITopTwinsBrandsListItem();
          _reader.readMessage(
            messageInitializer1,
            APITopTwinsBrandsListItem.deserializeBinaryFromReader
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
        APITopTwinsBrandsListItem.serializeBinaryToWriter
      );
    }
    if (_instance.count) {
      _writer.writeInt32(2, _instance.count);
    }
  }

  private _items?: APITopTwinsBrandsListItem[];
  private _count?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APITopTwinsBrandsList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APITopTwinsBrandsList.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(
      m => new APITopTwinsBrandsListItem(m)
    );
    this.count = _value.count;
    APITopTwinsBrandsList.refineValues(this);
  }
  get items(): APITopTwinsBrandsListItem[] | undefined {
    return this._items;
  }
  set items(value: APITopTwinsBrandsListItem[] | undefined) {
    this._items = value;
  }
  get count(): number | undefined {
    return this._count;
  }
  set count(value: number | undefined) {
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
    items?: APITopTwinsBrandsListItem.AsObject[];
    count?: number;
  }

  /**
   * Protobuf JSON representation for APITopTwinsBrandsList
   */
  export interface AsProtobufJSON {
    items?: APITopTwinsBrandsListItem.AsProtobufJSON[] | null;
    count?: number;
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
    items?: APITopCategoriesListItem.AsProtobufJSON[] | null;
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

  private _id?: string;
  private _name?: string;
  private _catname?: string;
  private _count?: number;
  private _newCount?: number;

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
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get catname(): string | undefined {
    return this._catname;
  }
  set catname(value: string | undefined) {
    this._catname = value;
  }
  get count(): number | undefined {
    return this._count;
  }
  set count(value: number | undefined) {
    this._count = value;
  }
  get newCount(): number | undefined {
    return this._newCount;
  }
  set newCount(value: number | undefined) {
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
    id?: string;
    name?: string;
    catname?: string;
    count?: number;
    newCount?: number;
  }

  /**
   * Protobuf JSON representation for APITopCategoriesListItem
   */
  export interface AsProtobufJSON {
    id?: string;
    name?: string;
    catname?: string;
    count?: number;
    newCount?: number;
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
    items?: APITopFactoriesListItem.AsProtobufJSON[] | null;
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

  private _id?: string;
  private _name?: string;
  private _count?: number;
  private _newCount?: number;

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
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get count(): number | undefined {
    return this._count;
  }
  set count(value: number | undefined) {
    this._count = value;
  }
  get newCount(): number | undefined {
    return this._newCount;
  }
  set newCount(value: number | undefined) {
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
    id?: string;
    name?: string;
    count?: number;
    newCount?: number;
  }

  /**
   * Protobuf JSON representation for APITopFactoriesListItem
   */
  export interface AsProtobufJSON {
    id?: string;
    name?: string;
    count?: number;
    newCount?: number;
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

  private _typeId?: ItemPictureType;
  private _pictures?: PicturesRequest;
  private _perspectiveId?: number;

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
  get typeId(): ItemPictureType | undefined {
    return this._typeId;
  }
  set typeId(value: ItemPictureType | undefined) {
    this._typeId = value;
  }
  get pictures(): PicturesRequest | undefined {
    return this._pictures;
  }
  set pictures(value: PicturesRequest | undefined) {
    this._pictures = value;
  }
  get perspectiveId(): number | undefined {
    return this._perspectiveId;
  }
  set perspectiveId(value: number | undefined) {
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
    typeId?: ItemPictureType;
    pictures?: PicturesRequest.AsObject;
    perspectiveId?: number;
  }

  /**
   * Protobuf JSON representation for ItemPicturesRequest
   */
  export interface AsProtobufJSON {
    typeId?: string;
    pictures?: PicturesRequest.AsProtobufJSON | null;
    perspectiveId?: number;
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
  }

  private _status?: PictureStatus;
  private _itemPicture?: ItemPicturesRequest;

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
    PicturesRequest.refineValues(this);
  }
  get status(): PictureStatus | undefined {
    return this._status;
  }
  set status(value: PictureStatus | undefined) {
    this._status = value;
  }
  get itemPicture(): ItemPicturesRequest | undefined {
    return this._itemPicture;
  }
  set itemPicture(value: ItemPicturesRequest | undefined) {
    this._itemPicture = value;
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
      itemPicture: this.itemPicture ? this.itemPicture.toObject() : undefined
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
        : null
    };
  }
}
export module PicturesRequest {
  /**
   * Standard JavaScript object representation for PicturesRequest
   */
  export interface AsObject {
    status?: PictureStatus;
    itemPicture?: ItemPicturesRequest.AsObject;
  }

  /**
   * Protobuf JSON representation for PicturesRequest
   */
  export interface AsProtobufJSON {
    status?: string;
    itemPicture?: ItemPicturesRequest.AsProtobufJSON | null;
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

  private _nameText?: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of PictureFields to deeply clone from
   */
  constructor(_value?: RecursivePartial<PictureFields.AsObject>) {
    _value = _value || {};
    this.nameText = _value.nameText;
    PictureFields.refineValues(this);
  }
  get nameText(): boolean | undefined {
    return this._nameText;
  }
  set nameText(value: boolean | undefined) {
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
    nameText?: boolean;
  }

  /**
   * Protobuf JSON representation for PictureFields
   */
  export interface AsProtobufJSON {
    nameText?: boolean;
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

  private _route?: boolean;
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
  get route(): boolean | undefined {
    return this._route;
  }
  set route(value: boolean | undefined) {
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
    route?: boolean;
    picture?: PictureFields.AsObject;
  }

  /**
   * Protobuf JSON representation for PreviewPicturesFields
   */
  export interface AsProtobufJSON {
    route?: boolean;
    picture?: PictureFields.AsProtobufJSON | null;
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
    _instance.nameHtml = _instance.nameHtml || false;
    _instance.nameDefault = _instance.nameDefault || false;
    _instance.description = _instance.description || false;
    _instance.hasText = _instance.hasText || false;
    _instance.previewPictures = _instance.previewPictures || undefined;
    _instance.totalPictures = _instance.totalPictures || false;
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
          _instance.nameHtml = _reader.readBool();
          break;
        case 2:
          _instance.nameDefault = _reader.readBool();
          break;
        case 3:
          _instance.description = _reader.readBool();
          break;
        case 4:
          _instance.hasText = _reader.readBool();
          break;
        case 5:
          _instance.previewPictures = new PreviewPicturesFields();
          _reader.readMessage(
            _instance.previewPictures,
            PreviewPicturesFields.deserializeBinaryFromReader
          );
          break;
        case 6:
          _instance.totalPictures = _reader.readBool();
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
    if (_instance.nameHtml) {
      _writer.writeBool(1, _instance.nameHtml);
    }
    if (_instance.nameDefault) {
      _writer.writeBool(2, _instance.nameDefault);
    }
    if (_instance.description) {
      _writer.writeBool(3, _instance.description);
    }
    if (_instance.hasText) {
      _writer.writeBool(4, _instance.hasText);
    }
    if (_instance.previewPictures) {
      _writer.writeMessage(
        5,
        _instance.previewPictures as any,
        PreviewPicturesFields.serializeBinaryToWriter
      );
    }
    if (_instance.totalPictures) {
      _writer.writeBool(6, _instance.totalPictures);
    }
  }

  private _nameHtml?: boolean;
  private _nameDefault?: boolean;
  private _description?: boolean;
  private _hasText?: boolean;
  private _previewPictures?: PreviewPicturesFields;
  private _totalPictures?: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of ItemFields to deeply clone from
   */
  constructor(_value?: RecursivePartial<ItemFields.AsObject>) {
    _value = _value || {};
    this.nameHtml = _value.nameHtml;
    this.nameDefault = _value.nameDefault;
    this.description = _value.description;
    this.hasText = _value.hasText;
    this.previewPictures = _value.previewPictures
      ? new PreviewPicturesFields(_value.previewPictures)
      : undefined;
    this.totalPictures = _value.totalPictures;
    ItemFields.refineValues(this);
  }
  get nameHtml(): boolean | undefined {
    return this._nameHtml;
  }
  set nameHtml(value: boolean | undefined) {
    this._nameHtml = value;
  }
  get nameDefault(): boolean | undefined {
    return this._nameDefault;
  }
  set nameDefault(value: boolean | undefined) {
    this._nameDefault = value;
  }
  get description(): boolean | undefined {
    return this._description;
  }
  set description(value: boolean | undefined) {
    this._description = value;
  }
  get hasText(): boolean | undefined {
    return this._hasText;
  }
  set hasText(value: boolean | undefined) {
    this._hasText = value;
  }
  get previewPictures(): PreviewPicturesFields | undefined {
    return this._previewPictures;
  }
  set previewPictures(value: PreviewPicturesFields | undefined) {
    this._previewPictures = value;
  }
  get totalPictures(): boolean | undefined {
    return this._totalPictures;
  }
  set totalPictures(value: boolean | undefined) {
    this._totalPictures = value;
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
      nameHtml: this.nameHtml,
      nameDefault: this.nameDefault,
      description: this.description,
      hasText: this.hasText,
      previewPictures: this.previewPictures
        ? this.previewPictures.toObject()
        : undefined,
      totalPictures: this.totalPictures
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
      nameHtml: this.nameHtml,
      nameDefault: this.nameDefault,
      description: this.description,
      hasText: this.hasText,
      previewPictures: this.previewPictures
        ? this.previewPictures.toProtobufJSON(options)
        : null,
      totalPictures: this.totalPictures
    };
  }
}
export module ItemFields {
  /**
   * Standard JavaScript object representation for ItemFields
   */
  export interface AsObject {
    nameHtml?: boolean;
    nameDefault?: boolean;
    description?: boolean;
    hasText?: boolean;
    previewPictures?: PreviewPicturesFields.AsObject;
    totalPictures?: boolean;
  }

  /**
   * Protobuf JSON representation for ItemFields
   */
  export interface AsProtobufJSON {
    nameHtml?: boolean;
    nameDefault?: boolean;
    description?: boolean;
    hasText?: boolean;
    previewPictures?: PreviewPicturesFields.AsProtobufJSON | null;
    totalPictures?: boolean;
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
    _instance.limit = _instance.limit || '0';
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
          _instance.limit = _reader.readUint64String();
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
      _writer.writeUint64String(6, _instance.limit);
    }
  }

  private _language?: string;
  private _fields?: ItemFields;
  private _typeId?: ItemType;
  private _descendantPictures?: ItemPicturesRequest;
  private _previewPictures?: ItemPicturesRequest;
  private _limit?: string;

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
    ListItemsRequest.refineValues(this);
  }
  get language(): string | undefined {
    return this._language;
  }
  set language(value: string | undefined) {
    this._language = value;
  }
  get fields(): ItemFields | undefined {
    return this._fields;
  }
  set fields(value: ItemFields | undefined) {
    this._fields = value;
  }
  get typeId(): ItemType | undefined {
    return this._typeId;
  }
  set typeId(value: ItemType | undefined) {
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
  get limit(): string | undefined {
    return this._limit;
  }
  set limit(value: string | undefined) {
    this._limit = value;
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
      limit: this.limit
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
      limit: this.limit
    };
  }
}
export module ListItemsRequest {
  /**
   * Standard JavaScript object representation for ListItemsRequest
   */
  export interface AsObject {
    language?: string;
    fields?: ItemFields.AsObject;
    typeId?: ItemType;
    descendantPictures?: ItemPicturesRequest.AsObject;
    previewPictures?: ItemPicturesRequest.AsObject;
    limit?: string;
  }

  /**
   * Protobuf JSON representation for ListItemsRequest
   */
  export interface AsProtobufJSON {
    language?: string;
    fields?: ItemFields.AsProtobufJSON | null;
    typeId?: string;
    descendantPictures?: ItemPicturesRequest.AsProtobufJSON | null;
    previewPictures?: ItemPicturesRequest.AsProtobufJSON | null;
    limit?: string;
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
    _instance.name = _instance.name || '';
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
          _instance.name = _reader.readString();
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
    if (_instance.name) {
      _writer.writeString(3, _instance.name);
    }
  }

  private _id?: string;
  private _catname?: string;
  private _name?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItem to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItem.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.catname = _value.catname;
    this.name = _value.name;
    APIItem.refineValues(this);
  }
  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }
  get catname(): string | undefined {
    return this._catname;
  }
  set catname(value: string | undefined) {
    this._catname = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
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
  ): APIItem.AsProtobufJSON {
    return {
      id: this.id,
      catname: this.catname,
      name: this.name
    };
  }
}
export module APIItem {
  /**
   * Standard JavaScript object representation for APIItem
   */
  export interface AsObject {
    id?: string;
    catname?: string;
    name?: string;
  }

  /**
   * Protobuf JSON representation for APIItem
   */
  export interface AsProtobufJSON {
    id?: string;
    catname?: string;
    name?: string;
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
  }

  private _items?: APIItem[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIItemList to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIItemList.AsObject>) {
    _value = _value || {};
    this.items = (_value.items || []).map(m => new APIItem(m));
    APIItemList.refineValues(this);
  }
  get items(): APIItem[] | undefined {
    return this._items;
  }
  set items(value: APIItem[] | undefined) {
    this._items = value;
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
  ): APIItemList.AsProtobufJSON {
    return {
      items: (this.items || []).map(m => m.toProtobufJSON(options))
    };
  }
}
export module APIItemList {
  /**
   * Standard JavaScript object representation for APIItemList
   */
  export interface AsObject {
    items?: APIItem.AsObject[];
  }

  /**
   * Protobuf JSON representation for APIItemList
   */
  export interface AsProtobufJSON {
    items?: APIItem.AsProtobufJSON[] | null;
  }
}
