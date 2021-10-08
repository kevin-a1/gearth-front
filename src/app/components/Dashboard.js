import React from 'react';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';
import { Link } from 'react-router-dom';


const chart1 = {
    labels: ['8Sun', '9Mon', '10Thu', '11Wed', '12Fri', '13Sat', '14Sun'],
    datasets: [
        {
            label: 'Revenue',
            data: [12, 19, 3, 5, 2, 3, 9],
            borderColor: [
                '#FFA928',
            ],
            borderWidth: 4,
            fill: true,
            backgroundColor: [
                'rgba(255, 169, 40, .2)'
            ],
        }
    ]
}
const chartOptions1 = {
    legend: {
        display: false,
    },
    maintainAspectRatio: false,
    hover: {
        mode: 'index'
    },
    scales: {
        xAxes: [{
            display: false,
        }],
        yAxes: [{
            display: false,
        }]
    }
}


const chartOptions2 = {
    legend: {
        display: false,
    },
    maintainAspectRatio: false,
    hover: {
        mode: 'index'
    },
    scales: {
        xAxes: [{
            display: true,
            gridLines: {
                color: 'transparent',
            },
            ticks: {
                fontColor: '#BFC2C6'
            }
        }],
        yAxes: [{
            display: true,
            gridLines: {
                color: 'rgba(191, 194, 198, .45)',
                borderDash: [5, 10],
            },
            ticks: {
                fontColor: '#BFC2C6',
                min: 0,
                stepSize: 5,
            }
        }]
    }
}

const getChart = () => {
    const borderColor = getComputedStyle(document.body).getPropertyValue('--primary-color') || '#2c84d8';
    const backgroundColor = getComputedStyle(document.body).getPropertyValue('--primary-lighter-color') || '#2c84d8';
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Revenue',
                data: [12, 19, 3, 5, 2, 3, 9],
                borderColor: [borderColor],
                borderWidth: 4,
                fill: true,
                backgroundColor: [backgroundColor],
            }
        ]
    }
}

const chart2 = getChart()


