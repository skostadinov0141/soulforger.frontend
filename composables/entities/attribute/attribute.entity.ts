import type { Tag } from 'postcss-selector-parser';
import type { Group } from 'regjsparser';
import type { FixedNumericValueEntity } from '~/composables/entities/attribute/fixed-numeric-value.entity';
import type { CalculatedNumericValueEntity } from '~/composables/entities/attribute/calculated-numeric-value.entity';
import type { TextValueEntity } from '~/composables/entities/attribute/text-value.entity';
import type { RulebookEntity } from '~/composables/entities/rulebook/rulebook.entity';

export class AttributeEntity {
  _id: string;
  template?: boolean;
  rulebook: RulebookEntity;
  name: string;
  description: string;
  attributeType: string;
  attributeValue: FixedNumericValueEntity | CalculatedNumericValueEntity | TextValueEntity;
  tags: Tag[];
  group: Group;
}
