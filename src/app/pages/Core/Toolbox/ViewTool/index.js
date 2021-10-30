import { Grid, Paper, Typography } from "@material-ui/core";

import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Tag } from "primereact/tag";
import { makeStyles } from "@material-ui/core/styles";

import { useState,useEffect } from "react";
import { useHistory } from "react-router";
import useQueryParams from "../../../../../hooks/useQueryParams";
import { useToolbox } from "../../../../../redux/hooks/useToolbox";
import yellow from "@material-ui/core/colors/yellow";





const ViewTool = () =>{
    const useStyles = makeStyles((theme) => ({
        root: {
          "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(32),
            height: theme.spacing(16)
          }
        },
        yellowPaper: {
          backgroundColor: "#293241"
        },
        customBorder: {
          border: `3px solid ${yellow[200]}`
        },
        customBorderRadius: {
          borderRadius: 25,
          color:"#dededf",
          backgroundColor: "#293241"
        }
      }));

    const{getCurrentTool,dataCurrent}=useToolbox()
    const { tool_id } = useQueryParams();
    const history = useHistory();

    useEffect(() => {
       
    
            getCurrentTool(tool_id);
        
        
    }, [tool_id])
    const clasificador =(m)=>{
        let arr=[];
        m?.map((d)=>{
          const { category } = d
          arr.push(category)
        })
        arr = arr.filter((item,index)=>{
          return arr.indexOf(item) === index;
        })
    
        return arr
      };


      const dataviewModelos = (data) =>{
        return (
          <div className=" cardif p-col-12" >
          <div className="product-list-item">
              <img src={data.image} alt={data.name} />
              <div className="product-list-detail">
                  <div className="product-name">{data.name}</div>
                  <div className="product-description">{data.desc_short}</div>
             
              </div>
          </div>
          </div>
        );
      };

      const itemTemplate = (data, layout) =>{
        if(!data){
          return;
    
        }
    
     
          return dataviewModelos(data);
    
      };

     
      const classes = useStyles();

    return(
<Grid style={{borderTop: '10px solid cyan', borderRadius: 50}}>
                    <div>
                        <div>
                          <Paper elevation={2} style={{width:'100%'}} className={classes.customBorderRadius}>
                          <div className="p-grid">
                        <div className="p-col-5 p-d-flex p-ai-center p-jc-center">
                        <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
                        <Typography style={{"color":"#dededf"}} variant="h2">Detalle de Herramienta</Typography>
                              <img src={dataCurrent?.image} alt={dataCurrent?.name}/>
                              <Typography  variant="h2" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px",textAlign:"center","color":"#dededf"}}>
                                {dataCurrent?.name} <Button label="Editar" onClick={()=>{history.push(`./tools?action=edit&tool_id=${tool_id}`);}}></Button>
                              </Typography>
                              <Tag className="p-mr-2" severity="info" value={dataCurrent?.keywords}></Tag>
                              <Typography style={{"color":"#dededf"}} variant="h5">Descripción:</Typography>

                              <Typography style={{"color":"#dededf"}} variant="subtitle1" dangerouslySetInnerHTML={{__html:dataCurrent?.description}}></Typography>
                            </div>
                        </div>
                        <div className="p-col-1">
                            <Divider layout="vertical">

                            </Divider>
                        </div>
                        <div className="p-col-5 p-ai-center p-jc-center">
                        <Typography style={{"color":"#dededf"}} variant="h5">Origenes y evolución:</Typography>

                        <Typography style={{"color":"#dededf"}} variant="body1" dangerouslySetInnerHTML={{__html:dataCurrent?.origins}}></Typography>


                            <Divider layout="horizontal" align="center">
                            
                            </Divider>

                            <Typography style={{"color":"#dededf"}} variant="h5">Teoría:</Typography>

<Typography style={{"color":"#dededf"}} variant="body1" dangerouslySetInnerHTML={{__html:dataCurrent?.theory}}></Typography>

                            <Divider align="right">
                            </Divider>

                            <Typography style={{"color":"#dededf"}} variant="h5">Método:</Typography>

<Typography style={{"color":"#dededf"}} variant="body1" dangerouslySetInnerHTML={{__html:dataCurrent?.method}}></Typography>
                            <Divider align="right">
                            </Divider>
                            <Typography style={{"color":"#dededf"}} variant="h5">Modo de empleo/usos:</Typography>

<Typography style={{"color":"#dededf"}} variant="body1" dangerouslySetInnerHTML={{__html:dataCurrent?.use}} ></Typography>

<Divider align="right">
                            </Divider>
                            <Typography style={{"color":"#dededf"}} variant="h5">Cambios/resultados:</Typography>

<Typography  style={{"color":"#dededf"}} variant="body1" dangerouslySetInnerHTML={{__html:dataCurrent?.changes}}></Typography>
                        </div>
                    </div>                             
                          </Paper>
                        </div>
                    </div>
                    <div className="list-demo">

                   
<div className="card" style={{marginTop:"10px"}}>
    <h2>Herramientas Complementarias</h2>
    {
      !!dataCurrent?.complementaries && clasificador(dataCurrent?.complementaries).map( d =>{
        let data = dataCurrent?.complementaries?.filter(x => x.category === d)
        return(
          <>
          
          <DataView  value={data}  paginator rows={6}  itemTemplate={itemTemplate} ></DataView>
          <br/>
          </>
        )
      })
    }
</div>



</div>
                </Grid>

    );
}

export default ViewTool;