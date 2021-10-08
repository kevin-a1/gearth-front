import React, { useRef, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { findAllPeople } from "../../../../api/data";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import useForm from "../../../../hooks/useForm";
import classNames from "classnames";
import { values } from "lodash";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import InfoTemplate from "./InfoTemplate";
import PrinciplesTemplate from "./PrinciplesTemplate";
import PurposeTemplate from "./PurposeTemplate";
import ScopeTemplate from "./ScopeTemplate";
import { BreadCrumb } from "primereact/breadcrumb";
import { useDispatch, useSelector } from "react-redux";

import { Messages } from "primereact/messages";

import * as modelActions from "../../../../redux/actions/model.actions";
import * as actionsGraphModelizer from "../../../../redux/actions/graph-modelizer.actions";


const Stage1 = () => {


  const dispatch = useDispatch();
  const userState = useSelector((state) => state.LoginState);
  const modelState = useSelector((state) => state.ModelState?.model);
  
  const graphModelizerState = useSelector((state) => state.ReducerModel);
  if(!graphModelizerState?.selectedSubsystems){
    actionsGraphModelizer.resetModelStore();
  }

  const message = useRef();
  const history = useHistory();
  const [editMode, setEditMode] = useState(history?.location?.state?.status);
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [autoValue, setAutoValue] = useState(null);
  const [categoryId, setCategoryId] = useState(modelState?.category_id);
  const { values, setValues, handleInputChange } = useForm({
    modelId: modelState?.id ? modelState?.id : "",
    description: modelState?.description ? modelState?.description : "",
    shortName: modelState?.name ? modelState?.name : "",
    longDescription: modelState?.long_description
      ? modelState?.long_description
      : "",
    userId: modelState?.user_id ? modelState?.user_id : "",
    price: modelState?.price ? modelState?.price : 0,
    image: modelState?.image ? modelState?.image : "default-image-url",
    teamId: modelState?.team_id ? modelState?.team_id : "",
    hashtag: modelState?.hashtag ? modelState?.hashtag : "",
  });

  const addInfoMessageSaved = (status, content) => {
    message.current.show({ severity: status, content: content });
  };

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

  useEffect(() => {
    let data = [];

    for (const p of findAllPeople()) {
      data.push({
        id: p.id,
        name: p.name,
        email: p.email,
        status: p.status,
      });
    }

    setAutoValue(data);
  }, []);

  const wizardItems = [
    { label: "Info del MIT" },
    { label: "Principios" },
    { label: "Propósito" },
    { label: "Alcance" },
  ];

  const renderSwitch = (i) => {
    switch (i) {
      case 0:
        return (
          <InfoTemplate
            categoryId={categoryId}
            values={values}
            setCategoryId={setCategoryId}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return <PrinciplesTemplate />;
      case 2:
        return <PurposeTemplate />;
      case 3:
        return <ScopeTemplate />;
      default:
        return <InfoTemplate />;
    }
  };

  const onContinueButtonHandler = async () => {
    const model = {
      ...values,
      categoryId: categoryId?.code ? categoryId?.code : categoryId,
    };
    const userId = userState?.data?.id;
    const teamId = userState?.data?.team?.id;
    const token = userState?.data?.access_token;

    let status;

    if (index === 0) {
      if (!editMode) {
        status = await dispatch(
          modelActions.createModel(model, userId, teamId, token)
        );
      } else {
        status = await dispatch(
          modelActions.editModel(model, userId, teamId, token)
        );
      }

      if (status === 200 || status === 201) {
        setSubmitted(true);
        setIndex(index + 1);
        setSubmitted(false);
        addInfoMessageSaved("success", "Changes saved.");

        actionsGraphModelizer.resetModelStore();

      } else {
        console.log("Error on setting up model");
        console.log(status);
        addInfoMessageSaved("error", "Not saved.");

      }

    }
    setSubmitted(true);
    setIndex(index + 1);
    setSubmitted(false);
  };

  const getButtons = () => {
    const classBtn = (type) => `p-button-${type} p-px-6`;

    const continueButton = (
      <Button
        icon="pi pi-arrow-right"
        onClick={onContinueButtonHandler}
        className={classBtn("info")}
        iconPos="right"
        label="Siguiente"
      />
    );

    const backButton = (
      <Button
        icon="pi pi-arrow-left"
        onClick={() => setIndex(index + -1)}
        className={classBtn("danger")}
        label="Atrás"
      />
    );

    return (
      <Toolbar
        className="p-mb-4 p-toolbar"
        left={index > 0 ? backButton : null}
        right={index < 3 ? continueButton : null}
        style={{ border: "0px" }}
      />
    );
  };

  return (
    <>
      <>
        <h2 style={{ textAlign: "center" }}>Etapa I</h2>

        <div className="card">
          <div className="p-md-9" style={{ margin: "auto" }}>
            <Steps activeIndex={index} model={wizardItems} readonly={true} />
          </div>

          <div className="card p-shadow-10">{renderSwitch(index)}</div>
          <Messages ref={message} />
          {getButtons()}
        </div>
      </>
    </>
  );
};

export default Stage1;
