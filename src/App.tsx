import { HashRouter, Route, Routes } from "react-router-dom";
import BooksViewer from "./pages/Books/BooksViewer/BooksViewer";
import Navbar from "./components/Navbar/Navbar";
import BookModifier from "./pages/Books/BookModifier/BookModifier";
import ChaptersViewer from "./pages/Chapters/ChaptersViewer/ChaptersViewer";
import ChapterModifier from "./pages/Chapters/ChapterModifier/ChapterModifier";
import ErrorPage from "./pages/Error";
import Flashcards from "./pages/Flashcards/Flashcards";
import Register from "./sass/pages/Authentication/Register/Register";
import Authenticate from "./pages/Authenticate/Authenticate";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="app">
      {/* TODO Should we use BrowserRouter? */}
      <HashRouter>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<BooksViewer />} />
          {/* <Route path="/bookmodifier" element={<BookModifier />} /> */}
          {/* <Route path="/bookmodifier/:bookID" element={<BookModifier />} /> */}
          <Route path="/booksviewer" element={<BooksViewer />} />
          {/* @ts-ignore */}
          <Route path="/chaptersviewer/:bookID" element={<ChaptersViewer />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/register" element={<Register />} />
          {/* TODO Add Contact */}
          {/* TODO Add Community */}
          {/* TODO Add Account */}
          {/* TODO Add Settings */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <footer>{/* <Navigation /> */}</footer>
      </HashRouter>
    </div>
  );
};

export default App;
