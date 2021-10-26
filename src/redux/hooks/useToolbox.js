import {useDispatch,useSelector} from 'react-redux';

import { useHistory } from 'react-router-dom';
import { createTool,getTools,getToolById,getToolsDistinct,createComplementaryTool } from '../actions/toolbox.action';

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


    return {
        ...state,
        listTools,
        insertTool,
        insertComplementaryTool,
        getCurrentTool,
        getDistinctTool,
        toolboxData: state?.data,
        currentTool:state?.dataCurrent,
        distinctTool:state?.dataDistinct,
        complementaryTool:state?.dataComplementary
    }
}