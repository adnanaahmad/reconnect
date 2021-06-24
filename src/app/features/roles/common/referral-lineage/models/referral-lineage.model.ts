export class BuyerModel {
  id: number;
  dealStatus: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  children: Array<{}> ;
  constructor({id, dealStatus, name, photo, phone, email, children }: {id: number;
    dealStatus: string
    name: string
    photo: string
    phone: string
    email: string
    children: Array<{}> }){
    this.id = id;
    this.dealStatus = dealStatus;
    this.name = name;
    this.photo = photo;
    this.phone = phone;
    this.email = email;
    this.children = children;
  }
}
