import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const COMPANIES = [
  { id: 1, name: 'Bharat Auto Parts Ltd.' },
  { id: 2, name: 'Sunrise FMCG Industries' },
];

const PLANTS = {
  1: [
    { id: 'P01', name: 'Plant-01 — Pune' },
    { id: 'P02', name: 'Plant-02 — Nashik' },
  ],
  2: [
    { id: 'P03', name: 'Plant-01 — Mumbai' },
  ],
};

export const AppProvider = ({ children }) => {
  const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0]);
  const [selectedPlant, setSelectedPlant] = useState(PLANTS[1][0]);

  const plants = PLANTS[selectedCompany.id] || [];

  const changeCompany = (company) => {
    setSelectedCompany(company);
    setSelectedPlant(PLANTS[company.id]?.[0] || null);
  };

  return (
    <AppContext.Provider
      value={{ selectedCompany, selectedPlant, companies: COMPANIES, plants, changeCompany, setSelectedPlant }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
