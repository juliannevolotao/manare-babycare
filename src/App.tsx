import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useHashRoute } from './hooks/useHashRoute';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';
import { SejaBaba } from './pages/SejaBaba';

export function App() {
  const view = useHashRoute();
  useScrollReveal(view);
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
