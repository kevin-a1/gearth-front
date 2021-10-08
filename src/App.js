import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import AppTopbar from './app/layouts/AppTopbar';
import AppFooter from './app/layouts/AppFooter';
import AppConfig from './app/layouts/AppConfig';
import AppNewModel from './app/layouts/AppNewModel';
import AppRightPanel from './app/layouts/AppRightPanel';
import PrimeReact from 'primereact/api';
import Routes from './app/routes/routes';
import store from './redux/store';
import { Help } from './app/pages/Help';
import { Provider } from 'react-redux';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import './app/assets/scss/modelos.scss';
//Custom Css
import './app/assets/scss/custom-global.scss';

const App = (props) => {

    const [resetActiveIndex, setResetActiveIndex] = useState(null)
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [sidebarStatic, setSidebarStatic] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('horizontal');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [ripple, setRipple] = useState(false);
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const [colorScheme, setColorScheme] = useState('dark');
    const [topbarScheme, setTopbarScheme] = useState('dark')
    const [menuScheme, setMenuScheme] = useState('dark')
    const [themeScheme, setThemeScheme] = useState('dark')
    const [theme, setTheme] = useState('purple');
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false)

    const menu = [
        {
            label: 'Dashboard', icon: 'pi pi-home', to: '/'
        },
        {
            label: 'Estructura de GEArth', icon: 'pi pi-book',
            items: [
                { label: 'Sistemas complejos', icon: 'pi pi-directions', to: '/territorial-system/complex-system' },
                { label: 'Base del conocimiento', icon: 'pi pi-share-alt', to: '/admin/modelsConsole' },
                { label: 'Caja de herramientas', icon: 'pi pi-share-alt', to: '/admin/repository' },
                { label: 'Sistema de indicadores', icon: 'pi pi-share-alt', to: '/admin/repository' },
                { label: 'Principios, Leyes y teorías', icon: 'pi pi-share-alt', to: '/admin/repository' },
                { label: 'Temas clave y tendencias', icon: 'pi pi-share-alt', to: '/admin/repository' },
                { label: 'Repositorio', icon: 'pi pi-share-alt', to: '/admin/repository' },
            ]
        },
        {
            label: 'Administración', icon: 'pi pi-user',
            items: [
                { label: 'Mi equipo', icon: 'pi pi-pencil', to: '/pages/listmembers' },
                { label: 'Cambiar plan', icon: 'pi pi-pencil', to: '/pages/changeplan' },
                { label: 'Personas', icon: 'pi pi-user', to: '/admin/persons' },
                { label: 'Planes', icon: 'pi pi-dollar', to: '/admin/plan' },
                { label: 'Menu', icon: 'pi pi-sitemap', to: '/admin/menu' },
                { label: 'Roles de Menu', icon: 'pi pi-pencil', to: '/admin/menu-role' },
                { label: 'Roles', icon: 'pi pi-briefcase', to: '/admin/role' },
                { label: 'Equipo', icon: 'pi pi-users', to: '/admin/team' },
                { label: 'Método de pago', icon: 'pi pi-money-bill', to: '/admin/payment-method' },
                { label: 'Renders Test', icon: 'pi pi-pencil', to: '/admin/renders-test' },
                { label: 'Modelos', icon: 'pi pi-book', to: '/admin/modelos' },

            ]
        },
        {
            label: 'Mis modelos', icon: 'pi pi-book',
            items: [
                { label: 'Modelo 1', icon: 'pi pi-directions', to: '/creators/model-designer' },
                { label: 'Modelo 2', icon: 'pi pi-directions', to: '/creators/model-designer' },
                { label: 'Ir a mis modelos', icon: 'pi pi-directions', to: '/creators/model-designer' },

            ]
        },
        {
            label: 'Mis modelos', icon: 'pi pi-book',
            items: [
                { label: 'Aún no tienes modelos. Ver todos', icon: 'pi pi-directions', to: '/admin/modelos' },
                { },

            ]
        },
        {
            label: 'Crea en GEArth', icon: 'pi pi-home', to: '/creators/model-designer' 
        },


        /*{
            label: 'UI Kit', icon: 'pi pi-star-o',
            items: [
                { label: 'Form Layout', icon: 'pi pi-id-card', to: '/uikit/formlayout' },
                { label: 'Input', icon: 'pi pi-check-square', to: '/uikit/input' },
                { label: 'Float Label', icon: 'pi pi-bookmark', to: '/uikit/floatlabel' },
                { label: 'Invalid State', icon: 'pi pi-exclamation-circle', to: '/uikit/invalidstate' },
                { label: 'Button', icon: 'pi pi-mobile', to: '/uikit/button', className: 'rotated-icon' },
                { label: 'Table', icon: 'pi pi-table', to: '/uikit/table' },
                { label: 'List', icon: 'pi pi-list', to: '/uikit/list' },
                { label: 'Tree', icon: 'pi pi-share-alt', to: '/uikit/tree' },
                { label: 'Panel', icon: 'pi pi-tablet', to: '/uikit/panel' },
                { label: 'Overlay', icon: 'pi pi-clone', to: '/uikit/overlay' },
                { label: 'Media', icon: "pi pi-image", to: '/uikit/media' },
                { label: 'Menu', icon: 'pi pi-bars', to: '/uikit/menu' },
                { label: 'Message', icon: 'pi pi-comment', to: '/uikit/message' },
                { label: 'File', icon: 'pi pi-file', to: '/uikit/file' },
                { label: 'Chart', icon: 'pi pi-chart-bar', to: '/uikit/chart' },
                { label: 'Misc', icon: 'pi pi-circle-off', to: '/uikit/misc' },
            ]
        },
        {
            label: 'Utilities', icon: 'pi pi-compass',
            items: [
                { label: 'Display', icon: 'pi pi-desktop', to: '/utilities/display' },
                { label: 'Elevation', icon: 'pi pi-external-link', to: '/utilities/elevation' },
                { label: 'Flexbox', icon: 'pi pi-directions', to: '/utilities/flexbox' },
                { label: 'Icons', icon: 'pi pi-search', to: '/utilities/icons' },
                { label: 'Widgets', icon: 'pi pi-star-o', to: '/utilities/widgets' },
                { label: 'Grid System', icon: 'pi pi-th-large', to: '/utilities/grid' },
                { label: 'Spacing', icon: 'pi pi-arrow-right', to: '/utilities/spacing' },
                { label: 'Typography', icon: 'pi pi-align-center', to: '/utilities/typography' },
                { label: 'Text', icon: 'pi pi-pencil', to: '/utilities/text' },
            ]
        },
        {
            label: 'Pages', icon: 'pi pi-briefcase',
            items: [
                { label: 'Crud', icon: 'pi pi-pencil', to: '/pages/crud' },
                { label: 'Calendar', icon: 'pi pi-calendar-plus', to: '/pages/calendar' },
                { label: 'Timeline', icon: 'pi pi-calendar', to: '/pages/timeline' },
                { label: 'Landing', icon: 'pi pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                { label: 'Login', icon: 'pi pi-sign-in', to: '/login' },
                { label: 'Invoice', icon: 'pi pi-dollar', to: '/pages/invoice' },
                { label: 'Help', icon: 'pi pi-question-circle', to: '/pages/help' },
                { label: 'Error', icon: 'pi pi-times-circle', to: '/error' },
                { label: 'Not Found', icon: 'pi pi-exclamation-circle', to: '/notfound' },
                { label: 'Access Denied', icon: 'pi pi-lock', to: '/access' },
                { label: 'Empty Page', icon: 'pi pi-circle-off', to: '/pages/empty' },
                { label: 'Register' , icon:'pi pi-circle-off', to:'/singup'},
            ]
        },
        {
            label: 'Hierarchy', icon: 'pi pi-align-left',
            items: [
                {
                    label: 'Submenu 1', icon: 'pi pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1.1', icon: 'pi pi-align-left',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-align-left' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-align-left' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-align-left' },
                            ]
                        },
                        {
                            label: 'Submenu 1.2', icon: 'pi pi-align-left',
                            items: [
                                { label: 'Submenu 1.2.1', icon: 'pi pi-align-left' },
                                { label: 'Submenu 1.2.2', icon: 'pi pi-align-left' }
                            ]
                        },
                    ]
                },
                {
                    label: 'Submenu 2', icon: 'pi pi-align-left',
                    items: [
                        {
                            label: 'Submenu 2.1', icon: 'pi pi-align-left',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-align-left' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-align-left' },
                                { label: 'Submenu 2.1.3', icon: 'pi pi-align-left' },
                            ]
                        },
                        {
                            label: 'Submenu 2.2', icon: 'pi pi-align-left',
                            items: [
                                { label: 'Submenu 2.2.1', icon: 'pi pi-align-left' },
                                { label: 'Submenu 2.2.2', icon: 'pi pi-align-left' }
                            ]
                        },
                    ]
                }
            ]
        },*/
    ];

    let menuClick;
    let rightPanelClick;
    let configClick;
    let searchClick;
    let topbarUserMenuClick;

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        }
        else {
            unblockBodyScroll();
        }


    }, [staticMenuMobileActive]);

    useEffect(() => {
        setResetActiveIndex(true)
        setMenuActive(false)
    }, [menuMode])

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setResetActiveIndex(true)
            hideOverlayMenu();
        }
        if (!event.item.items && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }
    };

    const onMenuClick = (event) => {
        if (menuActive && event.target.className === 'layout-menu-container') {
            setResetActiveIndex(true);
            setMenuActive(false)
        }
        menuClick = true;
    }

    const onMenuModeChange = (menuMode) => {
        setMenuMode(menuMode)
        if (menuMode === 'sidebar') {
            if (sidebarStatic) {
                setSidebarActive(true)
            }
        }
        else {
            setSidebarActive(false)
            if (topbarScheme !== menuScheme) {
                setMenuScheme(topbarScheme)
            }
        }
        if (topbarScheme === 'dark') {
            setThemeScheme('dark')
        }
    };

    const onColorSchemeChange = (scheme) => {
        setColorScheme(scheme);
        props.setColorScheme(scheme)
    };

    const onThemeSchemeChange = (scheme) => {
        setThemeScheme(scheme)
        setMenuScheme(scheme)
        setTopbarScheme(scheme)
    };

    const onTopbarSchemeChange = (scheme) => {
        setTopbarScheme(scheme)
    };

    const onMenuSchemeChange = (scheme) => {
        setMenuScheme(scheme)
    };

    const onThemeChange = (themeColor) => {
        setTheme(themeColor)
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setRightPanelActive(false);

        if (isMobile()) {
            setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
            if (staticMenuMobileActive) {
                blockBodyScroll();
            } else {
                unblockBodyScroll();
            }
        }
        event.preventDefault();
    };

    const isMobile = () => {
        return window.innerWidth <= 991;
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const hideOverlayMenu = () => {
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const onRightPanelClick = () => {
        rightPanelClick = true;
    };

    const onRightPanelButtonClick = () => {
        setRightPanelActive((prevState) => !prevState)
        rightPanelClick = true;
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive(prevConfigActive => !prevConfigActive);
        configClick = true;
    };

    const onTopbarSearchToggle = () => {
        setSearchActive(prevState => !prevState);
        searchClick = true;
    };

    const onTopbarSearchClick = () => {
        searchClick = true
    };

    const onTopbarUserMenuClick = () => {
        setTopbarUserMenuActive(prevState => !prevState);
        topbarUserMenuClick = true;
    };

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            setSearchActive(false)
            searchClick = false;
        }

        if (!topbarUserMenuClick && topbarUserMenuActive) {
            setTopbarUserMenuActive(false)
            topbarUserMenuClick = false;
        }

        if (!rightPanelClick && rightPanelActive) {
            setRightPanelActive(false);
        }

        if (!configClick && configActive) {
            setConfigActive(false);
        }

        if (!menuClick) {
            if (isSlim() || isHorizontal()) {
                setResetActiveIndex(true)
                setMenuActive(false)
            }

            if (staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        searchClick = false;
        topbarUserMenuClick = false;
        rightPanelClick = false;
        configClick = false;
        menuClick = false;
    };

    const onSidebarMouseOver = () => {
        setSidebarActive(!isMobile());
    };

    const onSidebarMouseLeave = () => {
        setSidebarActive(false)
    };

    const onToggleMenu = (event) => {
        menuClick = true;
        setSidebarStatic(prevState => !prevState);

        event.preventDefault();
    };

    const onRootMenuItemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const layoutClassName = classNames('layout-wrapper', {
        'layout-sidebar': menuMode === 'sidebar',
        'layout-static': menuMode === 'sidebar' && sidebarStatic,
        'layout-horizontal': menuMode === 'horizontal',
        'layout-rightpanel-active': rightPanelActive,
        'layout-slim': menuMode === 'slim',
        'layout-mobile-active': staticMenuMobileActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple
    }, 'layout-menu-' + menuScheme + ' layout-topbar-' + topbarScheme);

    return (
        
        <div className={layoutClassName} onClick={onDocumentClick}>

            <AppTopbar topbarScheme={topbarScheme} onRightPanelButtonClick={onRightPanelButtonClick}
                searchActive={searchActive} onTopbarSearchToggle={onTopbarSearchToggle} onTopbarSearchClick={onTopbarSearchClick}
                topbarUserMenuActive={topbarUserMenuActive} onTopbarUserMenuClick={onTopbarUserMenuClick}
                menu={menu} menuActive={menuActive} onRootMenuItemClick={onRootMenuItemClick} mobileMenuActive={staticMenuMobileActive}
                onMenuItemClick={onMenuItemClick} menuMode={menuMode}
                sidebarStatic={sidebarStatic} sidebarActive={sidebarActive} onSidebarMouseOver={onSidebarMouseOver} onSidebarMouseLeave={onSidebarMouseLeave}
                onToggleMenu={onToggleMenu} onMenuButtonClick={onMenuButtonClick} resetActiveIndex={resetActiveIndex} onMenuClick={onMenuClick} />

            <AppRightPanel onRightPanelClick={onRightPanelClick} />

            <AppConfig configActive={configActive} onConfigButtonClick={onConfigButtonClick} onConfigClick={onConfigClick}
                menuMode={menuMode} onMenuModeChange={onMenuModeChange}
                ripple={ripple} onRippleChange={onRippleChange}
                inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange}
                topbarScheme={topbarScheme} onTopbarSchemeChange={onTopbarSchemeChange}
                menuScheme={menuScheme} onMenuSchemeChange={onMenuSchemeChange}
                themeScheme={themeScheme} onThemeSchemeChange={onThemeSchemeChange}
                theme={theme} onThemeChange={onThemeChange} />

            <AppNewModel/>

            <div className="layout-main">
                <div className="layout-content">
                    <Routes colorScheme={colorScheme} Help={Help}/>
                </div>
                <AppFooter />
            </div>
            <div className="layout-mask modal-in"></div>
        </div>
       
    );

}

export default App;
