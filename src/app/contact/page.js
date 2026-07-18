export const metadata = {
  title: 'Contact Us | Aetees Bakehouse',
  description: 'Get in touch with Aetees Bakehouse for orders, inquiries, or feedback.',
};

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '16px' }}>Contact Us</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
          We'd love to hear from you! Whether you have a question about our menu, an order inquiry, or just want to say hello.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Contact Details Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Delivery Info</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontWeight: '500' }}>
                If you order before 12 PM, we provide same-day delivery!
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Call Us</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                <a href="tel:+918097077235" style={{ color: 'inherit', textDecoration: 'none' }}>+91 80970 77235</a>
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Email Us</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                <a href="mailto:hello@aeteesbakehouse.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@aeteesbakehouse.com</a>
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Hours</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Mon - Fri: 8:00 AM - 8:00 PM <br />
                Sat - Sun: 9:00 AM - 9:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', textTransform: 'uppercase' }}>Send a Message</h2>
            <form action="#" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className="input" placeholder="Your Name" required />
              </div>
              
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="input" placeholder="Your Email" required />
              </div>
              
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" className="input" rows="5" placeholder="How can we help you?" required style={{ resize: 'vertical' }}></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', padding: '14px' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
