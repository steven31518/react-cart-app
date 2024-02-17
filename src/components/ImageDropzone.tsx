import { FileWithPath } from "react-dropzone";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import CardWrap from "./CardWrap";
import { nanoid } from "nanoid";
import ArtWork from "./ArtWork";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import toast from "react-hot-toast";
import { useImageDropzoneStore } from "@/utils/zustand";

interface FileWithPreview extends FileWithPath {
  readonly preview: string;
  readonly id: string;
}

export default function ImageDropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    maxFiles: 10,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: nanoid(),
          })
        )
      );
    },
  });
  const style = useMemo(
    () => ({
      ...(isFocused && { "border-primary": isFocused }),
      ...(isDragReject && { "border-destructive": isDragReject }),
      ...(isDragAccept && { "border-success": isDragAccept }),
    }),
    [isFocused, isDragReject, isDragAccept]
  );
  const { addImage } = useImageDropzoneStore();

  const { isPending, mutate } = useMutation({
    mutationFn: (files: FileWithPath[]) => api.admin.uploadImage(files),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Upload success");
      const urlArray = data.map((d) => d.imageUrl);
      addImage(urlArray);
      setFiles([]);
    },
  });

  const handleUpload = () => {
    if (files.length === 0) return;
    mutate(files);
  };

  const thumbs = files.map((file, i) => (
    <li key={file.id}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <ArtWork imageUrl={file.preview} width={100} aspectRatio="portrait" />
        </div>
        <div className="col-span-8 flex flex-col justify-end gap-4">
          <span className="text-xs">
            {i + 1}.{file.name}
          </span>
          <Button
            variant={"outline"}
            onClick={() => {
              setFiles(files.filter((f) => f.id !== file.id));
            }}
          >
            <AiOutlineClose className=" text-destructive text-2xl space-x-3 space-y-3 hover:opacity-80 cursor-pointer" />
            Delete
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
    </li>
  ));

  useEffect(() => {
    files.map((f) => {
      return { ...f, preview: URL.createObjectURL(f) };
    });
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <CardWrap
      description="Make changes to your Files here. Click update when you're done."     
      title="DropZone"
    >
      <section className="container-full max-h-screen flex flex-col space-y-4">
        <div
          {...getRootProps({
            className: cn(
              "dropzone rounded-lg border-2 w-full h-[100px] p-4",
              style
            ),
          })}
        >
          <input {...getInputProps()} />
          {isDragAccept && <p>All files will be accepted</p>}
          {isDragReject && <p>Some files will be rejected</p>}
          {!isDragActive && <p>Drop some files here ...</p>}
        </div>
        {files.length > 0 && (
          <div className="rounded-md border w-full">
            <ScrollArea className="col-span-8 h-[500px]">
              <aside className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Your files
                </h4>
                <ul>{thumbs}</ul>
              </aside>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        )}
        <div className="flex flex-row justify-end space-x-2">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setFiles([])}
          >
            clean
          </Button>
          <Button type="button" onClick={handleUpload} disabled={isPending}>
            {isPending ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </section>
    </CardWrap>
  );
}
