import React from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";

const CreateChannel = props => {



    return (
            <div className="p-col-12">
                <div className="card">
                    <h3>Social Network Console</h3>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="name">Channel's name</label>
                            <InputText id="name" name={"name"} type="text" value={''} onChange={() => {}}/>
                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="long_description">Channel's description</label>
                            <InputTextarea id="description" name="description" value={''} onChange={ ()=>{} }  rows={8} autoResize placeholder="Máximo 300 palabras ..." autoCapitalize="on" required />
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default CreateChannel;
