import { useImageDropzoneStore } from "@/lib/zustand";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageDropzone from "./ImageDropzone";
import ArtWork from "../ArtWork";
import CarouselSize from "../CarouselSize";
export default function ImageUpload() {
  const { imageUrls, mainImageUrl, pickMainImage } = useImageDropzoneStore();
  return (
    <div>
      <Tabs defaultValue={"view"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">上傳圖片</TabsTrigger>
          <TabsTrigger value="view">預覽圖片</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <ImageDropzone />
        </TabsContent>
        <TabsContent value="view">
          <div className="flex flex-col justify-start items-center gap-4 py-4">
            <div className="flex flex-col items-center justify-center px-4 border rounded-lg w-[400px] aspect-[3/4]">
              {imageUrls.length === 0 ? (
                "請上傳圖片"
              ) : !mainImageUrl ? (
                "請選擇下方圖片"
              ) : (
                <ArtWork imageUrl={mainImageUrl} aspectRatio="portrait" />
              )}
            </div>
            {imageUrls.length > 0 && (
              <CarouselSize
                imageUrls={imageUrls}
                pickMainImage={pickMainImage}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
