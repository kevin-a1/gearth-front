//Assets

const getImageURL = (name) => `https://andres-sapatanga-bucket.s3.amazonaws.com/img/${name}.png`;
const getImageURL2 = (name) => `https://gearth-app.s3.amazonaws.com/images/${name}.png`;

const img_names = [
    'angular',
    'asp.net',
    'bootstrap4',
    'c#',
    'cordova',
    'flask',
    'fluter',
    'go',
    'ionic',
    'java',
    'javascript',
    'kotlin',
    'laravel',
    'mongodb',
    'mysql',
    'node',
    'phone-gap',
    'php',
    'php-cuadrado',
    'python',
    'react',
    'react-native',
    'ruby',
    'spring-boot',
    'symphony',
    'vue',
    'xamarin'
];

//Data
export const APPUSERS = [
    {
        id: 1,
        photo: getImageURL('java'),
        name: 'Andrés',
        lname: 'Sapatanga',
        email: 'andr3s@gmail.com',
        gender: 'Male',
        status: 1,
        created_at: '14-08-2021 6:00',
        updated_at: '14-08-2021 6:00',
    },
    {
        id: 2,
        photo: getImageURL('java'),
        name: 'Kevin',
        lname: 'Llivichuzcha',
        email: 'kevin@gmail.com',
        gender: 'Male',
        status: 1,
        created_at: '14-08-2021 6:00',
        updated_at: '14-08-2021 6:00'
    },
    {
        id: 3,
        photo: getImageURL('java'),
        name: 'Lidia',
        lname: 'Contento',
        email: 'lidia@gmail.com',
        gender: 'Female',
        identification: '0150305183',
        status: 2,
        created_at: '14-08-2021 6:00',
        updated_at: '14-08-2021 6:00'
    },
]

export const CHANNELS = [
    {
        id: 1,
        modelId: 1,
        teamId: 1,
        name: 'Tiendas barriales',
        description: 'Esta es una descripción corta que detalla el hilo conductor del canal, por ejemplo para el caso dado sería algo como APORTE DE LA TIENDA DENTRO DE LA COMUNIDAD',
        created_at: '14-08-2021 6:00',
        updated_at: '14-08-2021 6:00'
    },
    {
        id: 2,
        modelId: 1,
        teamId: 1,
        name: 'Centros comerciales',
        description: 'Esta es una descripción corta que detalla el hilo conductor del canal, por ejemplo para el caso dado sería algo como APORTE DEL CENTRO COMERCIAL EN LA COMUNIDAD',
        created_at: '15-08-2021 8:00',
        updated_at: '18-09-2021 14:00'
    },
    {
        id: 3,
        modelId: 2,
        teamId: 1,
        name: 'Producción para exportación',
        description: 'Esta es una descripción corta que detalla el hilo conductor del canal, por ejemplo para el caso dado sería algo como SAQUEMOS EL PRODUCTO PARA EXPORTAR',
        created_at: '21-10-2021 18:00',
        updated_at: '21-10-2021 18:00'
    },
]

export const people = [
    {
        id: 1,
        photo: getImageURL('java'),
        name: 'Andrés',
        lname: 'Sapatanga',
        email: 'andr3s@gmail.com',
        gender: 'Male',
        identification: '0150305183',
        status:1,
    },
    {
        id: 2,
        photo: getImageURL('java'),
        name: 'Kevin',
        lname: 'Llivichuzcha',
        email: 'kevin@gmail.com',
        gender: 'Male',
        identification: '0150305183',
        status:1,
    },
    {
        id: 3,
        photo: getImageURL('java'),
        name: 'Lidia',
        lname: 'Contento',
        email: 'lidia@gmail.com',
        gender: 'Female',
        identification: '0150305183',
        status:1,
    },
    {
        id: 4,
        photo: getImageURL('java'),
        name: 'Andrés',
        lname: 'Guamán',
        email: 'guaman@gmail.com',
        gender: 'Male',
        identification: '0150305183',
        status:1,
    },
    {
        id: 5,
        photo: getImageURL('java'),
        name: 'Kelly',
        lname: 'Farfán',
        email: 'kelly@gmail.com',
        gender: 'Female',
        identification: '0150305183',
        status:1,
    },
    {
        id: 6,
        photo: getImageURL('java'),
        name: 'Pedro',
        lname: 'Cornejo',
        email: 'pedro@gmail.com',
        gender: 'Male',
        identification: '0150305183',
        status:1,
    },
];

export const users = [
    {
        id: 1,
        username: 'andr3s',
        password: '1234567890',
        rol: 'Invited',
        team: 1,
        plan: 1,
        status: 1,
        person: 1,
    },
    {
        id: 2,
        username: 'kevin',
        password: '1234567890',
        rol: 'Admin',
        team: 1,
        plan: 2,
        status: 1,
        person: 2,
    },
    {
        id: 3,
        username: 'lidia',
        password: '1234567890',
        rol: 'Invited',
        team: 1,
        plan: 1,
        status: 1,
        person: 3,
    },
    {
        id: 4,
        username: 'guaman',
        password: '1234567890',
        rol: 'Invited',
        team: 1,
        plan: 1,
        status: 1,
        person: 4,
    },
    {
        id: 5,
        username: 'kelly',
        password: '1234567890',
        rol: 'Invited',
        team: 2,
        plan: 1,
        status: 1,
        person: 5,
    },
    {
        id: 6,
        username: 'pedro_admin',
        password: '1234567890',
        rol: 'Admin',
        team: 1,
        plan: 1,
        status: 1,
        person: 6,
    },
    {
        id: 7,
        username: 'pedro',
        password: '1234567890',
        rol: 'Invited',
        team: 1,
        plan: 1,
        status: 1,
        person: 6,
    },
]

