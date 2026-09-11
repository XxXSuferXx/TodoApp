import { useEffect, useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
}

export default function Contact() {
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

  return (
    // Black background wrapper applies to ALL states (loading, loaded, and error)
    <div className="min-h-screen bg-black text-white p-6">
      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Contacts List</h1>
          <ul className="space-y-2">
            {contacts.map((contact) => (
              <li key={contact.id}>
                {contact.name} - {contact.email}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}