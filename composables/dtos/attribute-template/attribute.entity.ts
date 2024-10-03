import type { Tag } from 'postcss-selector-parser';
import type { Group } from 'regjsparser';
import type { FixedNumericValueEntity } from '~/composables/dtos/attribute-template/fixed-numeric-value.entity';
import type { CalculatedNumericValueEntity } from '~/composables/dtos/attribute-template/calculated-numeric-value.entity';
import type { TextValueEntity } from '~/composables/dtos/attribute-template/text-value.entity';

export class AttributeEntity {
  _id: string;
  template?: boolean;
  rulebook: string;
  name: string;
  description: string;
  attributeType: string;
  attributeValue: FixedNumericValueEntity | CalculatedNumericValueEntity | TextValueEntity;
  tags: Tag[];
  group: Group;
}
