import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { CHANNELS } from "../../../../api/data";
import { InputTextarea } from "primereact/inputtextarea";

import * as socialNetworkActions from "../../../../redux/actions/social-network.actions";

const emptyChannel = {
  id: null,
  model_id: 0,
  name: "",
  description: "",
};

const createId = () => {
  let id = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const ChannelsList = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(socialNetworkActions.resetChannels())
  // }, []);

  const [random, setRandom] = useState();

  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channel, setChannel] = useState(emptyChannel);
  const [channels, setChannels] = useState(null);
  const [switchValue, setSwitchValue] = useState(false);

  const [deleteChannelDialog, setDeleteChannelDialog] = useState(false);
  const [channelDialog, setChannelDialog] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);

  const userState = useSelector((state) => state.LoginState);
  const channelsState = useSelector((state) => state.SocialNetworkState);
  const rolNavState = useSelector((state) => state.RolNavigationState?.state);
  const modelId = useSelector((state) => state.ModelState?.model?.id);

// TODO: CHANGE MODEL ID WHEN IMPLEMENTATIOS IS READY
  const MODEL_ID = 1;

  const [loading, setIsLoading] = useState(false);

  const loadChannels = useCallback(async () => {
    try {
      await dispatch(
        socialNetworkActions.getChannels(
      // TODO: Change model_id when implementation is ready
          MODEL_ID,
          userState?.data?.access_token
        )
      );
      setChannels(channelsState.channels);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadChannels().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadChannels]);

  const openNew = () => {
    setChannel(emptyChannel);
    setSubmitted(false);
    setChannelDialog(true);
  };

  const saveChannel = async () => {
    setSubmitted(true);
    let resp;
    let _status;
    if (!channel.model_id) {
      // TODO: Change model_id when implementation is ready
      channel.model_id = MODEL_ID;
      resp = await dispatch(
        socialNetworkActions.createChannel(channel, userState.data.access_token, rolNavState)
      );
      if (resp) {
        _status = resp[0];
        toast?.current?.show({
          severity: _status === 200 ? "success" : "error",
          summary: _status === 200 ? "Successful" : "Error",
          detail: _status === 200 ? "Channel Created" : "Channel Not Created",
          life: 3000,
        });
      }
    } else {
      resp = await dispatch(
        socialNetworkActions.updateChannel(channel, userState.data.access_token, rolNavState)
      );
      if (resp) {
        _status = resp[0];
        toast?.current?.show({
          severity: _status === 200 ? "success" : "error",
          summary: _status === 200 ? "Successful" : "Error",
          detail: _status === 200 ? "Channel Updated" : "Channel Not Updated",
          life: 3000,
        });
      }
    }
    if (resp) {
      setChannels(resp[1]);
    } else {
        toast?.current?.show({
            severity: "error",
            summary: "Error",
            detail: "We are having some troubles. Try later.",
            life: 3000,
          });
    }
    setChannelDialog(false);
    setChannel(emptyChannel);
  };

  const dialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveChannel}
      />
    </>
  );

  const deleteChannel = async () => {
    const resp = await dispatch(
      socialNetworkActions.deleteChannel(
        channel?.id,
        userState.data.access_token,
        rolNavState,
      // TODO: Change model_id when implementation is ready
        MODEL_ID,
      )
    );
    const _status = resp[0];
    const _channels = resp[1];
    setChannels(_channels);
    setDeleteChannelDialog(false);
    setChannel(emptyChannel);
    toast.current.show({
      severity: _status === 200 ? "success" : "error",
      summary: _status === 200 ? "Successful" : "Error",
      detail: _status === 200 ? "Channel Deleted" : "Channel Not Deleted",
      life: 3000,
    });
  };

  const hideDeleteChannelDialog = () => {
    setDeleteChannelDialog(false);
  };

  const deleteDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteChannelDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteChannel}
      />
    </>
  );

  const hideDialog = () => {
    setSubmitted(false);
    setChannelDialog(false);
  };

  const editChannel = (c) => {
    setChannel({ ...c });
    setChannelDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _channel = { ...channel };
    _channel[`${name}`] = val;
    setChannel(_channel);
  };

  const confirmDeleteChannel = (c) => {
    setChannel(c);
    setDeleteChannelDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New Channel"
          icon="pi pi-plus"
          className="p-button-success p-mr-2 p-mb-2"
          onClick={openNew}
        />
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning p-mr-1"
          onClick={() => editChannel(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-mr-1"
          onClick={() => confirmDeleteChannel(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div
      className="table-header"
      style={{ display: "flex", "justify-content": "space-between" }}
    >
      <div>
        <h5 className="p-m-0">Channels</h5>
      </div>
      <div>
        <i>
          {selectedChannel &&
            selectedChannel.length > 0 &&
            `Selected (${selectedChannel.length})`}
        </i>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>
    </div>
  );

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        {/*<span className="p-column-title">Name</span>*/}
        {rowData?.name}
      </>
    );
  };

  const descriptionBodyTemplate = (rowData) => {
    return (
      <>
        {/*<span className="p-column-title">Description</span>*/}
        {rowData?.description}
      </>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <Toolbar className="p-mb-4 p-toolbar" left={leftToolbarTemplate} />
      <DataTable
        id={random}
        ref={dt}
        value={channels}
        selection={selectedChannel}
        onSelectionChange={(e) => setSelectedChannel(e.value)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        globalFilter={globalFilter}
        emptyMessage="No channels found."
        header={header}
      >
        {/*<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>*/}
        <Column
          style={{ width: "20%" }}
          field="name"
          header="Name"
          sortable
          body={nameBodyTemplate}
        />
        <Column
          style={{ width: "65%" }}
          field="description"
          header="Description"
          body={descriptionBodyTemplate}
        />
        <Column style={{ width: "15%" }} body={actionBodyTemplate} />
      </DataTable>

      <Dialog
        visible={channelDialog}
        style={{ width: "550px" }}
        header="Channel"
        modal
        className="p-fluid"
        footer={dialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={channel?.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !channel?.name })}
          />
          {submitted && !channel?.name && (
            <small className="p-invalid">Name is required.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            name="description"
            value={channel?.description}
            onChange={() => {}}
            rows={8}
            autoResize
            placeholder="Máximo 50 palabras ..."
            autoCapitalize="on"
            autoFocus
            className={classNames({
              "p-invalid": submitted && !channel?.description,
            })}
            required
            onChange={(e) => onInputChange(e, "description")}
          />
          {submitted && !channel?.description && (
            <small className="p-invalid">Description is required.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="status" className="p-mr-2">
            Status
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputSwitch
              id="status"
              className="p-mr-2"
              checked={switchValue}
              onChange={(e) => setSwitchValue(e.value)}
              autoFocus
            />
            <i>{switchValue ? "Active" : "Inactive"}</i>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteChannelDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDialogFooter}
        onHide={hideDeleteChannelDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {channel && (
            <span>
              Are you sure you want to delete <b>{channel?.name}</b>
            </span>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ChannelsList;
