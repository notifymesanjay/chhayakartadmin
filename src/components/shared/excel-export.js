import React, { useEffect } from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import PrimaryButton from "./buttons/primary";

const ExportExcel = ({ excelData, fileName, downloadCsv = () => {} }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  useEffect(() => {
    if (excelData.length > 0) {
      exportToExcel(fileName);
    }
  }, [excelData]);

  return (
    <PrimaryButton
      onClick={() => {
        downloadCsv();
      }}
    >
      Download
    </PrimaryButton>
  );
};

export default ExportExcel;