export const dplans = [
    {
        id: 1,
        name: 'Silver',
        price: 0,
        desc: 'Plan type silver',
        members_number:5,
        discount:12.5,
        featured:true,
        status: 1,

    },
    {
        id: 2,
        name: 'Gold',
        price: 10,
        desc: 'Plan type gold',
        members_number:10,
        discount:12.5,
        featured:true,
        status: 1,
    },
    {
        id: 3,
        name: 'Diamond',
        price: 30,
        desc: 'Plan type diamond',
        members_number:15,
        discount:12.5,
        featured:true,
        status: 1,
    },
]

const plan_features =[
  {
    id:1,
    item_description:'Description 1',
    order:1,
    status:1,
    plan_id:1
  },{
    id:2,
    item_description:'Description 2',
    order:2,
    status:1,
    plan_id:1
  },{
    id:3,
    item_description:'Description 3',
    order:3,
    status:1,
    plan_id:1
  },{
    id:4,
    item_description:'Description 1',
    order:1,
    status:1,
    plan_id:2
  },{
    id:5,
    item_description:'Description 2',
    order:2,
    status:1,
    plan_id:2
  },{
    id:6,
    item_description:'Description 3',
    order:3,
    status:1,
    plan_id:2
  },{
    id:7,
    item_description:'Description 1',
    order:1,
    status:1,
    plan_id:3
  },{
    id:8,
    item_description:'Description 2',
    order:2,
    status:1,
    plan_id:3
  },{
    id:9,
    item_description:'Description 3',
    order:3,
    status:1,
    plan_id:3
  }
]

const teams = [
    {
        id: 1,
        name: 'ISTA',
        logo: getImageURL('mongodb'),
        description: 'Institución Educativa Superior Tecnológico',
        plan_id: 1,
        status: 1,
    },
    {
        id: 2,
        name: 'FUTURA',
        logo: getImageURL('vue'),
        description: 'Empresa de ASDASD',
        plan_id: 2,
        status: 1,
    },
    {
        id: 3,
        name: 'GIGA',
        logo: getImageURL('angular'),
        description: 'Grupo de Tecnología e Innovación',
        plan_id: 3,
        status: 0,
    },
    {
        id: 4,
        name: 'UC',
        logo: getImageURL('xamarin'),
        description: 'Gurpo de Investigación de la U. de Cuenca',
        plan_id: 1,
        status: 1,
    },
    {
        id: 5,
        name: 'ISO',
        logo: getImageURL('php'),
        description: 'Estándares',
        plan_id: 1,
        status: 0,
    },
]

export const roles = [
    {
        id: 1,
        name: 'Super Admin',
        status: 0,
    },
    {
        id: 2,
        name: 'Developer',
        status: 1,
    },
    {
        id: 3,
        name: 'Admin',
        status: 1,
    },
    {
        id: 4,
        name: 'Invited',
        status: 1,
    }
];

const payment_methods = [
    {
        id: 1,
        name: 'PayPlay',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/666px-PayPal_Logo_Icon_2014.svg.png',
        description: 'Pago digital mediante PayPal',
        status: 1,
    },
    {
        id: 2,
        name: 'Cash',
        logo: 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-11/256/Cash-icon.png',
        description: 'Pago en efectivo',
        status: 1,
    },
    {
        id: 3,
        name: 'PayPlay',
        logo: getImageURL('asp.net'),
        description: 'Pago digital mediante PayPal',
        status: 1,
    },
    {
        id: 4,
        name: 'PayPlay',
        logo: getImageURL('asp.net'),
        description: 'Pago digital mediante PayPal',
        status: 1,
    },
    {
        id: 5,
        name: 'PayPlay',
        logo: getImageURL('asp.net'),
        description: 'Pago digital mediante PayPal',
        status: 1,
    },
];

const menu_roles = [
    {
        id: 1,
        name: 'Menu Rol 1',
        role_id: 1,
        menu_id: 1,
        status: 1,
    },
    {
        id: 2,
        name: 'Menu Rol 2',
        role_id: 1,
        menu_id: 1,
        status: 1,
    },
    {
        id: 3,
        name: 'Menu Rol 3',
        role_id: 1,
        menu_id: 1,
        status: 1,
    },
    {
        id: 4,
        name: 'Menu Rol 4',
        role_id: 1,
        menu_id: 1,
        status: 1,
    },
    {
        id: 5,
        name: 'Menu Rol 5',
        role_id: 1,
        menu_id: 1,
        status: 1,
    },
];

export const dmenu = [
    {
      id:1,
      name:'Menu 1',
      status:1
    },{
      id:2,
      name:'Menu 2',
      status:1
    },{
      id:3,
      name:'Menu 3',
      status:1
    },{
      id:4,
      name:'Menu 4',
      status:1
    },{
      id:5,
      name:'Menu 5',
      status:1
    }
]


