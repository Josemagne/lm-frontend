import { LM_Character } from "../../../types/character"
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import Character from "../../../classes/Character";

interface CharacterState {
    character: {
        character: {
            [character_id: string]: LM_Character
        }
    },
    new: {
        newCharacter: LM_Character;
        isCreatingNewCharacter: boolean;
    },
    selection: {
        selectedCharacter: LM_Character | null;
        isSelectingCharacter: boolean;
    },
    filter: {
        filteredCharacters: LM_Character[];
        isFilteringCharacters: boolean;
    }
}

const initialState: CharacterState = {
    character: {
        character: {}
    },
    new: {
        newCharacter: new Character("BOOK", "", "", false),
        isCreatingNewCharacter: false
    },
    selection: {
        isSelectingCharacter: false,
        selectedCharacter: null
    },
    filter: {
        isFilteringCharacters: false,
        filteredCharacters: []
    }
}

export const characterSlice: Slice<CharacterState> = createSlice({
    name: "charachter",
    initialState,
    reducers: {
        addCharacter: (state: CharacterState, { payload: newCharacter }: PayloadAction<LM_Character>) => { },
        updateCharacter: (state: CharacterState, { payload: updatedCharacter }: PayloadAction<LM_Character>) => { },
        deleteCharacter: (state: CharacterState, { payload: characterID }: PayloadAction<string>) => { },
        // TOGGLE
        toggleIsAddingNewCharacter: (state: CharacterState, action: PayloadAction<void>) => { },
        toggleIsSelectingCharacter: (state: CharacterState, action: PayloadAction<void>) => { },
        toggleIsFilteringCharacter: (state: CharacterState, action: PayloadAction<void>) => { },
        // UPDATE
        updateNewCharacter: (state: CharacterState, { payload: updatedNewCharacter }: PayloadAction<LM_Character>) => { },
        updateSelectedCharacter: (state: CharacterState, { payload: updatedSelectedCharacter }: PayloadAction<LM_Character>) => { },
        updateFilteredCharacters: (state: CharacterState, { payload: updatedFilteredCharacters }: PayloadAction<LM_Character[]>) => { }


    },
    extraReducers: (builder) => {

    }
})

export default characterSlice.reducer;
export const { addCharacter, updateCharacter, deleteCharacter, toggleIsAddingNewCharacter, toggleIsSelectingCharacter, toggleIsFilteringCharacter, updateNewCharacter, updateSelectedCharacter, updateFilteredCharacters } = characterSlice.actions;