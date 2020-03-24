
export interface Credentials {
  username: string;
  // password: string;
}

export interface GeoLocation {
  lat?: number,
  lng?: number
}
export interface IAddress {
  street?: string,
  suite?: string,
  city?: string,
  zipcode?: string,
  geo?: GeoLocation
}

export interface ICompany {
  name?: string,
  catchPhrase?: string,
  bs?: string
}

export interface IUser {
  id?: number,
  name?: string,
  username?: string,
  email?: string,
  address?: IAddress,
  phone?: string,
  website?: string,
  company?: ICompany
}

export class User implements IUser {
  constructor(
    public id?: number,
    public name?: string,
    public username?: string,
    public email?: string,
    public address?: IAddress,
    public phone?: string,
    public website?: string,
    public company?: ICompany
  ) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.username = username ? username : null;
    this.email = email ? email : null;
    this.address = address ? address : null;
    this.phone = phone ? phone : null;
    this.website = website ? website : null;
    this.company = company ? company : null;
  }
}
