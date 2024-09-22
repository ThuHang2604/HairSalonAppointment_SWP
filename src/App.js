import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Puclic routes */}
        <Route>
          {publicRoutes.map((item, index) => {
            const Layout = item.layout || DefaultLayout;
            const Page = item.component;
            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
