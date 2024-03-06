import { SideNavItemGroup } from "@/types/type";
import { BsEnvelope, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestionCircle } from "react-icons/bs";



export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboards",
        menuList: [{
            title: 'Dashboard',
            path: '/',
            icon: <BsHouseDoor size={20} />,
        }]
    },
    {
        title: "Manage",
        menuList: [
            {
                title: 'Configuration',
                path: '/app//dashboard',
                icon: <BsKanban size={20} />,
                submenu: true,
                subMenuItems: [
                    { title: 'Product', path: '/dashboard/products' },         
                    { title: 'symptom', path: '/dashboard/products' },            
                ],
            },
            {
                title: 'Appoinment',
                path: '/dashboard/appoinment',
                icon: <BsListUl size={20} />,
            },
            {
                title: 'Feedbacks',
                path: '/feedbacks',
                icon: <BsEnvelope size={20} />,
            }
        ]
    },
    {
        title: "Others",
        menuList: [
            {
                title: 'Account',
                path: '/account',
                icon: <BsGear size={20} />,
            },
            {
                title: 'Help',
                path: '/help',
                icon: <BsQuestionCircle size={20} />,
            }
        ]
    }

];