export interface IDrawer {
  drawerCloseRef: Ref;
}

export interface Ref {
  current: ICurrent;
}

export interface ICurrent {
  click: void;
}
