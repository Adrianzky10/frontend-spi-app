export interface IBorrowing {
  id: number;
  user_id: number;
  user_name: string;
  item_id: number;
  item_name: string;
  borrow_date: string;
  return_date: string;
  status: string;
  rejection_reason: string | null;
  created_at: string;
  document_id: number;
  document_name: string;
  document_url: string;
}

export interface IMyBorrowing {
  id: number;
  user_id: number;
  user_name: string;
  item_id: number;
  item_name: string;
  borrow_date: string;
  return_date: string;
  status: "Pending" | "Approved" | "Borrowed" | "Returned" | "Rejected";
  rejection_reason: string | null;
  created_at: string;
  document_id: number;
  document_name: string;
  document_url: string;
}

export interface IRejectBorrowing {
  rejection_reason: string;
}

export interface IUpdateBorrowingStatus {
  status: string;
  rejection_reason?: string;
}

export interface ICreateBorrowing {
  item_id: string;
  borrow_date: string;
  return_date: string;
  document: File;
}

export interface ICreateBorrowingForm {
  borrow_date: string;
  return_date: string;
  document: File;
}
