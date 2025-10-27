export default function OrdersList({ orders, showHeader = true }) {
  return (
    <section className="orders">
      {showHeader && <h2 className="sectionTitle">Past Orders</h2>}
      {orders.length === 0 ? (
        <div className="muted">No orders yet.</div>
      ) : (
        <div className="ordersList">
          {orders.map(o => (
            <div key={o.orderId} className="orderCard">
              <div className="orderHeader">
                <div className="orderId">#{o.orderId}</div>
                <div className="orderTime">{new Date(o.timestamp).toLocaleString()}</div>
              </div>
              <div className="orderBody">
                <div><b>Name:</b> {o.name} &nbsp; <b>Email:</b> {o.email}</div>
                <div><b>Total:</b> ₹{o.totalAmount} &nbsp; <b>Items:</b> {o.totalItems}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
