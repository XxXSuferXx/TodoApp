import { Route, Routes } from "react-router-dom"
import { ROUTES } from "./routes"
import Layout from "./Components/Layout"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Todos from "./pages/Todos"
import TodoDetail from "./pages/TodoDetail"
import Forbidden from "./pages/Forbidden"
import ProtectedRoute from "./Components/ProtectedRoute"
import { ROLES } from "./utils/Roles"
import RequireRole from "./Components/RequireRole"

function App() {

  return (
     <Routes>
        <Route element={<Layout />}>
        {/* public */}
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.forbidden} element={<Forbidden />} />
        {/* must be logged In */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.todos} element={<Todos />} />
          <Route path={ROUTES.todoDetail} element={<TodoDetail/>}/>

        {/* logged in and Admin*/}
        <Route element={<RequireRole allowedRoles={[ROLES.ADMIN]} />}>
          <Route path={ROUTES.admin} element={<Admin />} />
          </Route>
          </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
