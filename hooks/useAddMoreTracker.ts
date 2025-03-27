import { useState } from 'react';

export const useAddMoreTracker = (limit = 2) => {
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>({});
  
  const incrementCount = (key: string) => {
    setClickCounts(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
  };
  
  const resetAllCounts = () => {
    setClickCounts({});
  };
  
  const isLimitReached = (key: string) => {
    return (clickCounts[key] || 0) >= limit;
  };
  
  return {
    clickCounts,
    incrementCount,
    resetAllCounts,
    isLimitReached
  };
};