'use client'

import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
    endpoint: "postImage";
  }

const ImageUpload = ({endpoint,onChange,value}:ImageUploadProps) => {
    if(value){
        return (
           <div className="relative size-40">
            <Image src={value} alt="upload" width={100} height={100} quality={100}  className="rounded-md size-40 object-cover"/>
            <Button
             onClick={() => onChange("")}
             className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
             variant={'default'}
            >
                <XIcon className="h-4 w-4 text-white"/>
            </Button>
           </div> 
        )
    }
     return (
    <UploadDropzone 
     endpoint={endpoint}
     onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
     }}
     onUploadError={(error:Error) => {
        console.log(error)
     }}
    />
  )
}

export default ImageUpload