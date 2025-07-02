export function useCharacterModelService() {
  /**
   * Creates a new Character Model.
   * @param payload - The data to create the character model.
   */
  async function createCharacterModel(payload: CreateCharacterModelDto): Promise<CharacterModel> {
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
  ): Promise<CharacterModel> {
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
  ): Promise<CharacterModel> {
    return useApi()
      .publicClient<CharacterModel>()(`character-model/${id}/modifiers`, {
        method: 'POST',
        body: payload,
      });
  }

  /**
   * Retrieves a character model by its ID.
   * @param id - The ID of the character model to retrieve.
   */
  async function getCharacterModelById(id: string): Promise<CharacterModel> {
    return useApi()
      .publicClient<CharacterModel>()(`character-model/${id}`, {
        method: 'GET',
      });
  }

  /**
   * Retrieves all character models.
   */
  async function getAllCharacterModels(): Promise<CharacterModel[]> {
    return useApi()
      .publicClient<CharacterModel[]>()('character-model', {
        method: 'GET',
      });
  }

  return {
    createCharacterModel,
    addPropertyToCharacterModel,
    addModifierToCharacterModel,
    getCharacterModelById,
    getAllCharacterModels,
  };
}
