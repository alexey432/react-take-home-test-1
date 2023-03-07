import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { apiDeleteContact, IContact } from "../data/contacts";

interface IContactComponentProps {
    handleEditContact: (arg0: IContact) => void;
    contacts: IContact[];
    setContacts: (arg0: IContact[]) => void;
    contact: IContact;
}

function ContactComponent({ contact, setContacts, contacts, handleEditContact }: IContactComponentProps) {
    const [loading, setLoading] = useState(false);
    
    // delete contact
    const deleteContact = async (id: string) => {
        setLoading(true);
        
        try {
            await apiDeleteContact(id);
            setContacts(contacts.filter((contact) => contact.id !== id));
            
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <tr key={contact.id}>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
        <td>{ contact.age === 0 ? '' : contact.age?.toString()}</td>
        <td>
        <Button variant="primary" size="sm"
            onClick={() => handleEditContact(contact)}
        >
            Edit
        </Button>{" "}
        <Button
            variant="danger"
            size="sm"
            onClick={() => deleteContact(contact.id)}
        >
            {loading ? <Spinner size="sm" /> : 'Delete'}
        </Button>
        </td>
    </tr>
  )
}

export default ContactComponent