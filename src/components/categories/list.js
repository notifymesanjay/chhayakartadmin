import React, { useEffect } from "react";
import SimpleTable from "../shared/simple-table";
import CategoryActions from "./action";

const superHeaderCells = [
  {
    id: "id",
    numeric: true,
    label: "ID",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "parent_id",
    numeric: false,
    label: "Parent Id",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "name",
    numeric: true,
    label: "Name",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "subtitle",
    numeric: true,
    label: "Subtitle",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "image_url",
    numeric: true,
    label: "Image",
    rowSpan: 2,
    colSpan: 1,
  },
  {
    id: "status",
    numeric: true,
    label: "Status",
    rowSpan: 2,
    colSpan: 1,
  },
  { id: "actions", numeric: false, label: "", rowSpan: 2, colSpan: 1 },
];

const CatgeoryList = ({
  categories,
  currentPage,
  setCurrentPage = () => {},
  setSelectedCategory = () => {},
  setOpenCreate = () => {},
  setIsEdit = () => {},

}) => {
  const onEditClick = (row) => {
    setSelectedCategory(row);
    setOpenCreate(true);
    setIsEdit(true);
  };

  const cells = [
    {
      content: (row) => row.id,
    },
    {
      content: (row) => row.parent_id,
    },
    {
      content: (row) => row.name,
    },
    {
      content: (row) => row.subtitle,
    },
    {
      content: (row) => (
        <img src={row.image_url} width={48} height={48} alt={row.name} />
      ),
    },
    {
      content: (row) => row.status,
    },
    {
      content: (row) => <CategoryActions onEditClick={onEditClick} row={row} />,
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
        rows={categories}
        cells={cells}
      ></SimpleTable>
    </>
  );
};

export default CatgeoryList;
