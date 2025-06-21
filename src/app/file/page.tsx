import React, { Suspense } from "react";
import type { Metadata } from "next";
import FilePageContent from "./FilePageContent";

export const metadata: Metadata = {
  title: "Vibzi - File Viewer",
  description: "Vibzi - File Viewer",
};

const FilePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilePageContent />
    </Suspense>
  );
};

export default FilePage;
