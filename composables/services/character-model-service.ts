export function useCharacterModelService() {
  /**
   * Creates a new Character Model.
   * @param payload - The data to create the character model.
   */
  async function createCharacterModel(payload: CreateCharacterModelDto) {
    return useApi()
      .publicClient<CharacterModel>()('character-model', {
        method: 'POST',
        body: payload,
      });
  }

  /**
   * Adds a property to an existing character model.
   * @param id - The ID of the character model to which the property will be added.
   * @param payload - The property data to be added to the character model.
   */
  async function addPropertyToCharacterModel(
    id: string,
    payload: AddPropertyToModelDto,
  ) {
    return useApi()
      .publicClient<CharacterModel>()(`character-model/${id}/properties`, {
        method: 'POST',
        body: payload,
      });
  }

  /**
   * Adds a modifier to an existing character model.
   * @param id - The ID of the character model to which the modifier will be added.
   * @param payload - The modifier data to be added to the character model.
   */
  async function addModifierToCharacterModel(
    id: string,
    payload: AddModifierToModelDto,
  ) {
    return useApi()
      .publicClient<CharacterModel>()(`character-model/${id}/modifiers`, {
        method: 'POST',
        body: payload,
      });
  }

  return {
    createCharacterModel,
    addPropertyToCharacterModel,
    addModifierToCharacterModel,
  };
}
