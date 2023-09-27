import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ActionsDropDown from "../shared/dropdown/actions";

const CategoryActions = ({ onEditClick, row }) => {
  const dropDownItemList = [
    {
      label: (
        <>
          <i>
            <FontAwesomeIcon icon={faEdit} />
          </i>{" "}
          Edit
        </>
      ),
      onClick: () => {
        onEditClick(row);
      },
      link: "",
      toolTip: "Click to Edit Catgory",
      className: "",
      show: true,
      disabled: false,
      pageRedirection: false,
    },
  ];

  return <ActionsDropDown itemList={dropDownItemList} />;
};

export default CategoryActions;
