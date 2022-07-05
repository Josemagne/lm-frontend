import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { LM_Character } from '../../../types/character';

const selectCharacters = (store: RootState) => store.character.character.character;

export const charactersSelector = createSelector(selectCharacters, (c) => {
    return Object.values(c)
}) as unknown as () => LM_Character[]

const selectNewCharacter = (store: RootState) => store.character.new.newCharacter;
export const newCharacterSelector = (store: RootState) => createSelector(selectNewCharacter, n => n);

const selectIsCreatingNewCharacter = (store: RootState) => store.character.new.IsCreatingNewCharacter;
export const isCreatingNewCharacterSelector = createSelector(selectIsCreatingNewCharacter, (s) => s)

const selectSelectedCharacter = (store: RootState) => store.character.selection.selectedCharacter;
export const selectedCharacterSelector = createSelector(selectSelectedCharacter, (s) => s);

const selectIsSelectingCharacter = (store: RootState) => store.character.selection.isSelectingCharacter.boolean;
export const isSelectingCharacterSelector = createSelector(selectIsSelectingCharacter, (s) => s)

const selectFilteredCharacters = (store: RootState) => store.character.filter.filteredCharacters;
export const filteredCharactersSelector = createSelector(selectFilteredCharacters, (s) => s)

const selectIsFilteringCharacters = (store: RootState) => store.character.filter.isFilteringCharacters;
export const isFilteringCharactersSelector = createSelector(selectIsFilteringCharacters, (s) => s)
