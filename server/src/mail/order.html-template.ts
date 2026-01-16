export function generateOrderHtml(order: any): string {
  const totalPrice = order.total > 1600 ? order.total : order.total + 200;
  const productRows = order.products
    .map(
      (p) => `
        <tr>
        <td style="padding: 8px; border: 1px solid #ddd; display: flex; align-items: center; gap: 8px;">
          <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
          <span>${p.name}</span>
        </td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${p.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${p.price} ALL</td>
        </tr>
      `,
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Konfirmim Porosie - #${order.id}</h2>
      <p>Përshendetje ${order.name},</p>
      <p>Faleminderit për blerjen tuaj. Detajet e porosisë:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Produkti</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Sasia</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Çmimi</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>Totali:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>${totalPrice.toFixed(2)} ALL</strong></td>
          </tr>
        </tfoot>
      </table>

      <p style="margin-top: 20px;">
        <strong>Adresa:</strong><br>
        ${order.address}, ${order.city}<br>
        <strong>Tel:</strong> ${order.phone}<br>
        <strong>Email:</strong> ${order.user_email}
      </p>

      ${order.notes ? `<p><strong>Shënime:</strong> ${order.notes}</p>` : ''}

      <p style="margin-top: 30px;">Per konfirmin e porosise prisni nje telefonate nga stafi jone.</p>
      <p>Ju faleminderit,<br>Fan Zone</p>
    </div>
  `;
}
