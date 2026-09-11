import { useEffect, useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/contacts')
      .then((res) => res.json())
      .then((data: Contact[]) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => console.error('Error fetching contacts:', err));
  }, []);

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div>
      <h1>Contacts List</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}