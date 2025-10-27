export default function ProductsGrid({ products, onAdd }) {
  return (
    <div>
      <h2 className="sectionTitle">Products</h2>
      <div className="grid productsGrid">
        {products.map(p => (
          <div key={p.id} className="card">
            <img className="productImg" src={p.image} alt={p.name} />
            <div className="cardBody">
              <div className="title">{p.name}</div>
              <div className="meta">
                <span className="cat">{p.category}</span>
                <span className="price">₹{p.price}</span>
              </div>
              <button onClick={() => onAdd(p.id, 1)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
