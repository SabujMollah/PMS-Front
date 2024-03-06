export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[]
};

export type product={
  productId?:number;
  name:string;
  price:number;
  description:string;
}

export type patient={
  patientId?:number;
  name:string;
  email:string;
}