import React from "react";
import styles from './orders.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const OrderInvoice = ({ invoiceData = "" }) => {
  const printInvoice = () => {
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(invoiceData);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  return (
    <>
      <iframe
        id="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute", display: "none" }}
      ></iframe>
      <div>
        <p dangerouslySetInnerHTML={{ __html: invoiceData }}></p>
        <button className={styles.printBtn} onClick={printInvoice}><FontAwesomeIcon icon={faPrint} /> Print</button>
      </div>
    </>
  );
};

export default OrderInvoice;
