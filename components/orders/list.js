import React, { useState } from "react";
import SimpleTable from "../shared/simple-table";
import CampaignActions from "./action";
import PaperModal from "../shared/paper-modal";
import OrderDetails from "./details";

const superHeaderCells = [
  {
    id: "id",
    numeric: true,
    label: "Order Id",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "user_name",
    numeric: false,
    label: "User Name",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "seller_name",
    numeric: true,
    label: "Seller",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "mobile",
    numeric: true,
    label: "Mobile",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "total",
    numeric: true,
    label: "Total",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "delivery_charge",
    numeric: true,
    label: "D.Charges",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "final_total",
    numeric: true,
    label: "F.Total",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "payment_method",
    numeric: true,
    label: "P.Method",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "delivery_time",
    numeric: true,
    label: "D.Time",
    rowSpan: 2,
    colSpan: 1,
  },
  { id: "actions", numeric: false, label: "", rowSpan: 2, colSpan: 1 },
];

const OrdersList = ({
  orders = [],
  setCurrentPage = () => {},
  currentPage,
}) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const onDetailsClick = (row) => {
    setOpenDetails(!openDetails);
    setSelectedOrder(row);
  };

  const cells = [
    {
      content: (row) => row.id,
    },
    {
      content: (row) => row.user_name,
    },
    {
      content: (row) => row.seller_name,
    },
    {
      content: (row) => row.mobile,
    },
    {
      content: (row) => row.total,
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
    {
      content: (row) => row.delivery_time,
    },
    {
      content: (row) => (
        <CampaignActions onDetailsClick={onDetailsClick} row={row} />
      ),
    },
  ];
  return (
    <>
      <SimpleTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        superHeaderCells={superHeaderCells}
        isFilter={true}
        isTwoTier={true}
        rows={orders}
        cells={cells}
      ></SimpleTable>
      {selectedOrder && openDetails && (
        <PaperModal
          title={<small>Details of order - {selectedOrder.id}</small>}
          onClose={() => setOpenDetails(!openDetails)}
        >
          <div className="mb-5">
            <OrderDetails selectedOrder={selectedOrder} />
          </div>
        </PaperModal>
      )}
    </>
  );
};

export default OrdersList;
