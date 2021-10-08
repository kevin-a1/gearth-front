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
import { FileUpload } from 'primereact/fileupload';
import { findAllPaymentMethods } from '../../api/data';

const PaymentMethods = () => {

    const [paymentMethods, setPaymentMethods] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(emptyPaymentMethod);
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(null);
    const [paymentMethodDialog, setPaymentMethodDialog] = useState(false);
    const [deletePaymentMethodDialog, setDeletePaymentMethodDialog] = useState(false);
    const [deletePaymentMethodsDialog, setDeletePaymentMethodsDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [switchValue, setSwitchValue] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    const emptyPaymentMethod = {
        id: 0,
        name: '',
        logo: '',
        description: '',
        status: 1,
    }

    useEffect(() => {
        setPaymentMethods( findAllPaymentMethods() )
    }, []);

    const openNew = () => {
        setPaymentMethod(emptyPaymentMethod);
        setSubmitted(false);
        setPaymentMethodDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setPaymentMethodDialog(false);
    }

    const hideDeletePaymentMethodDialog = () => {
        setDeletePaymentMethodDialog(false);
    }

    const hideDeletePaymentMethodsDialog = () => {
        setDeletePaymentMethodsDialog(false);
    }

    const savePaymentMethod = () => {
        setSubmitted(true);

        if (paymentMethod.name.trim()) {

            let _paymentMethods = [...paymentMethods];
            let _paymentMethod = { ...paymentMethod };

            if (paymentMethod.id) {
                const index = findIndexById(paymentMethod.id);

                _paymentMethods[index] = _paymentMethod;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'PaymentMethod Updated', life: 3000 });
            }
            else {
                _paymentMethod.id = createId();
                _paymentMethods.push(_paymentMethod);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'PaymentMethod Created', life: 3000 });
            }

            setPaymentMethods(_paymentMethods);
            setPaymentMethodDialog(false);
            setPaymentMethod(emptyPaymentMethod);
        }
    }

    const editPaymentMethod = ( r ) => {
        setPaymentMethod({ ...r });
        setPaymentMethodDialog(true);
    }

    const confirmDeletePaymentMethod = ( r ) => {
        setPaymentMethod(r);
        setDeletePaymentMethodDialog(true);
    }

    const deletePaymentMethod = () => {
        
        let _paymentMethods = paymentMethods.filter(val => val.id !== paymentMethod.id);
        setPaymentMethods(_paymentMethods);
        setDeletePaymentMethodDialog(false);
        setPaymentMethod(emptyPaymentMethod);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'PaymentMethod Deleted', life: 3000 });
    }

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'Logo Uploaded', life: 3000 });
        console.log('Logo Uploaded');
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < paymentMethods.length; i++) {
            if (paymentMethods[i].id === id) {
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

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeletePaymentMethodsDialog(true);
    }

    const deleteSelectedPaymentMethods = () => {

        let _paymentMethods = paymentMethods.filter(val => !selectedPaymentMethods.includes(val));
        setPaymentMethods(_paymentMethods);
        setDeletePaymentMethodsDialog(false);
        setSelectedPaymentMethods(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'PaymentMethods Deleted', life: 3000 });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _paymentMethod = { ...paymentMethod };
        _paymentMethod[`${name}`] = val;

        setPaymentMethod(_paymentMethod);
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2 p-mb-2" onClick={ openNew } />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mb-2" onClick={ confirmDeleteSelected } disabled={!selectedPaymentMethods || !selectedPaymentMethods.length} />
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

    const descBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Description</span>
                {rowData.description}
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => editPaymentMethod(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeletePaymentMethod(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage PaymentMethods</h5>
            <i>{ (selectedPaymentMethods && selectedPaymentMethods.length > 0) && `Selected (${selectedPaymentMethods.length})` }</i>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const paymentMethodDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ hideDialog } />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ savePaymentMethod } />
        </>
    );

    const deletePaymentMethodDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeletePaymentMethodDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deletePaymentMethod } />
        </>
    );

    const deletePaymentMethodsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ hideDeletePaymentMethodsDialog } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ deleteSelectedPaymentMethods } />
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

                        <DataTable ref={ dt } value={ paymentMethods } selection={ selectedPaymentMethods } onSelectionChange={(e) => setSelectedPaymentMethods(e.value)}
                            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            globalFilter={ globalFilter } emptyMessage="No Payment Methods found." header={ header }>

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column style={{ width: '110px' }} field="id" header="ID" sortable body={ idBodyTemplate }></Column>
                            <Column field="name" header="Name" sortable body= { nameBodyTemplate }></Column>
                            <Column style={{ width: '175px' }} field="logo" header="Logo" sortable body={ logoBodyTemplate }></Column>
                            <Column field="description" header="Description" sortable body= { descBodyTemplate }></Column>
                            <Column field="status" header="Status" sortable body= { statusBodyTemplate }></Column>
                            <Column header="Actions" body={ actionBodyTemplate }></Column>

                        </DataTable>

                        <Dialog visible={ paymentMethodDialog } style={{ width: '450px' }} header="Payment Method Details" modal className="p-fluid" footer={ paymentMethodDialogFooter } onHide={ hideDialog } >

                            <div className="p-field" style={{ textAlign: 'center' }}>
                                <label htmlFor="logo">Logo</label>
                                <FileUpload emptyTemplate={ img_field(paymentMethod?.logo) } name="demo[]" url="./upload.php" onUpload={ onUpload } accept="image/*" maxFileSize={1000000} required className={ classNames({ 'p-invalid': submitted && !paymentMethod?.logo }) } />
                                { submitted && !paymentMethod?.logo && <small className="p-invalid">Logo is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" value={ paymentMethod?.name } onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !paymentMethod?.name })} />
                                { submitted && !paymentMethod?.name && <small className="p-invalid">Name is required.</small> }
                            </div>

                            <div className="p-field">
                                <label htmlFor="description">Description</label>
                                <InputText id="description" value={ paymentMethod?.description } onChange={(e) => onInputChange(e, 'description')} required className={classNames({ 'p-invalid': submitted && !paymentMethod?.description })} />
                                { submitted && !paymentMethod?.description && <small className="p-invalid">Description is required.</small> }
                            </div>

                            <div className="p-field" >
                                <label htmlFor="description" className="p-d-block">Status</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputSwitch id='description' className="p-mr-2" checked={ switchValue } onChange={(e) => setSwitchValue(e.value)} />
                                    <i>{ (switchValue) ? 'Active':'Inactive' }</i>
                                </div>
                            </div> 

                        </Dialog>

                        <Dialog visible={ deletePaymentMethodDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deletePaymentMethodDialogFooter } onHide={ hideDeletePaymentMethodDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                {paymentMethod && <span>Are you sure you want to delete <b>{paymentMethod?.name}</b>?</span>}
                            </div>
                        </Dialog>

                        <Dialog visible={ deletePaymentMethodsDialog } style={{ width: '350px' }} header="Confirm" modal footer={ deletePaymentMethodsDialogFooter } onHide={ hideDeletePaymentMethodsDialog }>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                { paymentMethod && <span>Are you sure you want to delete the selected Payment Methods?</span> }
                            </div>
                        </Dialog>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

PaymentMethods.propTypes = {

}

export default PaymentMethods
