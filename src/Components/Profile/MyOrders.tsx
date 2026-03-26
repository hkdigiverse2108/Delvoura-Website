import { Card, Divider, Tag, Typography } from "antd";
import { TruckOutlined, CheckCircleOutlined, ClockCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  size?: string;
  image: string;
}

interface OrderAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  phone: string;
}

interface OrderData {
  id: string;
  createdAt: string;
  orderStatus: string;
  paymentStatus: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  items: OrderItem[];
  shippingAddress: OrderAddress;
}

const orders: OrderData[] = [
  {
    id: "ORD-DEL-40291",
    createdAt: "2026-03-22",
    orderStatus: "Placed",
    paymentStatus: "Paid",
    subtotal: 3498,
    shipping: 0,
    tax: 210,
    total: 3708,
    currency: "INR",
    items: [
      {
        id: "it-1",
        name: "Satin Midi Dress",
        quantity: 1,
        price: 1999,
        size: "M",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "it-2",
        name: "Signature Tote Bag",
        quantity: 1,
        price: 1499,
        image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=300&auto=format&fit=crop",
      },
    ],
    shippingAddress: {
      firstName: "Aarav",
      lastName: "Mehta",
      address1: "742 Sunrise Residency",
      address2: "Sector 12",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      pinCode: "560102",
      phone: "+91 98765 43210",
    },
  },
  {
    id: "ORD-DEL-40245",
    createdAt: "2026-02-14",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
    subtotal: 4299,
    shipping: 0,
    tax: 258,
    total: 4557,
    currency: "INR",
    items: [
      {
        id: "it-3",
        name: "Embroidered Kurta Set",
        quantity: 1,
        price: 2599,
        size: "L",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "it-4",
        name: "Premium Cotton Scarf",
        quantity: 2,
        price: 850,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop",
      },
    ],
    shippingAddress: {
      firstName: "Aarav",
      lastName: "Mehta",
      address1: "5th Floor, Orion Tech Park",
      address2: "MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      pinCode: "560001",
      phone: "+91 98765 43210",
    },
  },
];

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(value);

const getOrderStatusConfig = (status: string) => {
  const statusMap = {
    placed: { color: "gold", icon: <ClockCircleOutlined />, label: "Order Placed" },
    processing: { color: "blue", icon: <ClockCircleOutlined />, label: "Processing" },
    shipped: { color: "cyan", icon: <TruckOutlined />, label: "Shipped" },
    delivered: { color: "green", icon: <CheckCircleOutlined />, label: "Delivered" },
    cancelled: { color: "red", icon: <ClockCircleOutlined />, label: "Cancelled" },
  };
  const key = status.toLowerCase();
  return statusMap[key as keyof typeof statusMap] || statusMap.placed;
};

const getPaymentStatusConfig = (status: string) => {
  const statusMap = {
    paid: { color: "green", label: "Paid" },
    pending: { color: "gold", label: "Pending" },
    failed: { color: "red", label: "Failed" },
    refunded: { color: "orange", label: "Refunded" },
  };
  const key = status.toLowerCase();
  return statusMap[key as keyof typeof statusMap] || statusMap.pending;
};

