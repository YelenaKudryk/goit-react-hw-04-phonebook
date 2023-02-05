import { useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { PageTitle, Text, Section } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('my-contacts', []);
  const [filter, setFilter] = useState('');

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.trim();
    const contact = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName || normalizedNumber === number
      );
    });
    return Boolean(contact);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      Notify.failure(`${name} or ${number} is already in contacts.`);
      return false;
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
    return true;
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.trim().includes(normalizedFilter)
      );
    });
    return result;
  };

  const isContacts = Boolean(contacts.length);

  return (
    <>
      <Section>
        <PageTitle>Phonebook</PageTitle>
        <ContactForm onSubmit={addContact} />
      </Section>

      <Section>
        <PageTitle>Contacts</PageTitle>
        <Filter value={filter} onChange={handleFilter} />
        {isContacts ? (
          <ContactList
            deleteContact={deleteContact}
            contacts={getFilteredContacts()}
          />
        ) : (
          <Text>Your phonebook is empty</Text>
        )}
      </Section>
    </>
  );
};

export default App;
