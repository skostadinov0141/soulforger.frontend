export class TagEntity {
  _id?: string;
  rulebook?: string;
  name: string;
  description?: string;
  for: 'attribute' | 'ability';
}
