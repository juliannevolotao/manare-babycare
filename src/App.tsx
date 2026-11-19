import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useHashRoute } from './hooks/useHashRoute';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';
import { SejaBaba } from './pages/SejaBaba';

export function App() {
  const view = useHashRoute();
  return (
    <>
      <Header />
      {view === 'home' && <Home />}
      {view === 'seja-baba' && <SejaBaba />}
      {view === 'cadastro' && <Cadastro />}
      <Footer />
    </>
  );
}
