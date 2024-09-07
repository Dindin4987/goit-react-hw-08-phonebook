import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/operations';
import { setFilter } from '../redux/filterSlice';
import { addContact, deleteContact } from '../redux/operations';
import {
  selectVisibleContacts,
  selectIsLoading,
  selectFilter,
  selectError,
} from '../redux/selectors';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const ContactsPage = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  console.log('visibleContacts', visibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    // Placeholder for future Redux action
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    // Placeholder for future Redux action
    dispatch(deleteContact(id));
  };

  const handleSetFilter = newFilter => {
    // Placeholder for future Redux dispatch to update filter
    dispatch(setFilter(newFilter));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} contacts={visibleContacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={handleSetFilter} />
      {isLoading && (
        <b style={{ display: 'block', padding: '0 0 20px 10px' }}>Loading...</b>
      )}
      {error && <b>Error: {error}</b>}
      {visibleContacts && (
        <ContactList
          contacts={visibleContacts}
          deleteContact={handleDeleteContact}
        />
      )}
    </div>
  );
};