export const Dashboard = () => {

    return (
        <div className="layout-dashboard">
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="notification">
                        <h6>👋  Hola! Bienvenido a GEArth! Antes de iniciar, por favor, complete su perfil, así lo podremos conocer mejor.<Link to={'/profile'} className="p-link">Ir al Perfil <i className="pi pi-arrow-up"></i></Link></h6>
                    </div>
                </div>
                <div className="p-col-12  desktop-teams">
                            <div className="card team">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h6>Equipo de GEArth</h6>
                                        <p className="subtitle">22 personas</p>
                                    </div>
                                </div>
                                <div className="peoples">
                                    <img src="assets/demo/images/dashboard/avatar/avatar-1.png" alt="freya-layout" />
                                    <img src="assets/demo/images/dashboard/avatar/avatar-2.png" alt="freya-layout" />
                                    <img src="assets/demo/images/dashboard/avatar/avatar-3.png" alt="freya-layout" />
                                    <img src="assets/demo/images/dashboard/avatar/avatar-4.png" alt="freya-layout" />
                                    <img src="assets/demo/images/dashboard/avatar/avatar-5.png" alt="freya-layout" />
                                    <img src="assets/demo/images/dashboard/avatar/avatar-6.png" alt="freya-layout" />
                                    <div className="no-picture" style={{ background: '#BAE6FF' }}><span>AT</span></div>
                                    <img src="assets/demo/images/dashboard/avatar/avatar-7.png" alt="freya-layout" />
                                    <img src="assets/demo/images/dashboard/avatar/avatar-7.png" alt="freya-layout" />
                                    <div className="no-picture "><span>+18</span></div>
                                </div>
                            </div>
                        </div>

                <div className="p-col-12">
                    <div className="p-grid" style={{ margin: '-1rem' }}>
                        <div className="p-col">
                            <div className="card overview-box white">
                                <div className="overview-info">
                                    <h6>Mis Modelos</h6>
                                    <h1>4</h1>
                                </div>
                                <i className="pi pi-image"></i>
                            </div>
                        </div>
                        <div className="p-col">
                            <div className="card overview-box blue">
                                <div className="overview-info">
                                    <h6>Mi Equipo (GEArth)</h6>
                                    <h1>20</h1>
                                </div>
                                <i className="pi pi-users"></i>
                            </div>
                        </div>
                        <div className="p-col">
                            <div className="card overview-box gray">
                                <div className="overview-info">
                                    <h6>Tiempo en plataforma</h6>
                                    <h1>5h12m</h1>
                                </div>
                                <i className="pi pi-globe"></i>
                            </div>
                        </div>
                        <div className="p-col">
                            <div className="card overview-box darkgray">
                                <div className="overview-info">
                                    <h6>Datos levantados</h6>
                                    <h1>96%</h1>
                                </div>
                                <i className="pi pi-th-large"></i>
                            </div>
                        </div>
                        <div className="p-col">
                            <div className="card overview-box orange">
                                <div className="overview-info">
                                    <h6>Actividades completadas</h6>
                                    <h1>4216</h1>
                                </div>
                                <i className="pi pi-cloud"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="card timeline">
                        <div className="card-header">
                            <div className="card-title">
                                <h6>Actividad reciente</h6>
                                <p className="subtitle">Actualizado al 21/09/2021</p>
                            </div>
                        </div>
                        <ul>
                            <li className="blue">
                                <i className="pi pi-circle-on"></i>
                                <div className="event-content">
                                    <span className="event-title">Nueva Actividad</span>
                                    <span>Pedro Zeas ha creado una nueva actividad</span>
                                    <span className="time">Hace 3 mins</span>
                                </div>
                            </li>
                            <li className="blue">
                                <i className="pi pi-circle-on"></i>
                                <div className="event-content">
                                    <span className="event-title">Log</span>
                                    <span>Correo enviado a admin@gearth.science</span>
                                    <span className="time">Hace 12 mins</span>
                                </div>
                            </li>
                            <li className="green">
                                <i className="pi pi-circle-on"></i>
                                <div className="event-content">
                                    <span className="event-title">Nuevo MIT</span>
                                    <span>Reached 80% CPU capacity in Ireland. Automatic
                                            capacity increase initiated.</span>
                                    <span className="time">1:30PM</span>
                                </div>
                            </li>
                            <li className="orange">
                                <i className="pi pi-circle-on"></i>
                                <div className="event-content">
                                    <span className="event-title">Capacity</span>
                                    <span>Reached 60% CPU capacity in Ireland.</span>
                                    <span className="time">9:40AM</span>
                                </div>
                            </li>
                            <li className="blue">
                                <i className="pi pi-circle-on"></i>
                                <div className="event-content">
                                    <span className="event-title">Billing</span>
                                    <span>Upgraded plan, 10users yearly to 20users yearly</span>
                                    <span className="time">7:42AM</span>
                                </div>
                            </li>
                            <li className="blue">
                                <i className="pi pi-circle-on"></i>
                                <div className="event-content">
                                    <span className="event-title">New Sale</span>
                                    <span>Richard Jones has purchased a blue t-shirt for $79.</span>
                                    <span className="time">3 mins ago</span>
                                </div>
                            </li>
                        </ul>
                        <button className="p-link">See all</button>
                    </div>
                </div>


                <div className="p-col-12 p-md-6">
                    <div className="p-grid">
                        <div className="p-col-12">
                            <div className="card device-status">
                                <div className="p-grid">
                                    <div className="p-col-12 p-xl-9">
                                        <div className="card-header">
                                            <div className="card-title">
                                                <h6>Uso de dispositivos en la plataforma </h6>
                                                <p className="subtitle">Mis estadísticas</p>
                                            </div>
                                        </div>
                                        <p className="content">A continuación, podrá encontrar informacicón referente al tipo de dispositivo utilizado en los MIT..</p>
                                        <div className="progress active">
                                            <span>Hoy</span>
                                            <ProgressBar className="progressBar" value={100} showValue={false}></ProgressBar>
                                            <span>21</span>
                                        </div>
                                        <div className="progress">
                                            <span>Ayer</span>
                                            <ProgressBar className="progressBar" value={50} showValue={false}></ProgressBar>
                                            <span>11</span>
                                        </div>
                                        <div className="progress">
                                            <span>Semana pasada</span>
                                            <ProgressBar className="progressBar" value={50} showValue={false}></ProgressBar>
                                            <span>120</span>
                                        </div>
                                        <div className="progress">
                                            <span>Hace un mes</span>
                                            <ProgressBar className="progressBar" value={100} showValue={false}></ProgressBar>
                                            <span>1316</span>
                                        </div>
                                        <button className="p-link">Más</button>
                                    </div>
                                    <div className="p-col-12 p-xl-3">
                                        <div className="card-header">
                                            <div className="card-title">
                                                <h6>Dispositivos</h6>
                                                <p className="subtitle">Type</p>
                                            </div>
                                        </div>
                                        <div className="p-grid p-nogutter">
                                            <div className="p-col-3 p-xl-12">
                                                <div className="device">
                                                    <span><span>1</span> iPhone</span>
                                                    <span className="status">22%</span>
                                                </div>
                                            </div>
                                            <div className="p-col-3 p-xl-12">
                                                <div className="device">
                                                    <span><span>2</span> Galaxy S20</span>
                                                    <span className="status">18%</span>
                                                </div>
                                            </div>
                                            <div className="p-col-3 p-xl-12">
                                                <div className="device">
                                                    <span><span>3</span> Macbook</span>
                                                    <span className="status">13%</span>
                                                </div>
                                            </div>
                                            <div className="p-col-3 p-xl-12">
                                                <div className="device">
                                                    <span><span>4</span> Macbook Air</span>
                                                    <span className="status">11%</span>
                                                </div>
                                            </div>
                                            <button className="p-link">Ver todo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div >
                </div >

                <div className="p-col-12 p-md-8 p-xl-3">
                    <div className="card operations">
                        <div className="card-header">
                            <div className="card-title">
                                <h6>Encuestas recogidas</h6>
                                
                            </div>
                            <p className="subtitle">20 Sept</p>
                        </div>
                        <Chart type="line" data={chart1} options={chartOptions1} style={{ maxHeight: ' 160px' }}></Chart>
                        <div className="insights">
                            <div className="insight-header">
                                <img src="assets/demo/images/dashboard/subtract.svg" alt="freya-layout" />
                                <h6>Estadísitcas</h6>
                            </div>
                            <ul>
                                <li>
                                    <span><span>1</span> Calidad del agua</span>
                                    <span className="p-tag p-tag-warning">12%</span>
                                </li>
                                <li>
                                    <span><span>2</span> 28% más este mes</span>
                                    <span className="p-tag p-tag-success">UP!</span>
                                </li>
                                <button className="p-link">Ver todo(4)</button>
                            </ul>

                        </div>
                        <Button type="button" label="Go to full stock page" className="p-button-outlined"></Button>
                    </div>
                </div >

                

                
                
            </div >
        </div >
    )

}