const MyOrders = () => {
  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="mb-4">
        <Title level={5} className="!mb-1">
          My Orders
        </Title>
        <Text className="text-sm text-[color:var(--color-text-muted)]">
          Track recent purchases, totals, and delivery addresses.
        </Text>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const statusConfig = getOrderStatusConfig(order.orderStatus);
          const paymentConfig = getPaymentStatusConfig(order.paymentStatus);

          return (
            <Card
              key={order.id}
              className="orders-card bg-white border border-[color:var(--color-border)] shadow-sm"
              styles={{ body: { padding: 20 } }}
            >
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <Text className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                      Order ID
                    </Text>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Title level={5} className="!mb-0 font-mono">
                        {order.id}
                      </Title>
                      <Tag color={statusConfig.color} icon={statusConfig.icon} className="!rounded-full !px-2 !py-0 !text-xs">
                        {statusConfig.label}
                      </Tag>
                      <Tag color={paymentConfig.color} className="!rounded-full !px-2 !py-0 !text-xs">
                        {paymentConfig.label}
                      </Tag>
                    </div>
                    <Text className="mt-1 block text-xs text-[color:var(--color-text-muted)]">
                      <ClockCircleOutlined className="mr-1 text-xs" />
                      Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </Text>
                  </div>

                  <div className="rounded-[12px] bg-[color:var(--color-card)] px-4 py-2 text-right">
                    <Text className="block text-xs text-[color:var(--color-text-muted)]">Total Amount</Text>
                    <Text className="text-lg font-semibold text-[color:var(--color-text)]">
                      {formatCurrency(order.total, order.currency)}
                    </Text>
                  </div>
                </div>

                <Divider className="!my-2" />

                {/* Sections */}
                <div className="space-y-5">
                  {/* Items */}
                  <div>
                    <Text className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
                      Order Items ({order.items.reduce((acc, item) => acc + item.quantity, 0)} items)
                    </Text>
                    <div className="mt-3 space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex flex-col gap-3 rounded-[12px] bg-[color:var(--color-card)] p-3 sm:flex-row sm:items-center">
                          <div className="h-16 w-16 overflow-hidden rounded-[10px] border border-[color:var(--color-border)] bg-white">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <Text className="block font-medium text-[color:var(--color-text)]">{item.name}</Text>
                            <Text className="text-xs text-[color:var(--color-text-muted)]">
                              Qty {item.quantity} {item.size ? `| Size ${item.size}` : ""}
                            </Text>
                          </div>
                          <div className="text-right">
                            <Text className="text-xs text-[color:var(--color-text-muted)]">Price</Text>
                            <Text className="block font-semibold text-[color:var(--color-text)]">
                              {formatCurrency(item.price, order.currency)}
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping + Summary */}
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
                    <div className="rounded-[12px] bg-[color:var(--color-card)] p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <TruckOutlined className="text-[color:var(--color-text-muted)]" />
                        <Text className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
                          Shipping Address
                        </Text>
                      </div>
                      <div className="space-y-1">
                        <Text className="block font-medium text-[color:var(--color-text)]">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                        </Text>
                        <Text className="block text-sm text-[color:var(--color-text-muted)]">
                          {order.shippingAddress.address1}{order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ""}
                        </Text>
                        <Text className="block text-sm text-[color:var(--color-text-muted)]">
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </Text>
                        <Text className="block text-sm text-[color:var(--color-text-muted)]">
                          {order.shippingAddress.country} - {order.shippingAddress.pinCode}
                        </Text>
                        <Text className="block text-sm text-[color:var(--color-text-muted)]">
                          Phone: {order.shippingAddress.phone}
                        </Text>
                      </div>
                    </div>

                    <div className="rounded-[12px] bg-[color:var(--color-card)] p-4">
                      <Text className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
                        Order Summary
                      </Text>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <Text className="text-[color:var(--color-text-muted)]">Subtotal</Text>
                          <Text>{formatCurrency(order.subtotal, order.currency)}</Text>
                        </div>
                        <div className="flex justify-between">
                          <Text className="text-[color:var(--color-text-muted)]">Shipping</Text>
                          <Text>{formatCurrency(order.shipping, order.currency)}</Text>
                        </div>
                        <div className="flex justify-between">
                          <Text className="text-[color:var(--color-text-muted)]">Tax</Text>
                          <Text>{formatCurrency(order.tax, order.currency)}</Text>
                        </div>
                        <Divider className="!my-1" />
                        <div className="flex justify-between font-semibold">
                          <Text>Total</Text>
                          <Text>{formatCurrency(order.total, order.currency)}</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingOutlined className="text-5xl text-gray-300 mb-3" />
          <Title level={5} className="!text-gray-500">No orders yet</Title>
          <Text className="text-gray-400 block mb-3 text-sm">Your order history will appear here</Text>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
