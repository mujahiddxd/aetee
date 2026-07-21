export default function TermsPage() {
  return (
    <div className="container" style={{ padding: '64px 32px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--color-bg-white)', borderRadius: 'var(--radius-lg)', marginTop: '32px', marginBottom: '64px', boxShadow: 'var(--shadow-sm)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '32px', textAlign: 'center' }}>Terms & Conditions</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Acceptance of Terms</h3>
          <p>By accessing and using <strong>https://aeteesbakehouse.com/</strong> and purchasing products from <strong>Aetees Bakehouse</strong>, you agree to be bound by these Terms & Conditions.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. Health and Allergen Disclaimer</h3>
          <p><strong>Aetees Bakehouse</strong> products are prepared in a kitchen that handles major allergens, including dairy, eggs, wheat, soy, peanuts, and tree nuts. While we take precautions to prevent cross-contamination, we cannot guarantee that any item is entirely free of allergens. Customers with severe allergies consume our products at their own risk.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Product Availability and Pricing</h3>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><strong>Availability:</strong> All bakery items are subject to availability. We reserve the right to limit the quantities of any products we offer or discontinue items at any time.</li>
            <li><strong>Pricing:</strong> Prices for our products are subject to change without notice. We are not liable to you or any third party for any modification, price change, or suspension of the service.</li>
            <li><strong>Descriptions:</strong> We strive to display the colors, textures, and designs of our products as accurately as possible. However, because our items are handmade, slight variations from website images may occur.</li>
          </ul>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. User Information</h3>
          <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and payment details, so that we can complete your transactions and contact you as needed.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>5. Intellectual Property</h3>
          <p>All content on this website, including text, graphics, logos, images, and recipes, is the property of <strong>Aetees Bakehouse</strong> and is protected by applicable copyright and trademark laws.</p>
        </section>
      </div>
    </div>
  );
}
