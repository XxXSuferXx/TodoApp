import { Route, Routes } from "react-router-dom"
import { ROUTES } from "./routes"
import Layout from "./Components/Layout"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Todos from "./pages/Todos"

function App() {

  return (
     <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.todos} element={<Todos />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.admin} element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
