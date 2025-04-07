"use client";
import React, { useState } from 'react';
import EsimHeader from '@/components/sections/esimPage/EsimHeader';
import EsimTabs from '@/components/sections/esimPage/EsimTabs';
import CountryCard from '@/components/sections/esimPage/CountryCard';
import { countries } from '@/components/sections/esimPage/countries';

const EsimPage = () => {
  const [activeTab, setActiveTab] = useState('local');

  return (
    <div className="container mx-auto px-4 py-8">
      <EsimHeader />
      
      <div className="mb-12">
        <EsimTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default EsimPage;
