import React, { useState } from 'react';
import { Home, ShoppingBag, Heart, Tag, Gift, LogOut, Search, User, Trash2, Plus, Minus, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  { id: 1, name: 'Cappuccino', desc: 'Smooth espresso with steamed milk', price: 3.49, category: 'Beverages', img: `${import.meta.env.BASE_URL}images/coffee.png` },
  { id: 2, name: 'Veg Sandwich', desc: 'Grilled perfection with fresh veggies', price: 4.49, category: 'Sandwiches', img: `${import.meta.env.BASE_URL}images/sandwich.png` },
  { id: 3, name: 'Maggi', desc: 'Classic masala maggi with perfection', price: 2.49, category: 'Maggi', img: `${import.meta.env.BASE_URL}images/maggi.png` },
  { id: 4, name: 'Egg Maggi', desc: 'Masala maggi topped with egg', price: 2.99, category: 'Maggi', img: `${import.meta.env.BASE_URL}images/maggi.png` },
  { id: 5, name: 'Chicken Sandwich', desc: 'Juicy chicken with fresh veggies', price: 5.49, category: 'Sandwiches', img: `${import.meta.env.BASE_URL}images/sandwich.png` },
  { id: 6, name: 'Shawarma', desc: 'Spiced chicken shawarma with sauces', price: 5.99, category: 'Wraps', img: `${import.meta.env.BASE_URL}images/sandwich.png` }, 
  { id: 7, name: 'Grilled Sandwich', desc: 'Grilled chicken with cheese & veggies', price: 5.49, category: 'Sandwiches', img: `${import.meta.env.BASE_URL}images/sandwich.png` },
  { id: 8, name: 'French Fries', desc: 'Crispy fries with peri peri masala', price: 2.49, category: 'Snacks', img: `${import.meta.env.BASE_URL}images/maggi.png` },
  { id: 9, name: 'Cold Coffee', desc: 'Chilled coffee with a creamy blend', price: 3.49, category: 'Beverages', img: `${import.meta.env.BASE_URL}images/coffee.png` },
  { id: 10, name: 'Chocolate Shake', desc: 'Rich chocolate milkshake', price: 3.49, category: 'Beverages', img: `${import.meta.env.BASE_URL}images/dessert.png` },
  { id: 11, name: 'Chicken Wrap', desc: 'Spicy chicken with veggies & sauce', price: 5.49, category: 'Wraps', img: `${import.meta.env.BASE_URL}images/sandwich.png` },
  { id: 12, name: 'Chocolate Cake', desc: 'Rich & moist chocolate satisfaction', price: 3.49, category: 'Desserts', img: `${import.meta.env.BASE_URL}images/dessert.png` },
];

const categories = ['All Items', 'Beverages', 'Sandwiches', 'Maggi', 'Wraps', 'Snacks', 'Desserts'];

