"use client";

import * as React from "react";
import { Button } from "@/components/ui/button"; // Import the Button component
import Image from "next/image";
import { Section, Container } from "@/components/craft";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Book data with description and status
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
  // other books...
];

const Feature = () => {
  const [selectedBook, setSelectedBook] = React.useState(books[0]);

  return (
    <Section aria-label="Featured Books">
      <Container>
        <h3 className="text-2xl font-semibold mb-2">Featured</h3>

        {/* Carousel: only cover and Borrow button */}
        <Carousel className="relative w-full overflow-visible mb-3">
          <CarouselContent className="-ml-1">
            {books.map((book, index) => (
              <CarouselItem
                key={index}
                className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                onClick={() => setSelectedBook(book)}
              >
                <Card className="relative h-full flex flex-col transition-transform duration-300 ease-in-out scale-95 hover:scale-100 hover:shadow-lg z-10 bg-black/20 dark:bg-white/10">
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
                      variant={book.status === "available" ? "default" : "secondary"} // Use theme for availability
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

        {/* Info Panel: show book details */}
        {selectedBook && (
          <Card className="bg-black/10 dark:bg-white/10 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Column: Title, Author, Genre, Status */}
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

            {/* Second Column: Description */}
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
