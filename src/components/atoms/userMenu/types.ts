export interface IUserMenu {
    id?: number;
    image?: string;
    links: IUserMenuLinks;
    variant: string;
}

export interface IUserMenuLinks {
    data: IUserMenuData[];
}

export interface IUserMenuData {
    id: number;
    attributes: IUserMenuAttributes;
}

export interface IUserMenuAttributes {
    label: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    link: string;
    image: any;
    value: any;
}
