import {useDispatch,useSelector} from 'react-redux';

import { useHistory } from 'react-router-dom';
import { createTool,getTools,getToolById,getToolsDistinct,createComplementaryTool
    ,createToolAditionalData,cleanTool } from '../actions/toolbox.action';

export const useToolbox = () =>{
    const history = useHistory();
    const state = useSelector((state) => state.ToolboxState);
    const dispatch = useDispatch();

    const listTools = () =>{
        dispatch(getTools(history));
    }
    const insertTool = (data) =>{
        dispatch(createTool(data));
    }
    const insertComplementaryTool = (data) =>{
        dispatch(createComplementaryTool(data));
    }
    const getCurrentTool = (tool_id) =>{
        dispatch(getToolById(history,tool_id));
    }
    const getDistinctTool = (tool_id) =>{
        dispatch(getToolsDistinct(history,tool_id));
    }
    const insertToolData = (data) =>{
        dispatch(createToolAditionalData(data));
    }
    const removeTool = () =>{
        dispatch(cleanTool());
    }


    return {
        ...state,
        listTools,
        insertTool,
        insertComplementaryTool,
        getCurrentTool,
        getDistinctTool,
        insertToolData,
        removeTool,
        toolboxData: state?.data,
        currentTool:state?.dataCurrent,
        distinctTool:state?.dataDistinct,
        complementaryTool:state?.dataComplementary
    }
}