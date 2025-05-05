export interface Book {
    id: string
    title: string
    author: string
    description: string
    coverImage: string
    isbn: string
    category: string
    available: boolean
    dueDate?: string
  }
  
  export interface BorrowedBook extends Book {
    borrowDate: string
    dueDate: string
  }
  
  export const books: Book[] = [
    {
      id: "b1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "A novel of the Jazz Age that follows the life of mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780743273565",
      category: "Fiction",
      available: true,
    },
    {
      id: "b2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description:
        "The story of racial injustice and the loss of innocence in the American South during the Great Depression.",
      coverImage:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780061120084",
      category: "Fiction",
      available: true,
    },
    {
      id: "b3",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      description:
        "A survey of the history of humankind from the evolution of archaic human species in the Stone Age up to the present day.",
      coverImage:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780062316097",
      category: "Non-Fiction",
      available: true,
    },
    {
      id: "b4",
      title: "Educated",
      author: "Tara Westover",
      description:
        "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
      coverImage:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780399590504",
      category: "Biography",
      available: true,
    },
    {
      id: "b5",
      title: "Dune",
      author: "Frank Herbert",
      description:
        "A science fiction novel set in the distant future amidst a feudal interstellar society in which noble houses control planetary fiefs.",
      coverImage:
        "https://images.unsplash.com/photo-1531901599113-f5bc2e0ba84a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780441172719",
      category: "Science Fiction",
      available: true,
    },
    {
      id: "b6",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      description:
        "A children's fantasy novel about the adventures of hobbit Bilbo Baggins, who is hired by the wizard Gandalf to help a group of dwarves.",
      coverImage:
        "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780547928227",
      category: "Fantasy",
      available: true,
    },
    {
      id: "b7",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      description:
        "A book that summarizes research that Kahneman conducted over decades, often in collaboration with Amos Tversky on cognitive biases.",
      coverImage:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780374533557",
      category: "Psychology",
      available: true,
    },
    {
      id: "b8",
      title: "1984",
      author: "George Orwell",
      description:
        "A dystopian social science fiction novel and cautionary tale set in a totalitarian society led by Big Brother.",
      coverImage:
        "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780451524935",
      category: "Fiction",
      available: true,
    },
    {
      id: "b9",
      title: "The Alchemist",
      author: "Paulo Coelho",
      description:
        "A novel about a young Andalusian shepherd who dreams of finding a worldly treasure and embarks on a journey to find it.",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780062315007",
      category: "Fiction",
      available: true,
    },
    {
      id: "b10",
      title: "Atomic Habits",
      author: "James Clear",
      description: "A practical guide to breaking bad habits and building good ones, based on scientific research.",
      coverImage:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9780735211292",
      category: "Self-Help",
      available: true,
    },
    {
      id: "b11",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      description: "A psychological thriller about a woman who shoots her husband and then stops speaking.",
      coverImage:
        "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9781250301697",
      category: "Mystery",
      available: true,
    },
    {
      id: "b12",
      title: "The Power of Now",
      author: "Eckhart Tolle",
      description: "A guide to spiritual enlightenment that emphasizes the importance of living in the present moment.",
      coverImage:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isbn: "9781577314806",
      category: "Spirituality",
      available: true,
    },
  ]
  