import {useDispatch,useSelector} from 'react-redux';
import {getPlans,createPlan} from '../actions/plan.action';
import {useHistory } from 'react-router-dom';

export const usePlan = () =>{
    const history = useHistory();
    const state = useSelector((state) => state.PlanState);
    const dispatch = useDispatch();

    const listPlans = () =>{
        dispatch(getPlans(history));
    }
    const insertPlan = (data,history) =>{
        dispatch(createPlan(data));
    }

    return {
        ...state,
        listPlans,
        insertPlan,
        plansData: state?.data
    }
}