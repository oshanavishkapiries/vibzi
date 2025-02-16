import { useState } from "react";
import { Plus, Trash, File } from "lucide-react";
import { toast } from "sonner";
import {
  useUploadAttachmentMutation,
  useGetAttachmentsByTripIdQuery,
  useDeleteAttachmentMutation,
} from "@/services/trip/attachmentSlice";
import { useSelector } from "react-redux";
import Image from "next/image";

const getFileIcon = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return (
        <Image
          alt="pdf"
          width={48}
          height={48}
          src="/file_icon/pdf.png"
          className="w-12 h-12"
        />
      );
    case "doc":
    case "docx":
      return (
        <Image
          alt="doc"
          width={48}
          height={48}
          src="/file_icon/docs.png"
          className="w-12 h-12"
        />
      );
    case "txt":
      return (
        <Image
          alt="txt"
          width={48}
          height={48}
          src="/file_icon/txt.png"
          className="w-12 h-12"
        />
      );
    default:
      return <File className="w-12 h-12 text-gray-500" />;
  }
};

const FileAttachments = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const tripId = useSelector((state: any) => state.meta.trip.tripId);
  const [uploadAttachment] = useUploadAttachmentMutation();
  const { data: attachmentData, isLoading: isLoadingAttachments } =
    useGetAttachmentsByTripIdQuery(tripId);
  const [deleteAttachment] = useDeleteAttachmentMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = event.target.files;
    if (!newFiles?.length) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("tripId", tripId);
      formData.append("title", "boarding pass");

      Array.from(newFiles).forEach((file) => {
        formData.append("files", file);
      });

      await uploadAttachment(formData).unwrap();
      toast.success("Files uploaded successfully");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error uploading files");
    } finally {
      setIsUploading(false);
    }
  };

  const confirmDeleteAttachment = async () => {
    if (!fileToDelete) return;
    try {
      await deleteAttachment({ tripId, fileKey: fileToDelete }).unwrap();
      toast.success("File removed successfully");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error removing file");
    } finally {
      setDeleteDialogOpen(false);
      setFileToDelete(null);
    }
  };

  const openFileInNewTab = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  if (isLoadingAttachments) {
    return (
      <div className="w-full border rounded-lg p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg p-6">
      {/* Uploaded Files Section */}
      <div className="mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <label className="relative w-full bg-gray-100 aspect-square border rounded-lg overflow-hidden group cursor-pointer flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-500" />
            <input
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>

          {attachmentData?.attachments.map((file) => (
            <div
              key={file.key}
              className="relative w-full aspect-square border rounded-lg overflow-hidden group"
            >
              {file.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <img
                  src={file.fileUrl}
                  alt={file.originalFilename}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openFileInNewTab("/file?url=" + file.fileUrl)}
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-2 cursor-pointer"
                  onClick={() => openFileInNewTab("/file?url=" + file.fileUrl)}
                >
                  {getFileIcon(file.originalFilename)}
                  <span className="text-xs text-gray-500 truncate mt-2 max-w-full px-2">
                    {file.originalFilename}
                  </span>
                </div>
              )}
              <button
                onClick={() => {
                  setFileToDelete(file.key);
                  setDeleteDialogOpen(true);
                }}
                className="absolute bottom-1 right-1 p-1 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                disabled={isUploading}
              >
                <Trash className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Uploading Progress Indicator */}
      {isUploading && (
        <div className="mt-4">
          <div className="w-full h-1 bg-gray-200 rounded">
            <div className="w-1/2 h-1 bg-blue-500 rounded animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          deleteDialogOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 ${
            deleteDialogOpen ? "visible" : "invisible"
          }`}
          onClick={() => setDeleteDialogOpen(false)}
        ></div>
        <div
          className={`bg-white rounded-lg p-6 shadow-lg z-10 ${
            deleteDialogOpen ? "visible" : "invisible"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this file?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteAttachment}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileAttachments;
