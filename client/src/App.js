import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import { useAppContext } from "./context/appContext";
import Spinnerr from "./components/Spinner.js";
import ProtectedRoute from "./pages/ProtectedRoute";
import SharedLayout from "./pages/SharedLayout";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  const { isLoading } = useAppContext();
  return (
    <BrowserRouter>
      {isLoading ? (
        <Spinnerr />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Tasks />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="edit-task/:id" element={<EditTask />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
