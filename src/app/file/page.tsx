'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const FilePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilePageContent />
    </Suspense>
  );
};

const FilePageContent = () => {
  const searchParams = useSearchParams();
  const [docs, setDocs] = useState<{ uri: string }[]>([]);

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      setDocs([{ uri: url }]);
    }
  }, [searchParams]);

  return (
    <div className="w-full h-screen">
      {docs.length > 0 && (
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          style={{ height: '100%' }}
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: true
            }
          }}
        />
      )}
    </div>
  );
};

export default FilePage;