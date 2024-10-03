export class DiceRollEntity {
  _id: string;
  rulebook: string;
  name: string;
  diceSides: number;
  diceAmount: number;
  modifier: number;
  value: number;
}
