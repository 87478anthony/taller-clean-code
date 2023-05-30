export interface Offices {
  address: string;
  code: string;
  currency: string;
  description: string;
  identification: string;
}

export interface BranchOffice {
  branchOffice: Offices[];
}
