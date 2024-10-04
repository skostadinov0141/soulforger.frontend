export class CreateAttributeTag {
  _id?: string;
  name: string;
  for: string;
}

export class CreateAttributeGroup {
  _id?: string;
  name: string;
  for: string;
}

export class CreateAttributeTextValueTemplateDto {
  value: string;
  options: string[];
}

export class CreateAttributeFixedNumericValueTemplateDto {
  value: string;
}

export class CreateAttributeCalculatedNumericValueTemplateDto {
  formula: string;
  variables: CreateAttributeCharacterFieldPathTemplateDto[];
  diceRolls: CreateAttributeDiceRollTemplateDto[];
}

export class CreateAttributeCharacterFieldPathTemplateDto {
  name: string;
  path: string;
}

export class CreateAttributeDiceRollTemplateDto {
  name: string;
  diceSides: number;
  diceAmount: string;
}

export class CreateAttributeTemplateDto {
  rulebook: string;
  name: string;
  description: string;
  attributeType: string;
  attributeValue?:
    | CreateAttributeTextValueTemplateDto
    | CreateAttributeFixedNumericValueTemplateDto
    | CreateAttributeCalculatedNumericValueTemplateDto;

  tags: CreateAttributeTag[];
  group?: CreateAttributeGroup;
}
