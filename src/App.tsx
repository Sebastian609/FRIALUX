
import { HashRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { AppSidebar } from "./components/app-sidebar";

function App() {


  return (
    <HashRouter>
    <div className="bg-zinc-900 min-h-screen flex max-w-screen">
      <div className="sticky top-0 h-screen p-4">
        <AppSidebar />
      </div>

      <div className="flex-1 p-4 overflow-y-scroll">
        <AppRoutes />
      </div>
    </div>
  </HashRouter>
  );
}

export default App;
