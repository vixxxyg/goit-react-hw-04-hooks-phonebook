import { Component } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Section from './components/Section';
import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  submitForm = ({ name, number }) => {
    if (this.contactAlreadyExists(name)) {
      alert(`${name} already exists`);
      return;
    }
    const newContact = { id: shortid.generate(), name, number };
    this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
  };

  contactAlreadyExists = name => {
    name = name.toLowerCase();
    return (
      this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(name),
      ).length > 0
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm
            options={this.state}
            onSubmit={this.submitForm}
          ></ContactForm>
        </Section>
        <Section title="Contacts">
          <Filter onChange={this.changeFilter} />
          <ContactList
            contacts={this.getFilteredContacts()}
            onDeleteContact={this.deleteContact}
          ></ContactList>
        </Section>
      </>
    );
  }
}

export default App;
