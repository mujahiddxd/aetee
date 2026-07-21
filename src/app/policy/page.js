export default function PolicyPage() {
  return (
    <div className="container" style={{ padding: '64px 32px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--color-bg-white)', borderRadius: 'var(--radius-lg)', marginTop: '32px', marginBottom: '64px', boxShadow: 'var(--shadow-sm)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '32px', textAlign: 'center' }}>Purchases & Refund Policy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Order Modifications and Cancellations</h3>
          <p>Because our baked goods are made fresh to order and are perishable in nature, <strong>all sales are final</strong>. Once an order is placed and confirmed on our website, it cannot be canceled, modified, or refunded. Please review your order carefully—including items, pickup/delivery dates, and quantities—before completing your purchase.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. No Refund Policy</h3>
          <p>We do not offer refunds, store credit, or exchanges for any purchases. This policy applies to all circumstances, including but not limited to:</p>
          <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Changes of mind or accidental orders.</li>
            <li>Failure to pick up an order at the scheduled time.</li>
            <li>Delivery issues caused by incorrect addresses provided by the customer.</li>
          </ul>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Damaged or Incorrect Items</h3>
          <p>We take great pride in the quality of our bakery items. If you receive an item that is damaged or incorrect due to an error on our part, please contact us at <strong>aeteesbakehouse@gmail.com</strong> within <strong>24 hours</strong> of receiving your order. Please include a photo of the item. While we do not issue refunds, we will work with you to provide a replacement item of equal value at our sole discretion.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. Fulfillment</h3>
          <p>Orders will be fulfilled according to the date and time selected at checkout. If you do not retrieve your order during the designated pickup window, the items will be forfeited without a refund.</p>
        </section>
      </div>
    </div>
  );
}
