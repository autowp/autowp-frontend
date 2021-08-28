/* tslint:disable */
/* eslint-disable */
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
    _instance.userId = _instance.userId || 0;
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
          _instance.userId = _reader.readInt32();
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
      _writer.writeInt32(1, _instance.userId);
    }
  }

  private _userId?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CreateContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CreateContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    CreateContactRequest.refineValues(this);
  }
  get userId(): number | undefined {
    return this._userId;
  }
  set userId(value: number | undefined) {
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
    userId?: number;
  }

  /**
   * Protobuf JSON representation for CreateContactRequest
   */
  export interface AsProtobufJSON {
    userId?: number;
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
    _instance.userId = _instance.userId || 0;
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
          _instance.userId = _reader.readInt32();
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
      _writer.writeInt32(1, _instance.userId);
    }
  }

  private _userId?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of DeleteContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<DeleteContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    DeleteContactRequest.refineValues(this);
  }
  get userId(): number | undefined {
    return this._userId;
  }
  set userId(value: number | undefined) {
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
    userId?: number;
  }

  /**
   * Protobuf JSON representation for DeleteContactRequest
   */
  export interface AsProtobufJSON {
    userId?: number;
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
    _instance.userId = _instance.userId || 0;
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
          _instance.userId = _reader.readInt32();
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
      _writer.writeInt32(1, _instance.userId);
    }
  }

  private _userId?: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetContactRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetContactRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    GetContactRequest.refineValues(this);
  }
  get userId(): number | undefined {
    return this._userId;
  }
  set userId(value: number | undefined) {
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
    userId?: number;
  }

  /**
   * Protobuf JSON representation for GetContactRequest
   */
  export interface AsProtobufJSON {
    userId?: number;
  }
}

/**
 * Message implementation for goautowp.User
 */