export const subsystems = [
    {
        id:1,
        name:"Medio Natural",
        category:'Sustentables',
        hashtag:'',
        img:getImageURL('java'),
        owner:'Andrés Sapatanga',
        desc_short:'Subsistema de nivel 1',
        desc_small:'Subsistema de nivel 1',
        qualification:4.5,
        nro_dowloads:1597,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00',
        status: 1,
        processes: [
            {
                id: 1,
                name: "Ubicación",
                description: 'Hace referencia a....',
                status: 1,

            },
            {
                id: 2,
                name: "Relieve",
                description: 'Hace referencia a....',
                status: 0,
            },
            {
                id: 3,
                name: "Suelo",
                description: 'Hace referencia a....',
                status: 1,
            },
            {
                id: 4,
                name: "Clima",
                description: 'Pasos a seguir para un correcto empredimiento en la bolsa de valores.',
                status: 1,
            },
        ]
    },
    {
        id:2,
        name:'Socio- Cultural',
        category:'Sustentables',
        hashtag:'',
        img:getImageURL('angular'),
        owner:'Juan Paredes',
        desc_short:'Subsistema de nivel 1',
        desc_small:'Subsistema de nivel 1',
        qualification:4.5,
        nro_dowloads:100,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00',
        processes: [
            {
                id: 1,
                name: 'Riesgos territoriales',
                description: 'Se realizarán los pasos para invertir en la bolsa de valores de forma correcta',
                activities: [
                    {
                        name: 'Llenar el formulario',
                        description: 'Llenar el formulario de requisitos para poder invertir en la bolsa',
                    },
                ]
            },
            {
                id: 2,
                name: 'Emprender en la bolsa de valores',
                description: 'Pasos a seguir para un correcto empredimiento en la bolsa de valores.',
            },
        ]
    },
    {
        id:3,
        name:'Medio construído',
        category:'Sustentables',
        hashtag:'aprender',
        img:getImageURL('node'),
        owner:'Juan Ramirez',
        desc_short:'Modelo de manejo sustentable de bosques en Ecuador',
        desc_small:'Modelo de competencia entre PYMES en donde se veran diferentes puntos de vista entre como avanzan en el dia a dia',
        qualification:3.5,
        nro_dowloads:50,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00'
    },
    {
        id:5,
        name:'Económico- Productivo',
        category:'Educacion',
        hashtag:'aprender',
        img:getImageURL('java'),
        owner:'El Pepe',
        desc_short:'Modelo de diagnóstico del uso de tecnologías en el desarrollo de los estudiantes',
        desc_small:'Modelo de rendimiento de estudiantes para su mejor educación',
        qualification:4.5,
        nro_dowloads:100,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00'
    },
    {
        id:6,
        name:'Político- Institucional',
        category:'Educacion',
        hashtag:'aprender',
        img:getImageURL('asp.net'),
        owner:'El Pepe',
        desc_short:'Modelo para determinar la planificación efectiva de áreas de estudio',
        desc_small:'Modelo de rendimiento de estudiantes para su mejor educación',
        qualification:5,
        nro_dowloads:100,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00'
    }
];


