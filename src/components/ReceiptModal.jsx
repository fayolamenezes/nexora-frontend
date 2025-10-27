export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;
  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <h3>Order Receipt</h3>
        <div className="receiptRow"><b>Order:</b> {receipt.orderId}</div>
        <div className="receiptRow"><b>Items:</b> {receipt.totalItems}</div>
        <div className="receiptRow"><b>Amount:</b> ₹{receipt.totalAmount}</div>
        <div className="receiptRow"><b>Time:</b> {new Date(receipt.timestamp).toLocaleString()}</div>
        <div className="actions"><button onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}
