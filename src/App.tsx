import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { store, persistor } from './store';
import AppHeader from './components/comman/AppHeader';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ShowDetailsPage from './pages/ShowDetailsPage/ShowDetailsPage';
import NotFound from "./pages/404Page/not-found";
import Footer from './components/comman/Footer';
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="min-h-screen flex flex-col bg-[#141414] text-white">
            <BrowserRouter>
              <AppHeader />
              <main className="flex-grow container mx-auto px-4 py-6">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/show/:id" element={<ShowDetailsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </BrowserRouter>

            <Footer />            
          </div>
          <Toaster />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
