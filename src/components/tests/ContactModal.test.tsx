import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactModal from "../ContactModal";
import { IContact } from '../../data/contacts'
import { generateUUID } from "../../util/guid";

// Some simple tests implemented

const mockContacts: IContact[] = [
  {
    id: generateUUID(),
    name: "John Smith",
    phone: "5555555555",
    email: "john.smith@gmail.com",
    age: 30,
  },
  {
    id: generateUUID(),
    name: "Jane Doe",
    phone: "",
    email: "jane.doe@gmail.com",
    age: 25,
  },
];

const mockSetContacts = jest.fn();
const mockSetEditingContact = jest.fn();
const mockSetShowModal = jest.fn();

describe("ContactModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with the 'Add New Contact' title", () => {
    render(
      <ContactModal
        contacts={mockContacts}
        setContacts={mockSetContacts}
        setEditingContact={mockSetEditingContact}
        editingContact={null}
        showModal={true}
        setShowModal={mockSetShowModal}
      />
    );

    const title = screen.getByText("Add New Contact");
    expect(title).toBeInTheDocument();
  });


  it("closes the modal when the 'Cancel' button is clicked", () => {
    render(
      <ContactModal
        contacts={mockContacts}
        setContacts={mockSetContacts}
        setEditingContact={mockSetEditingContact}
        editingContact={null}
        showModal={true}
        setShowModal={mockSetShowModal}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockSetEditingContact).toHaveBeenCalledWith(null);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });
});
