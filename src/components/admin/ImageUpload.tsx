import { useImageDropzoneStore } from "@/utils/zustand";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageDropzone from "../ImageDropzone";
import ArtWork from "../ArtWork";
import CarouselSize from "../CarouselSize";
export default function ImageUpload() {
  const { imageUrls, mainImageUrl, pickMainImage } = useImageDropzoneStore();
  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">上傳圖片</TabsTrigger>
          <TabsTrigger value="view">預覽圖片</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <ImageDropzone />
        </TabsContent>
        <TabsContent value="view">
          <div className="flex flex-col justify-start items-center rounded-md border gap-4 py-4">
            <div className="flex flex-col items-center justify-center px-8 border rounded-lg w-[400px] aspect-[3/4]">
              {!mainImageUrl ? (
                "請於下方選擇主圖"
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
