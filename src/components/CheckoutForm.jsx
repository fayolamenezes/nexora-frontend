import { useEffect, useState } from "react";

export default function CheckoutForm({ onSubmit, resetKey }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Reset form fields whenever parent bumps resetKey
  useEffect(() => {
    setName("");
    setEmail("");
    setSubmitting(false);
  }, [resetKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const n = name.trim();
    const m = email.trim();
    if (!n || !m) return;

    try {
      setSubmitting(true);
      await onSubmit({ name: n, email: m });
      // parent will bump resetKey, clearing fields
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel">
      <h2 className="sectionTitle">Checkout</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={submitting}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={submitting}
          />
        </label>
        <button className="primary" type="submit" disabled={!name || !email || submitting}>
          {submitting ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </section>
  );
}
