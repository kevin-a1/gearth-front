// React imports
import React, { useEffect, useRef, useState, useCallback } from "react";
// Template imports
import { PickList } from "../components/custom/primereact/custompicklist";
import { Dropdown } from "primereact/dropdown";
import { ScrollTop } from "primereact/scrolltop";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";

import { Sidebar } from "primereact/sidebar";
// Custom UI components
import RelationshipsFeaturesTable from "../components/custom/graphModelizer/RelationshipsFeaturesTable";
import ComponentsFeaturesTable from "../components/custom/graphModelizer/ComponentsFeaturesTable";
import TerritorialSystemGraph from "../components/custom/graphModelizer/TerritorialSystemGraph";
import Spinner from "../components/UI/spinner/Spinner";
// Redux actions imports
import store from "../../redux/store";
import * as graphModelizerActions from "../../redux/actions/graph-modelizer.actions";
import * as actionsGraphModelizer from "../../redux/actions/graph-modelizer.actions";
// Initial data imports TODO remove once the service is implemented
import { territorialSubSystems } from "../../api/data";
// Constants
import { modelKeywords } from "../constants/keywords";

const getValueSourceComponents = (components, targetList) => {
  /*
    Description: Function for taking two lists and creating a new list
    with values that are not shared. This way are obtained the source list
    for the pickup list: values that hasn't been selected previously
  */
  let newData = [];
  let flag;
  for (let i = 0; i < components.length; i++) {
    flag = false;
    for (let j = 0; j < targetList.length; j++) {
      if (components[i].id === targetList[j].id) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      newData.push(components[i]);
    }
  }
  return newData;
};

// TO UTILS
const getActionedElement = (currentList, previousList, action) => {
  let element;
  if (action === "add") {
    element = currentList.filter((s) => !previousList.includes(s));
  } else {
    element = previousList.filter((s) => !currentList.includes(s));
  }
  return element[0]; // Need the index for not returning an array
};

// TO UTILS
const getAction = (e) => {
  const add = "p-button-icon p-c pi pi-angle-right";
  const outterEvent = e.originalEvent.target.childNodes[0]?.className;
  const innerEvent = e.originalEvent.target.attributes.class.nodeValue;
  if (outterEvent === add || innerEvent === add) {
    return "add";
  } else {
    return "delete";
  }
};

