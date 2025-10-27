export default function CartPanel({ cart, productMap, onAdd, onSetQty, onRemove, recs = [] }) {
  const renderName = (id) => productMap?.get(id)?.name || id;
  const renderPrice = (id) => productMap?.get(id)?.price || 0;

  const subtotal = cart.items.reduce((s, i) => s + (renderPrice(i.productId) * i.qty), 0);

  return (
    <section className="panel cart light">
      <div className="panelHeader">
        <h2 className="sectionTitle">Your Cart</h2>
      </div>

      {/* Scroll area */}
      <div className="cartBody">
        {cart.items.length === 0 && <div className="muted">No items yet.</div>}

        {cart.items.map(i => {
          const unit = renderPrice(i.productId);
          const line = unit * i.qty;
          return (
            <div key={i.productId} className="row">
              <div className="lineInfo">
                <div className="lineTitle">{renderName(i.productId)}</div>
                <div className="lineSub">₹{unit} × {i.qty} = <b>₹{line}</b></div>
              </div>
              <div className="qty">
                <button onClick={() => onSetQty(i.productId, Math.max(0, i.qty - 1))}>-</button>
                <span>{i.qty}</span>
                <button onClick={() => onAdd(i.productId, 1)}>+</button>
              </div>
              <button className="remove" onClick={() => onRemove(i.productId)}>Remove</button>
            </div>
          );
        })}

        {recs.length > 0 && (
          <div className="recsInCart">
            <h3 className="sectionSubTitle">You may also like</h3>
            <div className="miniGrid">
              {recs.map(r => (
                <div key={r.id} className="miniCard">
                  <img src={r.image} alt={r.name} />
                  <div className="miniMeta">
                    <div className="miniTitle">{r.name}</div>
                    <div className="miniPrice">₹{r.price}</div>
                  </div>
                  <button onClick={() => onAdd(r.id, 1)}>Add</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom section inside the panel */}
      <div className="total">Total: ₹{subtotal}</div>
    </section>
  );
}
