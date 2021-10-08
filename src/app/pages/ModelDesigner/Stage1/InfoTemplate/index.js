import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { findAllPeople } from "../../../../../api/data";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import useForm from "../../../../../hooks/useForm";
import classNames from "classnames";
import { values } from "lodash";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";

const InfoTemplate = (props) => {
  const {categoryId, values, setCategoryId, handleInputChange } = props;

  const dropdownItems = [
    { name: "Socio Cultural", code: 1 },
    { name: "Medio Construido", code: 2 },
    { name: "Político Institucional", code: 3 },
  ];


  const [submitted, setSubmitted] = useState(false);

  const getSelectedItem = id => {
    const item = dropdownItems.filter(i => i.code === props.categoryId);
    return item[0];
  }


  const [dropdownItem, setDropdownItem] = useState(props.categoryId ? getSelectedItem(props.categoryId) : null);
  

  const fileUploadHandler = ({ files }) => {
    const [file] = files;
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };
  const uploadFile = async (invoiceFile) => {
    let formData = new FormData();
    formData.append("file_obj", invoiceFile);
  };

  const onChangeDropdown = (e) => {
    setDropdownItem(e.value)
    props.setCategoryId(e.value)

  } 
  
  const {shortName} = values;


  return (
    <>
      <h3>Información básica del MIT</h3>

      <div
        className="p-col-12 p-md-8 p-lg-6 p-fluid"
        style={{ margin: "auto" }}
      >
        <FileUpload
          chooseLabel="Seleccione imagen"
          uploadLabel="Subir"
          cancelLabel="Cancelar"
          mode="basic"
          customUpload={true}
          accept="image/*"
          maxFileSize={1000000000000}
          uploadHandler={fileUploadHandler}
        />
      </div>
      <div className="p-col-6 p-md-8 p-lg-6 p-fluid" style={{ margin: "auto" }}>
        <label htmlFor="category">Seleccione categoría</label>
        <Dropdown
          id="category"
          name="category"
          value={dropdownItem}
          onChange={e => onChangeDropdown(e)}
          options={dropdownItems}
          optionLabel="name"
          placeholder="Seleccione una"
        ></Dropdown>

        <div className="p-field">
          <label htmlFor="shortName">Nombre</label>

          <InputText
            id="shortName"
            name="shortName"
            value={shortName}
            onChange={handleInputChange}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !process?.name })}
            placeholder="Ingrese el nombre del MIT..."
            autoComplete={false}
          />

          {submitted && !process?.name && (
            <small style={{ color: "#ef9a9a" }} className="p-invalid">
              Name is required.
            </small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="price">Precio</label>

          <InputText
            id="price"
            name="price"
            value={values.price}
            onChange={handleInputChange}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !process?.name })}
            placeholder="Ingrese un valor Ej: 10.00 ..."
            autoComplete={false}
          />

          {submitted && !process?.name && (
            <small style={{ color: "#ef9a9a" }} className="p-invalid">
              Name is required.
            </small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="description">Descripción</label>

          <InputTextarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            required
            className={classNames({
              "p-invalid": submitted && !process?.description,
            })}
            rows={10}
            autoResize
            placeholder="Máximo 300 palabras ..."
            autoCapitalize="on"
            required
          />

          {submitted && !process?.description && (
            <small style={{ color: "#ef9a9a" }} className="p-invalid">
              La descripción es requerida.
            </small>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoTemplate;
