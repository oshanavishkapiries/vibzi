interface TopUpPackage {
  packageName: string;
  data: string;
  validity: string;
  price: string;
}

interface PackageDetails {
  sms: string;
  smsInfo: string;
  data: string;
  dataInfo: string;
  voice: string;
  voiceInfo: string;
}

interface AdditionalInfo {
  network: string;
  planType: string;
  validityPolicy: string;
  ipRouting: string;
  ekycRequired: string;
  ekycValidityPeriod: string;
  topupOption: string;
  otherInfo: string;
}

interface EsimPackage {
  id: string;
  packageName: string;
  imageUrl: string;
  coverage: string;
  validity: string;
  price: string;
  destination: string;
  provider: string;
  productUrl: string;
  packageType: string;
  region: string | null;
  packageDetails: PackageDetails;
  topUpPackages: TopUpPackage[];
  additionalInfo: AdditionalInfo;
  supportedCountries: string[];
}

export type { EsimPackage };