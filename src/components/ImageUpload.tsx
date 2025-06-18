"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
    endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
    const [error, setError] = useState("");

    if (value) {
        return (
            <div className="relative size-40">
                <img src={value} alt="Upload" className="rounded-md size-40 object-cover" />
                <button
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
                    type="button"
                >
                    <XIcon className="h-4 w-4 text-white" />
                </button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-red-500">{error}</span>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setError("")}
                    type="button"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].ufsUrl);
            }}
            onUploadError={(error: Error) => {
                setError("L'image est trop lourde (max 4 Mo). Merci d'en choisir une plus légère.");
                console.log(error);
            }}
        />
    );
}
export default ImageUpload;