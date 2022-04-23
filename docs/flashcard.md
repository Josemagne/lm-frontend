# Flashcard

There are essentially two types of flashcards. Flashcards for a book and flashcards for a chapter.
The flashcard for a chapter is called ChapterFlashcard. the flashcard for a book is called BookFlashcard.

## BookFlashcard

A BookFlashcard is created if the user adds a flashcard without specifying a particular chapter. This done on the BookModal component on the BooksViewer (BooksViewer.tsx) page.

When the user requests all the flashcard for a book then collect the BookFlashcard and ChapterFlashcard objects from the Database.

## ChapterFlashcard

A ChapterFlashcard is created on the ChapterModifier (ChapterModifier.tsx) component which is on the ChaptersViewer (ChaptersViewer.tsx) page.

## CollectionFlashcard

A CollectionFlashcard is a flashcard that is part of a collection.

## Auxiliary

### Flashcard Is The Base Class

A Flashcard is the base class for BookFlashcard, ChapterFlashcard and CollectionFlashcard

### Question is not a Flashcard

A user could have a question about a subject in a book that is not answered therein.
Exempli gratia: The user has not yet begun a chapter, has read the title and has already a question. During reading the user finds the answer.

As soon as the Question is answered it is converted to a Flashcard.
