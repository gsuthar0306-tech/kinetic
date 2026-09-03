import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

type Session = { name: string; email: string };
type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};
type Order = {
  id: string;
  email: string;
  date: string;
  items: OrderItem[];
  total: number;
};

function getSession(): Session | null {
  const raw = localStorage.getItem("kinetic-session");
  return raw ? (JSON.parse(raw) as Session) : null;
}

function getOrdersForUser(email: string): Order[] {
  const raw = localStorage.getItem("kinetic-orders");
  const all: Order[] = raw ? JSON.parse(raw) : [];
  return all.filter((o) => o.email === email);
}

export function Profile() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate("/login");
      return;
    }
    setSession(s);
    setOrders(getOrdersForUser(s.email));
  }, [navigate]);

  if (!session) return null;

  const totalItems = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0,
  );
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Welcome back, {session.name}
        </h1>
        <p className="text-sm text-slate-500">{session.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-slate-500">Products purchased</p>
          <p className="text-2xl font-bold text-slate-950">{totalItems}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-slate-500">Total spent</p>
          <p className="text-2xl font-bold text-slate-950">
            ${totalSpent.toFixed(2)}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-950 mb-3">
          Order history
        </h2>
        {orders.length === 0 ? (
          <p className="text-sm text-slate-500">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border p-4">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {order.items.map((item) => (
                    <li
                      key={item.productId}
                      className="flex justify-between text-sm text-slate-950"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        variant="outline"
        onClick={() => {
          localStorage.removeItem("kinetic-session");
          navigate("/login");
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