const GraphModelizer = (props) => {
  // Validation for not returning null in the .selectedSubsystems attribute
  // For some reason sometimes it goes from [], defined in redux to null,
  // which produces an error
  const graphModelizerState = store.getState().ReducerModel;
  if (!graphModelizerState?.selectedSubsystems) {
    actionsGraphModelizer.resetModelStore();
  }
  // For getting the token and the teamId
  const loginState = store.getState().LoginState; 
  // For getting the id of the model selected for edition
  const modelState = store.getState().ModelState?.model;
  const [modelId, setModelId] = useState(modelState?.id?.toString());
  // Values for the remaining systems of level 1 (First pickup list: Source values)
  const [subSystemSourceValue, setSubSystemSourceValue] = useState(
    getValueSourceComponents(
      territorialSubSystems,
      graphModelizerState.selectedSubsystems
    )
  );
  // Values selected from the sub systems pickup list
  const [subSystemTargetValue, setSubSystemTargetValue] = useState(
    graphModelizerState.selectedSubsystems
  );
  // Dropdown for picking up the components to work with
  const [dropdownSubSystem, setDropdownSubSystem] = useState(
    graphModelizerState.selectedSubsystems
  );
  const [selectedDropdownSubsystem, setSelectedDropdownSubsyste] = useState();
  // Lists of values for the source and target lists of components
  const [componentSourceValue, setComponentSourceValue] = useState([]);
  const [componentTargetValue, setComponentTargetValue] = useState([]);
  // List of components in the dropdown from which it can be selected a component
  // to set up its relationships
  const [
    dropdownComponentsForRelationships,
    setDropdownComponentsForRelationships,
  ] = useState([]);
  // Setting up the component to stablish the relationships
  const [selectedDropdownComponent, setSelectedDropdownComponent] = useState(
    null
  );
  // Lists of values for the source and target lists of relationships
  // Elements in the target list are the ones in relationship whit the selected
  // component in the selectedDropdownComponent
  const [relationshipSourceValue, setRelationshipSourceValue] = useState([]);
  const [relationshipTargetValue, setRelationshipTargetValue] = useState([]);
  // List of all relationships stablished
  const [currentRelationships, setCurrentRelationships] = useState();

  const message = useRef();
  const message2 = useRef();
  const message3 = useRef();

  const [random, setRandom] = useState(Math.random());
  const [randomTable, setRandomTable] = useState(Math.random());
  const [randomTableComponent, setRandomTableComponent] = useState(
    Math.random()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);

  const loadRelationships = useCallback(async () => {
    try {
      await setCurrentRelationships(graphModelizerActions.getAllRelationships);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getListSelectedComponents = () => {
    let listSelectedComponents = [];
    for (let i = 0; i < graphModelizerState.selectedSubsystems.length; i++) {
      listSelectedComponents = listSelectedComponents.concat(
        graphModelizerState.selectedSubsystems[i].selectedComponents
      );
    }
    return listSelectedComponents;
  };

  // For setting the relationships already selected
  useEffect(() => {
    setIsLoading(true);
    loadRelationships().then(() => {
      setIsLoading(false);
    });
  }, [loadRelationships]);

  // For loading all the graph model retrieved in the database to the redux
  useEffect(() => {
    if (modelId !== modelKeywords.newModel) {
      try {
        const sourceList = getListSelectedComponents();
        setDropdownComponentsForRelationships(sourceList);
        setRandomTableComponent(Math.random);
        reRenderRelationships();
        const targetList = updateSubSystemsComponentTargetList(
          graphModelizerState.selectedSubsystems[0].id
        );
        setSelectedDropdownSubsyste(graphModelizerState.selectedSubsystems[0]);
        let valueComponents = getValueSourceComponents(
          graphModelizerState.selectedSubsystems[0].components,
          targetList
        );
        setComponentSourceValue(valueComponents);
        setSelectedDropdownComponent(sourceList[0]);
        const targetList2 = updateRelationshipTargetList(
          sourceList[0].subsystemId,
          sourceList[0].id
        );
        let valueComponents2 = getValueSourceComponents(
          sourceList,
          targetList2
        );
        setRelationshipSourceValue(valueComponents2);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const onTransferSubSystemComponents = (e) => {
    const action = getAction(e);
    const component = getActionedElement(
      e.target,
      componentTargetValue,
      action
    );
    if (action === "add") {
      store.dispatch(actionsGraphModelizer.addComponent(component));
    } else if (action === "delete") {
      store.dispatch(actionsGraphModelizer.removeComponent(component));
      graphModelizerActions.updateRelationships(component.id);
      reRenderRelationships();
      cleanViews();
    }

    setRandomTableComponent(Math.random);
    setComponentSourceValue(e.source);
    updateSubSystemsComponentTargetList(component.subsystemId);

    const sourceList = getListSelectedComponents();
    setRelationshipSourceValue(sourceList);
    setDropdownComponentsForRelationships(sourceList);
  };

  const onTransferSubSystem = (e) => {
    const action = getAction(e);
    const subsystem = getActionedElement(
      e.target,
      subSystemTargetValue,
      action
    );
    if (action === "add") {
      store.dispatch(actionsGraphModelizer.addSubsystem(subsystem));
    } else if (action === "delete") {
      store.dispatch(actionsGraphModelizer.removeSubsystem(subsystem));
      // Removing relationships from components of the deleted system
      graphModelizerActions.updateRelationshipsFromSubsystem(subsystem.id);
      reRenderRelationships();
      cleanViews();
    }
    // This functionality if for updating the UI
    setSubSystemSourceValue(e.source);
    setSubSystemTargetValue(e.target);
    // For updating the dropdown with the selected sub systems
    setDropdownSubSystem(e.target);
    // Updating the Components Features table, the dropdown for selecting a 
    // component, and the source list for the relationships
    const newComponentsList = graphModelizerActions.updateSelectedComponents(subsystem.id);
    setDropdownComponentsForRelationships(newComponentsList);
    setRelationshipSourceValue(newComponentsList)
    // For re render the component features table
    setRandomTableComponent(Math.random);
    // I need to reset the next two components for avoiding inconsistencies
    // specially when deleting
    setComponentSourceValue([]);
    setComponentTargetValue([]);
    setSelectedDropdownSubsyste(null);
    setSelectedDropdownComponent(null)
    setRelationshipTargetValue([]);
  };

  const cleanViews = () => {
    setRelationshipTargetValue([]);
    // setDropdownComponentsForRelationships([]);
    setSelectedDropdownComponent(null);
  };

  const reRenderRelationships = () => {
    loadRelationships();
    setRandomTable(Math.random);
  };

  const updateSubSystemsComponentTargetList = (subsystemId) => {
    const subsystemIndex = graphModelizerState.selectedSubsystems.findIndex(
      (e) => e.id === subsystemId
    );
    const targetList =
      graphModelizerState.selectedSubsystems[subsystemIndex].selectedComponents;
    setComponentTargetValue(targetList);
    return targetList;
  };

  const onSelectSubSystemFromDropdown = (e) => {
    const targetList = updateSubSystemsComponentTargetList(e.value.id);
    setSelectedDropdownSubsyste(e.value);
    let valueComponents = getValueSourceComponents(
      e.value.components,
      targetList
    );
    setComponentSourceValue(valueComponents);
  };

  const updateRelationshipTargetList = (subsystemId, componentId) => {
    const subsystemIndex = graphModelizerState.selectedSubsystems.findIndex(
      (e) => e.id === subsystemId
    );
    const componentIndex = graphModelizerState.selectedSubsystems[
      subsystemIndex
    ].selectedComponents.findIndex((e) => e.id === componentId);
    const targetList =
      graphModelizerState.selectedSubsystems[subsystemIndex].selectedComponents[
        componentIndex
      ].relationships;
    setRelationshipTargetValue(targetList);
    return targetList;
  };

  const onSelectDropdownComponent = (e) => {
    const targetList = updateRelationshipTargetList(
      e.value.subsystemId,
      e.value.id
    );
    const sourceList = getListSelectedComponents();
    setSelectedDropdownComponent(e.value);
    let valueComponents = getValueSourceComponents(sourceList, targetList);
    setRelationshipSourceValue(valueComponents);
  };

  const addInfoMessageSaved = (status, content) => {
    message?.current?.show({ severity: status, content: content });
  };

  const addInfoMessageSaved2 = (status, content) => {
    message2?.current?.show({ severity: status, content: content });
  };

  const addInfoMessage = () => {
    message3?.current?.show({
      severity: "info",
      content: "Seleccione el componente de origen para la relación.",
    });
  };

  const onTransferRelationship = (e) => {
    // Checking if relationship is transfered without setting up a source
    // componennt in the dropdown component selector
    if (selectedDropdownComponent === null) {
      addInfoMessage();
      return;
    }

    const action = getAction(e);
    const relationship = getActionedElement(
      e.target,
      relationshipTargetValue,
      action
    );

    if (action === "add") {
      store.dispatch(
        actionsGraphModelizer.addRelationship(
          selectedDropdownComponent,
          relationship
        )
      );
    } else if (action === "delete") {
      store.dispatch(
        actionsGraphModelizer.removeRelationship(
          selectedDropdownComponent,
          relationship
        )
      );
    }
    reRenderRelationships();
    setRelationshipSourceValue(e.source);
    setRelationshipTargetValue(e.target);
  };

  const onCreateModel = async (e) => {
    if (currentRelationships.length === 0) {
      addInfoMessageSaved("error", "El grafo necesita relaciones.");
      return;
    }
    let pressButton = 2;
    if(e.target?.id === "SaveB1" || e.target?.offsetParent?.id === "SaveB1"){
      pressButton = 1;
    }
    setIsSaving(true);
    const status = await graphModelizerActions.updateModel(
      { ...graphModelizerState },
      modelId,
      loginState.data.access_token
    );
    setIsSaving(false);

    if (status === 200) {
      setIsWaiting(true);
      pressButton === 1 ? addInfoMessageSaved("success", "Cambios guardados.") : addInfoMessageSaved2("success", "Cambios guardados.");
    } else {
      pressButton === 1 ? addInfoMessageSaved("error", "Estamos teniendo problemas, intente más tarde.") : addInfoMessageSaved2("error", "Estamos teniendo problemas, intente más tarde.");
    }

    setRandom(Math.random);
    setIsLoading(false);
  };

  const previewGraph = () => {
    setVisibleFullScreen(!visibleFullScreen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [isWaiting]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-col-12">
      <Button
        label={visibleFullScreen ? "Cerrar" : "Ver"} 
        type="button"
        icon={
          visibleFullScreen
            ? "pi pi-angle-double-down"
            : "pi pi-angle-double-up"
        }
        className="p-button-warning"
        onClick={previewGraph}
        style={{
          position: "fixed",
          bottom: "2%",
          right: "1%",
          width: "80px",
          height: "45px",
          zIndex: 10001,
        }}
      />

      <Sidebar
        visible={visibleFullScreen}
        onHide={() => setVisibleFullScreen(false)}
        baseZIndex={1000}
        fullScreen
      >
        <TerritorialSystemGraph title={"Vista previa: Grafo del Sistema Territorial"} />

        <div className="card">
          <Button
            id="SaveB1"
            label="Guardar Modelo"
            className="p-mr-2 p-mb-2 p-button-success"
            onClick={onCreateModel}
            style={{
              position: "fixed",
              bottom: "1%",
              left: "1%",
              width: "120px",
              height: "45px",
              zIndex: 10001,
            }}
            disabled={isSaving || isWaiting}
          />
          {isSaving ? (
            <i
              className="pi pi-spin pi-spinner"
              style={{
                position: "fixed",
                bottom: "3.5%",
                left: "140px",
                zIndex: 10001,
                fontSize: "2rem",
                color: "#777BF1",
              }}
            />
          ) : (
            <></>
          )}

          <div
            style={{
              display: "inline-block",
              width: 250,
              position: "fixed",
              bottom: "0%",
              left: "140px",
            }}
          >
            <Messages ref={message} />
          </div>
        </div>
      </Sidebar>

      <div className="card">
        <h5>Subsistemas del Modelo Territorial</h5>
        <PickList
          source={subSystemSourceValue}
          target={subSystemTargetValue}
          sourceHeader="Catálogo"
          targetHeader="Selección"
          itemTemplate={(item) => <div>{item.name}</div>}
          onChange={onTransferSubSystem}
          sourceStyle={{ height: "200px" }}
          targetStyle={{ height: "200px" }}
        />
      </div>

      <div className="p-grid list-demo">
        <div className="p-col-12 p-lg-8">
          <div className="card">
            <h5>Componentes del Subsistema</h5>
            <div className="p-field p-col-12 p-md-3">
              <Dropdown
                id="state"
                value={selectedDropdownSubsystem}
                onChange={onSelectSubSystemFromDropdown}
                options={dropdownSubSystem}
                optionLabel="name"
                placeholder="Subsistemas"
              />
            </div>
            <PickList
              source={componentSourceValue}
              target={componentTargetValue}
              sourceHeader="Catálogo"
              targetHeader="Selección"
              itemTemplate={(item) => <div>{item.name}</div>}
              onChange={onTransferSubSystemComponents}
              sourceStyle={{ height: "200px" }}
              targetStyle={{ height: "200px" }}
            />
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div
            className="card p-formgrid "
            style={{ width: "100%", height: "398px" }}
          >
            <h5>Propiedades de los componentes</h5>
            <ScrollPanel style={{ width: "100%", height: "280px" }}>
              <ComponentsFeaturesTable
                key={randomTableComponent}
                data={dropdownComponentsForRelationships}
              />
              <ScrollTop
                target="parent"
                className="custom-scrolltop"
                threshold={100}
                icon="pi pi-arrow-up"
              />
            </ScrollPanel>
          </div>
        </div>
      </div>

      {/*SETTING RELATIONSHIPS*/}
      <div className="card">
        <h5>Relaciones</h5>
        <div
          className="p-field p-col-12 p-md-2"
          style={{ display: "inline-block" }}
        >
          <Dropdown
            id="stateComponent"
            value={selectedDropdownComponent}
            onChange={onSelectDropdownComponent}
            options={dropdownComponentsForRelationships}
            optionLabel="name"
            placeholder="Componentes"
          />
        </div>
        <div style={{ display: "inline-block" }}>
          <Messages ref={message3} />
        </div>
        <PickList
          source={relationshipSourceValue}
          target={relationshipTargetValue}
          sourceHeader="Catálogo"
          targetHeader="Selección"
          itemTemplate={(item) => <div>{item.name}</div>}
          onChange={onTransferRelationship}
          sourceStyle={{ height: "200px" }}
          targetStyle={{ height: "200px" }}
        />
      </div>

      {/*RELATIONSHIPS FEATURES TABLE*/}
      <div className="card">
        <RelationshipsFeaturesTable
          title={"Propiedades de las relaciones"}
          key={randomTable}
          data={currentRelationships}
        />
      </div>

      {/*BUTTON FOR CREATING A NEW MODEL*/}
      <div className="card">
        <Button
          label="Guardar Modelo"
          className="p-mr-2 p-mb-2 p-button-success"
          onClick={onCreateModel}
          disabled={isSaving || isWaiting}
        />
        {isSaving ? (
          <i
            className="pi pi-spin pi-spinner"
            style={{ marginBottom: 10, fontSize: "2rem", color: "#777BF1" }}
          />
        ) : (
          <></>
        )}

        <div style={{ width: 500 }}>
          <Messages ref={message2} />
        </div>
      </div>
    </div>
  );
};

export default GraphModelizer;
