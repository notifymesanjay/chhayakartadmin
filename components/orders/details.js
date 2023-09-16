import ApiService from "@/services/ApiService";
import React, { useEffect, useState } from "react";
import appConstant from "../appConstant";
import SimpleTable from "../shared/simple-table";
import styles from "./orders.module.scss";

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
  const [orderDetails, setOrderDetails] = useState([
    {
      id: 956,
      user_id: 915,
      delivery_boy_id: 0,
      transaction_id: 0,
      orders_id: "6040213126942",
      otp: 0,
      mobile: "9886139876",
      order_note: "order_Mcd4aR18vcIdRr",
      total: 408,
      delivery_charge: 49,
      tax_amount: 21,
      tax_percentage: 5,
      wallet_balance: 0,
      discount: 0,
      promo_code: "",
      promo_discount: 0,
      final_total: 478,
      payment_method: "Razorpay",
      address:
        "B503 Gulmohar Queenstown Apartment, Dhole Patil Farm Road, EON Free Zone, Kharadi",
      latitude: "0",
      longitude: "0",
      delivery_time: "21-9-2023 Morning 9:00 A.M - 1:00 P.M",
      status: '[[1,"15-09-2023 01:33:47pm"]]',
      active_status: 1,
      order_from: 0,
      pincode_id: null,
      address_id: 696,
      area_id: 0,
      created_at: "2023-09-15T13:33:47.000000Z",
      updated_at: "2023-09-15T13:33:51.000000Z",
      deleted_at: null,
      order_id: 956,
      user_name: "Aveek Roy",
      user_email: "",
      user_mobile: "9886139876",
      country: "India",
      state: "Maharashtra",
      city: "Pune",
      pincode: "411014",
      area: "Kharadi",
      landmark: "Opposite Forest County Gate 2",
      address_created: "2023-09-15 13:30:12",
      address_updated: "2023-09-15 13:30:12",
      seller_created: "2023-04-04 12:15:49",
      seller_updated: "2023-08-27 21:36:39",
      seller_name: "Chhayakart",
      delivery_boy_name: null,
      order_item_id: 1777,
      status_name: "Payment Pending",
      city_id: 8,
      city_name: "Pune",
    },
  ]);
  const [orderedItems, setOrderedItems] = useState([
    {
      id: 1778,
      user_id: 915,
      order_id: 956,
      orders_id: "6040213126942",
      product_name: "Peanuts Jaggery Laddoo For Fasting",
      variant_name: "0500gm",
      product_variant_id: 53,
      delivery_boy_id: 0,
      quantity: 1,
      price: 225,
      discounted_price: 199,
      tax_amount: 21,
      tax_percentage: 5,
      discount: 0,
      sub_total: 199,
      status: '[[1,"15-09-2023 01:33:47pm"]]',
      active_status: 1,
      seller_id: 3,
      is_credited: 0,
      created_at: "2023-09-15T13:33:47.000000Z",
      updated_at: "2023-09-15T13:33:47.000000Z",
      deleted_at: null,
      mobile: "9886139876",
      total: 408,
      delivery_charge: 49,
      promo_code: "",
      promo_discount: 0,
      wallet_balance: 0,
      final_total: 478,
      payment_method: "Razorpay",
      address:
        "B503 Gulmohar Queenstown Apartment, Dhole Patil Farm Road, EON Free Zone, Kharadi",
      delivery_time: "21-9-2023 Morning 9:00 A.M - 1:00 P.M",
      user_name: "Aveek Roy",
      order_status: '[[1,"15-09-2023 01:33:47pm"]]',
      seller_name: "Chhayakart",
      product_id: 52,
      status_name: "Payment Pending",
    },
    {
      id: 1777,
      user_id: 915,
      order_id: 956,
      orders_id: "6040213126942",
      product_name: "Rava Laddoo",
      variant_name: "0500gm",
      product_variant_id: 52,
      delivery_boy_id: 0,
      quantity: 1,
      price: 250,
      discounted_price: 209,
      tax_amount: 21,
      tax_percentage: 5,
      discount: 0,
      sub_total: 209,
      status: '[[1,"15-09-2023 01:33:47pm"]]',
      active_status: 1,
      seller_id: 3,
      is_credited: 0,
      created_at: "2023-09-15T13:33:47.000000Z",
      updated_at: "2023-09-15T13:33:47.000000Z",
      deleted_at: null,
      mobile: "9886139876",
      total: 408,
      delivery_charge: 49,
      promo_code: "",
      promo_discount: 0,
      wallet_balance: 0,
      final_total: 478,
      payment_method: "Razorpay",
      address:
        "B503 Gulmohar Queenstown Apartment, Dhole Patil Farm Road, EON Free Zone, Kharadi",
      delivery_time: "21-9-2023 Morning 9:00 A.M - 1:00 P.M",
      user_name: "Aveek Roy",
      order_status: '[[1,"15-09-2023 01:33:47pm"]]',
      seller_name: "Chhayakart",
      product_id: 51,
      status_name: "Payment Pending",
    },
  ]);

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
      .get(`${appConstant.API_ENDPOINT}api/orders/view/${selectedOrder.id}`)
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
