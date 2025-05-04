"use client";
import React, { useState } from 'react';
import EsimHeader from '@/components/sections/esimPage/EsimHeader';
import EsimTabs from '@/components/sections/esimPage/EsimTabs';

const EsimPage = () => {
  const [activeTab, setActiveTab] = useState('COUNTRY');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <EsimHeader />
      
      <div className="mb-12">
        <EsimTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default EsimPage;
