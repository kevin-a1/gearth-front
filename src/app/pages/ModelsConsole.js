// React imports
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
// Template imports
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import {InputText} from "primereact/inputtext";

import {Button} from 'primereact/button';

// Custom UI imports
import Spinner from "../components/UI/spinner/Spinner";
// Redux, actions imports
import * as graphModelizerActions from "../../redux/actions/graph-modelizer.actions";

import { Menu } from 'primereact/menu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FileUpload } from 'primereact/fileupload';
import { AutoComplete } from 'primereact/autocomplete';
import { InputSwitch } from 'primereact/inputswitch';

import classNames from 'classnames';
import { Toolbar } from 'primereact/toolbar';
import { BreadCrumb } from 'primereact/breadcrumb';


import {getModel as getGraphModelizer, resetModelStore as resetGraphModelizerStore} from '../../redux/actions/graph-modelizer.actions';
import * as actionsGraphModelizer from "../../redux/actions/graph-modelizer.actions";
import * as modelActions from "../../redux/actions/model.actions";
import * as rolNavigationActions from "../../redux/actions/rol-navigation.actions";

import {RolNavState} from '../constants/rol-nav-states';

import { setModelState as setModelStore} from "../../redux/actions/model.actions"



const ModelsConsole = () => {
    const dispatch = useDispatch();


    // BASIC DATA
    const history = useHistory();
    const menu = useRef(null);
    const dt = useRef(null);
    const wizardItems = [
        {id: 0, label: 'Stage I', icon: 'pi pi-th-large'},
        {id: 1, label: 'Stage II', icon: 'pi pi-users'},
        {id: 2, label: 'Stage III', icon: 'pi pi-eye'},
        {id: 3, label: 'Stage IV', icon: 'pi pi-eye'},
    ];
    const user = useSelector((state) => state.LoginState.data);

    const teamId = user?.team?.id.toString();
    try {
        // Assigning the id of the user to the store. Need it when sending the model to neo4j service
        graphModelizerActions.setTeamId(teamId);
    } catch (e) {
        console.log(e);
        // Need to manage state of error.
    }

    const [ setTabSelected] = useState(wizardItems[0]);


        // Resetting store because it can contains info of a model previously visited.
    resetGraphModelizerStore()

    // MODULES LOGIC STATES
    const [itemToDelete, setItemToDelete] = useState(null); // For deleting model
    const [modelsList, setModelsList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modelsName, setModelsName] = useState('');
    const [modelsDescription, setModelsDescription] = useState('');
    const [selectedTeams, setSelectedTeams] = useState(null);
    const [globalFilter, setGlobalFilter] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [switchValue, setSwitchValue] = useState(true);
    const [teamDialog, setTeamDialog] = useState(false);
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);
    const [deleteTeamDialog, setDeleteTeamDialog] = useState(false);
    const [setDeleteTeamsDialog] = useState(false);
    const [teams, setTeams] = useState(null);
    const [autoFilteredValue, setAutoFilteredValue] = useState([]);
    const [autoValue] = useState(null);

    const emptyModel = {
        id: null,
        name: '',
        logo: '',
        description: '',
        plan_id: null,
        status: true,
    }
    const [model, setModel] = useState(emptyModel);

    // UI STATES, VARIABLE AND FUNCTIONS
    // const [layout, setLayout] = useState('list');   // uncomment if grid layout is need it
    const [setSortOrder] = useState(null);
    const [ setSortField] = useState(null);
    const [ setSortKey] = useState(null);

    // for displaying messages of error or success
    const message = useRef();
    const message2 = useRef();

    const toast = useRef(null);
    const [ setDisplayConfirmation] = useState(false);
    const [ setDisplayBasic] = useState(false);
    // I work with two states for displaying which input is missing
    const addInfoMessageName = () => {
        message?.current?.show({severity: 'error', content: 'Required.'});
    };
    const addInfoMessageDesc = () => {
        message2?.current?.show({severity: 'error', content: 'Required.'});
    };

    useEffect(() => {
        dispatch(rolNavigationActions.setRolNavigation(RolNavState.creator))
    })



    const openNew = () => {
        dispatch(setModelStore({}));
        actionsGraphModelizer.resetModelStore();
        history.push("/admin/model-designer");
    }

    const overlayMenuItems = [
        {
            label: 'Stage 1',
            icon: 'pi pi-th-large'
        },
        {
            label: 'Stage 2',
            icon: 'pi pi-th-large'
        },
        {
            label: 'Stage 3',
            icon: 'pi pi-th-large'
        },
        {
            label: 'Stage 4',
            icon: 'pi pi-th-large'
        },
        {
            separator: true
        }
    ];
    const toggleMenu = (event) => {
        menu.current.toggle(event);
    };
    const megamenuItems = [
        {
            label: 'Fashion', icon: 'pi pi-fw pi-tag',
            items: [
                [
                    {
                        label: 'Woman',
                        items: [{ label: 'Woman Item' }, { label: 'Woman Item' }, { label: 'Woman Item' }]
                    },
                    {
                        label: 'Men',
                        items: [{ label: 'Men Item' }, { label: 'Men Item' }, { label: 'Men Item' }]
                    }
                ],
                [
                    {
                        label: 'Kids',
                        items: [{ label: 'Kids Item' }, { label: 'Kids Item' }]
                    },
                    {
                        label: 'Luggage',
                        items: [{ label: 'Luggage Item' }, { label: 'Luggage Item' }, { label: 'Luggage Item' }]
                    }
                ]
            ]
        },
        {
            label: 'Electronics', icon: 'pi pi-fw pi-desktop',
            items: [
                [
                    {
                        label: 'Computer',
                        items: [{ label: 'Computer Item' }, { label: 'Computer Item' }]
                    },
                    {
                        label: 'Camcorder',
                        items: [{ label: 'Camcorder Item' }, { label: 'Camcorder Item' }, { label: 'Camcorder Item' },]
                    },
                ],
                [
                    {
                        label: 'TV',
                        items: [{ label: 'TV Item' }, { label: 'TV Item' }]
                    },
                    {
                        label: 'Audio',
                        items: [{ label: 'Audio Item' }, { label: 'Audio Item' }, { label: 'Audio Item' }]
                    }
                ],
                [
                    {
                        label: 'Sports.7',
                        items: [{ label: 'Sports.7.1' }, { label: 'Sports.7.2' }]
                    }
                ]
            ]
        },
        {
            label: 'Furniture', icon: 'pi pi-fw pi-image',
            items: [
                [
                    {
                        label: 'Living Room',
                        items: [{ label: 'Living Room Item' }, { label: 'Living Room Item' },]
                    },
                    {
                        label: 'Kitchen',
                        items: [{ label: 'Kitchen Item' }, { label: 'Kitchen Item' }, { label: 'Kitchen Item' }]
                    }
                ],
                [
                    {
                        label: 'Bedroom',
                        items: [{ label: 'Bedroom Item' }, { label: 'Bedroom Item' }]
                    },
                    {
                        label: 'Outdoor',
                        items: [{ label: 'Outdoor Item' }, { label: 'Outdoor Item' }, { label: 'Outdoor Item' }]
                    }
                ]
            ]
        },
        {
            label: 'Sports', icon: 'pi pi-fw pi-star-o',
            items: [
                [
                    {
                        label: 'Basketball',
                        items: [{ label: 'Basketball Item' }, { label: 'Basketball Item' }]
                    },
                    {
                        label: 'Football',
                        items: [{ label: 'Football Item' }, { label: 'Football Item' }, { label: 'Football Item' }]
                    }
                ],
                [
                    {
                        label: 'Tennis',
                        items: [{ label: 'Tennis Item' }, { label: 'Tennis Item' }]
                    }
                ]
            ]
        }
    ];

    // For getting the list of models by user
    const loadModels = async () => {
        try {
            setModelsList(await graphModelizerActions.getModelsListByUser(user?.team?.id,user.access_token));
        } catch (err) {
            // Need to manage state of error.
            console.log(err);
        }
    }
    useEffect(() => {
        setIsLoading(true);
        loadModels().then(() => {
            setIsLoading(false);
        });
    }, []);
    // For getting the one model which the user choose to work with
    const loadModel = useCallback(async (modelId, teamId) => {
        try {
            await getGraphModelizer(modelId, user?.team?.id, user.access_token);
            return true;
        } catch (err) {
            // Need to manage state of error.
            console.log(err);
            return false;
        }
    }, []);

    const confirmDeleteSelected = () => {
        setDeleteTeamsDialog(true);
    }

    // Before going to the next route, i need to have the model in the store. This is why the model is fetched in
    // this point. If it fails it doesn't render the next page, avoiding several null references errors.
    const onEditModel = async (s) => {
        const modelId = s.target.id ? s.target.id : s.target.parentElement.id; // Getting the selected model to edit
        setIsLoading(true)
        loadModel(modelId, teamId).then((result) => {
            if (result) {
                history.push({pathname: '/admin/graph-modelizer', state: {modelId: modelId, userId: teamId,token:user.access_token}})
            } else {
                setIsLoading(false)
                console.log("Error retrieving model.")
            }
        });
    }
    // Execute a chain of two events. The first to delete from micro service 1, and if state is correct for
    // deleting from neo4j microservice
    const onDeleteModel = async () => {
        setIsLoading(true)
        await graphModelizerActions.deleteModel(itemToDelete, teamId, user.access_token);
        setIsLoading(false)
        setModelsList([...modelsList.filter(m => m.id !== itemToDelete)]);
        loadModels()
    }

    const onConfirmationForDeletion = (s) => {
        const modelId = s.target.id ? s.target.id : s.target.parentElement.id;
        setDisplayConfirmation(true)
        setItemToDelete(modelId)
    }


    const onConfirmationCreation = async () => {
        // Basic input validation TODO improve validation
        if (modelsName === ''){
            addInfoMessageName()
            return
        }
        if (modelsDescription === ''){
            addInfoMessageDesc()
            return
        }

        const status = await graphModelizerActions.instantiateModel(modelsName, modelsDescription, teamId,user.access_token);
        if(status === 200)
            loadModels();

        setDisplayBasic(false)
        setModelsName("");
        setModelsDescription("");
    }
    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ openNew } />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2" onClick={ confirmDeleteSelected } disabled={!selectedTeams || !selectedTeams.length} />

                <>
                <Menu ref={menu} model={overlayMenuItems} popup />
                    <Button type="button" label="Stages" icon="pi pi-angle-down" onClick={toggleMenu} className="p-button-secondary p-mr-2 p-mb-2" style={{marginLeft:"8px"}}/>                
                </>
            </>
        )
    }

    const dataviewListItem = (data) => {
        return (
            <div className="p-col-12">
                 
                <div className="product-list-item">
                    <img src={`https://gardensonquail.com/wp-content/uploads/2020/12/Image-Coming-Soon-400x400-1.jpg`}
                         alt={data.name}/>
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                    </div>
                    <div className="product-list-action">
                        <Button id={data.id} value={"asdklfjlsdkafj "} className="p-button-warning p-button-rounded"
                                icon="pi pi-pencil" onClick={onEditModel}/>
                        <Button id={data.id} className="p-button-danger p-button-rounded" icon="pi pi-trash"
                                onClick={onConfirmationForDeletion}/>
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-content">
                        <img
                            src={`https://gardensonquail.com/wp-content/uploads/2020/12/Image-Coming-Soon-400x400-1.jpg`}
                            alt={data.name}/>
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                    </div>
                    <div className="product-grid-item-bottom">
                        <Button className="p-button-warning p-button-rounded" icon="pi pi-pencil"
                                onClick={onEditModel}/>
                        <Button className="p-button-danger p-button-rounded" icon="pi pi-trash"
                                disabled={!data?.status}/>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }
        if (layout === 'list') {
            return dataviewListItem(data);
        } else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    const onSortChange = (event) => {
        const value = event.value;
        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={ exportCSV } />
            </>
        )
    }


    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Models</h5>
            <i>{ (selectedTeams && selectedTeams.length > 0) && `Selected (${selectedTeams.length})` }</i>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );



    const logoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`https://gardensonquail.com/wp-content/uploads/2020/12/Image-Coming-Soon-400x400-1.jpg`} alt={ `_blank` } className="product-image" />
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {

        const valueStatus = (status) => (
            (status === 1) ? 'Active':'Inactive'
        );

        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${(rowData.status === 1) ? 'instock' : 'outofstock'}`}>{ valueStatus(rowData.status) }</span>
            </>
        );
    }

    const descriptionMethodBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.description}
            </>
        );
    }

    const loadGraphModel = useCallback(async (modelId) => {
        try {
            await getGraphModelizer(modelId, user?.team?.id, user.access_token);
            return true;
        } catch (err) {
            // Need to manage state of error.
            console.log(err);
            return false;
        }
    }, []);

    const editModel = ( m ) => {
        const _model = {
            name: m.name,
            description: m.description,
            long_description: m.long_description,
            user_id: m.user_id,
            price: m.price,
            image: m.image,
            category_id: m.category_id,
            team_id: m.team_id,
            hashtag: m.hashtag,
            id: m.id,
            thumbnail: m.thumbnail,
            status: m.status,
            code: m.code,
            created_at: m.created_at,
            updated_at: m.updated_at
        }

        setIsLoading(true)

        loadGraphModel(m.id).then((result) => {
            if (result) {
                dispatch(setModelStore(_model));
                history.push({pathname: '/admin/model-designer', state: {status: 'edit'}})
            } else {
                setIsLoading(false)
                console.log("Error retrieving model.")
            }
        });
    }

    const confirmDeleteModel = ( r ) => {
        setModel(r);
        setDeleteTeamDialog(true);
    }


    const hideDialog = () => {
        setSubmitted(false);
        setTeamDialog(false);
    }

    const hideDeleteTeamDialog = () => {
        setDeleteTeamDialog(false);
    }

    const hideDeleteTeamsDialog = () => {
        setDeleteTeamsDialog(false);
    }

    
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const deleteSelectedTeams = () => {
        let _teams = teams.filter(val => !selectedTeams.includes(val));
        setTeams(_teams);
        setDeleteTeamsDialog(false);
        setSelectedTeams(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Teams Deleted', life: 3000 });
    }

    const saveTeam = () => {
        setSubmitted(true);


        if (model.name.trim()) {

            let _teams = [...teams];
            let _team = { ...model };

            if (model.id) {
                const index = findIndexById(model.id);

                _teams[index] = _team;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Team Updated', life: 3000 });
            }
            else {
                _team.id = createId();
                _teams.push(_team);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Team Created', life: 3000 });
            }

            setTeams(_teams);
            setTeamDialog(false);
            setModel(emptyModel);
        }
    }
    const deleteModel = async () => {
        const status = await dispatch(
            modelActions.deleteModel(model.id, user.access_token)
          );

        if(status !== 200){
            toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Model not Deleted!', life: 3000 });
            return;
        }

        let _models = modelsList.filter(val => val.id !== model.id);
        setModelsList(_models);
        setDeleteTeamDialog(false);
        setModel(emptyModel);
        toast?.current?.show({ severity: 'success', summary: 'Successful', detail: 'Model Deleted!', life: 3000 });
    }

    const teamDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ hideDialog } />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ saveTeam } />
        </>
    );

    const deleteModelDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteTeamDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteModel } />
        </>
    );


    // const deleteTeamsDialogFooter = (
    //     <>
    //         <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteTeamsDialog } />
    //         <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteSelectedTeams } />
    //     </>
    // );

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => editModel(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteModel(rowData)} />
            </div>
        );
    }

    const phaseBodyTemplate = (rowData) =>{
        return (
            <div className="actions">
                <Button icon="pi pi-check" className="p-button-rounded p-button-success p-mr-1 p-mb-2" tooltip="Fase 1"/>
                <Button icon="pi pi-check" className="p-button-rounded p-button-success p-mr-2 p-mb-2" tooltip="Fase 2"/>
                <Button icon="pi pi-check" className="p-button-rounded p-button-success p-mr-2 p-mb-2" tooltip="Fase 3"/>
                <Button icon="pi pi-times" className="p-button-rounded p-button-warning p-mr-2 p-mb-2" tooltip="Fase 3"/>
            </div>
        )
    }
    const onInputChange = (e, name) => {
        
        const val = (e.target && e.target.value) || '';
        let _team = { ...model };
        _team[`${name}`] = val;

        setModel(_team);
    }
    
    const searchCountry = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValue([...autoValue]);
            }
            else {
                setAutoFilteredValue(autoValue.filter((country) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                }));
            }
        }, 100);
    };

    const onUpload = () => {
        toast?.current?.show({ severity: 'info', summary: 'Success', detail: 'Logo Uploaded', life: 3000 });
        console.log('Logo Uploaded');
    }
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'MIT' },
        { label: 'Mis modelos' },

    ];

    const img_field = (img) => {
        if (img) {
            const image = new Image();
            image.src = img;
            
            return (
                <>
                    <div class="p-fileupload-files">
                        <div class="p-fileupload-row">
                            <div>
                                <img alt="gato-leon.jpg" role="presentation" src={ img } width="50" />
                            </div>
                            <div>{ img.split('/').pop() }</div>
                            <div>{ `${image.width} x ${image.height}` }</div>
                            <div>
                                <button type="button" class="p-button p-component p-button-icon-only">
                                    <span class="p-button-icon p-c pi pi-times"></span>
                                    <span class="p-button-label p-c">&nbsp;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
    // For when is fetching data
    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    const nestedMenuitems = [
        {
            label: 'Modelos',
            icon: 'pi pi-fw pi-table',
            items: [
                {
                    label: 'Nuevo',
                    icon: 'pi pi-fw pi-user-plus',
                    items: [
                        {
                            label: 'MIT',
                            icon: 'pi pi-fw pi-plus',
                            to: '/admin/model-designer'
                        },
                        {
                            label: 'Duplicate',
                            icon: 'pi pi-fw pi-copy'
                        },

                    ]
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit'
                }
            ]
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search'
                },

            ]
        },
        {
            label: 'Shipments',
            icon: 'pi pi-fw pi-envelope',
            items: [
                {
                    label: 'Tracker',
                    icon: 'pi pi-fw pi-compass'

                },
                {
                    label: 'Map',
                    icon: 'pi pi-fw pi-map-marker'

                },
                {
                    label: 'Manage',
                    icon: 'pi pi-fw pi-pencil'
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file'
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out'
        }
    ];
    // const menubarEndTemplate = () => {
    //     return (
    //         <span className="p-input-icon-left">
    //             <i className="pi pi-search" />
    //             <InputText type="text" placeholder="Search" />
    //         </span>
    //     );
    // };

    return (
        <>
            <Toast ref={toast}/>
            


            <>

            <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card card-w-title">
                 
                    <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
                </div>
            </div>
                <div className="p-col-12">
                    <div className="card">
                        <Toast ref={ toast } />
                        <Toolbar className="p-mb-4 p-toolbar" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar>
                       
                        {/*<Menubar model={nestedMenuitems} end={menubarEndTemplate}></Menubar>*/}

                        <DataTable ref={ dt } value={ modelsList } selection={ selectedTeams } onSelectionChange={(e) => setSelectedTeams(e.value)}
                            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            globalFilter={ globalFilter } emptyMessage="No models found." header={ header }>

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column style={{ width: '130px' }} field="logo" header="Logo" sortable body={ logoBodyTemplate }></Column>
                            {/*<Column style={{ width: '110px' }} field="id" header="ID" sortable body={ idBodyTemplate }></Column>*/}
                            <Column field="name" header="Name" sortable body= { nameBodyTemplate }></Column>
                            
                            <Column field="description" header="Description" sortable body= { descriptionMethodBodyTemplate }></Column>

                            <Column field="status" header="Status" sortable body= { statusBodyTemplate }></Column>
                            
                            <Column header="Stages" body={ phaseBodyTemplate }></Column>
                            <Column header="Actions" body={ actionBodyTemplate }></Column>

                        </DataTable>

                        <Dialog visible={ teamDialog } style={{ width: '450px' }} header="Team Details" modal className="p-fluid" footer={ teamDialogFooter } onHide={ hideDialog } >

                            <div className="p-field" style={{ textAlign: 'center' }}>
                                <label htmlFor="logo">Logo</label>
                                <FileUpload emptyTemplate={ img_field(model?.logo) } name="demo[]" url="./upload.php" onUpload={ onUpload } accept="image/*" maxFileSize={1000000} required autoFocus className={ classNames({ 'p-invalid': submitted && !model?.logo }) } />
                                { submitted && !model?.logo && <small className="p-invalid">Logo is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" value={ model?.name } onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !model?.name })} />
                                { submitted && !model?.name && <small className="p-invalid">Name is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="description">Description</label>
                                <InputText id="description" value={ model?.description } onChange={(e) => onInputChange(e, 'description')} required  className={classNames({ 'p-invalid': submitted && !model?.description })} />
                                { submitted && !model?.description && <small className="p-invalid">Description is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="plan_id">Plan</label>
                                <AutoComplete placeholder="Search Plan" id="plan_id" dropdown value={ selectedAutoValue } onChange={(e) => setSelectedAutoValue(e.value)} suggestions={ autoFilteredValue } completeMethod={ searchCountry } field="name" className={classNames({ 'p-invalid': submitted && !model?.plan_id })} />
                                { submitted && !model?.name && <small className="p-invalid">Rol is required.</small> }
                            </div>

                            <div className="p-field" >
                                <label htmlFor="name" className="p-d-block">Status</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputSwitch id='status' className="p-mr-2" checked={ switchValue } onChange={(e) => setSwitchValue(e.value)} />
                                    <i>{ (switchValue) ? 'Active':'Inactive' }</i>
                                </div>
                            </div> 

                        </Dialog>

                        <Dialog visible={ deleteTeamDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deleteModelDialogFooter } onHide={ hideDeleteTeamDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                {model && <span>Are you sure you want to delete <b>{ model?.name }</b>?</span>}
                            </div>
                        </Dialog>

                        {/* <Dialog visible={ deleteTeamsDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deleteTeamsDialogFooter } onHide={ hideDeleteTeamsDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                { model && <span>Are you sure you want to delete the selected teams?</span> }
                            </div>
                        </Dialog> */}
                        
                    </div>
                </div>
            </div>
        </>

        </>

        
    )
}

export default ModelsConsole;
