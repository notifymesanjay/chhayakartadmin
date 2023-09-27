import React, { useEffect, useState } from "react";
import SimpleTable from "../shared/simple-table";
import styles from "./orders.module.scss";
import ApiService from "../../services/ApiService";

const superHeaderOrderCells = [
  {
    id: "id",
    numeric: true,
    label: "Order Id",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "user_email",
    numeric: false,
    label: "Email",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "order_note",
    numeric: true,
    label: "O.Note",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "active_status",
    numeric: true,
    label: "Status",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "user_name",
    numeric: true,
    label: "Name",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "user_mobile",
    numeric: true,
    label: "Contact",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "address",
    numeric: true,
    label: "Area",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "pincode",
    numeric: true,
    label: "Pincode",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "otp",
    numeric: true,
    label: "OTP",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "delivery_boy_id",
    numeric: true,
    label: "Delivery Boy",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "delivery_boy_id",
    numeric: true,
    label: "Assign Delivery Boy",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "delivery_boy_id",
    numeric: true,
    label: "Update Status",
    rowSpan: 2,
    colSpan: 1,
  },
];

const superHeaderBillingCells = [
  {
    id: "created_at",
    numeric: true,
    label: "Order Date",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "address",
    numeric: false,
    label: "Address",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "delivery_time",
    numeric: true,
    label: "Delivery Time",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "total",
    numeric: true,
    label: "Total (₹)",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "discount",
    numeric: true,
    label: "Disc. ₹( % )",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "promo_discount",
    numeric: true,
    label: "Additional Disc ₹( % )",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "promo_discount",
    numeric: true,
    label: "Promo Disc. (₹)",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "promo_code",
    numeric: true,
    label: "Promo Code",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "delivery_charge",
    numeric: true,
    label: "D.Charge (₹)",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "final_total",
    numeric: true,
    label: "Payable Total( ₹ )",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "payment_method",
    numeric: true,
    label: "Payment Method",
    rowSpan: 2,
    colSpan: 1,
  },
];

const superHeaderOrderItemsCells = [
  {
    id: "product_name",
    numeric: true,
    label: "Name",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "quantity",
    numeric: false,
    label: "Quantity",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "variant_name",
    numeric: true,
    label: "Variant",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "sub_total",
    numeric: true,
    label: "Subtotal( ₹ )",
    rowSpan: 2,
    colSpan: 1,
  },
];

const OrderDetails = ({ selectedOrder = {} }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);

  const orderCells = [
    {
      content: (row) => row.product_name,
    },
    {
      content: (row) => row.quantity,
    },
    {
      content: (row) => row.variant_name,
    },
    {
      content: (row) => row.sub_total,
    },
  ];

  const billingDetailsCells = [
    {
      content: (row) => row.created_at,
    },
    {
      content: (row) => row.address,
    },
    {
      content: (row) => row.delivery_time,
    },
    {
      content: (row) => row.total,
    },
    {
      content: (row) => row.discount,
    },
    {
      content: (row) => row.promo_discount,
    },
    {
      content: (row) => row.promo_discount,
    },
    {
      content: (row) => row.promo_code,
    },
    {
      content: (row) => row.delivery_charge,
    },
    {
      content: (row) => row.final_total,
    },
    {
      content: (row) => row.payment_method,
    },
  ];

  const orderDetailsCells = [
    {
      content: (row) => row.id,
    },
    {
      content: (row) => row.user_email,
    },
    {
      content: (row) => row.order_note,
    },
    {
      content: (row) => row.active_status,
    },
    {
      content: (row) => row.user_name,
    },
    {
      content: (row) => row.user_mobile,
    },
    {
      content: (row) => row.address,
    },
    {
      content: (row) => row.pincode,
    },
    {
      content: (row) => row.otp,
    },
    {
      content: (row) => row.delivery_boy_id,
    },
    {
      content: (row) => row.delivery_boy_id,
    },
    {
      content: (row) => row.delivery_boy_id,
    },
  ];

  useEffect(() => {
    new ApiService()
      .get(`api/orders/view/${selectedOrder.id}`)
      .then((res) => res.json())
      .then((res) => {
        setOrderDetails([res.data.order]);
        setOrderedItems(res.data.order_items);
      });
  }, [selectedOrder]);
  return (
    <>
      <div className={styles.orderDetailsWrapper}>
        <h1 className={styles.header}>Order Details</h1>
        <SimpleTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          superHeaderCells={superHeaderOrderCells}
          isFilter={false}
          isTwoTier={true}
          rows={orderDetails}
          cells={orderDetailsCells}
        ></SimpleTable>
      </div>
      <div className={styles.billingDetailsWrapper}>
        <h1 className={styles.header}>Billing Details</h1>
        <SimpleTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          superHeaderCells={superHeaderBillingCells}
          isFilter={false}
          isTwoTier={true}
          rows={orderDetails}
          cells={billingDetailsCells}
        ></SimpleTable>
      </div>
      <div className={styles.orderItemsWrapper}>
        <h1 className={styles.header}>List of Order Items</h1>
        <SimpleTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          superHeaderCells={superHeaderOrderItemsCells}
          isFilter={false}
          isTwoTier={true}
          rows={orderedItems}
          cells={orderCells}
        ></SimpleTable>
      </div>
    </>
  );
};

export default OrderDetails;