export const modelos = [
    {
        id:1,
        name:"Modelo de la calidad del Agua",
        category:'Sustentables',
        hashtag:'Agua, Calidad',
        img:getImageURL('java'),
        owner:'Andrés Sapatanga',
        desc_short:'Manejo responsable de las fuentes hídricas',
        desc_small:'Al usar este modelo, usted podrá determinar la calidad del agua y cómo esto se ve afectado por otros elementos de las grandes ciudades',
        qualification:4.5,
        nro_dowloads:1597,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00',
        status: 1,
        processes: [
            {
                id: 1,
                name: "Ubicación",
                description: 'Se indicarán los procesos y actividades para conformar un equipo de trabajo',
                status: 1,
                activities: [
                    {
                        name: 'Conseguir Ingredientes',
                        description: 'Obtención y preparación de los ingredientes previo a su preparación.',
                    },
                ]
            },
            {
                id: 2,
                name: "Relieve",
                description: 'Procesos recomendados para determinar inicialmente la calidad del agua',
                status: 0,
                activities: [
                    {
                        name: 'Tomar fotos',
                        description: 'Obtención y preparación de los ingredientes previo a su preparación.',
                    },
                ]
            },
            {
                id: 3,
                name: "Suelo",
                description: 'Pasos a seguir para un correcto empredimiento en la bolsa de valores.',
                status: 1,
            },
            {
                id: 4,
                name: "Pizza's Order",
                description: 'Pasos a seguir para un correcto empredimiento en la bolsa de valores.',
                status: 1,
                activities: [
                    {
                        id: "SelectAPizzaTask",
                        name: 'Select a Pizza',
                        description: 'Selección de pizza, entre diferentes sabores.',
                        status: 1,
                        schema: {
                            "schemaVersion": 2,
                            "exporter": {
                                "name": "form-js (https://demo.bpmn.io)",
                                "version": "0.3.0"
                            },
                            "components": [
                                {
                                    "text": "Pizza Menu",
                                    "type": "text",
                                    "id": "Field_0qqrbv5"
                                },
                                {
                                    "values": [
                                        {
                                            "label": "Pizza Hawaiana",
                                            "value": "hawaiana"
                                        },
                                        {
                                            "label": "Pizza de Jamón",
                                            "value": "jamon"
                                        },
                                        {
                                            "label": "Pizza Napolitana",
                                            "value": "napolitana"
                                        },
                                        {
                                            "label": "Pizza Margarita",
                                            "value": "margarita"
                                        }
                                    ],
                                    "key": "pizza_choice",
                                    "label": "PIzza",
                                    "type": "select",
                                    "id": "Field_1j659ef",
                                    "description": "Escoja un tipo de Pizza",
                                    "validate": {
                                        "required": true
                                    }
                                },
                                {
                                    "action": "submit",
                                    "key": "field_7",
                                    "label": "Select",
                                    "type": "button",
                                    "id": "Field_005z2jn"
                                }
                            ],
                            "type": "default",
                            "id": "Form_0pwpjt6"
                        }
                    },
                    {
                        id: '_12',
                        name: 'Order Pizza',
                        description: 'Ordenar una pizza en el cajero.',
                        status: 1,
                    },
                    {
                        name: 'Ask for the pizza',
                        description: 'Si la orden se atraza, preguntar por la pizza.',
                        status: 1,
                    },
                    {
                        name: 'Pay the pizza',
                        description: 'Pagar por la pizza.',
                        status: 2,
                    },
                    {
                        name: 'Eat the pizza',
                        description: 'Finalmente, comer la pizza.',
                        status: 2,
                    },
                ]
            },
        ]
    },
    {
        id:2,
        name:'Modelo de la calidad del Aire',
        category:'Sustentables',
        hashtag:'Aire, Calidad',
        img:getImageURL('angular'),
        owner:'Juan Paredes',
        desc_short:'Modelo del diagnóstico de afectación del aire en comunidades del Ecuador',
        desc_small:'Al usar este modelo, usted podrá determinar la calidad del aire y cómo esto se ve afectado por otros elementos de las grandes ciudades',
        qualification:4.5,
        nro_dowloads:100,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00',
        processes: [
            {
                id: 1,
                name: 'Riesgos territoriales',
                description: 'Se realizarán los pasos para invertir en la bolsa de valores de forma correcta',
                activities: [
                    {
                        name: 'Llenar el formulario',
                        description: 'Llenar el formulario de requisitos para poder invertir en la bolsa',
                    },
                ]
            },
            {
                id: 2,
                name: 'Emprender en la bolsa de valores',
                description: 'Pasos a seguir para un correcto empredimiento en la bolsa de valores.',
            },
        ]
    },
    {
        id:3,
        name:'Manejo de bosques',
        category:'Sustentables',
        hashtag:'aprender',
        img:getImageURL('node'),
        owner:'Juan Ramirez',
        desc_short:'Modelo de manejo sustentable de bosques en Ecuador',
        desc_small:'Modelo de competencia entre PYMES en donde se veran diferentes puntos de vista entre como avanzan en el dia a dia',
        qualification:3.5,
        nro_dowloads:50,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00'
    },
    {
        id:5,
        name:'Incorporación de tecnología a la educación',
        category:'Educacion',
        hashtag:'aprender',
        img:getImageURL('java'),
        owner:'El Pepe',
        desc_short:'Modelo de diagnóstico del uso de tecnologías en el desarrollo de los estudiantes',
        desc_small:'Modelo de rendimiento de estudiantes para su mejor educación',
        qualification:4.5,
        nro_dowloads:100,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00'
    },
    {
        id:6,
        name:'Planificación de áreas de estudio',
        category:'Educacion',
        hashtag:'aprender',
        img:getImageURL('asp.net'),
        owner:'El Pepe',
        desc_short:'Modelo para determinar la planificación efectiva de áreas de estudio',
        desc_small:'Modelo de rendimiento de estudiantes para su mejor educación',
        qualification:5,
        nro_dowloads:100,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00'
    },
    {
        id:7,
        name:'Rendimiento académico de Estudiantes de acuerdo al nivel de ingreso económico',
        category:'Educacion',
        hashtag:'aprender',
        img:getImageURL('go'),
        owner:'El Pepe',
        desc_short:'Modelo de rendimiento de estudiantes',
        desc_small:'Modelo de rendimiento de estudiantes para su mejor educación',
        qualification:3,
        nro_dowloads:100,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00'
    }
];
export const herramientas = [
    {
        id:1,
        name:"Cliente SIG QGIS",
        category:'Sustentables',
        hashtag:'Agua, Calidad',
        img:getImageURL2('qgis'),
        owner:'Andrés Sapatanga',
        desc_short:'Manejo responsable de las fuentes hídricas',
        desc_small:'Al usar este modelo, usted podrá determinar la calidad del agua y cómo esto se ve afectado por otros elementos de las grandes ciudades',
        qualification:4.5,
        nro_dowloads:1597,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00',
        status: 1
    },
    {
        id:2,
        name:'Modelamiento mediante Grafos',
        category:'Sustentables',
        hashtag:'Aire, Calidad',
        img:getImageURL2('neo4j'),
        owner:'Juan Paredes',
        desc_short:'Modelo del diagnóstico de afectación del aire en comunidades del Ecuador',
        desc_small:'Al usar este modelo, usted podrá determinar la calidad del aire y cómo esto se ve afectado por otros elementos de las grandes ciudades',
        qualification:4.5,
        nro_dowloads:100,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00',
    },
    {
        id:3,
        name:'Visor Web de mapas',
        category:'Sustentables',
        hashtag:'aprender',
        img:getImageURL('node'),
        owner:'Juan Ramirez',
        desc_short:'Modelo de manejo sustentable de bosques en Ecuador',
        desc_small:'Modelo de competencia entre PYMES en donde se veran diferentes puntos de vista entre como avanzan en el dia a dia',
        qualification:3.5,
        nro_dowloads:50,
        date_create:'21-08-2021 00:00:00',
        date_update:'22-08-2021 00:00:00'
    }
];

