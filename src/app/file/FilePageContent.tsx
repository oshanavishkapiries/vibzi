"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DocViewer from "react-doc-viewer";
import { DocViewerRenderers } from "react-doc-viewer";

const FilePageContent = () => {
  const searchParams = useSearchParams();
  const [docs, setDocs] = useState<{ uri: string }[]>([]);

  useEffect(() => {
    const url = searchParams.get("url");
    if (url) {
      setDocs([{ uri: url }]);
    }
  }, [searchParams]);

  return (
    <div className="w-full h-screen">
      {docs.length > 0 && (
        <DocViewer
          documents={[{ uri: "https://obj-crt.s3.us-east-1.amazonaws.com/uploads/9fd65a03-912b-408e-a213-edb6ea8f2fc4-Welcome%20to%20Word.pdf" }]}
          pluginRenderers={DocViewerRenderers}
          style={{ height: "100%" }}
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: true,
            },
          }}
        />
      )}
    </div>
  );
};

export default FilePageContent;
