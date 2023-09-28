import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import CatgeoryList from "./list";
import styles from "./categories.module.scss";
import PrimaryButton from "../shared/buttons/primary";
import PaperModal from "../shared/paper-modal";
import CategoryForm from "./form";

const defaultVal = {
  parent_id: "",
  name: "",
  subtitle: "",
  imageFile: null,
  status: 0,
  id: -1,
  image_url: "",
};

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(defaultVal);

  const refreshList = () => {
    new ApiService()
      .get("api/categories")
      .then((res) => {
        setCategoryList(res.data);
        setOpenCreate(false);
        setIsEdit(false);
      });
  };

  useEffect(() => {
    if (!isEdit) {
      setSelectedCategory(defaultVal);
    }
  }, [isEdit]);

  useEffect(() => {
    refreshList();
  }, []);
  return (
    <div>
      <div className={styles.rowWrapper}>
        <h1 className={styles.header}>Categories List</h1>
        <PrimaryButton
          btnClass={styles.addBtn}
          onClick={() => {
            setOpenCreate(true);
          }}
        >
          Add
        </PrimaryButton>
      </div>
      <div className={styles.cardWrapper}>
        <CatgeoryList
          categories={categoryList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedCategory={setSelectedCategory}
          setOpenCreate={setOpenCreate}
          setIsEdit={setIsEdit}
          selectedCategory={selectedCategory}
        />
      </div>
      {openCreate && (
        <PaperModal
          title={isEdit ? "Edit Category" : "Create Category"}
          onClose={() => {
            setOpenCreate(!openCreate);
            setIsEdit(false);
          }}
        >
          <CategoryForm
            selectedCategory={selectedCategory}
            categories={categoryList}
            refreshList={refreshList}
            isEdit={isEdit}
          />
        </PaperModal>
      )}
    </div>
  );
};

export default Categories;