export class User implements GrpcMessage {
  static id = 'goautowp.User';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new User();
    User.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: User) {
    _instance.id = _instance.id || 0;
    _instance.name = _instance.name || '';
    _instance.deleted = _instance.deleted || false;
    _instance.longAway = _instance.longAway || false;
    _instance.green = _instance.green || false;
    _instance.route = _instance.route || [];
    _instance.identity = _instance.identity || '';
    _instance.avatar = _instance.avatar || '';
    _instance.gravatar = _instance.gravatar || '';
    _instance.lastOnline = _instance.lastOnline || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(_instance: User, _reader: BinaryReader) {
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
          _instance.avatar = _reader.readString();
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
        default:
          _reader.skipField();
      }
    }

    User.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: User, _writer: BinaryWriter) {
    if (_instance.id) {
      _writer.writeInt32(1, _instance.id);
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
      _writer.writeString(8, _instance.avatar);
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
  }

  private _id?: number;
  private _name?: string;
  private _deleted?: boolean;
  private _longAway?: boolean;
  private _green?: boolean;
  private _route?: string[];
  private _identity?: string;
  private _avatar?: string;
  private _gravatar?: string;
  private _lastOnline?: googleProtobuf002.Timestamp;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of User to deeply clone from
   */
  constructor(_value?: RecursivePartial<User.AsObject>) {
    _value = _value || {};
    this.id = _value.id;
    this.name = _value.name;
    this.deleted = _value.deleted;
    this.longAway = _value.longAway;
    this.green = _value.green;
    this.route = (_value.route || []).slice();
    this.identity = _value.identity;
    this.avatar = _value.avatar;
    this.gravatar = _value.gravatar;
    this.lastOnline = _value.lastOnline
      ? new googleProtobuf002.Timestamp(_value.lastOnline)
      : undefined;
    User.refineValues(this);
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
  get avatar(): string | undefined {
    return this._avatar;
  }
  set avatar(value: string | undefined) {
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

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    User.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): User.AsObject {
    return {
      id: this.id,
      name: this.name,
      deleted: this.deleted,
      longAway: this.longAway,
      green: this.green,
      route: (this.route || []).slice(),
      identity: this.identity,
      avatar: this.avatar,
      gravatar: this.gravatar,
      lastOnline: this.lastOnline ? this.lastOnline.toObject() : undefined
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
  ): User.AsProtobufJSON {
    return {
      id: this.id,
      name: this.name,
      deleted: this.deleted,
      longAway: this.longAway,
      green: this.green,
      route: (this.route || []).slice(),
      identity: this.identity,
      avatar: this.avatar,
      gravatar: this.gravatar,
      lastOnline: this.lastOnline
        ? this.lastOnline.toProtobufJSON(options)
        : null
    };
  }
}
export module User {
  /**
   * Standard JavaScript object representation for User
   */
  export interface AsObject {
    id?: number;
    name?: string;
    deleted?: boolean;
    longAway?: boolean;
    green?: boolean;
    route?: string[];
    identity?: string;
    avatar?: string;
    gravatar?: string;
    lastOnline?: googleProtobuf002.Timestamp.AsObject;
  }

  /**
   * Protobuf JSON representation for User
   */
  export interface AsProtobufJSON {
    id?: number;
    name?: string;
    deleted?: boolean;
    longAway?: boolean;
    green?: boolean;
    route?: string[];
    identity?: string;
    avatar?: string;
    gravatar?: string;
    lastOnline?: googleProtobuf002.Timestamp.AsProtobufJSON | null;
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
    _instance.contactUserId = _instance.contactUserId || 0;
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
          _instance.contactUserId = _reader.readInt32();
          break;
        case 2:
          _instance.user = new User();
          _reader.readMessage(_instance.user, User.deserializeBinaryFromReader);
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
      _writer.writeInt32(1, _instance.contactUserId);
    }
    if (_instance.user) {
      _writer.writeMessage(
        2,
        _instance.user as any,
        User.serializeBinaryToWriter
      );
    }
  }

  private _contactUserId?: number;
  private _user?: User;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Contact to deeply clone from
   */
  constructor(_value?: RecursivePartial<Contact.AsObject>) {
    _value = _value || {};
    this.contactUserId = _value.contactUserId;
    this.user = _value.user ? new User(_value.user) : undefined;
    Contact.refineValues(this);
  }
  get contactUserId(): number | undefined {
    return this._contactUserId;
  }
  set contactUserId(value: number | undefined) {
    this._contactUserId = value;
  }
  get user(): User | undefined {
    return this._user;
  }
  set user(value: User | undefined) {
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
    contactUserId?: number;
    user?: User.AsObject;
  }

  /**
   * Protobuf JSON representation for Contact
   */
  export interface AsProtobufJSON {
    contactUserId?: number;
    user?: User.AsProtobufJSON | null;
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
          _instance.user = new User();
          _reader.readMessage(_instance.user, User.deserializeBinaryFromReader);
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
        User.serializeBinaryToWriter
      );
    }
  }

  private _value?: CommentVote.VoteValue;
  private _user?: User;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CommentVote to deeply clone from
   */
  constructor(_value?: RecursivePartial<CommentVote.AsObject>) {
    _value = _value || {};
    this.value = _value.value;
    this.user = _value.user ? new User(_value.user) : undefined;
    CommentVote.refineValues(this);
  }
  get value(): CommentVote.VoteValue | undefined {
    return this._value;
  }
  set value(value: CommentVote.VoteValue | undefined) {
    this._value = value;
  }
  get user(): User | undefined {
    return this._user;
  }
  set user(value: User | undefined) {
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
      value: CommentVote.VoteValue[this.value ?? 0],
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
    user?: User.AsObject;
  }

  /**
   * Protobuf JSON representation for CommentVote
   */
  export interface AsProtobufJSON {
    value?: string;
    user?: User.AsProtobufJSON | null;
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
    _instance.byUserId = _instance.byUserId || 0;
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
          _instance.byUserId = _reader.readInt32();
          break;
        case 3:
          _instance.byUser = new User();
          _reader.readMessage(
            _instance.byUser,
            User.deserializeBinaryFromReader
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
      _writer.writeInt32(2, _instance.byUserId);
    }
    if (_instance.byUser) {
      _writer.writeMessage(
        3,
        _instance.byUser as any,
        User.serializeBinaryToWriter
      );
    }
    if (_instance.reason) {
      _writer.writeString(4, _instance.reason);
    }
  }

  private _until?: googleProtobuf002.Timestamp;
  private _byUserId?: number;
  private _byUser?: User;
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
    this.byUser = _value.byUser ? new User(_value.byUser) : undefined;
    this.reason = _value.reason;
    APIBanItem.refineValues(this);
  }
  get until(): googleProtobuf002.Timestamp | undefined {
    return this._until;
  }
  set until(value: googleProtobuf002.Timestamp | undefined) {
    this._until = value;
  }
  get byUserId(): number | undefined {
    return this._byUserId;
  }
  set byUserId(value: number | undefined) {
    this._byUserId = value;
  }
  get byUser(): User | undefined {
    return this._byUser;
  }
  set byUser(value: User | undefined) {
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
    byUserId?: number;
    byUser?: User.AsObject;
    reason?: string;
  }

  /**
   * Protobuf JSON representation for APIBanItem
   */
  export interface AsProtobufJSON {
    until?: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    byUserId?: number;
    byUser?: User.AsProtobufJSON | null;
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
 * Message implementation for goautowp.APICreateUserRequest
 */
export class APICreateUserRequest implements GrpcMessage {
  static id = 'goautowp.APICreateUserRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APICreateUserRequest();
    APICreateUserRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APICreateUserRequest) {
    _instance.email = _instance.email || '';
    _instance.name = _instance.name || '';
    _instance.password = _instance.password || '';
    _instance.passwordConfirm = _instance.passwordConfirm || '';
    _instance.language = _instance.language || '';
    _instance.captcha = _instance.captcha || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APICreateUserRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.email = _reader.readString();
          break;
        case 2:
          _instance.name = _reader.readString();
          break;
        case 3:
          _instance.password = _reader.readString();
          break;
        case 4:
          _instance.passwordConfirm = _reader.readString();
          break;
        case 5:
          _instance.language = _reader.readString();
          break;
        case 6:
          _instance.captcha = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APICreateUserRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APICreateUserRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.email) {
      _writer.writeString(1, _instance.email);
    }
    if (_instance.name) {
      _writer.writeString(2, _instance.name);
    }
    if (_instance.password) {
      _writer.writeString(3, _instance.password);
    }
    if (_instance.passwordConfirm) {
      _writer.writeString(4, _instance.passwordConfirm);
    }
    if (_instance.language) {
      _writer.writeString(5, _instance.language);
    }
    if (_instance.captcha) {
      _writer.writeString(6, _instance.captcha);
    }
  }

  private _email?: string;
  private _name?: string;
  private _password?: string;
  private _passwordConfirm?: string;
  private _language?: string;
  private _captcha?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APICreateUserRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APICreateUserRequest.AsObject>) {
    _value = _value || {};
    this.email = _value.email;
    this.name = _value.name;
    this.password = _value.password;
    this.passwordConfirm = _value.passwordConfirm;
    this.language = _value.language;
    this.captcha = _value.captcha;
    APICreateUserRequest.refineValues(this);
  }
  get email(): string | undefined {
    return this._email;
  }
  set email(value: string | undefined) {
    this._email = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
  get password(): string | undefined {
    return this._password;
  }
  set password(value: string | undefined) {
    this._password = value;
  }
  get passwordConfirm(): string | undefined {
    return this._passwordConfirm;
  }
  set passwordConfirm(value: string | undefined) {
    this._passwordConfirm = value;
  }
  get language(): string | undefined {
    return this._language;
  }
  set language(value: string | undefined) {
    this._language = value;
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
    APICreateUserRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APICreateUserRequest.AsObject {
    return {
      email: this.email,
      name: this.name,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      language: this.language,
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
  ): APICreateUserRequest.AsProtobufJSON {
    return {
      email: this.email,
      name: this.name,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      language: this.language,
      captcha: this.captcha
    };
  }
}
export module APICreateUserRequest {
  /**
   * Standard JavaScript object representation for APICreateUserRequest
   */
  export interface AsObject {
    email?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
    language?: string;
    captcha?: string;
  }

  /**
   * Protobuf JSON representation for APICreateUserRequest
   */
  export interface AsProtobufJSON {
    email?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
    language?: string;
    captcha?: string;
  }
}

/**
 * Message implementation for goautowp.APIPasswordRecoveryRequest
 */
export class APIPasswordRecoveryRequest implements GrpcMessage {
  static id = 'goautowp.APIPasswordRecoveryRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIPasswordRecoveryRequest();
    APIPasswordRecoveryRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIPasswordRecoveryRequest) {
    _instance.email = _instance.email || '';
    _instance.captcha = _instance.captcha || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIPasswordRecoveryRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.email = _reader.readString();
          break;
        case 2:
          _instance.captcha = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APIPasswordRecoveryRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIPasswordRecoveryRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.email) {
      _writer.writeString(1, _instance.email);
    }
    if (_instance.captcha) {
      _writer.writeString(2, _instance.captcha);
    }
  }

  private _email?: string;
  private _captcha?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIPasswordRecoveryRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<APIPasswordRecoveryRequest.AsObject>) {
    _value = _value || {};
    this.email = _value.email;
    this.captcha = _value.captcha;
    APIPasswordRecoveryRequest.refineValues(this);
  }
  get email(): string | undefined {
    return this._email;
  }
  set email(value: string | undefined) {
    this._email = value;
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
    APIPasswordRecoveryRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIPasswordRecoveryRequest.AsObject {
    return {
      email: this.email,
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
  ): APIPasswordRecoveryRequest.AsProtobufJSON {
    return {
      email: this.email,
      captcha: this.captcha
    };
  }
}
export module APIPasswordRecoveryRequest {
  /**
   * Standard JavaScript object representation for APIPasswordRecoveryRequest
   */
  export interface AsObject {
    email?: string;
    captcha?: string;
  }

  /**
   * Protobuf JSON representation for APIPasswordRecoveryRequest
   */
  export interface AsProtobufJSON {
    email?: string;
    captcha?: string;
  }
}

/**
 * Message implementation for goautowp.APIPasswordRecoveryCheckCodeRequest
 */
export class APIPasswordRecoveryCheckCodeRequest implements GrpcMessage {
  static id = 'goautowp.APIPasswordRecoveryCheckCodeRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIPasswordRecoveryCheckCodeRequest();
    APIPasswordRecoveryCheckCodeRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIPasswordRecoveryCheckCodeRequest) {
    _instance.code = _instance.code || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIPasswordRecoveryCheckCodeRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.code = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APIPasswordRecoveryCheckCodeRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIPasswordRecoveryCheckCodeRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.code) {
      _writer.writeString(1, _instance.code);
    }
  }

  private _code?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIPasswordRecoveryCheckCodeRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<APIPasswordRecoveryCheckCodeRequest.AsObject>
  ) {
    _value = _value || {};
    this.code = _value.code;
    APIPasswordRecoveryCheckCodeRequest.refineValues(this);
  }
  get code(): string | undefined {
    return this._code;
  }
  set code(value: string | undefined) {
    this._code = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIPasswordRecoveryCheckCodeRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIPasswordRecoveryCheckCodeRequest.AsObject {
    return {
      code: this.code
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
  ): APIPasswordRecoveryCheckCodeRequest.AsProtobufJSON {
    return {
      code: this.code
    };
  }
}
export module APIPasswordRecoveryCheckCodeRequest {
  /**
   * Standard JavaScript object representation for APIPasswordRecoveryCheckCodeRequest
   */
  export interface AsObject {
    code?: string;
  }

  /**
   * Protobuf JSON representation for APIPasswordRecoveryCheckCodeRequest
   */
  export interface AsProtobufJSON {
    code?: string;
  }
}

/**
 * Message implementation for goautowp.APIPasswordRecoveryConfirmRequest
 */
export class APIPasswordRecoveryConfirmRequest implements GrpcMessage {
  static id = 'goautowp.APIPasswordRecoveryConfirmRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIPasswordRecoveryConfirmRequest();
    APIPasswordRecoveryConfirmRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIPasswordRecoveryConfirmRequest) {
    _instance.code = _instance.code || '';
    _instance.password = _instance.password || '';
    _instance.passwordConfirm = _instance.passwordConfirm || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIPasswordRecoveryConfirmRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.code = _reader.readString();
          break;
        case 2:
          _instance.password = _reader.readString();
          break;
        case 3:
          _instance.passwordConfirm = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APIPasswordRecoveryConfirmRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIPasswordRecoveryConfirmRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.code) {
      _writer.writeString(1, _instance.code);
    }
    if (_instance.password) {
      _writer.writeString(2, _instance.password);
    }
    if (_instance.passwordConfirm) {
      _writer.writeString(3, _instance.passwordConfirm);
    }
  }

  private _code?: string;
  private _password?: string;
  private _passwordConfirm?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIPasswordRecoveryConfirmRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<APIPasswordRecoveryConfirmRequest.AsObject>
  ) {
    _value = _value || {};
    this.code = _value.code;
    this.password = _value.password;
    this.passwordConfirm = _value.passwordConfirm;
    APIPasswordRecoveryConfirmRequest.refineValues(this);
  }
  get code(): string | undefined {
    return this._code;
  }
  set code(value: string | undefined) {
    this._code = value;
  }
  get password(): string | undefined {
    return this._password;
  }
  set password(value: string | undefined) {
    this._password = value;
  }
  get passwordConfirm(): string | undefined {
    return this._passwordConfirm;
  }
  set passwordConfirm(value: string | undefined) {
    this._passwordConfirm = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIPasswordRecoveryConfirmRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIPasswordRecoveryConfirmRequest.AsObject {
    return {
      code: this.code,
      password: this.password,
      passwordConfirm: this.passwordConfirm
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
  ): APIPasswordRecoveryConfirmRequest.AsProtobufJSON {
    return {
      code: this.code,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    };
  }
}
export module APIPasswordRecoveryConfirmRequest {
  /**
   * Standard JavaScript object representation for APIPasswordRecoveryConfirmRequest
   */
  export interface AsObject {
    code?: string;
    password?: string;
    passwordConfirm?: string;
  }

  /**
   * Protobuf JSON representation for APIPasswordRecoveryConfirmRequest
   */
  export interface AsProtobufJSON {
    code?: string;
    password?: string;
    passwordConfirm?: string;
  }
}

/**
 * Message implementation for goautowp.APIPasswordRecoveryConfirmResponse
 */
export class APIPasswordRecoveryConfirmResponse implements GrpcMessage {
  static id = 'goautowp.APIPasswordRecoveryConfirmResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIPasswordRecoveryConfirmResponse();
    APIPasswordRecoveryConfirmResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIPasswordRecoveryConfirmResponse) {
    _instance.login = _instance.login || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIPasswordRecoveryConfirmResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.login = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APIPasswordRecoveryConfirmResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIPasswordRecoveryConfirmResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.login) {
      _writer.writeString(1, _instance.login);
    }
  }

  private _login?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIPasswordRecoveryConfirmResponse to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<APIPasswordRecoveryConfirmResponse.AsObject>
  ) {
    _value = _value || {};
    this.login = _value.login;
    APIPasswordRecoveryConfirmResponse.refineValues(this);
  }
  get login(): string | undefined {
    return this._login;
  }
  set login(value: string | undefined) {
    this._login = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIPasswordRecoveryConfirmResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIPasswordRecoveryConfirmResponse.AsObject {
    return {
      login: this.login
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
  ): APIPasswordRecoveryConfirmResponse.AsProtobufJSON {
    return {
      login: this.login
    };
  }
}
export module APIPasswordRecoveryConfirmResponse {
  /**
   * Standard JavaScript object representation for APIPasswordRecoveryConfirmResponse
   */
  export interface AsObject {
    login?: string;
  }

  /**
   * Protobuf JSON representation for APIPasswordRecoveryConfirmResponse
   */
  export interface AsProtobufJSON {
    login?: string;
  }
}

/**
 * Message implementation for goautowp.APIEmailChangeConfirmRequest
 */
export class APIEmailChangeConfirmRequest implements GrpcMessage {
  static id = 'goautowp.APIEmailChangeConfirmRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new APIEmailChangeConfirmRequest();
    APIEmailChangeConfirmRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: APIEmailChangeConfirmRequest) {
    _instance.code = _instance.code || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: APIEmailChangeConfirmRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.code = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    APIEmailChangeConfirmRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: APIEmailChangeConfirmRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.code) {
      _writer.writeString(1, _instance.code);
    }
  }

  private _code?: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of APIEmailChangeConfirmRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<APIEmailChangeConfirmRequest.AsObject>
  ) {
    _value = _value || {};
    this.code = _value.code;
    APIEmailChangeConfirmRequest.refineValues(this);
  }
  get code(): string | undefined {
    return this._code;
  }
  set code(value: string | undefined) {
    this._code = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    APIEmailChangeConfirmRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): APIEmailChangeConfirmRequest.AsObject {
    return {
      code: this.code
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
  ): APIEmailChangeConfirmRequest.AsProtobufJSON {
    return {
      code: this.code
    };
  }
}
export module APIEmailChangeConfirmRequest {
  /**
   * Standard JavaScript object representation for APIEmailChangeConfirmRequest
   */
  export interface AsObject {
    code?: string;
  }

  /**
   * Protobuf JSON representation for APIEmailChangeConfirmRequest
   */
  export interface AsProtobufJSON {
    code?: string;
  }
}
