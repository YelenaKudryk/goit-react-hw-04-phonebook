import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
// import contacts from 'data/data';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { PageTitle, Text, Section } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      Notify.failure(`${name} or ${number} is already in contacts.`);
      return false;
    }
    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.trim();
    const { contacts } = this.state;
    const contact = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName || normalizedNumber === number
      );
    });
    return Boolean(contact);
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.trim().includes(normalizedFilter)
      );
    });
    return result;
  };

  render() {
    const { deleteContact, addContact, handleFilter, getFilteredContacts } =
      this;
    const { contacts, filter } = this.state;
    const isContacts = Boolean(contacts.length);
    const filtredContacts = getFilteredContacts();

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
              contacts={filtredContacts}
            />
          ) : (
            <Text>Your phonebook is empty</Text>
          )}
        </Section>
      </>
    );
  }
}

export default App;
