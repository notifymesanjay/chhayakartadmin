import React, { useEffect, useState } from "react";
import DkSelect from "../shared/dropdown/dk-select";
import styles from "./categories.module.scss";
import { Input } from "@material-ui/core";
import { event } from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import CancelButton from "../shared/buttons/cancel";
import ApiService from "../../services/ApiService";

const statusList = [{
    id: 1,
    name: 'Activate'
},{
    id: 0,
    name: 'DeActivate'
}]

const CategoryForm = ({
  selectedCategory,
  isEdit = false,
  categories = [],
  refreshList = () => {},
}) => {
  const [categoryObj, setCategoryObj] = useState(selectedCategory);
  const [imgPreviewList, setImgPreviewList] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    if (target.name !== "imageFile") {
      setCategoryObj((prev) => ({ ...prev, [target.name]: target.value }));
    } else {
      setCategoryObj((prev) => ({ ...prev, [target.name]: target.files[0] }));
    }
  };

  const deleteImg = () => {
    setCategoryObj((prev) => ({
      ...prev,
      imageFile: null,
    }));
  };

  const onSubmit = () => {
    const data = new FormData();
    if (categoryObj.imageFile) {
      data.append("image", categoryObj.imageFile, categoryObj.imageFile.name);
    }else{
        data.append("image", null)
    }
    data.append("parent_id", categoryObj.parent_id);
    data.append("name", categoryObj.name);
    data.append("subtitle", categoryObj.subtitle);
    data.append("status", categoryObj.status)
    if (isEdit) {
      data.append("id", categoryObj.id);
    }
    if (!isEdit) {
      new ApiService().postForm("api/categories/save", data).then((res) => {
        refreshList();
      });
    } else {
      new ApiService().postForm("api/categories/update", data).then((res) => {
        refreshList();
      });
    }
  };

  useEffect(() => {
    setImgPreviewList("");
    if (categoryObj.imageFile) {
      let reader = new FileReader();
      reader.readAsDataURL(categoryObj.imageFile);
      reader.onloadend = function () {
        setImgPreviewList(reader.result);
      };
    }
    if (isEdit) {
      setCategoryObj((prev) => ({ ...prev, image_url: null }));
    }
  }, [categoryObj.imageFile]);

  useEffect(() => {
    if (isEdit) {
      setImgPreviewList(categoryObj.image_url);
    }
  }, [isEdit]);

  useEffect(() => {
    setCategoryObj((prev) => ({ ...prev, parent_id: categories[0].id }));
  }, [categories]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Parent Category</label>
        <DkSelect
          name="parent_id"
          selectedValue={categoryObj.parent_id}
          onChange={(e) => {
            setCategoryObj((prev) => ({ ...prev, parent_id: e.target.value }));
          }}
          options={categories}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Category Name</label>
        <br />
        <Input
          type="text"
          name="name"
          id="name"
          value={categoryObj.name}
          isRequired={true}
          placeholder="Category Name"
          onChange={handleInputChange}
          className={styles.inputStyle}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Category SubTitle</label>
        <br />
        <Input
          type="text"
          name="subtitle"
          id="subtitle"
          value={categoryObj.subtitle}
          isRequired={true}
          placeholder="Category SubTitle"
          onChange={handleInputChange}
          className={styles.inputStyle}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Status</label>
        <DkSelect
          name="status"
          selectedValue={categoryObj.status}
          onChange={(e) => {
            setCategoryObj((prev) => ({ ...prev, status: e.target.value }));
          }}
          options={statusList}
        />
      </div>
      <div>
        <label className={styles.label}>Image</label>
        <div className={styles.imageWrapper}>
          <div className={`${styles.imageBox} ${styles.imageUploadWrapper}`}>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              name="imageFile"
              multiple
              className={styles.imageInput}
              onChange={handleInputChange}
            />
            <label className={styles.fileLable} htmlFor="imageFile">
              <div className={styles.uploadIcon}>
                <i>
                  <FontAwesomeIcon icon={faArrowUp} />
                </i>
              </div>
            </label>
          </div>
          {imgPreviewList && (
            <div className={styles.imageBox}>
              <img width="100%" src={imgPreviewList} alt="category-img" />
              <CancelButton onClick={() => deleteImg()} />
            </div>
          )}
        </div>
      </div>
      
      <input
        type="submit"
        value="Save"
        className={`btn btn-primary ${styles.customBtn}`}
      />
    </form>
  );
};

export default CategoryForm;
