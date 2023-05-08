import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import StuHome from "./components/stuhome";
import StuLogin from "./components/stulogin";
import SignUp from "./components/signup";
import BookList from "./components/booklist";
import StuCategories from "./components/stucategories";
import IssueCard from "./components/issuecard";
import LibHome from "./components/libhome";
import LibLogin from "./components/liblogin";
import NewBook from "./components/newbook";
import LibCategories from "./components/libcategories";
import BorrowRequests from "./components/borrowrequests";
import ReturnRequests from "./components/returnrequests";
import IssueCardRequests from "./components/issuecardrequests";
import StuBook from "./components/stubook";
import LibBook from "./components/libbook";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.token);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="student">
          <Route index element={<StuHome />}></Route>
          <Route path="login" element={<StuLogin />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route
            path="issuecard"
            element={isAuth ? <IssueCard /> : <Navigate to="/student/login" />}
          ></Route>
          <Route path="books">
            <Route index element={<BookList />}></Route>
            <Route path=":id" element={<StuBook />}></Route>
            <Route path="categories" element={<StuCategories />}></Route>
          </Route>
        </Route>
        <Route path="librarian">
          <Route index element={<LibHome />}></Route>
          <Route path="login" element={<LibLogin />}></Route>
          <Route path="newbook" element={<NewBook />}></Route>
          <Route path="borrowrequests" element={<BorrowRequests />}></Route>
          <Route path="returnrequests" element={<ReturnRequests />}></Route>
          <Route
            path="issuecardrequests"
            element={<IssueCardRequests />}
          ></Route>
          <Route path="books">
            <Route index element={<BookList />}></Route>
            <Route path=":id" element={<LibBook />}></Route>
            <Route path="categories" element={<LibCategories />}></Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
