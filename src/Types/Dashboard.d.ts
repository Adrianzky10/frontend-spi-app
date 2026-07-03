export interface ILatestBorrowing {
  id: string;
  user_name: string;
  item_name: string;
  borrow_date: string;
  return_date: string;
  status: string;
  created_at: string;
}

export interface IDashboard {
  total_inventory: number;
  total_categories: number;
  total_students: number;
  total_borrowings: number;

  pending: number;
  approved: number;
  borrowed: number;
  returned: number;

  out_of_stock: number;
  returned_today: number;

  latest_borrowings: ILatestBorrowing[];
}
