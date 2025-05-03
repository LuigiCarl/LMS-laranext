"use client";

import * as React from "react";
import Image from "next/image";
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"; // Make sure these are available

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    cover: "/test.jpg",
    description: "A novel set in the Roaring Twenties, exploring themes of wealth and identity.",
    status: "available",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    cover: "/test.jpg",
    description: "A chilling depiction of a totalitarian regime and constant surveillance.",
    status: "not_available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    cover: "/test.jpg",
    description: "A touching story of racial injustice in the American South.",
    status: "available",
  },
];

const Feature = () => {
  const [selectedBook, setSelectedBook] = React.useState(books[0]);

  return (
    <Section aria-label="Featured Books">
      <Container>
        <div className="flex flex-col lg:items-end md:items-end  sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
          <h3 className="text-2xl font-semibold">Featured</h3>

          {/* Modal Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-sm sm:text-base px-4 py-2 w-full sm:w-auto">View All Books</Button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">All Books</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {books.map((book, index) => (
                  <Card key={index} className="bg-black/10 dark:bg-white/10 p-4 h-full">
                    <div className="relative w-full aspect-[3/4] rounded overflow-hidden mb-3">
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <h4 className="text-md font-semibold">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <p className="text-xs mt-2">{book.description}</p>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <DialogClose asChild>
                  <Button variant="ghost">Close</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Carousel */}
        <Carousel className="relative w-full overflow-visible mb-3">
          <CarouselContent className="-ml-1">
            {books.map((book, index) => (
              <CarouselItem
                key={index}
                className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                onClick={() => setSelectedBook(book)}
              >
                <Card className="relative h-full flex flex-col transition-transform duration-300 ease-in-out scale-95 hover:scale-100 hover:shadow-lg z-10 bg-black/20 dark:bg-black/20">
                  <CardContent className="flex flex-col items-center pt-6 pb-6 px-4 gap-4">
                    <div className="w-full aspect-[3/4] relative rounded overflow-hidden">
                      <Image
                        src={book.cover}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <Button
                      variant={book.status === "available" ? "default" : "secondary"}
                      disabled={book.status !== "available"}
                      className="mt-2 text-sm font-medium"
                    >
                      {book.status === "available" ? "Borrow" : "Not Available"}
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Previous Slide" />
          <CarouselNext aria-label="Next Slide" />
        </Carousel>

        {/* Info Panel */}
        {selectedBook && (
          <Card className="bg-black/20 dark:bg-black/20 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="ml-6">
              <h3 className="text-xl font-semibold mb-1">{selectedBook.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">Author: {selectedBook.author}</p>
              <p className="text-sm text-muted-foreground italic mb-2">Genre: {selectedBook.genre}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-1 ${selectedBook.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
              >
                {selectedBook.status === "available" ? "Available" : "Not Available"}
              </span>
            </div>
            <div className="ml-6">
              <h4 className="text-lg font-semibold mt-0 mb-1">Description</h4>
              <p className="text-sm text-foreground">{selectedBook.description}</p>
            </div>
          </Card>
        )}
      </Container>
    </Section>
  );
};

export default Feature;
