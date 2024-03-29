import { HashRouter, Route, Routes } from "react-router-dom"
import BooksViewer from "./pages/Books/BooksViewer/BooksViewer"
import Navbar from "./components/Navbar/Navbar"
import BookModifier from "./pages/Books/BookAdder/BookAdder"
import ChaptersViewer from "./pages/Chapters/ChaptersViewer/ChaptersViewer"
import ChapterModifier from "./pages/Chapters/ChapterModal/ChapterModal"
import ErrorPage from "./pages/ErrorPage"
import Flashcards from "./pages/Flashcards/Flashcards"
import Register from "./pages/Authenticate/Register/Register"
import Authenticate from "./pages/Authenticate/Authenticate"
import Home from "./pages/Home/Home"
import Login from "./pages/Authenticate/Login/Login"
import UserPage from "./pages/UserPage/UserPage"
import AboutPage from "./pages/About/AboutPage"
import Summaries from "./pages/summaries"
import Notes from "./pages/notes"
// @ts-ignore
import libraryImage from "./assets/images/library.jpg"
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage"
import TestingBanner from "./components/Welcome/SubComponents/TestingBanner/TestingBanner"
import BookResourcesPage from "./pages/BookResourcesPage/BookResourcesPage"
import EditorPage from "./pages/EditorPage/EditorPage"
import CharacterPage from "./pages/CharacterPage/CharacterPage"
import CitationPage from "./pages/CitationPage/CitationPage"
import VocabularyPage from "./pages/VocabularyPage/VocabularyPage"

type Props = {}

const App = (props: Props) => {
  return (
    <div className="app">
      <div
        className="wrapper"
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          backgroundImage: `url(${libraryImage})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          filter: "blur(8px)",
        }}
      ></div>
      {/* TODO Should we use BrowserRouter? */}
      <HashRouter>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/bookmodifier" element={<BookModifier />} /> */}
          {/* <Route path="/bookmodifier/:bookID" element={<BookModifier />} /> */}
          <Route path="/booksviewer" element={<BooksViewer />} />
          {/* @ts-ignore */}
          <Route path="/chaptersviewer" element={<ChaptersViewer />} />
          <Route path="/chaptersviewer/:bookID" element={<ChaptersViewer />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/summaries" element={<Summaries />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/bookresources" element={<BookResourcesPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/character" element={<CharacterPage />} />
          <Route path="/citation" element={<CitationPage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          {/* TODO Add Contact */}
          {/* TODO Add Community */}
          {/* TODO Add Account */}
          {/* TODO Add Settings */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <footer>
          {sessionStorage.getItem("isTesting") && <TestingBanner />}
        </footer>
      </HashRouter>
    </div>
  )
}

export default App
