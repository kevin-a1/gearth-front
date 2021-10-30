import React, {useState} from 'react';

import {TabMenu} from "primereact/tabmenu";
import ChannelsList from "./ChannelsList";
import AppUsers from "./AppUsers";

const wizardItems = [
    {id: 0, label: 'Channels', icon: 'pi pi-th-large'},
    {id: 1, label: 'App Users', icon: 'pi pi-users'},
    {id: 2, label: 'Conversations Overview', icon: 'pi pi-eye'},
];

const SocialNetwork = () => {

    const [tabSelected, setTabSelected] = useState(wizardItems[0]);

    const tabChangeHandler = (tab) => {
        setTabSelected(tab);
    }


    return (
        <>

            <div className="p-col-12 p-md-12">
                <div className="card card-w-title">
                    <h5>Consola de Redes de pares</h5>
                    <TabMenu model={wizardItems} onTabChange={(e) => {
                        tabChangeHandler(e.value)
                    }} activeItem={tabSelected}/>

                    {
                        tabSelected.id === 0 ?
                            <ChannelsList/>
                            : tabSelected.id === 1 ?
                            <AppUsers/>
                            :
                            "tab 3"}
                </div>
            </div>


        </>
    )
}

export default SocialNetwork;
