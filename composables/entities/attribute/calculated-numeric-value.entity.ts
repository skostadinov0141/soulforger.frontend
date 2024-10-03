import type { CharacterFieldPathEntity } from '~/composables/entities/attribute/character-field-path.entity';
import type { DiceRollEntity } from '~/composables/entities/attribute/dice-roll.entity';

export class CalculatedNumericValueEntity {
  _id: string;
  rulebook: string;
  variables: CharacterFieldPathEntity[];
  diceRolls: DiceRollEntity[];
  formula: string;
  value?: number;
}
