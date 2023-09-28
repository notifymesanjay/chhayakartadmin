import React, { useEffect, useState } from "react";
import moment from "moment";
import OrdersList from "./list";
import styles from "./orders.module.scss";
import DateRange from "../shared/inputs/date-range";
import DkSelect from "../shared/dropdown/dk-select";
import ApiService from "../../services/ApiService";
import ExportExcel from "../shared/excel-export";

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
  const [searchableSellerList, setSearchableSellerList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const handleChange = (picker) => {
    setSearchObj({
      ...searchObj,
      from: picker.startDate,
      to: picker.endDate,
    });
  };

  const downloadCsv = () => {
    new ApiService().get("api/orders/get_all_orders").then((res) => {
      setAllOrders(res.data);
    });
  };

  useEffect(() => {
    new ApiService()
      .get(
        `api/orders?startDate=${moment(searchObj.from).format(
          "YYYY-MM-DD"
        )}&endDate=${moment(searchObj.to).format("YYYY-MM-DD")}&seller=${
          selectedType !== 1 ? selectedType : ""
        }&status=${selectedOrderStatus !== "" ? selectedOrderStatus : ""}`
      )
      .then((res) => {
        setOrders(res.data.orders);
        setSearchableSellerList(res.data.sellers);
      });
  }, [searchObj, selectedType, selectedOrderStatus]);

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
          <ExportExcel excelData={allOrders} fileName={"all_orders"} downloadCsv={downloadCsv} />
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
