// types/borrow.ts

import type { Book } from '@/types/book';
import type { User } from '@/types/user';

export type BorrowStatus = 'active' | 'returned';

export type Borrow = {
  id: number;
  book_id: number;
  borrower_id: number;
  borrow_date: string;     // ISO format
  due_date: string;        // ISO format
  return_date?: string | null;
  status: BorrowStatus;
  created_at: string;
  updated_at: string;

  // Optional relations
  book?: Book;
  borrower?: User;
};

// import type { Borrow } from '@/types/borrow';

// const renderBorrow = (borrow: Borrow) => {
//   return (
//     <div>
//       <h3>{borrow.book?.title}</h3>
//       <p>Borrowed by: {borrow.borrower?.name}</p>
//       <p>Status: {borrow.status}</p>
//     </div>
//   );
// };
