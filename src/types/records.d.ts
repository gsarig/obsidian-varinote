import {Property, PropertyExtended} from './properties';

export type PropertyMap = Record<string, Property>;
export type ExtendedPropertyMap = Record<string, PropertyExtended>;
export type FieldString = Record<string, string>;
export type FieldNumber = Record<string, number>;
export type FieldStringOrNumber = Record<string, string | number>;
