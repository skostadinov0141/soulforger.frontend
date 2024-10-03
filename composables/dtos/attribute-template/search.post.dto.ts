export class SearchAttributeTemplateDto {
  searchString?: string;
  sortOrder: number;
  sortBy: string;
  includeTags?: string[];
  excludeTags?: string[];
  includeGroups?: string[];
  excludeGroups?: string[];
}
