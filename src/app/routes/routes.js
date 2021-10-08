import React from "react";
import { Route } from "react-router"
import { ButtonDemo } from "../components/ButtonDemo";
import { ChartDemo } from "../components/ChartDemo";
import { Dashboard } from "../components/Dashboard";
import { Documentation } from "../components/Documentation";
import { FileDemo } from "../components/FileDemo";
import { FloatLabelDemo } from "../components/FloatLabelDemo";
import { FormLayoutDemo } from "../components/FormLayoutDemo";
import { InputDemo } from "../components/InputDemo";
import { InvalidStateDemo } from "../components/InvalidStateDemo";
import { ListDemo } from "../components/ListDemo";
import { MediaDemo } from "../components/MediaDemo";
import { MenuDemo } from "../components/MenuDemo";
import { MessagesDemo } from "../components/MessagesDemo";
import { MiscDemo } from "../components/MiscDemo";
import { OverlayDemo } from "../components/OverlayDemo";
import { PanelDemo } from "../components/PanelDemo";
import { TableDemo } from "../components/TableDemo";
import { TreeDemo } from "../components/TreeDemo";
import { CalendarDemo } from "../pages/CalendarDemo";
import { CrudDemo } from "../pages/CrudDemo";
import { EmptyPage } from "../pages/EmptyPage";
import { Invoice } from "../pages/Invoice";
import { ListMembers } from "../pages/ListMembers";
import { ChangePlan } from "../pages/ChangePlan";
import { TimelineDemo } from "../pages/TimelineDemo";
import { Persons } from "../pages/Persons";
import { Plan } from "../pages/Plan";
import { Menu } from "../pages/Menu";
import { DisplayDemo } from "../utilities/DisplayDemo";
import { ElevationDemo } from "../utilities/ElevationDemo";
import { FlexBoxDemo } from "../utilities/FlexboxDemo";
import { GridDemo } from "../utilities/GridDemo";
import { IconsDemo } from "../utilities/IconsDemo";
import { SpacingDemo } from "../utilities/SpacingDemo";
import { TextDemo } from "../utilities/TextDemo";
import { TypographyDemo } from "../utilities/TypographyDemo";
import { Widgets } from "../utilities/Widgets";
import { useLogin } from '../../redux/hooks/useUser';
import { useHistory } from 'react-router-dom';
import Roles from "../pages/Roles";
import Teams from "../pages/Teams";
import PaymentMethods from "../pages/PaymentMethods";
import MenuRole from "../pages/MenuRole";
import RendersTest from "../pages/RendersTest";
import Modelos from "../pages/Modelos";
import Processes from "../pages/Processes";
import AddProcess from "../pages/Processes/AddProcess/AddProcess";
import SignUp from "../pages/SignUp";
import GraphModelizer from "../pages/GraphModelizer";
import ModelsConsole from "../pages/ModelsConsole";
import Profile from "../pages/Profile";
import { Repository } from "../pages/Repository";
import AddActivity from "../pages/Processes/AddActivity/AddActivity";
import ViewerBPMN from "../pages/Processes/AddActivity/ViewerBPMN";
import BuildForm from "../pages/Processes/AddActivity/BuildForm";
import RepositoryList from "../pages/Repository/RepositoryList";
import RenderFormSchema from "../pages/Processes/AddActivity/RenderFormSchema";
import ModelDesigner from "../pages/ModelDesigner";
import Moments from "../pages/ModelDesigner/Stage2/Moments/index";
import SocialNetwork from "../pages/ModelDesigner/SocialNetwork/SocialNetwork";
import ComplexSystem from "../pages/TerritorialSystem/ComplexSystem";
import Polls from "../pages/Polls";
import EditPoll from "../pages/Polls/Poll/EditPoll";


