import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Section from './components/Section';
import shortid from 'shortid';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!contacts.length) {
      const existedContacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(existedContacts);

      if (parsedContacts) {
        setContacts(parsedContacts);
      }
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitForm = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contactAlreadyExists(name)) {
      alert(`${name} already exists`);
      return;
    } else {
      setContacts([contact, ...contacts]);
    }
  };

  const contactAlreadyExists = name => {
    name = name.toLowerCase();
    return (
      contacts.filter(contact => contact.name.toLowerCase().includes(name))
        .length > 0
    );
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(newContacts);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const FilteredContacts = getFilteredContacts();

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={submitForm}></ContactForm>
      </Section>
      <Section title="Contacts">
        <Filter onChange={changeFilter} />
        <ContactList
          contacts={FilteredContacts}
          onDeleteContact={deleteContact}
        ></ContactList>
      </Section>
    </>
  );
}
