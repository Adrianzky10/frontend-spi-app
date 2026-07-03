export interface IInventory {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  description: string;
  stock: number;
  image_url: string;
  created_at: string;
}

export interface ICreateInventory {
  category_id: string;
  name: string;
  description: string;
  stock: number;
  image: File;
}

export interface IUpdateInventory {
  category_id: string;
  name: string;
  description: string;
  stock: number;
  image?: File;
}

export interface IBorrowingDocument {
  id: number;
  file_name: string;
  file_url: string;
}

export interface IDetailBorrowing {
  id: string;
  user_id: number;
  user_name: string;
  item_id: number;
  item_name: string;
  borrow_date: string;
  return_date: string;
  status: string;
  rejection_reason: string | null;
  created_at: string;
  document: IBorrowingDocument;
}