const Routes = ({colorScheme, Help}) =>{

    const history = useHistory();
    const {login} = useLogin();

    const validLogin = () => {

        if (login) {
            return Dashboard;
        } else {
            history.push('/login');
        }
    }

    return(
        <React.Fragment>
            <Route path="/" exact component={validLogin()} />
                    <Route path="/start/documentation" component={Documentation} />
                    <Route path="/uikit/formlayout" component={FormLayoutDemo} />
                    <Route path="/uikit/floatlabel" component={FloatLabelDemo} />
                    <Route path="/uikit/input" component={InputDemo} />
                    <Route path="/uikit/invalidstate" component={InvalidStateDemo} />
                    <Route path="/uikit/button" component={ButtonDemo} />
                    <Route path="/uikit/table" component={TableDemo} />
                    <Route path="/uikit/list" component={ListDemo} />
                    <Route path="/uikit/tree" component={TreeDemo} />
                    <Route path="/uikit/panel" component={PanelDemo} />
                    <Route path="/uikit/overlay" component={OverlayDemo} />
                    <Route path="/uikit/menu" component={MenuDemo} />
                    <Route path="/uikit/message" component={MessagesDemo} />
                    <Route path="/uikit/media" component={MediaDemo} />
                    <Route path="/uikit/file" component={FileDemo} />
                    <Route path="/uikit/chart" component={ChartDemo} />
                    <Route path="/uikit/misc" component={MiscDemo} />
                    <Route path="/utilities/display" component={DisplayDemo} />
                    <Route path="/utilities/elevation" component={ElevationDemo} />
                    <Route path="/utilities/flexbox" component={FlexBoxDemo} />
                    <Route path="/utilities/icons" component={IconsDemo} />
                    <Route path="/utilities/widgets" component={Widgets} />
                    <Route path="/utilities/grid" component={GridDemo} />
                    <Route path="/utilities/spacing" component={SpacingDemo} />
                    <Route path="/utilities/typography" component={TypographyDemo} />
                    <Route path="/utilities/text" component={TextDemo} />
                    <Route path="/pages/crud" component={CrudDemo} />
                    <Route path="/pages/calendar" component={CalendarDemo} />
                    <Route path="/pages/help" render={() => <Help colorScheme={colorScheme} />} />
                    <Route path="/pages/invoice" component={Invoice} />
                    <Route path="/pages/empty" component={EmptyPage} />
                    <Route path="/pages/timeline" component={TimelineDemo} />
                    <Route path="/pages/listmembers" component={ListMembers}/>
                    <Route path="/pages/changeplan" component = {ChangePlan}/>
                    <Route path="/admin/role" component = { Roles }/>
                    <Route path="/admin/team" component = { Teams }/>
                    <Route path="/admin/payment-method" component = { PaymentMethods }/>
                    <Route path="/admin/persons" component={Persons} />
                    <Route path="/admin/plan" component={Plan} />
                    <Route path="/admin/menu" component={Menu} />
                    <Route path="/admin/menu-role" component={MenuRole} />
                    <Route path="/admin/modelos" component={Modelos}/>
                    <Route path="/admin/graph-modelizer" component={GraphModelizer}/>
                    <Route path="/creators/model-designer" component={ModelsConsole}/>
                    <Route path="/creators/moments" component={Moments}/>
                    <Route path="/profile" component={Profile} />
                    <Route path="/admin/renders-test" component={ RendersTest } />

                    <Route path="/admin/model-designer" component={ ModelDesigner } />

                    <Route path="/admin/repositories" component={ RepositoryList } />
                    <Route path="/admin/repository" component={ Repository } />
                    <Route path="/singup" component={ SignUp } />

                    {/* Territorial System routes */}
                    <Route path="/territorial-system/complex-system" component={ ComplexSystem } />


                    {/* Process routes */}
                    <Route path="/admin/processes" component={ Processes } />
                    <Route path="/admin/add-processes" component={ AddProcess } />
                    <Route path="/admin/add-activity" component={ AddActivity } />
                    <Route path="/admin/view-activity" component={ ViewerBPMN } />
                    <Route path="/admin/build-form" component={ BuildForm } />
                    <Route path="/admin/render-form-schema" component={ RenderFormSchema } />

                    {/* Social Network routes */}
                    <Route path="/admin/social-network" component={ SocialNetwork } />

                    {/* Polls routes*/}
                    <Route path="/admin/surveys" component={Polls}/>
                    <Route path="/admin/survey/edit" component={EditPoll}/>
        </React.Fragment>
    );
};

export default Routes;
