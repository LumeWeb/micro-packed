"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const P = __importStar(require("./index.js"));
const base = __importStar(require("@scure/base"));
const assertType = (value) => { };
const wt1 = [1];
const wt2 = ['string'];
const wt3 = [new Uint8Array()];
const wt4 = [[1, 2, 3]];
const wt5 = [['1', '2', '3']];
const wt6 = [new Uint32Array()];
const wt7 = [true];
assertType(1);
assertType(1);
assertType(1);
assertType(1);
assertType(1);
assertType(1);
assertType(1);
assertType(P.bool);
assertType(P.U8);
assertType(P.U16BE);
assertType(P.U16LE);
assertType(P.U32BE);
assertType(P.U32LE);
assertType(P.U64BE);
assertType(P.U64LE);
assertType(P.U128BE);
assertType(P.U128LE);
assertType(P.U256BE);
assertType(P.U256LE);
assertType(P.string(null));
assertType(P.cstring);
assertType(P.bytes(null));
assertType(P.hex(null));
assertType(P.array(null, P.cstring));
assertType(P.struct({ a: P.U8, b: P.cstring }));
assertType(P.struct({ a: P.U8, b: P.cstring }));
assertType(P.struct({ a: P.U8, b: P.magic(P.bytes(null), P.NULL) }));
assertType(P.tuple([P.U8, P.cstring]));
assertType(P.tuple([P.U8, P.bytes(null)]));
assertType(P.tuple([P.U8, P.array(null, P.bytes(null))]));
assertType(P.tuple([P.U8, P.cstring, P.bool]));
assertType(P.tuple([P.U8, P.cstring]));
assertType(P.tuple([P.U8, P.cstring, P.bool]));
assertType(P.map(P.U8, { l: 0x00 }));
assertType(P.map(P.U64BE, { l: 0x00n }));
assertType(P.map(P.cstring, { l: 'test' }));
assertType(P.tag(P.U8, { 1: P.cstring, 2: P.bool }));
assertType(P.tag(P.cstring, { a: P.cstring, b: P.bool }));
assertType(P.tag(P.apply(P.U256BE, P.coders.number), { 1: P.cstring, 2: P.bool }));
assertType(P.mappedTag(P.U8, { a: [1, P.cstring], b: [2, P.bool] }));
assertType(P.mappedTag(P.U8, { a: [1, P.cstring], b: [2, P.bool], c: [3, P.U8] }));
assertType(P.apply(P.bytes(null), base.base16));
assertType(P.validate(P.cstring, (a) => a));
const d1 = P.array(P.U16BE, P.tuple([P.cstring, P.U32LE]));
assertType(d1);
assertType(P.apply(d1, P.coders.dict()));
assertType(P.lazy(() => P.bool));
const tree = P.struct({
    name: P.cstring,
    childs: P.array(P.U16BE, P.lazy(() => tree)),
});
assertType(tree);
var Test;
(function (Test) {
    Test[Test["a"] = 0] = "a";
    Test[Test["b"] = 1] = "b";
    Test[Test["c"] = 2] = "c";
})(Test || (Test = {}));
assertType(P.coders.tsEnum(Test));
const e = P.apply(P.U8, P.coders.tsEnum(Test));
assertType(e);
assertType(P.coders.match([P.coders.number, P.coders.dict()]));
const m1 = 1;
const m2 = 1;
const m3 = 1;
assertType(P.coders.match([m1, m2, m3]));
