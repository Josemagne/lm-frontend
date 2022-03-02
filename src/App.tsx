import ChapterModifier from "./pages/Books/ChapterModifier/ChapterModifier";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksViewer from "./pages/Books/BooksViewer/BooksViewer";
import Navbar from "./components/Navbar/Navbar";
import BooksModifier from "./pages/Books/BooksModifier/BooksModifier";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="app">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BooksViewer />} />
          <Route path="/booksmodifier" element={<BooksModifier />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
