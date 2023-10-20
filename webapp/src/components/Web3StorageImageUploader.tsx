/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMutation } from "@tanstack/react-query";
import { FC, useMemo, useRef, useState } from "react";
import { getCIDLink, uploadToWeb3Storage } from "../utils/web3Storage";
import { PhotoIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export interface Web3StorageImageUploaderProps {
  value?: string;
  onChange: (cid: string) => void;
  previewWidth: number;
  previewHeight: number;
  fit?: "cover" | "fill" | "contain";
}

export const Web3StorageImageUploader: FC<Web3StorageImageUploaderProps> = ({
  value,
  onChange,
  previewWidth,
  previewHeight,
  fit = "cover",
}) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [imageHasError, setImageHasError] = useState(false);
  const { current: fieldId } = useRef(
    "Web3StorageImageUploader-" +
      (Math.random().toString(36) + "00000000000000000").slice(2, 7)
  );
  const uploadFileMutation = useMutation({
    mutationKey: ["upload-file-to-web3-storage"],
    mutationFn: ({ file }: { file: File }) => {
      return uploadToWeb3Storage([file], {
        wrapWithDirectory: false,
      });
    },
  });
  const imageUrl = useMemo(() => {
    if (imageHasError || !value) {
      return null;
    }
    return getCIDLink(value);
  }, [value, imageHasError]);
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0].length === 0) {
      return;
    }
    const [file] = e.target.files;
    const cid = await uploadFileMutation.mutateAsync({ file });
    onChange(cid);
    setImageHasError(false);
    setImageIsLoading(true);
  };
  const sizeStyle = {
    width: previewWidth ? `${previewWidth}px` : undefined,
    height: previewHeight ? `${previewHeight}px` : undefined,
  };
  const isLoading = uploadFileMutation.isLoading || (value && imageIsLoading && !imageHasError);
  return (
    <div className="flex items-center">
      <div className="relative" style={sizeStyle}>
        <div className={classNames(
          "transition-opacity	ease-in-out rounded-lg backdrop-blur bg-base-content/70 w-full h-full absolute flex items-center justify-center",
          {
            'opacity-100': isLoading,
            'opacity-0': !isLoading,
          }
        )}>
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-base-100/80 animate-spin fill-primary/80"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Uploading...</span>
          </div>
        </div>
        {imageUrl ? (
          <img
            src={imageUrl}
            className={classNames("rounded-lg", {
              "object-cover": fit === "cover",
              "object-fill": fit === "fill",
              "object-contain": fit === "contain",
            })}
            style={sizeStyle}
            onLoad={() => setImageIsLoading(false)}
            onError={() => setImageHasError(true)}
          />
        ) : (
          <div
            className="bg-base-300 rounded-lg flex items-center justify-center"
            style={sizeStyle}
          >
            <PhotoIcon
              className={classNames("text-base-content/50 max-h-[30%]", {
                "max-h-[30%]": previewWidth > previewHeight,
                "max-w-[30%]": previewHeight > previewWidth,
              })}
            />
          </div>
        )}
      </div>
      <div>
        <input
          id={fieldId}
          type="file"
          className="hidden"
          onChange={(e) => onFileChange(e)}
        />
        <label className="btn btn-primary ml-4" htmlFor={fieldId}>
          {value ? "Change Image" : "Upload Image"}
        </label>
      </div>
    </div>
  );
};
