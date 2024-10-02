import type { FetchError } from 'ofetch';
import type { SearchAttributeTemplateDto } from '~/composables/dtos/attribute-template/search.post.dto';
import type { TagEntity } from '~/composables/dtos/attribute-template/tag.entity';
import type { AsyncData } from '#app';

export function useAttributeService() {
  const clientApi = useApi().client();
  const serverApi = useApi().server;
  const handleApiError = useApi().handleApiError;

  async function search(payload: SearchAttributeTemplateDto, server: boolean = false) {
    if (server) {
      return serverApi<TagEntity>('/character/attribute/template/search', {
        method: 'POST',
        body: payload,
      });
    }
    else {
      return clientApi<TagEntity>('/character/attribute/template/search', {
        method: 'POST',
        body: payload,
      });
    }
  }

  function getAllTags(): Promise<TagEntity[]> {
    return clientApi<TagEntity[]>('/character/attribute/template/tags');
  }

  function getAllTagsServer(): AsyncData<TagEntity[] | null, FetchError | null> {
    return serverApi<TagEntity[]>('/character/attribute/template/tags', {
      transform: response => response as TagEntity[],
    });
  }

  async function getAllGroups(server: boolean = false) {
    if (server) {
      return serverApi('/character/attribute/template/groups');
    }
    else {
      return clientApi('/character/attribute/template/groups');
    }
  }

  return { search, getAllTags, getAllGroups, getAllTagsServer };
}
