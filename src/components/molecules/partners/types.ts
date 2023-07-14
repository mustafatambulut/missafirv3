export interface IPartners{
    header: Header;
    body: Body[];
}
export interface Header {
    id: number
    title: string
    description: string
}

export interface Body {
    id: number
    image: string
    link: string
    label: string
}