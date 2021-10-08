import store from "../../../../../redux/store";

export const transformCypherResult = (raw_data) => {
    /*
    Desc:
        Function for transforming the data structure retrieved from the chypher query inside the micro server, to the
    data structure format need it in the redux store.

    Params:
        raw_data: the data retrieved from the micro server. Check docs for info about this structure.

    Return:
        selectedSubsystems: Array of objects in the structure need it by the store
     */

    const mainSubsystems = store.getState().ReducerModel.mainSubsystems;
    let selectedSubsystems = mainSubsystems.filter(s => raw_data.subsystems_ids.includes(s.id.toString()) );
    for(let i = 0; i < selectedSubsystems.length; i++){
        selectedSubsystems[i].selectedComponents = raw_data.components.filter(c => c.subsystemId === selectedSubsystems[i].id);
    }
    for(let i = 0; i < selectedSubsystems.length; i++) {
        for (let j = 0; j < selectedSubsystems[i].selectedComponents.length; j++) {
            const relationships = raw_data.relationships.map((r) => {
                if(r.source.id === selectedSubsystems[i].selectedComponents[j].id){
                    const rel = r.target
                    rel.interaction = r.relationship
                    return rel;
                }
            })
            selectedSubsystems[i].selectedComponents[j].relationships = relationships.filter(r => r !== undefined);
        }
    }
    return selectedSubsystems;
}