const moments = [
    {
        id:1,
        name:"Intuir - Idear",
        description: 'Es el momento en donde se manifiestan las primeras intuiciones de cómo intervenir en la estructura de la realidad por parte de los diferentes actores y agentes del desarrollo territorial, estas intuiciones evolucionan hacia ideas, las mismas que se materializan en un equipo y un programa de trabajo. Este momento evolucionará y realimentará al resto de momentos.',
        status: 1,
        processes: [
            {
                id: 1,
                name: "Pizza's Preparation",
                description: 'Se indicarán los pasos para hacer una pizza',
                status: 1,
                activities: [
                    {
                        name: 'Conseguir Ingredientes',
                        description: 'Obtención y preparación de los ingredientes previo a su preparación.',
                    },
                ]
            },
            {
                id: 2,
                name: "Pizza's Marketing",
                description: 'Pasos recomendados para realizar un correcto Marketing de una Pizza',
                status: 0,
                activities: [
                    {
                        name: 'Tomar fotos',
                        description: 'Obtención y preparación de los ingredientes previo a su preparación.',
                    },
                ]
            },
            {
                id: 3,
                name: "Pizza's Sale",
                description: 'Pasos a seguir para un correcto empredimiento en la bolsa de valores.',
                status: 1,
            },
            {
                id: 4,
                name: "Pizza's Order",
                description: 'Pasos a seguir para un correcto empredimiento en la bolsa de valores.',
                status: 1,
                activities: [
                    {
                        id: "SelectAPizzaTask",
                        name: 'Select a Pizza',
                        description: 'Selección de pizza, entre diferentes sabores.',
                        status: 1,
                        schema: {
                            "schemaVersion": 2,
                            "exporter": {
                                "name": "form-js (https://demo.bpmn.io)",
                                "version": "0.3.0"
                            },
                            "components": [
                                {
                                    "text": "Pizza Menu",
                                    "type": "text",
                                    "id": "Field_0qqrbv5"
                                },
                                {
                                    "values": [
                                        {
                                            "label": "Pizza Hawaiana",
                                            "value": "hawaiana"
                                        },
                                        {
                                            "label": "Pizza de Jamón",
                                            "value": "jamon"
                                        },
                                        {
                                            "label": "Pizza Napolitana",
                                            "value": "napolitana"
                                        },
                                        {
                                            "label": "Pizza Margarita",
                                            "value": "margarita"
                                        }
                                    ],
                                    "key": "pizza_choice",
                                    "label": "PIzza",
                                    "type": "select",
                                    "id": "Field_1j659ef",
                                    "description": "Escoja un tipo de Pizza",
                                    "validate": {
                                        "required": true
                                    }
                                },
                                {
                                    "action": "submit",
                                    "key": "field_7",
                                    "label": "Select",
                                    "type": "button",
                                    "id": "Field_005z2jn"
                                }
                            ],
                            "type": "default",
                            "id": "Form_0pwpjt6"
                        }
                    },
                    {
                        id: '_12',
                        name: 'Order Pizza',
                        description: 'Ordenar una pizza en el cajero.',
                        status: 1,
                    },
                    {
                        name: 'Ask for the pizza',
                        description: 'Si la orden se atraza, preguntar por la pizza.',
                        status: 1,
                    },
                    {
                        name: 'Pay the pizza',
                        description: 'Pagar por la pizza.',
                        status: 2,
                    },
                    {
                        name: 'Eat the pizza',
                        description: 'Finalmente, comer la pizza.',
                        status: 2,
                    },
                ]
            },
        ]
    },
    {
        id:2,
        name:'Comprender - Aprender',
        description: 'Todos los participantes comprenden los objetivos, metas, teorías, métodos y herramientas del MIT, para luego aprender colectivamente como se estructuran y funcionan los sistemas territorial, espacial y temático (tema del MIT). Este momento se materializa en un documento que defina el estado de situación de estos sistemas en un espaciotiempo específico.',
        status: 0,
        processes: [
            {
                id: 1,
                name: 'Riesgos territoriales',
                description: 'Se realizarán los pasos para invertir en la bolsa de valores de forma correcta',
                activities: [
                    {
                        name: 'Llenar el formulario',
                        description: 'Llenar el formulario de requisitos para poder invertir en la bolsa',
                    },
                ]
            },
            {
                id: 2,
                name: 'Emprender en la bolsa de valores',
                description: 'Pasos a seguir para un correcto empredimiento en la bolsa de valores.',
            },
        ]
    },
    {
        id:3,
        name:'Crear - Proponer',
        description: 'Con las capacidades adquiridas de los usuarios en los dos momentos anteriores, se inicia la creatividad colectiva de propuestas para cambiar la realidad territorial, espacial y temática (específica). Este momento se expresa en políticas, programas y proyectos, en modelos de gestión y en planes de manejo específicos.',
        status: 1,
    },
    {
        id:4,
        name:'Implementar - Evaluar',
        description: 'En este momento se ejecuta lo creado y propuesto y se verifican las transformaciones que producen en los sistemas. Se materializa este momento en la constatación y evaluación de dichas transformaciones a través de mecanismos de seguimiento y especialmente de la aplicación de variables e indicadores estructurados específicamente para cambios y transformaciones específicas.',
        status: 1,
    },
    {
        id:5,
        name:'Capitalizar - Realimentar',
        description: 'La aplicación de un MIT genera y transforma cierta cantidad de principios, teorías, métodos y herramientas –es decir conocimiento- sobre temas concretos del desarrollo territorial sostenible. La aplicación del mismo produce experiencias y aprendizaje. En este sentido este componente tiene el propósito de capitalizar dicho conocimiento y realimentar los procesos de elaboración e implementación de un MIT. Así garantizamos que el MIT y GEArth se actualicen y aprendan permanentemente.',
        status: 1,
    },
];
export const polls = [
  {
    id: "616f22ccd4cae83bbd061cfa",
    name: "Pizza's Preparation Service",
    description: "Survey on ho to prepare homemade pizza",
    process_id: 1,
    created_at: "2021-10-19T19:55:56.450000",
    updated_at: "2021-10-19T19:55:56.450000",
    json_body: {
      questions: [
          {
            id: 1,
            open: false,
            type: "multiple",
            subsistemaId: 1,
            variableId: 1,
            questionImage: "",
            questionText: "¿Qué ingredientes son los que más utiliza?",
            options: [
              {
                id: 1,
                optionImage: "",
                optionText: "Peperoni, Piña"
              },
              {
                id: 2,
                optionImage: "",
                optionText: "Mortadela, Queso"
              }
            ]
          },
          {
            id: 2,
            open: false,
            type: "close",
            subsistemaId: 1,
            variableId: 1,
            questionImage: "",
            questionText: "¿Cuanto tiempo de coccion utiliza?",
            options: [
              {
                id: 1,
                optionImage: "",
                optionText: "1-2 hrs"
              },
              {
                id: 2,
                optionImage: "",
                optionText: "2-3 hrs"
              },
              {
                id: 3,
                optionImage: "",
                optionText: "Otros"
              }
            ]
          },
          {
            id: 3,
            open: false,
            type: "close",
            subsistemaId: 1,
            variableId: 1,
            questionImage: "",
            questionText: "¿Qué tipo de pizza de gusta?",
            options: [
              {
                id: 1,
                optionImage: "",
                optionText: "Peperoni, Piña"
              },
              {
                id: 2,
                optionImage: "",
                optionText: "Mortadela, Queso"
              },
              {
                id: 3,
                optionImage: "",
                optionText: "Otros"
              }
            ]
          },
          {
            id: 4,
            open: false,
            type: "open",
            subsistemaId: 1,
            variableId: 1,
            questionImage: "",
            questionText: "En cuantas porciones corta a la pizza y de que forma?",
            options: []
          }
        ]
      },
      status: 1
    },{
      id: "61771532cab0a86fda4f395c",
      name: "Nueva Encuesta",
      description: "Survey on ho to prepare homemade pizza",
      process_id: 1,
      created_at: "2021-10-19T20:33:25.402000",
      updated_at: "2021-10-19T20:33:25.402000",
      json_body: {
        questions: []
      },
      status: 1
    }
];