export default function MenuDashboard() {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [cart, setCart] = useState([]);

  const filteredItems = activeCategory === 'All Items' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 1.50 : 0;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="flex h-screen bg-[#0c0806] text-[#d6b98c] font-sans overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 overflow-y-auto hidden lg:flex">
        <div className="flex flex-col uppercase tracking-[0.2em] mb-12 cursor-pointer">
          <Link to="/">
            <span className="text-[#f5e6c8] font-bold text-xl leading-tight">AURORA</span>
            <span className="text-[0.65rem] opacity-70">CAFÉ & CO.</span>
          </Link>
        </div>

        <nav className="flex flex-col gap-2 mb-8">
          <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-white/60">
            <Home size={18} /> Home
          </Link>
          <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium bg-[#1a0f0a] border border-[#c6a15b]/20 text-[#c6a15b]">
            <ShoppingBag size={18} /> Order Now
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-white/60">
            <ShoppingBag size={18} /> My Orders
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-white/60">
            <Heart size={18} /> Favorites
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-white/60">
            <Tag size={18} /> Offers
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-white/60">
            <Gift size={18} /> Loyalty
          </div>
        </nav>

        <div className="mt-auto border border-[#c6a15b]/20 bg-[#1a0f0a] rounded-2xl p-5 text-center flex flex-col items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#c6a15b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CoffeeCupIcon className="w-8 h-8 text-[#c6a15b] mb-3" />
          <h4 className="text-[#f5e6c8] text-sm font-bold uppercase tracking-wider mb-1">Hot Coffee Weather</h4>
          <p className="text-[0.65rem] text-[#c6a15b] uppercase tracking-widest font-semibold">Flat 20% Off</p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[#c6a15b]">?</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/80">Need Help?</p>
              <p className="text-[10px] text-white/50">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/50 hover:text-white/80 cursor-pointer transition-colors pt-4 border-t border-white/5">
            <LogOut size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Log Out</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
          <nav className="hidden md:flex items-center gap-8 text-[0.65rem] uppercase tracking-widest font-medium">
            <Link to="/" className="hover:text-[#f5e6c8] transition-colors">Home</Link>
            <span className="text-[#c6a15b]">Menu</span>
            <span className="hover:text-[#f5e6c8] transition-colors cursor-pointer">Offers</span>
            <span className="hover:text-[#f5e6c8] transition-colors cursor-pointer">About Us</span>
            <span className="hover:text-[#f5e6c8] transition-colors cursor-pointer">Contact</span>
          </nav>
          
          <div className="flex items-center gap-6 ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search for food, drinks..." 
                className="bg-[#1a0f0a] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-white/80 focus:outline-none focus:border-[#c6a15b]/50 w-64 transition-colors"
              />
            </div>
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer">
              <User size={16} />
            </div>
            <div className="relative cursor-pointer">
              <ShoppingBag size={20} className="text-[#f5e6c8]" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#c6a15b] text-[#1a0f0a] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8 pb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#f5e6c8] mb-2 font-serif">Our Menu</h1>
              <p className="text-sm text-white/60">Freshly made. Perfectly crafted.</p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                    activeCategory === cat 
                      ? 'border-[#c6a15b] bg-[#c6a15b]/10 text-[#c6a15b]' 
                      : 'border-white/10 text-white/60 hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-[#1a0f0a] border border-white/5 rounded-2xl p-4 flex flex-col group relative overflow-hidden">
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center border border-white/10 z-10 hover:text-[#c6a15b] hover:border-[#c6a15b] transition-colors">
                  <Heart size={14} />
                </button>
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-black/50">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-[#f5e6c8] font-bold text-base mb-1">{item.name}</h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 h-8">{item.desc}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-[#f5e6c8]">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="px-5 py-1.5 border border-[#c6a15b]/40 rounded-lg text-xs font-bold tracking-wider text-[#c6a15b] hover:bg-[#c6a15b] hover:text-[#1a0f0a] transition-all"
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM FIXED BAR */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-[#0c0806]/90 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-8">
          <div className="flex items-center gap-12 max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="text-[#c6a15b]">🔥</span>
              <div>
                <p className="text-xs font-bold text-[#f5e6c8] uppercase tracking-wider">Fresh Ingredients</p>
                <p className="text-[10px] text-white/50">Sourced daily for the best quality</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c6a15b]">🚚</span>
              <div>
                <p className="text-xs font-bold text-[#f5e6c8] uppercase tracking-wider">Fast Delivery</p>
                <p className="text-[10px] text-white/50">Delivered hot & fresh to your doorstep</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c6a15b]">🛍️</span>
              <div>
                <p className="text-xs font-bold text-[#f5e6c8] uppercase tracking-wider">Safe Packaging</p>
                <p className="text-[10px] text-white/50">Hygienic & eco-friendly packaging</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c6a15b]">✨</span>
              <div>
                <p className="text-xs font-bold text-[#f5e6c8] uppercase tracking-wider">Best Offers</p>
                <p className="text-[10px] text-white/50">Exclusive offers & loyalty rewards</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR (CART) */}
      <aside className="w-80 border-l border-white/5 bg-[#110a06] flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-[#f5e6c8] font-serif">Your Order</h2>
          <button className="text-[10px] uppercase tracking-wider text-[#c6a15b] hover:text-white" onClick={() => setCart([])}>Clear All</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag size={48} className="mb-4 text-white/20" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-14 h-14 rounded-lg bg-black/50 overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <h4 className="text-sm font-semibold text-white/90">{item.name}</h4>
                    <span className="text-xs font-bold text-[#f5e6c8]">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-3 border border-white/10 rounded-md px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-white/50 hover:text-[#c6a15b]"><Minus size={10} /></button>
                      <span className="text-xs font-semibold w-3 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-white/50 hover:text-[#c6a15b]"><Plus size={10} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-auto border-t border-white/5 pt-6 flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span className="text-white/90 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Delivery Fee</span>
                <span className="text-white/90 font-medium">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Taxes</span>
                <span className="text-white/90 font-medium">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold text-[#f5e6c8] mt-2 pt-4 border-t border-white/5">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="relative mt-4">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input type="text" placeholder="Apply Promo Code" className="w-full bg-[#1a0f0a] border border-white/10 rounded-lg pl-9 pr-20 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6a15b]/50" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold tracking-wider text-[#c6a15b]">Apply</button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/5 bg-[#1a0f0a]/50 flex flex-col gap-4 shrink-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Delivery Details</h3>
          
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-[#c6a15b] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white/90">Home</p>
              <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">123 Coffee Street, Brew City,<br/>CA 90210, USA</p>
            </div>
            <button className="ml-auto text-white/20 hover:text-white/60"><Search size={12} className="opacity-0" /></button>
          </div>

          <div className="flex items-start gap-3 border-t border-white/5 pt-3">
            <Clock size={16} className="text-[#c6a15b] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white/90">Delivery Time</p>
              <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">30 - 40 mins</p>
            </div>
          </div>

          <button 
            disabled={cart.length === 0}
            className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all mt-2 flex items-center justify-center gap-2 ${
              cart.length > 0 
                ? 'bg-gradient-to-r from-[#c6a15b] to-[#d8b97a] text-[#1a0f0a] hover:opacity-90 shadow-[0_0_20px_rgba(198,161,91,0.2)]' 
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            Proceed To Checkout →
          </button>
          <p className="text-[9px] text-center text-white/40 flex items-center justify-center gap-1.5"><LogOut size={10}/> Secure & Safe Payments</p>
        </div>
      </aside>

    </div>
  );
}

// Simple coffee cup icon component since lucide doesn't have an exact match
function CoffeeCupIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}
