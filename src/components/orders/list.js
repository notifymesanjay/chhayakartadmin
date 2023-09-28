import React, { useState } from "react";
import SimpleTable from "../shared/simple-table";
import CampaignActions from "./action";
import PaperModal from "../shared/paper-modal";
import OrderDetails from "./details";
import OrderInvoice from "./invoice";
import ApiService from "../../services/ApiService";

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
  const [invoiceData, setInvoiceData] = useState("<p>Hello</p>");
  const [openInvoice, setOpenInvoice] = useState(false);

  const onDetailsClick = (row) => {
    setOpenDetails(!openDetails);
    setSelectedOrder(row);
  };

  const downloadInvoice = (content, fileName) => {
    const url = window.URL.createObjectURL(new Blob([content]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const onDownloadInvoice = (row) => {
    new ApiService()
      .post("api/orders/invoice_download", { order_id: row.id })
      .then((res) => res.blob())
      .then((data) => {
        if (data != null && data !== "" && data.size > 0) {
          downloadInvoice(data, `Invoice-No_#${row.id}.pdf`);
        }
      });
  };

  const onGenerateInvoice = (row) => {
    setOpenInvoice(true);
    setSelectedOrder(row);
    new ApiService()
    .get(`api/orders/invoice?order_id=${row.id}`)
    .then((res) => {
       setInvoiceData(res.data);
    })
  }

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
        <CampaignActions
          onDetailsClick={onDetailsClick}
          row={row}
          onDownloadInvoice={onDownloadInvoice}
          onGenerateInvoice={onGenerateInvoice}
        />
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
      {openInvoice && (
        <PaperModal
        title={<small>Invoice of order - {selectedOrder.id}</small>}
        onClose={() => setOpenInvoice(!openInvoice)}>
          <OrderInvoice invoiceData={invoiceData} />
        </PaperModal>
      )}
    </>
  );
};

export default OrdersList;
