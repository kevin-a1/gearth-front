import {combineReducers} from 'redux';
import {LoginReducer as LoginState} from './reducer/user.reducer';
import {PlanReducer as PlanState} from './reducer/plan.reducer';
import {RepositoryReducer as RepositoryState} from './reducer/repository.reducer';
import {SocialNetworkReducer as SocialNetworkState} from './reducer/social-network.reducer'
import {ModelReducer as ModelState} from './reducer/model.reducer'
import {RolNavigationReducer as RolNavigationState} from './reducer/rol-navigation.reducer'


import ReducerModel from "./reducer/graph-modelizer.reducer";

export default combineReducers ({
    LoginState,
    ReducerModel,
    PlanState,
    RepositoryState,
    ModelState,
    SocialNetworkState,
    RolNavigationState
});

