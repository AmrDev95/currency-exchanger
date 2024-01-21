import { INavItem } from "../interfaces/INavItem";

export const NavItems:INavItem[] = [
    {
        routeUrl:'/currency-exchanger',
        icon:'heroicons:money',
        name:'Financial',
        disabled:false,
        children:[
            {
                routeUrl:'/currency-exchanger/details/USD/EUR',
                disabled:false,
                icon:'heroicons:dollar',
                name:'USD to EUR',
                children:[]
            },

            {
                routeUrl:'/currency-exchanger/home',
                disabled:false,
                icon:'heroicons:refresh',
                name:'Convert Currency',
                children:[]
            }
        ]
    }
];