import {LM_Author} from "../types/Book/author"

export default class Author implements LM_Author  {
  author_id: string;
  author_prename: string;
  author_name: string | undefined;
  favorite: boolean = false;
  
  constructor(author_id: string, author_prename: string, author_name: undefined | string) {
    this.author_id = author_id;
    this.author_prename = author_prename;
    this.author_name = author_name;
  }

}
