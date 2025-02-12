import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import {
  useUploadAttachmentMutation,
  useGetAttachmentsByTripIdQuery,
  useDeleteAttachmentMutation,
} from "@/services/trip/attachmentSlice";
import { useSelector } from "react-redux";

const FileAttachments = () => {
  const [isUploading, setIsUploading] = useState(false);
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
      console.log('error: ', error);
      toast.error("Error uploading files");
    } finally {
      setIsUploading(false);
    }
  };

  const removeAttachment = async (fileKey: string) => {
    try {
      await deleteAttachment({ tripId, fileKey }).unwrap();
      toast.success("File removed successfully");
    } catch (error) {
      console.log('error: ', error);
      toast.error("Error removing file");
    }
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
      <h2 className="text-xl font-semibold mb-4">Add Attachments</h2>
      <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
        <div className="w-8 h-8 mb-2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <p className="text-gray-500">Click to upload</p>
        <input
          type="file"
          className="hidden"
          multiple
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {attachmentData && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Uploaded Files</h3>
          <div className="flex flex-wrap gap-3">
            {attachmentData?.attachments.map((file) => (
              <div
                key={file.key}
                className="relative w-24 h-16 border rounded-lg overflow-hidden group"
              >
                {file.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img
                    src={file.fileUrl}
                    alt={file.originalFilename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <span className="text-sm text-gray-500 truncate">
                      {file.originalFilename}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeAttachment(file.key)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  disabled={isUploading}
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {isUploading && (
        <div className="mt-4">
          <div className="w-full h-1 bg-gray-200 rounded">
            <div className="w-1/2 h-1 bg-blue-500 rounded animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileAttachments;