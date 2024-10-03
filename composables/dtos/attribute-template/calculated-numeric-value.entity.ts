import type { CharacterFieldPathEntity } from '~/composables/dtos/attribute-template/character-field-path.entity';
import type { DiceRollEntity } from '~/composables/dtos/attribute-template/dice-roll.entity';

export class CalculatedNumericValueEntity {
  _id: string;
  rulebook: string;
  variables: CharacterFieldPathEntity[];
  diceRolls: DiceRollEntity[];
  formula: string;
  value?: number;
}
