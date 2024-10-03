import type { FetchError } from 'ofetch';
import type { SearchAttributeTemplateDto } from '~/composables/dtos/attribute-template/search.post.dto';
import type { TagEntity } from '~/composables/dtos/attribute-template/tag.entity';
import type { AsyncData } from '#app';
import type { GroupEntity } from '~/composables/dtos/attribute-template/group.entity';
import type { AttributeEntity } from '~/composables/dtos/attribute-template/attribute.entity';

export function useAttributeService() {
  const clientApi = useApi().client();
  const serverApi = useApi().server;
  // const handleApiError = useApi().handleApiError;

  async function search(payload: SearchAttributeTemplateDto): Promise<AttributeEntity> {
    return clientApi<AttributeEntity>('/character/attribute/template/search', {
      method: 'POST',
      body: payload,
    });
  }

  function searchServer(payload: SearchAttributeTemplateDto): AsyncData<AttributeEntity | null, FetchError | null> {
    return serverApi<AttributeEntity>('/character/attribute/template/search', {
      method: 'POST',
      body: payload,
      transform: response => response as AttributeEntity,
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
