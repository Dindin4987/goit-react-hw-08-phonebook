// src/redux/selectors.js
import { createSelector } from '@reduxjs/toolkit';

// Selector for retrieving contacts from the state
export const selectContacts = state => state.contacts.contacts;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
// Selector for retrieving the current filter value
export const selectFilter = state => state.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
  }
);
