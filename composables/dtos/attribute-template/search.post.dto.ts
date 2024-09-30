export class SearchAttributeTemplateDto {
  searchString?: string;
  sortOrder: number;
  sortBy: string;
  limit: number;
  page: number;
  includeTags?: string[];
  excludeTags?: string[];
  includeGroups?: string[];
  excludeGroups?: string[];
}
