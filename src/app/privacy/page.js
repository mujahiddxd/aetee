export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: '64px 32px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--color-bg-white)', borderRadius: 'var(--radius-lg)', marginTop: '32px', marginBottom: '64px', boxShadow: 'var(--shadow-sm)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '32px', textAlign: 'center' }}>Privacy Policy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Information We Collect</h3>
          <p>When you visit our website or place an order, we collect certain personal information to fulfill your request and improve our services:</p>
          <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Personal Details:</strong> Name, email address, phone number, and billing/shipping address.</li>
            <li><strong>Payment Information:</strong> Credit card numbers or other payment details (processed securely via our third-party payment processors; we do not store your full payment information on our servers).</li>
            <li><strong>Device Information:</strong> IP address, browser type, and interactions with our website via cookies.</li>
          </ul>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. How We Use Your Information</h3>
          <p>We use the collected information for the following purposes:</p>
          <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>To process, fulfill, and communicate with you regarding your bakery orders.</li>
            <li>To screen orders for potential risk or fraud.</li>
            <li>To provide customer support.</li>
            <li>To send marketing communications (only if you have opted in to receive them).</li>
          </ul>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Sharing Your Information</h3>
          <p>We do not sell your personal information. We only share your information with trusted third-party service providers necessary to operate our business, such as:</p>
          <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Payment Gateways:</strong> To process your transactions securely.</li>
            <li><strong>Delivery Partners:</strong> To ensure your orders reach the correct address.</li>
            <li><strong>Website Analytics:</strong> To help us understand how our customers use the site.</li>
          </ul>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. Data Security</h3>
          <p>We implement standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is entirely secure, and we cannot guarantee absolute data security.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>5. Your Rights</h3>
          <p>Depending on your location, you may have the right to access, update, or delete the personal information we hold about you. To exercise these rights, please contact us at <strong>aeteesbakehouse@gmail.com</strong>.</p>
        </section>
      </div>
    </div>
  );
}
