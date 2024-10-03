import type { FetchError } from 'ofetch';
import type { SearchAttributeTemplateDto } from '~/composables/dtos/attribute-template/search.post.dto';
import type { TagEntity } from '~/composables/entities/attribute/tag.entity';
import type { AsyncData } from '#app';
import type { GroupEntity } from '~/composables/entities/attribute/group.entity';
import type { AttributeEntity } from '~/composables/entities/attribute/attribute.entity';

export function useAttributeService() {
  const clientApi = useApi().client();
  const serverApi = useApi().server;
  // const handleApiError = useApi().handleApiError;

  function addDefaultsForSearch(payload: SearchAttributeTemplateDto) {
    if (payload.searchString === '') payload.searchString = undefined;
    if (payload.includeTags && payload.includeTags!.length === 0) payload.includeTags = undefined;
    if (payload.excludeTags && payload.excludeTags!.length === 0) payload.excludeTags = undefined;
    if (payload.includeGroups && payload.includeGroups!.length === 0) payload.includeGroups = undefined;
    if (payload.excludeGroups && payload.excludeGroups!.length === 0) payload.excludeGroups = undefined;
  }

  async function search(payload: SearchAttributeTemplateDto): Promise<AttributeEntity[]> {
    addDefaultsForSearch(payload);
    return clientApi<AttributeEntity[]>('/character/attribute/template/search', {
      method: 'POST',
      body: payload,
    });
  }

  async function searchServer(payload: SearchAttributeTemplateDto): Promise<AsyncData<AttributeEntity[] | null, FetchError | null>> {
    addDefaultsForSearch(payload);
    return serverApi<AttributeEntity[]>('/character/attribute/template/search', {
      method: 'POST',
      body: payload,
      transform: response => response as AttributeEntity[],
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  function getAllTags(): Promise<TagEntity[]> {
    return clientApi<TagEntity[]>('/character/attribute/template/tags');
  }

  function getAllTagsServer(): AsyncData<TagEntity[] | null, FetchError | null> {
    return serverApi<TagEntity[]>('/character/attribute/template/tags', {
      transform: response => response as TagEntity[],
    });
  }

  async function getAllGroups() {
    return clientApi('/character/attribute/template/groups');
  }

  function getAllGroupsServer(): AsyncData<GroupEntity[] | null, FetchError | null> {
    return serverApi<GroupEntity[]>('/character/attribute/template/groups', {
      transform: response => response as GroupEntity[],
    });
  }

  return { search, getAllTags, getAllGroups, getAllTagsServer, getAllGroupsServer, searchServer };
}
