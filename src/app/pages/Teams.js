import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { findAllPlans, findAllTeams, findPlanById } from '../../api/data';
import { FileUpload } from 'primereact/fileupload';
import { AutoComplete } from 'primereact/autocomplete';

const Teams = () => {
    
    const [switchValue, setSwitchValue] = useState(true);
    const [autoFilteredValue, setAutoFilteredValue] = useState([]);
    const [autoValue, setAutoValue] = useState(null);
    
    const [teams, setTeams] = useState(null);
    const [team, setTeam] = useState(emptyTeam);
    const [selectedTeams, setSelectedTeams] = useState(null);
    const [teamDialog, setTeamDialog] = useState(false);
    const [deleteTeamDialog, setDeleteTeamDialog] = useState(false);
    const [deleteTeamsDialog, setDeleteTeamsDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const emptyTeam = {
        id: null,
        name: '',
        logo: '',
        description: '',
        plan_id: null,
        status: true,
    }

    useEffect(() => {

        let data = []

        for (const p of findAllPlans()) {
            data.push({
                name: p.name,
                id: p.id,
            });
        }

        setTeams( findAllTeams() );
        setAutoValue( data );
    }, []);

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

    const openNew = () => {
        setTeam(emptyTeam);
        setSubmitted(false);
        setTeamDialog(true);
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

    const saveTeam = () => {
        setSubmitted(true);

        if (team.name.trim()) {

            let _teams = [...teams];
            let _team = { ...team };

            if (team.id) {
                const index = findIndexById(team.id);

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
            setTeam(emptyTeam);
        }
    }

    const editTeam = ( r ) => {
        setTeam({ ...r });
        setTeamDialog(true);
    }

    const confirmDeleteTeam = ( r ) => {
        setTeam(r);
        setDeleteTeamDialog(true);
    }

    const deleteTeam = () => {
        
        let _teams = teams.filter(val => val.id !== team.id);
        setTeams(_teams);
        setDeleteTeamDialog(false);
        setTeam(emptyTeam);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Team Deleted', life: 3000 });
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

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'Logo Uploaded', life: 3000 });
        console.log('Logo Uploaded');
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteTeamsDialog(true);
    }

    const deleteSelectedTeams = () => {

        let _teams = teams.filter(val => !selectedTeams.includes(val));
        setTeams(_teams);
        setDeleteTeamsDialog(false);
        setSelectedTeams(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Teams Deleted', life: 3000 });
    }

    const onInputChange = (e, name) => {
        
        const val = (e.target && e.target.value) || '';
        let _team = { ...team };
        _team[`${name}`] = val;

        setTeam(_team);
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ openNew } />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2" onClick={ confirmDeleteSelected } disabled={!selectedTeams || !selectedTeams.length} />
            </>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={ exportCSV } />
            </>
        )
    }
    
    //Body Columns **************************************************************************************************************************

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    }

    const logoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={ rowData.logo } alt={ `_blank` } className="product-image" />
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

    const planBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {findPlanById(rowData.plan_id).name}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => editTeam(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteTeam(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Teams</h5>
            <i>{ (selectedTeams && selectedTeams.length > 0) && `Selected (${selectedTeams.length})` }</i>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const teamDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ hideDialog } />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ saveTeam } />
        </>
    );

    const deleteTeamDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteTeamDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteTeam } />
        </>
    );

    const deleteTeamsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeleteTeamsDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteSelectedTeams } />
        </>
    );

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
 
    return (
        <>
            <div className="p-grid crud-demo">
                <div className="p-col-12">
                    <div className="card">
                        <Toast ref={ toast } />
                        <Toolbar className="p-mb-4 p-toolbar" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar>

                        <DataTable ref={ dt } value={ teams } selection={ selectedTeams } onSelectionChange={(e) => setSelectedTeams(e.value)}
                            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            globalFilter={ globalFilter } emptyMessage="No teams found." header={ header }>

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column style={{ width: '110px' }} field="id" header="ID" sortable body={ idBodyTemplate }></Column>
                            <Column field="name" header="Name" sortable body= { nameBodyTemplate }></Column>
                            <Column style={{ width: '130px' }} field="logo" header="Logo" sortable body={ logoBodyTemplate }></Column>
                            <Column field="description" header="Description" sortable body= { descriptionMethodBodyTemplate }></Column>
                            <Column field="plan_id" header="Plan" sortable body={ planBodyTemplate }></Column>
                            <Column field="status" header="Status" sortable body= { statusBodyTemplate }></Column>
                            <Column header="Actions" body={ actionBodyTemplate }></Column>

                        </DataTable>

                        <Dialog visible={ teamDialog } style={{ width: '450px' }} header="Team Details" modal className="p-fluid" footer={ teamDialogFooter } onHide={ hideDialog } >

                            <div className="p-field" style={{ textAlign: 'center' }}>
                                <label htmlFor="logo">Logo</label>
                                <FileUpload emptyTemplate={ img_field(team?.logo) } name="demo[]" url="./upload.php" onUpload={ onUpload } accept="image/*" maxFileSize={1000000} required autoFocus className={ classNames({ 'p-invalid': submitted && !team?.logo }) } />
                                { submitted && !team?.logo && <small className="p-invalid">Logo is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" value={ team?.name } onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !team?.name })} />
                                { submitted && !team?.name && <small className="p-invalid">Name is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="description">Description</label>
                                <InputText id="description" value={ team?.description } onChange={(e) => onInputChange(e, 'description')} required  className={classNames({ 'p-invalid': submitted && !team?.description })} />
                                { submitted && !team?.description && <small className="p-invalid">Description is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="plan_id">Plan</label>
                                <AutoComplete placeholder="Search Plan" id="plan_id" dropdown value={ selectedAutoValue } onChange={(e) => setSelectedAutoValue(e.value)} suggestions={ autoFilteredValue } completeMethod={ searchCountry } field="name" className={classNames({ 'p-invalid': submitted && !team?.plan_id })} />
                                { submitted && !team?.name && <small className="p-invalid">Rol is required.</small> }
                            </div>

                            <div className="p-field" >
                                <label htmlFor="name" className="p-d-block">Status</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputSwitch id='status' className="p-mr-2" checked={ switchValue } onChange={(e) => setSwitchValue(e.value)} />
                                    <i>{ (switchValue) ? 'Active':'Inactive' }</i>
                                </div>
                            </div> 

                        </Dialog>

                        <Dialog visible={ deleteTeamDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deleteTeamDialogFooter } onHide={ hideDeleteTeamDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                {team && <span>Are you sure you want to delete <b>{ team?.name }</b>?</span>}
                            </div>
                        </Dialog>

                        <Dialog visible={ deleteTeamsDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deleteTeamsDialogFooter } onHide={ hideDeleteTeamsDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                { team && <span>Are you sure you want to delete the selected teams?</span> }
                            </div>
                        </Dialog>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

Teams.propTypes = {

}

export default Teams;
