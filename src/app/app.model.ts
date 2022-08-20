export interface Visitor {
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  cellPhone: number;
  city: string;
  email: string;
  inOut?: boolean;
  id?: number;
}

export const defaultVisitorInfo: Visitor = {
  name: 'John Doe',
  addressLine1: 'House No: 101, 5th Floor, Spectrum Tower',
  addressLine2: 'The Cursitor, 38 Chancery Lane',
  addressLine3: 'London WC2A 1EN',
  cellPhone: 3695728095,
  city: 'London',
  email: 'john.doe@gmail.com',
  inOut: false,
  id: 0
}

export interface VisitorState {
  visitorList: Visitor[];
}