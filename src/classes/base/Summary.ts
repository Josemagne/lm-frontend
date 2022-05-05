import {LM_Summary} from "../../types/summary/summary"
import {LM_EntityName} from "../../types/Entity/entity"

export default class Summary<T extends LM_EntityName> implements LM_Summary {
  summary_id: string;
  summary: string;
  summaryType: T;
  book_id: string | undefined;
  chapter_id: string | undefined;
  article_id: string | undefined;

  constructor( summary_id: string, summary: string, summaryType: T, book_id?: string, chapter_id?: string, article_id?: string) {
  this.summary_id = summary_id;
    this.summary = summary;
    this.summaryType = summaryType;
    this.book_id = book_id;
    this.chapter_id = chapter_id;
    this.article_id = article_id;
  }
}
