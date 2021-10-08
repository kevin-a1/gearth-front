import { territorialSubSystems } from '../../api/data'
import * as actionsModel from "../actions/graph-modelizer.actionsTypes"

const initialState = {
    teamId: null,
    id: null,
    mainSubsystems: territorialSubSystems,
    selectedSubsystems: [],
}


export default function ReducerModel(state = initialState, action) {
    let subsystemIndex;
    let componentIndex;
    let relationshipIndex;

    switch (action.type){
        case actionsModel.SET_MODEL_ID:
            return {
                ...state,
                id: action.payload.modelId
            }
        case actionsModel.SET_USER:
            return {
                ...state,
                teamId: action.payload.teamId
            }
        case actionsModel.SET_MODEL:
            return {
                ...state,
                id: action.payload.id,
                selectedSubsystems: action.payload.selectedSubsystems
            }
        case actionsModel.RESET_MODEL_STORE:
            return {
                ...state,
                selectedSubsystems: initialState.selectedSubsystems
            }

        case actionsModel.ADD_SUBSYSTEM:
            return {
                ...state,
                selectedSubsystems: [
                    ...state.selectedSubsystems,
                    action.payload
                ]
            }
        case actionsModel.DELETE_SUBSYSTEM:
            return {
                ...state,
                selectedSubsystems: state.selectedSubsystems.filter(s => s.id !== action.payload.id)
            }

        case actionsModel.ADD_COMPONENT:
            subsystemIndex = state.selectedSubsystems.findIndex(s => s.id === action.payload.subsystemId)
            const newArray  = [...state.selectedSubsystems];
            newArray[subsystemIndex].selectedComponents.push(action.payload)
            return {
                ...state,
                selectedSubsystems: newArray,
            }
        case actionsModel.REMOVE_COMPONENT:
            subsystemIndex = state.selectedSubsystems.findIndex(s => s.id === action.payload.subsystemId)
            let newArrayComp  = [...state.selectedSubsystems];
            newArrayComp[subsystemIndex].selectedComponents = newArrayComp[subsystemIndex].selectedComponents.filter(s => s.id !== action.payload.id)
            return {
                ...state,
                selectedSubsystems: newArrayComp,
            }
        case actionsModel.ADD_RELATIONSHIP:
            subsystemIndex = state.selectedSubsystems.findIndex(s => s.id === action.payload.sourceSubsystemId)
            componentIndex = state.selectedSubsystems[subsystemIndex].selectedComponents.findIndex(s => s.id === action.payload.sourceComponentId)
            const newArrayRel  = [...state.selectedSubsystems];
            newArrayRel[subsystemIndex].selectedComponents[componentIndex].relationships.push(action.payload)
            return {
                ...state,
                selectedSubsystems: newArrayRel,
            }
        case actionsModel.REMOVE_RELATIONSHIP:
            subsystemIndex = state.selectedSubsystems.findIndex(s => s.id === action.payload.subsystemId)
            componentIndex = state.selectedSubsystems[subsystemIndex].selectedComponents.findIndex(s => s.id === action.payload.componentId)
            let newArrayRelDel  = [...state.selectedSubsystems];
            newArrayRelDel[subsystemIndex].selectedComponents[componentIndex].relationships = newArrayRelDel[subsystemIndex].selectedComponents[componentIndex].relationships.filter(s => s.id !== action.payload.id)
            return {
                ...state,
                selectedSubsystems: newArrayRelDel,
            }
        case actionsModel.UPDATE_RELATIONSHIPS:
            return {
                ...state,
                selectedSubsystems: action.payload.newModelStore.selectedSubsystems,
            }

        case actionsModel.UPDATE_RELATIONSHIPS_FROM_SUBSYSTEM:
            return {
                ...state,
                selectedSubsystems: action.payload.newModelStore.selectedSubsystems,
            }

        case actionsModel.UPDATE_RELATIONSHIP_FEATURES:
            subsystemIndex = state.selectedSubsystems.findIndex(s => s.id === action.payload.subsystemId)
            componentIndex = state.selectedSubsystems[subsystemIndex].selectedComponents.findIndex(s => s.id === action.payload.componentId)
            relationshipIndex = state.selectedSubsystems[subsystemIndex].selectedComponents[componentIndex].relationships.findIndex(r => r.id === action.payload.newRelationship.id)
            let newArrayRelFeat  = [...state.selectedSubsystems];
            newArrayRelFeat[subsystemIndex].selectedComponents[componentIndex].relationships[relationshipIndex] = action.payload.newRelationship
            return {
                ...state,
                selectedSubsystems: newArrayRelFeat,
            }
        case actionsModel.CHANGE_COMPONENT_ATTRIBUTE:
            subsystemIndex = state.selectedSubsystems.findIndex(s => s.id === action.payload.subsystemId)
            componentIndex = state.selectedSubsystems[subsystemIndex].selectedComponents.findIndex(s => s.id === action.payload.componentId)
            let newArrayCompFeat  = [...state.selectedSubsystems];
            newArrayCompFeat[subsystemIndex].selectedComponents[componentIndex] = action.payload.newComponent
            return {
                ...state,
                selectedSubsystems: newArrayCompFeat,
            }
        default:
            return state;
    }
}
