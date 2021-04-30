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
