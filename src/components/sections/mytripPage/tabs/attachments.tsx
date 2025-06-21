import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  useUploadAttachmentMutation,
  useGetAttachmentsByTripIdQuery,
  useDeleteAttachmentMutation,
} from "@/store/api/trip/attachmentSlice";
import { useSelector } from "react-redux";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";

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
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newFiles = event.target.files;
    if (!newFiles?.length) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("tripId", tripId);
      formData.append("title", "boarding pass");

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
      ];

      Array.from(newFiles).forEach((file) => {
        if (allowedTypes.includes(file.type)) {
          formData.append("files", file);
        } else {
          toast.error(
            `File type ${file.type} is not supported. Please upload images or documents only.`,
          );
        }
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
              <div
                className="w-full h-full flex flex-col p-2 cursor-pointer"
                onClick={() =>
                  openFileInNewTab(
                    "/file?url=" +
                      file.fileUrl +
                      "&filename=" +
                      file.originalFilename,
                  )
                }
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-10 h-10">
                    {
                      <FileIcon
                        extension={file.originalFilename
                          .split(".")
                          .pop()
                          ?.toLowerCase()}
                        {...defaultStyles[
                          file.originalFilename
                            .split(".")
                            .pop()
                            ?.toLowerCase() as DefaultExtensionType
                        ]}
                      />
                    }
                  </div>
                </div>

                <span className="text-xs text-gray-500 truncate mt-2 max-w-full px-2">
                  {file.originalFilename}
                </span>
              </div>

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
