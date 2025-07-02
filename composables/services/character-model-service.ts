import type { CreateCharacterModelDto } from '~/composables/dtos/data-contracts';

export function useCharacterModelService() {
  async function createCharacterModel(payload: CreateCharacterModelDto) {
    return useApi()
      .publicClient<CharacterModel>()('character-model', {
        method: 'POST',
        body: payload,
      });
  }

  return {
    createCharacterModel,
  };
}
