import {  useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';
import { IContact } from './data/contacts';

function App() {
  // All Contacts
   const [contacts, setContacts] = useState<IContact[]>([]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<IContact | null >(null);

  const handleEditContact = (contact: IContact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  return (
    <Container>
      <h1 className='text-center'>Brew Ninja Test App</h1>

      <div className='d-flex justify-content-end mb-2'>
        <Button onClick={() => setShowModal(true)}>Add Contact</Button>
      </div>

      <ContactList 
        contacts={contacts} 
        setContacts={setContacts}
        handleEditContact={handleEditContact} 
      />


      <ContactModal 
        editingContact={editingContact} 
        setEditingContact={setEditingContact} 
        contacts={contacts} setContacts={setContacts} 
        showModal={showModal} 
        setShowModal={setShowModal} 
      />
    </Container>
  );
}

export default App;
