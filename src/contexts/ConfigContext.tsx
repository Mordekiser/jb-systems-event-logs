
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConfigContextType {
  groupingStrategy: string;
  showRegionalBreakdown: boolean;
  combineHealthchecks: boolean;
  setGroupingStrategy: (strategy: string) => void;
  setShowRegionalBreakdown: (show: boolean) => void;
  setCombineHealthchecks: (combine: boolean) => void;
  applyGroupingStrategy: (strategy: string) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [groupingStrategy, setGroupingStrategy] = useState("domain");
  const [showRegionalBreakdown, setShowRegionalBreakdown] = useState(true);
  const [combineHealthchecks, setCombineHealthchecks] = useState(false);

  const applyGroupingStrategy = (strategy: string) => {
    setGroupingStrategy(strategy);
    console.log(`Applied grouping strategy: ${strategy}`);
  };

  return (
    <ConfigContext.Provider
      value={{
        groupingStrategy,
        showRegionalBreakdown,
        combineHealthchecks,
        setGroupingStrategy,
        setShowRegionalBreakdown,
        setCombineHealthchecks,
        applyGroupingStrategy,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
