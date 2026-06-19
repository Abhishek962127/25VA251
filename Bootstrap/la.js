const { useState, useEffect } = React;

const FOOD_API = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian";
const LOGO = "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png";
const CART_ICON = "https://cdn-icons-png.flaticon.com/512/833/833314.png";

function App() {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(FOOD_API).then(r => r.json()).then(d => d.meals && setMeals(d.meals));
  }, []);

  const add = id => setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const remove = id => setCart(p => {
    const u = { ...p };
    u[id] <= 1 ? delete u[id] : u[id]--;
    return u;
  });

  const total = Object.values(cart).reduce((s, q) => s + q, 0);
  const filtered = meals.filter(m => m.strMeal.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', background: '#fff' }}>
        <img src={LOGO} alt="Logo" style={{ height: 40, cursor: 'pointer' }} onClick={() => setShowCart(false)} />
        <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px 15px', width: 300, borderRadius: 5, border: '1px solid #ccc', fontSize: 14 }} />
        <div onClick={() => setShowCart(true)} style={{ position: 'relative', cursor: 'pointer' }}>
          <img src={CART_ICON} alt="Cart" style={{ height: 30 }} />
          <span style={{ position: 'absolute', top: -5, right: -10, background: '#fc8019', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: 12, fontWeight: 'bold' }}>{total}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 20 }}>
        {showCart ? (
          // Cart Page
          <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: 20 }}>
            <button onClick={() => setShowCart(false)} style={{ background: '#333', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: 4, cursor: 'pointer', marginBottom: 20 }}>← Back</button>
            <h3>Your Cart</h3>
            {meals.filter(m => cart[m.idMeal] > 0).length === 0 ? (
              <p style={{ color: '#777' }}>Cart is empty!</p>
            ) : (
              <>
                {meals.filter(m => cart[m.idMeal] > 0).map(item => (
                  <div key={item.idMeal} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                      <img src={item.strMealThumb} alt={item.strMeal} style={{ width: 50, height: 50, borderRadius: 4, objectFit: 'cover' }} />
                      <span style={{ fontWeight: 500 }}>{item.strMeal}</span>
                    </div>
                    <QtyCtrl id={item.idMeal} qty={cart[item.idMeal]} add={add} remove={remove} />
                  </div>
                ))}
                <div style={{ marginTop: 20, paddingTop: 15, borderTop: '2px solid #333', fontWeight: 'bold', fontSize: 18, textAlign: 'right' }}>Total: {total}</div>
              </>
            )}
          </div>
        ) : (
          // Menu Grid
          <div>
            <h2 style={{ marginBottom: 20, color: '#333' }}>Vegetarian Delights</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 25 }}>
              {filtered.map(meal => (
                <div key={meal.idMeal} style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 15, textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', background: '#fff' }}>
                  <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 6 }} />
                  <h4 style={{ margin: '10px 0 5px', fontSize: 16, color: '#444', minHeight: 40 }}>{meal.strMeal}</h4>
                  <div style={{ color: 'green', fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>🟢 Veg</div>
                  {cart[meal.idMeal] > 0
                    ? <QtyCtrl id={meal.idMeal} qty={cart[meal.idMeal]} add={add} remove={remove} />
                    : <button onClick={() => add(meal.idMeal)} style={{ background: '#fff', color: '#60b246', border: '1px solid #60b246', padding: '6px 20px', fontWeight: 'bold', borderRadius: 4, cursor: 'pointer', width: '100%' }}>ADD</button>
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: '#1a1a1a', color: '#fff', textAlign: 'center', padding: 15, fontSize: 14 }}>© Veg Food App 🌱</div>
    </div>
  );
}


const QtyCtrl = ({ id, qty, add, remove }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #60b246', borderRadius: 4, width: '100%', boxSizing: 'border-box' }}>
    <button onClick={() => remove(id)} style={{ border: 'none', background: 'none', color: '#60b246', padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold', fontSize: 16 }}>-</button>
    <span style={{ color: '#60b24', fontWeight: 'bold' }}>{qty}</span>
    <button onClick={() => add(id)} style={{ border: 'none', background: 'none', color: '#60b246', padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold', fontSize: 16 }}>+</button>
  </div>
);