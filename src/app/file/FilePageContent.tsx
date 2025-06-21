"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "react-pdf/dist/Page/TextLayer.css";
import Image from "next/image";

const FilePageContent = () => {
  const searchParams = useSearchParams();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    const url = searchParams.get("url");
    const filename = searchParams.get("filename");
    if (url) {
      setFileUrl(url);
    }
    if (filename) {
      setFileName(filename);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Image
            src="/logo/logo-rbg.png"
            sizes="(max-width: 768px) 33vw, 20vw"
            alt="Logo"
            width={60}
            height={40}
            className="object-contain"
          />

          <h1 className="text-xl font-semibold">{fileName}</h1>
        </div>
      </div>

      <div style={{ height: "calc(100vh - 73px)", width: "100%" }}>
        {fileUrl && (
          <DocViewer
            documents={[{ uri: fileUrl, fileName: fileName }]}
            pluginRenderers={DocViewerRenderers}
            config={{
              header: {
                disableHeader: true,
                disableFileName: true,
              },
            }}
            style={{ height: "100%" }}
          />
        )}
      </div>
    </div>
  );
};

export default FilePageContent;
