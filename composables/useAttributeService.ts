import type { SearchAttributeTemplateDto } from '~/composables/dtos/attribute-template/search.post.dto';

export function useAttributeService() {
  const clientApi = useApi().client();
  const serverApi = useApi().server;
  const handleApiError = useApi().handleApiError;

  async function search(payload: SearchAttributeTemplateDto, server: boolean = false) {
    if (server) {
      return serverApi('/character/attribute/template/search', {
        method: 'POST',
        body: payload,
      });
    }
    else {
      return clientApi('/character/attribute/template/search', {
        method: 'POST',
        body: payload,
      });
    }
  }

  async function getAllTags(server: boolean = false) {
    if (server) {
      return serverApi('/character/attribute/template/tags');
    }
    else {
      return clientApi('/character/attribute/template/tags');
    }
  }

  async function getAllGroups(server: boolean = false) {
    if (server) {
      return serverApi('/character/attribute/template/groups');
    }
    else {
      return clientApi('/character/attribute/template/groups');
    }
  }

  return { search, getAllTags, getAllGroups };
}
