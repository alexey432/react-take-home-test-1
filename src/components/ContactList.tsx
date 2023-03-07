import { useEffect, useState } from "react";
import { Spinner, Table, } from "react-bootstrap";
import {  apiFetchAllContacts, IContact } from "../data/contacts";
import ContactComponent from "./ContactComponent";

interface IContactListProps {
    handleEditContact: (arg0: IContact) => void;
    contacts: IContact[];
    setContacts: (arg0: IContact[]) => void;
}

function ContactList({ contacts, setContacts, handleEditContact }: IContactListProps) {
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);

      try {
        const response = await apiFetchAllContacts();
        setContacts(response);  
      } catch (error: any) {
        // TODO: Handle error
        console.log(error);
      } finally {
        setLoading(false);
      }
      
    }
    
    fetchContacts();
  }, []);

  

  return (<>
   {loading ? (
      <div className="d-flex align-items-center justify-content-center">
        <Spinner />
      </div>
      ) : contacts.length === 0 ? <p className="text-center">Add a new contact</p> : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Age</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((contact) => (
                  <ContactComponent 
                    key={contact.id}
                    contact={contact} 
                    contacts={contacts} 
                    setContacts={setContacts} 
                    handleEditContact={handleEditContact} 
                  />
                ))}
            </tbody>
          </Table>
          )} 
  </>
  )
}

export default ContactList