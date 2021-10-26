import {useDispatch,useSelector} from 'react-redux';

import { useHistory } from 'react-router-dom';
import { createRepository, getRepositories } from '../actions/repository.action';

export const useRepository = () =>{
    const history = useHistory();
    const state = useSelector((state) => state.RepositoryState);
    const dispatch = useDispatch();

    const listRepositories = () =>{
        dispatch(getRepositories(history));
    }
    const insertRepository = (data) =>{
        dispatch(createRepository(data));
    }

    return {
        ...state,
        listRepositories,
        insertRepository,
        repositoryData: state?.data
    }
}