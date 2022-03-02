import ChapterModifier from "./pages/Books/ChapterModifier/ChapterModifier";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksViewer from "./pages/Books/BooksViewer/BooksViewer";
import Navbar from "./components/Navbar/Navbar";
import BookModifier from "./pages/Books/BookModifier/BookModifier";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="app">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BooksViewer />} />
          <Route path="/bookmodifier" element={<BookModifier />} />
          <Route path="/booksviewer" element={<BooksViewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
