import React, { useEffect, useState } from "react";
import moment from "moment";
import OrdersList from "./list";
import styles from "./orders.module.scss";
import DateRange from "../shared/inputs/date-range";
import DkSelect from "../shared/dropdown/dk-select";
import ApiService from "@/services/ApiService";
import appConstant from "../appConstant";

const orderStatus = [
  { id: 0, name: "All Orders" },
  { id: 1, name: "Payment Pending" },
  { id: 2, name: "Received" },
  { id: 3, name: "Processed" },
  { id: 4, name: "Shipped" },
  { id: 5, name: "Out For Delivery" },
  { id: 6, name: "delivered" },
  { id: 7, name: "Cancelled" },
  { id: 8, name: "Returned" },
];

const Orders = () => {
  const [searchObj, setSearchObj] = useState({
    from: moment().startOf("month").format("YYYY-MM-DD"),
    to: moment().endOf("month").format("YYYY-MM-DD"),
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedType, setSelectedType] = useState(1);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [searchableSellerList, setSearchableSellerList] = useState([
    {
      id: 1,
      admin_id: 6,
      name: "All Sellers",
    },
    {
      id: 5,
      admin_id: 6,
      name: "organic",
      store_name: "Organic - Ecofriendly",
      slug: "",
      email: "organic@gmail.com",
      mobile: "7981536744",
      balance: 0,
      store_url: "chhayakart.com",
      logo: "sellers/1692863845_18611.png",
      store_description: "null",
      street: "null",
      pincode_id: 0,
      city_id: 3,
      state: "Maharashtra",
      categories: "98",
      account_number: "0",
      bank_ifsc_code: ".",
      account_name: ".",
      bank_name: ".",
      commission: 0,
      status: 1,
      require_products_approval: 0,
      fcm_id: null,
      national_identity_card: "sellers/1692863845_75038.png",
      address_proof: "sellers/1692863845_61006.png",
      pan_number: ".",
      tax_name: ".",
      tax_number: ".",
      customer_privacy: 0,
      latitude: "17.3671541",
      longitude: "78.4410784",
      place_name: "null",
      formatted_address: "null",
      forgot_password_code: null,
      view_order_otp: 0,
      assign_delivery_boy: 0,
      created_at: "2023-08-24T07:57:25.000000Z",
      updated_at: "2023-08-24T07:58:24.000000Z",
      deleted_at: null,
      remark: "null",
      change_order_status_delivered: "1",
      logo_url:
        "https://admin.chhayakart.com/storage/sellers/1692863845_18611.png",
      national_identity_card_url:
        "https://admin.chhayakart.com/storage/sellers/1692863845_75038.png",
      address_proof_url:
        "https://admin.chhayakart.com/storage/sellers/1692863845_61006.png",
    },
    {
      id: 4,
      admin_id: 5,
      name: "Denngans",
      store_name: "Dnz",
      slug: "Dnz",
      email: "dennysyahputra2900@gmail.com",
      mobile: "6969696969",
      balance: 0,
      store_url: null,
      logo: null,
      store_description: null,
      street: null,
      pincode_id: null,
      city_id: null,
      state: null,
      categories: null,
      account_number: null,
      bank_ifsc_code: null,
      account_name: null,
      bank_name: null,
      commission: 0,
      status: 0,
      require_products_approval: 0,
      fcm_id: null,
      national_identity_card: null,
      address_proof: null,
      pan_number: null,
      tax_name: null,
      tax_number: null,
      customer_privacy: 0,
      latitude: null,
      longitude: null,
      place_name: null,
      formatted_address: null,
      forgot_password_code: null,
      view_order_otp: 0,
      assign_delivery_boy: 0,
      created_at: "2023-06-20T19:47:27.000000Z",
      updated_at: "2023-06-20T19:47:27.000000Z",
      deleted_at: null,
      remark: null,
      change_order_status_delivered: null,
      logo_url: null,
      national_identity_card_url: null,
      address_proof_url: null,
    },
    {
      id: 3,
      admin_id: 4,
      name: "Chhayakart",
      store_name: "chhayakart",
      slug: "",
      email: "sales@chhayakart.com",
      mobile: "9420920320",
      balance: 0,
      store_url: "null",
      logo: "sellers/1692862398_78480.png",
      store_description: "<p>s</p>",
      street: "Okhla  New Delhi",
      pincode_id: 0,
      city_id: 8,
      state: "-",
      categories:
        "150,149,106,105,104,103,102,101,100,99,98,97,96,94,93,91,90,86,85,84,83,82,81,80,78,77,75,74,73,72,71,69,68,67,66,64,63,62,61,60,59,58,55,54,52",
      account_number: "0",
      bank_ifsc_code: "-",
      account_name: "-",
      bank_name: "-",
      commission: 0,
      status: 1,
      require_products_approval: 0,
      fcm_id: null,
      national_identity_card: "sellers/1692862398_43358.png",
      address_proof: "sellers/1692862398_17736.png",
      pan_number: "-",
      tax_name: "-",
      tax_number: "-",
      customer_privacy: 1,
      latitude: "17.3671541",
      longitude: "78.4410784",
      place_name: "Okhla",
      formatted_address: "Okhla, New Delhi, Delhi, India",
      forgot_password_code: null,
      view_order_otp: 1,
      assign_delivery_boy: 0,
      created_at: "2023-04-04T12:15:49.000000Z",
      updated_at: "2023-08-27T21:36:39.000000Z",
      deleted_at: null,
      remark: "null",
      change_order_status_delivered: "1",
      logo_url:
        "https://admin.chhayakart.com/storage/sellers/1692862398_78480.png",
      national_identity_card_url:
        "https://admin.chhayakart.com/storage/sellers/1692862398_43358.png",
      address_proof_url:
        "https://admin.chhayakart.com/storage/sellers/1692862398_17736.png",
    },
  ]);
  const [orders, setOrders] = useState([
    {
      id: 951,
      user_id: 912,
      delivery_boy_id: 0,
      transaction_id: 201,
      orders_id: "3364005208206",
      otp: 0,
      mobile: "9819836161",
      order_note: "order_McIf951CEvvSj4",
      total: 256,
      delivery_charge: 49,
      tax_amount: 13,
      tax_percentage: 5,
      wallet_balance: 0,
      discount: 0,
      promo_code: "",
      promo_discount: 0,
      final_total: 318,
      payment_method: "Razorpay",
      address: "2/1104, Regency heights",
      latitude: "0",
      longitude: "0",
      delivery_time: "20-9-2023 Morning 9:00 A.M - 1:00 P.M",
      status: '[[1,"14-09-2023 05:35:51pm"]]',
      active_status: "2",
      order_from: 0,
      pincode_id: null,
      address_id: 693,
      area_id: 0,
      created_at: "2023-09-14T17:35:51.000000Z",
      updated_at: "2023-09-14T17:37:17.000000Z",
      deleted_at: null,
      order_id: 951,
      delivery_boy_name: null,
      seller_name: "Chhayakart",
      user_name: "",
      order_status: "1",
    },
    {
      id: 950,
      user_id: 910,
      delivery_boy_id: 0,
      transaction_id: 0,
      orders_id: "1752305566027",
      otp: 0,
      mobile: "9561445778",
      order_note: "",
      total: 405,
      delivery_charge: 58,
      tax_amount: 21,
      tax_percentage: 5,
      wallet_balance: 0,
      discount: 0,
      promo_code: "",
      promo_discount: 0,
      final_total: 484,
      payment_method: "COD",
      address: "G-17, Kumar priyadarshan",
      latitude: "0",
      longitude: "0",
      delivery_time: "20-9-2023 Morning 9:00 A.M - 1:00 P.M",
      status: '[[2,"14-09-2023 10:10:34am"]]',
      active_status: "2",
      order_from: 0,
      pincode_id: null,
      address_id: 692,
      area_id: 0,
      created_at: "2023-09-14T10:10:34.000000Z",
      updated_at: "2023-09-14T10:10:34.000000Z",
      deleted_at: null,
      order_id: 950,
      delivery_boy_name: null,
      seller_name: "Chhayakart",
      user_name: "",
      order_status: "2",
    },
    {
      id: 949,
      user_id: 906,
      delivery_boy_id: 0,
      transaction_id: 200,
      orders_id: "15872390243237",
      otp: 0,
      mobile: "8867230410",
      order_note: "order_Mc9pdleOf6UYq1",
      total: 297,
      delivery_charge: 40,
      tax_amount: 15,
      tax_percentage: 5,
      wallet_balance: 0,
      discount: 0,
      promo_code: "",
      promo_discount: 0,
      final_total: 352,
      payment_method: "Razorpay",
      address: "FLAT NO AG6, BHARAT PRIDE PARK",
      latitude: "0",
      longitude: "0",
      delivery_time: "20-9-2023 Morning 9:00 A.M - 1:00 P.M",
      status: '[[1,"14-09-2023 08:57:33am"]]',
      active_status: "2",
      order_from: 0,
      pincode_id: null,
      address_id: 691,
      area_id: 0,
      created_at: "2023-09-14T08:57:33.000000Z",
      updated_at: "2023-09-14T08:58:24.000000Z",
      deleted_at: null,
      order_id: 949,
      delivery_boy_name: null,
      seller_name: "Chhayakart",
      user_name: "",
      order_status: "1",
    },
    {
      id: 948,
      user_id: 909,
      delivery_boy_id: 0,
      transaction_id: 0,
      orders_id: "3089404708078",
      otp: 0,
      mobile: "7738828606",
      order_note: "",
      total: 1028,
      delivery_charge: 67,
      tax_amount: 52,
      tax_percentage: 5,
      wallet_balance: 0,
      discount: 0,
      promo_code: "",
      promo_discount: 0,
      final_total: 1147,
      payment_method: "COD",
      address: "A wing , 203, 2nd floor ,parshwanagar 3",
      latitude: "0",
      longitude: "0",
      delivery_time: "20-9-2023 Morning 9:00 A.M - 1:00 P.M",
      status: '[[2,"14-09-2023 08:54:42am"]]',
      active_status: "2",
      order_from: 0,
      pincode_id: null,
      address_id: 690,
      area_id: 0,
      created_at: "2023-09-14T08:54:42.000000Z",
      updated_at: "2023-09-14T08:54:42.000000Z",
      deleted_at: null,
      order_id: 948,
      delivery_boy_name: null,
      seller_name: "Chhayakart",
      user_name: "",
      order_status: "2",
    },
    {
      id: 947,
      user_id: 908,
      delivery_boy_id: 0,
      transaction_id: 0,
      orders_id: "16206231981184",
      otp: 0,
      mobile: "+919820138055",
      order_note: "",
      total: 399,
      delivery_charge: 40,
      tax_amount: 20,
      tax_percentage: 5,
      wallet_balance: 0,
      discount: 0,
      promo_code: "",
      promo_discount: 0,
      final_total: 459,
      payment_method: "COD",
      address: "39/43, ABDUL REHMAN STREET, 3RD FLLOR",
      latitude: "0",
      longitude: "0",
      delivery_time: "20-9-2023 Morning 9:00 A.M - 1:00 P.M",
      status: '[[2,"14-09-2023 08:39:06am"]]',
      active_status: "2",
      order_from: 0,
      pincode_id: null,
      address_id: 689,
      area_id: 0,
      created_at: "2023-09-14T08:39:06.000000Z",
      updated_at: "2023-09-14T08:39:06.000000Z",
      deleted_at: null,
      order_id: 947,
      delivery_boy_name: null,
      seller_name: "Chhayakart",
      user_name: "",
      order_status: "2",
    },
    {
      id: 946,
      user_id: 901,
      delivery_boy_id: 0,
      transaction_id: 199,
      orders_id: "9744276378822",
      otp: 0,
      mobile: "9940345654",
      order_note: "order_Mc2ht7tdP0ODKb",
      total: 198,
      delivery_charge: 40,
      tax_amount: 10,
      tax_percentage: 5,
      wallet_balance: 0,
      discount: 0,
      promo_code: "",
      promo_discount: 0,
      final_total: 248,
      payment_method: "Razorpay",
      address:
        "199 ARCOT ROAD JAINS ASHRAYA PHASE 3 BLOCK1 A1 VIRUGAMBAKKAM CHENNAI 92",
      latitude: "0",
      longitude: "0",
      delivery_time: "20-9-2023 Morning 9:00 A.M - 1:00 P.M",
      status: '[[1,"14-09-2023 01:59:21am"]]',
      active_status: "2",
      order_from: 0,
      pincode_id: null,
      address_id: 687,
      area_id: 0,
      created_at: "2023-09-14T01:59:21.000000Z",
      updated_at: "2023-09-14T02:00:12.000000Z",
      deleted_at: null,
      order_id: 946,
      delivery_boy_name: null,
      seller_name: "Chhayakart",
      user_name: "",
      order_status: "1",
    },
  ]);

  const handleChange = (picker) => {
    setSearchObj({
      ...searchObj,
      from: picker.startDate,
      to: picker.endDate,
    });
  };

  useEffect(() => {
    new ApiService()
      .get(
        `${appConstant.API_ENDPOINT}api/orders?startDate=${
          searchObj.from
        }&endDate=${searchObj.to}&seller=${
          selectedType !== 1 ? selectedType : ""
        }&status=${selectedOrderStatus !== "" ? selectedOrderStatus : ""}`
      )
      .then((res) => {
        setSearchableSellerList(res.data.sellers);
      });
  }, [searchObj, selectedType, selectedOrderStatus]);

  useEffect(() => {
    console.log("xyz123", selectedOrderStatus);
  }, [selectedOrderStatus]);

  return (
    <div>
      <h1 className={styles.header}>Orders List</h1>
      <div className={styles.cardWrapper}>
        <div className={styles.rowWrapper}>
          <DateRange
            inputClass={styles.datePicker}
            dateRange={searchObj}
            onApply={handleChange}
            customClass={styles.searchIcon}
          />
          <DkSelect
            name="campaigns"
            selectedValue={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
            style={{
              height: 30,
              color: "rgb(0 0 0 / 60%)",
              fontWeight: "500",
            }}
            className={styles.campaignTypeDropDown}
            options={searchableSellerList}
          />
          <DkSelect
            name="campaigns"
            selectedValue={selectedOrderStatus}
            onChange={(e) => {
              setSelectedOrderStatus(e.target.value);
            }}
            style={{
              height: 30,
              color: "rgb(0 0 0 / 60%)",
              fontWeight: "500",
            }}
            className={styles.campaignTypeDropDown}
            options={orderStatus}
          />
        </div>
        <OrdersList
          orders={orders}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Orders;
