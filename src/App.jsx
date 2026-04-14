import { useEffect, useState } from 'react';
import { PrimaryMenu } from './components/PrimaryMenu.jsx';
import { BottomBar } from './components/BottomBar.jsx';
import { HomePage } from './components/HomePage.jsx';
import { IntelligencePage } from './components/IntelligencePage.jsx';
import { WaterfallsPage } from './components/WaterfallsPage.jsx';
import { ValuationsPage } from './components/ValuationsPage.jsx';
import { DocumentsPage } from './components/DocumentsPage.jsx';
import { ReportsPage } from './components/ReportsPage.jsx';
import { CompaniesPage } from './components/CompaniesPage.jsx';
import { CompanyWorkspace } from './components/CompanyWorkspace.jsx';
import { AppDataProvider } from './lib/appData.js';
import { UiStateProvider } from './lib/uiState.jsx';

function renderProductPage(product, { onOpenCompany }) {
  if (product === 'valuations') return <ValuationsPage onOpenCompany={onOpenCompany} />;
  if (product === 'waterfalls') return <WaterfallsPage />;
  if (product === 'documents') return <DocumentsPage />;
  if (product === 'reports') return <ReportsPage />;
  return <IntelligencePage />;
}

export default function App() {
  const [shell, setShell] = useState('home');
  const [product, setProduct] = useState('intelligence');
  const [companyRoute, setCompanyRoute] = useState('product'); // product | companies | company

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product, shell, companyRoute]);

  return (
    <UiStateProvider>
      <AppDataProvider>
        {shell === 'home' ? (
          <div className="app-layout app-layout--home">
            <PrimaryMenu
              variant="company"
              activeProduct="intelligence"
              onLogoClick={() => setShell('home')}
              onProductNavigate={(productId) => {
                setShell('company');
                setCompanyRoute('product');
                setProduct(productId ?? 'intelligence');
              }}
              onCompaniesSeeAll={() => {
                setShell('company');
                setCompanyRoute('companies');
              }}
              onCompaniesSelect={() => {
                setShell('company');
                setCompanyRoute('company');
              }}
            />
            <HomePage
              onOpenPinned={(productId) => {
                setShell('company');
                setCompanyRoute('product');
                setProduct(productId ?? 'intelligence');
              }}
            />
          </div>
        ) : (
          <div className="app-layout app-layout--company">
            <PrimaryMenu
              variant="company"
              activeProduct={product}
              onLogoClick={() => setShell('home')}
              onProductNavigate={(productId) => {
                setCompanyRoute('product');
                setProduct(productId ?? 'intelligence');
              }}
              onCompaniesSeeAll={() => setCompanyRoute('companies')}
              onCompaniesSelect={() => setCompanyRoute('company')}
            />
            {companyRoute === 'companies' ? (
              <CompaniesPage onOpenCompany={() => setCompanyRoute('company')} />
            ) : companyRoute === 'company' ? (
              <CompanyWorkspace />
            ) : (
              renderProductPage(product, { onOpenCompany: () => setCompanyRoute('company') })
            )}
            <BottomBar />
          </div>
        )}
      </AppDataProvider>
    </UiStateProvider>
  );
}
