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
    return clientApi<AttributeEntity[]>('/character/attribute/template/search', {
      method: 'POST',
      body: payload,
    });
  }

  function getAllTags(): Promise<TagEntity[]> {
    return clientApi<TagEntity[]>('/character/attribute/template/tags');
  }

  async function getAllGroups(): Promise<GroupEntity[]> {
    return clientApi('/character/attribute/template/groups');
  }

  function deleteAttribute(id: string): Promise<void> {
    return clientApi(`/character/attribute/template/${id}`, {
      method: 'DELETE',
    });
  }

  function create(payload: CreateAttributeTemplateDto): Promise<AttributeEntity> {
    return clientApi<AttributeEntity>('/character/attribute/template', {
      method: 'POST',
      body: payload,
    });
  }

  function getPathRegistries(rulebookId: string): Promise<PathRegistryEntity[]> {
    return clientApi<PathRegistryEntity[]>(`/character/attribute/template/pathRegistry/${rulebookId}`, {
      method: 'GET',
    });
  }

  return {
    search,
    getAllTags,
    getAllGroups,
    deleteAttribute,
    create,
    getPathRegistries,
  };
}
