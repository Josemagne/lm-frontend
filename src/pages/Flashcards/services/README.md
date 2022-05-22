Here we use RxJS for reactive programming.

We have a component that gets data from the store and pushes it trough a pipeline where it is changed. Then we usually have a component like FlashcardPagination that subscribes to the observable and gets its changed data.
