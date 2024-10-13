import type { RulebookEntity } from '~/composables/entities/rulebook/rulebook.entity';

export function useRulebookService() {
  const api = useApi().client();
  // const handleApiError = useApi().handleApiError;

  function getAll(): Promise<RulebookEntity[]> {
    return api<RulebookEntity[]>('/rulebook', {
      method: 'GET',
    });
  }

  function getOne(id: string) {
    return api<RulebookEntity>(`/rulebook/${id}`);
  }

  return {
    getAll,
    getOne,
  };
}
