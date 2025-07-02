/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateCharacterModelDto {
  /**
   * The name of the Model.
   * @example "CharacterModel v1.0"
   */
  name: string;
}

export interface CharacterProperty {
  /**
   * The type of the property.
   * @enum {PropertyTypes}
   * @example "number"
   */
  type: "text" | "number" | "derived-number" | "boolean";
  /**
   * The unique identifier for the property.
   * This is used to reference the property in other parts of the application.
   */
  guid: string;
  /**
   * The metadata associated with the property.
   * This can be of different types depending on the property type.
   */
  metadata: object;
  /**
   * The value of the property.
   * This can be of any type, depending on the property type.
   * For example, it can be a number, string, boolean, or any other type.
   * @example 42
   */
  value?: object;
}

export interface CharacterModel {
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /**
   * The name of the character model.
   * @type {string}
   * @example "DSA Character Model v1.0"
   */
  name: string;
  /**
   * The properties that define the character.
   * These properties can include attributes like strength, agility, intelligence, etc.
   * Each property is an instance of CharacterProperty.
   * @type {CharacterProperty[]}
   */
  properties: CharacterProperty[];
  /**
   * The modifiers that change the character's properties.
   * These modifiers can include buffs, debuffs, or other effects that alter the character's stats.
   * Each modifier is an instance of CharacterModifier.
   * @type {Record<string, CharacterModifier[]>}
   */
  modifiers: object;
}

export interface AddPropertyToModelDto {
  /**
   * The type of the property.
   * @enum {PropertyTypes}
   * @example "number"
   */
  type: "text" | "number" | "derived-number" | "boolean";
  /**
   * The metadata associated with the property.
   * This can be of different types depending on the property type.
   */
  metadata: object;
  /**
   * The value of the property.
   * This can be of any type, depending on the property type.
   * For example, it can be a number, string, boolean, or any other type.
   * @example 42
   */
  value?: object;
}

export interface AddModifierToModelDto {
  /**
   * The type of the modifier.
   * This determines how the modifier affects the character's properties.
   * @enum {ModifierTypes}
   * @type {ModifierTypes}
   * @example "add"
   */
  modifierType: "add" | "subtract" | "multiply" | "divide" | "set";
  /**
   * The target location of the modifier.
   * This specifies where the modifier applies to the character.
   * @enum {CharacterLocations}
   * @type {CharacterLocations}
   * @example "head"
   */
  target: "properties";
  /**
   * The expression that defines the modifier's effect.
   * This is a string that can be evaluated to apply the modifier.
   * @type {string}
   * @example "${health-guid} + 50"
   */
  expression: string;
}
