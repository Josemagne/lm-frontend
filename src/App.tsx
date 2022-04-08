import { HashRouter, Route, Routes } from "react-router-dom";
import BooksViewer from "./pages/Books/BooksViewer/BooksViewer";
import Navbar from "./components/Navbar/Navbar";
import BookModifier from "./pages/Books/BookModifier/BookModifier";
import ChaptersViewer from "./pages/Chapters/ChaptersViewer/ChaptersViewer";
import ChapterModifier from "./pages/Chapters/ChapterModifier/ChapterModifier";
import ErrorPage from "./pages/Error";
import Navigation from "./components/Navigation/Navigation";

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
          {/* <Route
            path="/chaptermodifier/:bookID/:chapterID"
            element={<ChapterModifier />}
          /> */}
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
