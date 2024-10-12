import type { SearchAttributeTemplateDto } from '~/composables/dtos/attribute-template/search.post.dto';
import type { TagEntity } from '~/composables/entities/attribute/tag.entity';
import type { AttributeEntity } from '~/composables/entities/attribute/attribute.entity';
import type { CreateAttributeTemplateDto } from '~/composables/dtos/attribute-template/create.post.dto';
import type { PathRegistryEntity } from '~/composables/entities/path-registry.entity';
import type { GroupEntity } from '~/composables/entities/attribute/group.entity';

export function useAttributeTemplateService() {
  const clientApi = useApi().client();
  // const handleApiError = useApi().handleApiError;

  function addDefaultsForSearch(payload: SearchAttributeTemplateDto) {
    if (payload.searchString === '') payload.searchString = undefined;
    if (payload.includeTags && payload.includeTags!.length === 0) payload.includeTags = undefined;
    if (payload.includeGroups && payload.includeGroups!.length === 0) payload.includeGroups = undefined;
    if (payload.rulebook && payload.rulebook === '') payload.rulebook = undefined;
  }

  async function search(payload: SearchAttributeTemplateDto): Promise<AttributeEntity[]> {
    addDefaultsForSearch(payload);
    return clientApi<AttributeEntity[]>('/attribute-template/search', {
      method: 'POST',
      body: payload,
    });
  }

  async function getAttributeTemplate(id: string): Promise<AttributeEntity> {
    return clientApi<AttributeEntity>(`/attribute-template/${id}`);
  }

  function getAllTags(rulebookId: string): Promise<TagEntity[]> {
    return clientApi<TagEntity[]>(`/tag/rulebook/${rulebookId}`);
  }

  async function getAllGroups(rulebookId: string): Promise<GroupEntity[]> {
    return clientApi(`/group/rulebook/${rulebookId}`);
  }

  function deleteAttribute(id: string): Promise<void> {
    return clientApi(`/attribute-template/${id}`, {
      method: 'DELETE',
    });
  }

  function create(payload: CreateAttributeTemplateDto): Promise<AttributeEntity> {
    return clientApi<AttributeEntity>('/attribute-template', {
      method: 'POST',
      body: payload,
    });
  }

  function getPathRegistries(rulebookId: string): Promise<PathRegistryEntity[]> {
    return clientApi<PathRegistryEntity[]>(`/attribute-template/path-registry/${rulebookId}`, {
      method: 'GET',
    });
  }

  return {
    search,
    getAttributeTemplate,
    getAllTags,
    getAllGroups,
    deleteAttribute,
    create,
    getPathRegistries,
  };
}