const components = [
    {
        component: 'container',
        attributes: {
            id: 'form-example',
            class: 'card p-shadow-10'
        },
        contents: [
            {
                component: 'inputtext',
                attributes: {
                    id: 'name',
                    name: 'name',
                    type: 'text',
                    placeholder: 'Write your name ...',
                },
                events: {

                },
                icon: {
                    icon: 'pi pi-user',
                    position: 'left',
                },
            },
            {
                component: 'inputtext',
                attributes: {
                    id: 'lname',
                    class: '',
                    name: 'lname',
                    type: 'text',
                    placeholder: 'Write your last name ...',
                },
                icon: {
                    icon: 'pi pi-user',
                    position: 'left',
                },
                label: {
                    label: 'Last Name',
                    float: true,
                    class: '',
                },
                events: {

                },
            },
            {
                component: 'button',
                attributes: {
                    id: 'print',
                    class: 'p-button-rounded p-button-secondary',
                    label: 'Print',
                },
                icon: {
                    icon: 'pi pi-check',
                },
                events: {

                },
            },
            {
                component: 'inputtext',
                attributes: {
                    id: 'example',
                    class: '',
                    type: 'text',
                    placeholder: 'Example',
                },
                events: {

                },
            },
            {
                component: 'inputtext',
                attributes: {
                    id: 'country',
                    class: '',
                    type: 'text',
                    placeholder: 'Write your Country ...',
                },
                icon: {
                    icon: 'pi pi-user',
                    position: 'left',
                },
                label: {
                    label: 'Country',
                    float: false,
                    class: 'p-mx-1',
                },
                events: {

                },
            },
            {
                component: 'inputtext',
                attributes: {
                    id: 'CI',
                    class: '',
                    type: 'text',
                    placeholder: 'Write your Identification ...',
                },
                label: {
                    label: 'Identification',
                    float: false,
                    class: 'p-mx-1',
                },
                containers: ['p-field', 'p-fluid'],
                events: {

                },
            },
            {
                component: 'inputtextarea',
                attributes: {
                    id: 'commentary',
                    name: 'commentary',
                    class: '',
                    autoresize: true,
                    placeholder: 'Write your commentary',
                    rows: 5,
                    cols: 50,
                },
                icon: {
                    icon: 'pi pi-user',
                    position: 'left',
                },
                label: {
                    label: 'Commentary',
                    float: true,
                    class: 'p-mx-1',
                },
                containers: ['p-my-5']
            },
            {
                component: 'inputtextarea',
                attributes: {
                    id: 'opinion',
                    autoresize: true,
                    placeholder: 'Write your Opinion',
                    rows: 5,
                    cols: 50,
                },
                icon: {
                    icon: 'pi pi-user',
                    position: 'left',
                },
                label: {
                    label: 'Opinion',
                    float: false,
                    class: 'p-mx-1',
                },
                containers: ['p-field', 'p-fluid']
            },
            {
                component: 'autocomplete',
                attributes: {
                    id: 'autocomplete',
                    multiple: true,
                    placeholder: 'Select Color',
                },
                label: {
                    label: 'AutoComplete',
                    float: true,
                    class: 'p-mx-1',
                }
            },
            {
                component: 'autocomplete',
                attributes: {
                    id: 'autocomplete2',
                    multiple: false,
                    placeholder: 'Select Color',
                },
                label: {
                    label: 'AutoComplete',
                    class: 'p-mx-1',
                },
                containers: ['p-field', 'p-fluid']
            },
            {
                component: 'calendar',
                attributes: {
                    id: 'schedule',
                    name: 'schedule',
                    placeholder: 'Select your Schedule',
                },
                label: {
                    label: 'Schedule',
                    class: 'p-mx-1',
                },
                containers: ['p-field', 'p-fluid', 'card', 'p-shadow-10 p-my-2'],
            },
            {
                component: 'calendar',
                attributes: {
                    id: 'schedule2',
                    placeholder: 'Select your Schedule',
                },
                label: {
                    label: 'Schedule',
                    float: true,
                    class: 'p-mx-1',
                },
            },
            {
                component: 'inputnumber',
                attributes: {
                    id: 'age',
                    name: 'age',
                    placeholder: 'Enter your age ...',
                    mode: 'decimal',
                },
                label: {
                    label: 'Age',
                    float: true,
                },
                icon: {
                    icon: 'pi pi-user',
                    position: 'left',
                },
                containers: ['p-my-5'],
            },
            {
                component: 'chips',
                attributes: {
                    id: 'chips',
                    placeholder: 'Enter your chip ...',
                },
                label: {
                    label: 'Chips',
                    float: true,
                },
                containers: ['p-my-3'],
            },
            {
                component: 'chips',
                attributes: {
                    id: 'members',
                    name: 'members',
                    placeholder: 'Enter the members ...',
                },
                label: {
                    label: 'Members List',
                },
                containers: ['p-field','p-fluid card', 'p-col-6 p-shadow-20'],
            },
            {
                component: 'slider',
                attributes: {
                    id: 'volume',
                    name: 'volume',
                },
                label: {
                    label: 'Slider',
                },
                containers: ['p-field', 'p-col-5 p-shadow-20 p-mt-5'],
            },
            {
                component: 'rating',
                attributes: {
                    id: 'qualification',
                    name: 'qualification',
                    class: '',
                },
                label: {
                    label: 'Qualification',
                    class: 'p-mx-1',
                },
                containers: ['p-field', 'p-col-5 p-shadow-20 p-mt-5'],
            },
            {
                component: 'colorpicker',
                attributes: {
                    id: 'color',
                    name: 'color',
                    class: '',
                    defaultcolor: '#000',
                    tooltip: 'Color',
                },
                label: {
                    label: 'Color',
                    class: 'p-mx-1',
                },
                icon: {
                    icon: 'pi pi-user',
                    position: 'left',
                },
                containers: ['p-my-5'],
            },
            {
                component: 'knob',
                attributes: {
                    id: 'downloaded',
                    name: 'downloaded',
                    class: '',
                    tooltip: 'Downloaded',
                    min: 0,
                    max: 100,
                    step: 2,
                },
                label: {
                    label: 'Downloaded',
                    class: 'p-mx-1',
                },
                containers: ['p-my-5'],
            },
        ]
    },
    {
        component: 'container',
        attributes: {
            class: 'card p-shadow-10',
        },
        contents: [
            {
                component: 'button',
                attributes: {
                    id: 'print',
                    class: 'p-button-rounded p-button-secondary',
                    label: 'Print',
                },
                icon: {
                    icon: 'pi pi-check',
                },
                events: {

                },
            },
            {
                component: 'radiobutton',
                attributes: {
                    name: 'gender',
                },
                options: [
                    {
                        id: 'male',
                        value: 'male',
                        label: {
                            label: 'Male',
                            class: '',
                        },
                        containers: ['p-col'],
                    },
                    {
                        id: 'female',
                        value: 'female',
                        label: {
                            label: 'Female',
                            class: 'p-shadow-10',
                        },
                        containers: ['p-col'],
                    },
                    {
                        id: 'other',
                        value: 'other',
                        label: {
                            label: 'Other',
                            class: '',
                        },
                        containers: ['p-col'],
                    },
                ],
                containers: ['p-grid'],
            },
            {
                component: 'checkbox',
                attributes: {
                    name: 'courses',
                },
                options: [
                    {
                        id: 'language',
                        value: 'language',
                        label: {
                            label: 'Language',
                            class: '',
                        },
                        containers: ['p-col'],
                    },
                    {
                        id: 'english',
                        value: 'english',
                        label: {
                            label: 'English',
                            class: 'p-shadow-10',
                        },
                        containers: ['p-col'],
                    },
                    {
                        id: 'physical',
                        value: 'physical',
                        label: {
                            label: 'Physical',
                            class: '',
                        },
                        containers: ['p-col'],
                    },
                ],
                containers: ['p-grid'],
            },
            {
                component: 'inputswitch',
                attributes: {
                    id: 'status',
                    name: 'status',
                },
                label: {
                    label: 'Status',
                    class: 'p-d-block',
                },
                containers: ['p-field', 'p-fluid'],
            },
            {
                component: 'listbox',
                attributes: {
                    id: 'country',
                    name: 'country',
                    filter: true,
                },
                options: {
                    options: [
                        {
                            id: 1,
                            country: 'Ecuador',
                        },
                        {
                            id: 2,
                            country: 'España',
                        },
                        {
                            id: 3,
                            country: 'Brazil',
                        }
                    ],
                    label: 'country',
                },
                label: {
                    label: 'Country',
                    class: 'p-d-block p-my-1',
                },
                containers: ['col'],
            },
            {
                component: 'dropdown',
                attributes: {
                    id: 'city',
                    name: 'city',
                },
                options: {
                    options: [
                        {
                            id: 1,
                            city: 'Cuenca',
                        },
                        {
                            id: 2,
                            city: 'Guayaquil',
                        },
                        {
                            id: 3,
                            city: 'Quito',
                        }
                    ],
                    label: 'city',
                },
                label: {
                    label: 'Country',
                    float: true,
                    class: '',
                },
                containers: ['p-my-6', 'p-field', 'p-fluid']
            },
            {
                component: 'multiselect',
                attributes: {
                    id: 'products',
                    name: 'products',
                    placeholder: 'Ingresa tus productos ...',
                    class: 'multiselect-custom',
                    filter: true,
                },
                options: {
                    options: [
                        {
                            id: 1,
                            product: 'Head Phones',
                            price: 10,
                        },
                        {
                            id: 2,
                            product: 'Pencil',
                            price: 0.45,
                        },
                        {
                            id: 3,
                            product: 'Phone',
                            price: 190,
                        }
                    ],
                    label: 'product',
                },
                label: {
                    label: 'Products',
                    float: true,
                    class: '',
                },
                containers: ['p-my-6', 'p-field', 'p-fluid']
            },
            {
                component: 'togglebutton',
                attributes: {
                    id: 'isadmin',
                    name: 'isadmin'
                },
                label: {
                    label: 'Is Admin?',
                    class: 'p-d-block',
                },
                icon: {
                    on: 'pi pi-check',
                    off: 'pi pi-times',
                    position: 'left',
                },
                containers: ['p-field'],
            },
            {
                component: 'selectbutton',
                attributes: {
                    id: 'plan',
                    name: 'plan',
                    multiple: false,
                },
                options: {
                    options: [
                        {
                            id: 1,
                            plan: 'Gold',
                            price: 5,
                        },
                        {
                            id: 2,
                            plan: 'Plate',
                            price: 7,
                        },
                        {
                            id: 3,
                            plan: 'Diamond',
                            price: 10,
                        }
                    ],
                    label: 'plan',
                },
                label: {
                    label: 'Plans',
                    class: 'p-d-block',
                },
                containers: ['p-field'],
            },
            {
                component: 'selectbutton',
                attributes: {
                    id: 'ingredients',
                    name: 'ingredients',
                    multiple: true,
                },
                options: {
                    options: [
                        {
                            id: 1,
                            ingredient: 'Pepperoni',
                        },
                        {
                            id: 2,
                            ingredient: 'Salami',
                        },
                        {
                            id: 3,
                            ingredient: 'Pineapple',
                        },
                        {
                            id: 4,
                            ingredient: 'Sauce',
                        },
                    ],
                    label: 'ingredient',
                },
                label: {
                    label: "Pizza's Ingredients",
                    class: 'p-d-block',
                },
                containers: ['p-field'],
            },
            {
                component: 'inputmask',
                attributes: {
                    id: 'date',
                    name: 'date',
                    mask: '99/99/9999',
                    slotchar: '-',
                },
                label: {
                    label: 'Date',
                    float: true,
                },
                containers: ['p-my-3'],
            },
            {
                component: 'datatable',
                attributes: {
                    id: 'clients',
                },
                label: {
                    label: 'Data Table',
                    float: true,
                },
                containers: ['card'],
            }
        ],
    }
];

