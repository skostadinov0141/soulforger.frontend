export class SearchAttributeTemplateDto {
  searchString?: string;
  sortOrder: number;
  sortBy: string;
  includeTags?: string[];
  includeGroups?: string[];
}
