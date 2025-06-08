
import { HashRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { AppSidebar } from "./ui/app-sidebar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";

function App() {

const queryClient = new QueryClient();
  return (
    
    <QueryClientProvider client={queryClient}>
       <Toaster position="top-right" />
    <HashRouter>
    <div className="bg-zinc-100 min-h-screen flex max-w-screen">
      <div className="sticky top-0 h-screen p-4">
        <AppSidebar />
      </div>

      <div className="flex-1 p-4 overflow-y-scroll">
        <AppRoutes />
      </div>
    </div>
  </HashRouter>
  </QueryClientProvider>
  );
}

export default App;