//Methods | Controllers

export const findUserByCredentials = (username, password) => {
    return users.find((u) => {
        if (u.username === username && u.password === password) {
            return u;
        } else {
            return null;
        }
    });
}

export const findPollsByProcess = (id) => {
  return polls.filter((p) =>{
    if (p.process_id === id) {
      return p;
    }else {
      return null;
    }
  })
};
export const findPollsById = (id) => {
  return polls.find((p) =>{
    if (p.id === id) {
      return p;
    }else {
      return null;
    }
  })
};

export const findPersonById = (id) => {
    return people.find((p) => {
        if (p.id === id) {
            return p;
        } else {
            return null;
        }
    });
}

export const findUserByPerson = (id) =>{
  return users.find((u)=>{
    if(u.person === id){
      return u;
    }else{
      return null;
    }
  });
}

export const findRoleById = (id) => {
    return roles.find((r) => {
        if (r.id === id) {
            return r;
        } else {
            return null;
        }
    });
}

export const findPlanById = (id) => {
    return dplans.find((p) => {
        if (p.id === id) {
            return p;
        } else {
            return null;
        }
    });
}

export const findPlanFByPlan = (id) =>{
    return plan_features.filter(d => d.plan_id === id);
}

export const findAllRoles = () => {
    return roles;
}

