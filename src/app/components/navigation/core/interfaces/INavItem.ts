export interface INavItem{
    routeUrl:string;
    icon:string;
    children:INavItem[];
    name:string;
    disabled:boolean;
}