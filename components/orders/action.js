import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faEdit,
  faTrashAlt,
  faClone,
  faEye,
  faCheckSquare,
  faDotCircle,
  faCreditCard,
  faHeartCrack,
} from "@fortawesome/free-solid-svg-icons";
import ActionsDropDown from "../shared/dropdown/actions";

const CampaignActions = ({ onDetailsClick, row }) => {
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
      toolTip: "Click to see NGO Details",
      className: "",
      show: true,
      disabled: false,
      pageRedirection: false,
    },
  ];

  return <ActionsDropDown itemList={dropDownItemList} />;
};

export default CampaignActions;
