import { Card, Divider, Tag, Typography } from "antd";
import { useMemo } from "react";
import { useQueries as useReactQueries } from "@tanstack/react-query";
import { TruckOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { normalizePaymentStatus } from "../common";
import { Get } from "../../Api/Methods/Index";
import { KEYS, URL_KEYS } from "../../Constants";
import { ROUTES } from "../../Constants/Routes";
import type { OrderItem, ProductItem, SingleProductApiResponse } from "../../Types";

const { Text, Title } = Typography;

type MyOrdersProps = {
  orders: OrderItem[];
  isLoading?: boolean;
};

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

const MyOrders = ({ orders, isLoading }: MyOrdersProps) => {
  const navigate = useNavigate();
  const productIds = useMemo(() => {
    const ids = new Set<string>();
    orders.forEach((order) => {
      (order.items ?? []).forEach((item) => {
        if (item.productId) ids.add(String(item.productId));
      });
    });
    return Array.from(ids);
  }, [orders]);

  const productQueries = useReactQueries({
    queries: productIds.map((id) => ({
      queryKey: [KEYS.PRODUCT.GET_PRODUCT_BY_ID, id],
      queryFn: async () => await Get<SingleProductApiResponse>(`${URL_KEYS.PRODUCT.GET_PRODUCT_BY_ID}/${id}`),
      enabled: !!id,
      refetchOnWindowFocus: false,
      placeholderData: (previousData: SingleProductApiResponse | undefined) => previousData,
      retry: 0,
      staleTime: 1000 * 60,
    })),
  });

  const productMap = useMemo(() => {
    const map = new Map<string, ProductItem>();
    productQueries.forEach((query, index) => {
      const id = productIds[index];
      const product = query.data?.data;
      if (id && product) map.set(id, product);
    });
    return map;
  }, [productQueries, productIds]);

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 py-4">
        <Title level={5} className="!mb-1">
          My Orders
        </Title>
        <Text className="text-sm text-[color:var(--color-text-muted)]">Loading your orders...</Text>
      </div>
    );
  }

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
          const orderStatus = order.orderStatus ?? "placed";
          const paymentStatus = normalizePaymentStatus(order.paymentStatus);
          const statusConfig = getOrderStatusConfig(orderStatus);
          const paymentConfig = getPaymentStatusConfig(paymentStatus);
          const currency = order.currency ?? "INR";
          const subtotal = order.subtotal ?? 0;
          const shipping = order.shipping ?? 0;
          const tax = order.tax ?? 0;
          const total = order.total ?? 0;
          const items = order.items ?? [];
          const createdAt = order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
            : "N/A";
          const primaryAddress = order.shippingAddress?.[0];
          const firstName = order.firstName ?? "";
          const lastName = order.lastName ?? "";
          const phone = order.phone ?? "";

          return (
            <Card key={order._id ?? order.razorpayId ?? order.phonePeId ?? `${order.createdAt ?? "order"}`} className="orders-card bg-white border border-[color:var(--color-border)] shadow-sm" styles={{ body: { padding: 20 } }}>
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <Text className="text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                      Order ID
                    </Text>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Title level={5} className="!mb-0 font-mono">
                        {order.orderId || "#N/A"}
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
                      Placed on {createdAt}
                    </Text>
                  </div>

                  <div className="rounded-[12px] bg-[color:var(--color-card)] px-4 py-2 text-right">
                    <Text className="block text-xs text-[color:var(--color-text-muted)]">Total Amount</Text>
                    <Text className="text-lg font-semibold text-[color:var(--color-text)]">
                      {formatCurrency(total, currency)}
                    </Text>
                  </div>
                </div>

                <Divider className="!my-2" />

                {/* Sections */}
                <div className="space-y-5">
                  {/* Items */}
                  <div>
                    <Text className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
                      Order Items ({items.reduce((acc, item) => acc + (item.quantity ?? 0), 0)} items)
                    </Text>
                    <div className="mt-3 space-y-3">
                      {items.map((item, index) => {
                        const product = item.productId ? productMap.get(String(item.productId)) : undefined;
                        const displayName = product?.name ?? product?.title ?? "Product";
                        const displayImage = product?.coverimage ?? product?.images?.[0] ?? "";
                        const displaySubtitle = product?.title && product.title !== displayName ? product.title : "";
                        const productId = item.productId ? String(item.productId) : "";

                        return (
                          <div
                            key={item.productId ?? `${order._id ?? "order"}-item-${index}`}
                            className="flex cursor-pointer flex-col gap-3 rounded-[12px] bg-[color:var(--color-card)] p-3 transition hover:shadow-sm sm:flex-row sm:items-center"
                            onClick={() => {
                              if (!productId) return;
                              navigate(ROUTES.getProductDetails(productId));
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                              if (!productId) return;
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                navigate(ROUTES.getProductDetails(productId));
                              }
                            }}
                          >
                            <div className="h-16 w-16 overflow-hidden rounded-[10px] border border-[color:var(--color-border)] bg-white">
                              {displayImage ? (
                                <img src={displayImage} alt={displayName} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-[color:var(--color-text-muted)]">
                                  Image
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <Text className="block font-medium text-[color:var(--color-text)]">
                                {displayName}
                              </Text>
                              <Text className="text-xs text-[color:var(--color-text-muted)]">
                                {displaySubtitle ? `${displaySubtitle} | ` : ""}Qty {item.quantity ?? 0} {item.size ? `| Size ${item.size}` : ""}
                              </Text>
                            </div>
                            <div className="text-right">
                              <Text className="text-xs text-[color:var(--color-text-muted)]">Price</Text>
                              <Text className="block font-semibold text-[color:var(--color-text)]">
                                {formatCurrency(item.price ?? 0, currency)}
                              </Text>
                            </div>
                          </div>
                        );
                      })}
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
                          {firstName} {lastName}
                        </Text>
                        <Text className="block text-sm text-[color:var(--color-text-muted)]">
                          {primaryAddress?.address1 ?? "Address not available"}
                          {primaryAddress?.address2 ? `, ${primaryAddress.address2}` : ""}
                        </Text>
                        <Text className="block text-sm text-[color:var(--color-text-muted)]">
                          {primaryAddress?.city ?? "-"}, {primaryAddress?.state ?? "-"}
                        </Text>
                        <Text className="block text-sm text-[color:var(--color-text-muted)]">
                          {primaryAddress?.country ?? "-"} - {primaryAddress?.pinCode ?? "-"}
                        </Text>
                        <Text className="block text-sm text-[color:var(--color-text-muted)]">
                          Phone: {phone || "-"}
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
                          <Text>{formatCurrency(subtotal, currency)}</Text>
                        </div>
                        <div className="flex justify-between">
                          <Text className="text-[color:var(--color-text-muted)]">Shipping</Text>
                          <Text>{formatCurrency(shipping, currency)}</Text>
                        </div>
                        <div className="flex justify-between">
                          <Text className="text-[color:var(--color-text-muted)]">Tax</Text>
                          <Text>{formatCurrency(tax, currency)}</Text>
                        </div>
                        <Divider className="!my-1" />
                        <div className="flex justify-between font-semibold">
                          <Text>Total</Text>
                          <Text>{formatCurrency(total, currency)}</Text>
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
          <img src="/assets/images/order/emptyCart.png" alt="No orders" className="mx-auto mb-4 w-45 sm:w-53"/>
          <Title level={5} className="!text-gray-500">No orders yet</Title>
          <Text className="text-gray-400 block mb-3 text-sm">Your order history will appear here</Text>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
