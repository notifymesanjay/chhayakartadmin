import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import ActionsDropDown from "../shared/dropdown/actions";

const CampaignActions = ({ onDetailsClick, row, onDownloadInvoice, onGenerateInvoice }) => {
  const dropDownItemList = [
    {
      label: (
        <>
          <i>
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
          </i>{" "}
          Details
        </>
      ),
      onClick: () => {
        onDetailsClick(row);
      },
      link: "",
      toolTip: "Click to see Order Details",
      className: "",
      show: true,
      disabled: false,
      pageRedirection: false,
    },
    {
      label: <>Generate Invoice</>,
      onClick: () => {
        onGenerateInvoice(row);
      },
      link: "",
      toolTip: "Click to Generate Invoice",
      className: "",
      show: true,
      disabled: false,
      pageRedirection: false,
    },
    {
      label: <>Download Invoice</>,
      onClick: () => {
        onDownloadInvoice(row);
      },
      link: "",
      toolTip: "Click to Download Invoice",
      className: "",
      show: true,
      disabled: false,
      pageRedirection: false,
    },
  ];

  return <ActionsDropDown itemList={dropDownItemList} />;
};

export default CampaignActions;
