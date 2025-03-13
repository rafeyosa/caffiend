import CoffeeForm from "./components/CoffeeForm";
import Hero from "./components/Hero";
import History from "./components/History";
import Layout from "./components/Layout";
import Stats from "./components/Stats";
import { useAuth } from "./context/AuthContext";

function App() {
  const { globalUser } = useAuth();
  const isAuthenticated = globalUser;
  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated} />
      {isAuthenticated && authenticatedContent}
    </Layout>
  );
}

export default App;