export const findAllTeams = () => {
    return teams;
}

export const findAllPlans = () => {
    return dplans;
}

export const findAllPaymentMethods = () => {
    return payment_methods;
}

export const findAllMenuRoles = () => {
    return menu_roles;
}

export const findAllComponents = () => {
    return components;
}

export const findAllMoments = () => {
    return moments;
}

// FROM VERTICA
export const findAllModels = () => {
    return modelos;
}

export const findAllSubsystems = () => {
    return subsystems;
}

export const findAllPeople = () => {
    return people;
}

export const findAllTerritorialSystemModels = () => {
    return territorialSystemModels;
}

export const territorialSubSystems = [
    {
        name: "Medio Natural",
        components: [
            {id: "1", name: "Aire", subsystemId: "50"},
            {id: "2", name: "Agua", subsystemId: "50"},
            {id: "3", name: "Clima", subsystemId: "50"},
            {id: "4", name: "Fauna", subsystemId: "50"},
            {id: "5", name: "Flora", subsystemId: "50"},
            {id: "6", name: "Relieve", subsystemId: "50"},
            {id: "7", name: "Suelo", subsystemId: "50"},
            {id: "8", name: "Ubicación", subsystemId: "50"},
        ],
        id: "50" },
    {
        name: "Político Institucional",
        components: [
            {id: "9", name: "Derecho", subsystemId: "51"},
            {id: "10", name: "Políticas", subsystemId: "51"},
            {id: "11", name: "Organizaciones Sociales", subsystemId: "51"},
            {id: "12", name: "Gobierno", subsystemId: "51"},
            {id: "13", name: "Legal", subsystemId: "51"},
            {id: "14", name: "OTB", subsystemId: "51"},
        ],
        id: "51"
    },
    { name: "Económico Productivo",
        components: [
            {id: "15", name: "Primario", subsystemId: "52"},
            {id: "16", name: "Secundario", subsystemId: "52"},
            {id: "17", name: "Terciario", subsystemId: "52"},
            {id: "18", name: "Comunicación", subsystemId: "52"},
            {id: "19", name: "Servicios", subsystemId: "52"},
            {id: "20", name: "Mano de Obra", subsystemId: "52"},
            {id: "21", name: "Servicios", subsystemId: "52"},
        ],
        id: "52"
    },
    { name: "Físico Espacial",
        components: [
            {id: "22", name: "Construcción", subsystemId: "53"},
            {id: "23", name: "Espacio Público", subsystemId: "53"},
            {id: "24", name: "Infraestructura", subsystemId: "53"},
            {id: "25", name: "Vialidad", subsystemId: "53"},
        ],
        id: "53"
    },
    { name: "Socio Cultural",
        components: [
            {id: "26", name: "Demografía", subsystemId: "54"},
            {id: "27", name: "Educación", subsystemId: "54"},
            {id: "28", name: "Cultura", subsystemId: "54"},
            {id: "29", name: "Estilo de Vida", subsystemId: "54"},
            {id: "30", name: "Movilidad", subsystemId: "54"},
            {id: "31", name: "Salud", subsystemId: "54"},
        ],
        id: "54"
    },
];


// FROM VERTICA
export const territorialSystemModels = [
    {
        id: "neo4j_12345",
        userId: "11111",
        name: "My new territorial system model 1",
        description: "Some description 1",
        // erased: true or false
    },
    {
        id: "neo4j_12346",
        userId: "11111",
        name: "My new territorial system model 2",
        description: "Some description 2"
    },
    {
        id: "neo4j_12347",
        userId: "11111",
        name: "My new territorial system model 3",
        description: "Some description 3"
    },
    {
        id: "neo4j_12348",
        userId: "11111",
        name: "My new territorial system model 4",
        description: "Some description 4"
    }
];
