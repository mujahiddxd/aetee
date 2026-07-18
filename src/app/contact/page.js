export default function ContactPage() {
  return (
    <div className="container" style={{ padding: '64px 0', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Contact Us</h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '32px' }}>
        We'd love to hear from you. Please reach out to us with any questions or feedback.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <p><strong>Email:</strong> hello@aetees.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Bakery Lane, Sweet City, SC 12345</p>
      </div>
    </div>
  );
}
