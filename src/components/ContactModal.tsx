import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { apiAddContact, apiUpdateContact, IContact } from "../data/contacts";
import { generateUUID } from "../util/guid";

interface IContactModalProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => void;
  editingContact?: IContact | null;
  contacts: IContact[];
  setContacts: (arg0: IContact[]) => void;
  setEditingContact: (arg0: IContact | null) => void;
}


function ContactModal({ contacts, setContacts, setEditingContact, editingContact, showModal, setShowModal }: IContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') ?? '';
    const phone = formData.get('phone') ?? '';
    const email = formData.get('email') ?? '';
    const age = parseInt(formData.get('age') as string ?? '0');
    
    
    const newContact: IContact = {
      id: editingContact ? editingContact.id : generateUUID(),
      name: name as string,
      phone: phone as string,
      email: email as string,
      age: isNaN(age) ? 0 : age
    };
    
    console.log('age: ', age, newContact);
    // TODO: Validate form data
    // if (!validation) {setErrorMessage('Validation error'); return;}
    
    // Editing / Adding contact
    setLoading(true);

    try {
      if(editingContact) {
        // Edit existing contact
        await handleEditContact(newContact);
      } else {
        // Add new contact
        await handleAddContact(newContact);
      }
    } catch (error: any) {
      // TODO: Handle error
      setErrorMessage(error.message);

    } finally {
      setLoading(false);
      handleClose()
    }
  };

  const handleEditContact = async (newContact: IContact) => {
    await apiUpdateContact(newContact);

    const updatedContacts = contacts.map((contact) =>
      contact.id === editingContact!.id ? newContact : contact
    );

    setContacts(updatedContacts);
    setEditingContact(null);
  };


  const handleAddContact = async (newContact: IContact) => {
    await apiAddContact(newContact);
    setContacts([...contacts, newContact]);
  };


  const handleClose = () => {
    setEditingContact(null);
    setShowModal(false);
    setErrorMessage('');
  }


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Contact</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" defaultValue={editingContact?.name} name="name" required />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" defaultValue={editingContact?.phone} name="phone" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue={editingContact?.email} name="email" />
          </Form.Group>

          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" defaultValue={editingContact?.age} min={0} name="age" />
          </Form.Group>

          <div className="modal-footer border-top-0">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {loading ? <Spinner size="sm" /> : editingContact ? 'Update' : 'Add'}
            </Button>
          </div>

          <div>
            {errorMessage && (
              <p className="text-danger mb-0">Error: {errorMessage}</p>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ContactModal