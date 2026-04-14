import { useEffect, useState } from 'react';
import { PrimaryMenu } from './components/PrimaryMenu.jsx';
import { BottomBar } from './components/BottomBar.jsx';
import { HomePage } from './components/HomePage.jsx';
import { IntelligencePage } from './components/IntelligencePage.jsx';
import { WaterfallsPage } from './components/WaterfallsPage.jsx';
import { ValuationsPage } from './components/ValuationsPage.jsx';
import { DocumentsPage } from './components/DocumentsPage.jsx';
import { ReportsPage } from './components/ReportsPage.jsx';

function renderProductPage(product) {
  if (product === 'valuations') return <ValuationsPage />;
  if (product === 'waterfalls') return <WaterfallsPage />;
  if (product === 'documents') return <DocumentsPage />;
  if (product === 'reports') return <ReportsPage />;
  return <IntelligencePage />;
}

export default function App() {
  const [shell, setShell] = useState('home');
  const [product, setProduct] = useState('intelligence');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product, shell]);

  if (shell === 'home') {
    return (
      <div className="app-layout app-layout--home">
        <PrimaryMenu
          variant="company"
          activeProduct="intelligence"
          onLogoClick={() => setShell('home')}
          onProductNavigate={(productId) => {
            setShell('company');
            setProduct(productId ?? 'intelligence');
          }}
        />
        <HomePage />
      </div>
    );
  }

  return (
    <div className="app-layout app-layout--company">
      <PrimaryMenu
        variant="company"
        activeProduct={product}
        onLogoClick={() => setShell('home')}
        onProductNavigate={(productId) => {
          setProduct(productId ?? 'intelligence');
        }}
      />
      {renderProductPage(product)}
      <BottomBar />
    </div>
  );
}
