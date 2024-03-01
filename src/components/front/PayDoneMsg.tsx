import { Link } from "react-router-dom";
import titleImg from "@/assets/img/pngaaa.com-4472413.png";
import coverImg from "@/assets/img/pngaaa.com-209879.png";
import characterImg from "@/assets/img/pngwing.com.png";
import characterImgB from "@/assets/img/pngaaa.com-4472507.png";
import MotionCard from "@/components/front/MotionCard";
import { Separator } from "@/components/ui/separator";
export default function PayDoneMsg({ id }: { id: string }) {
  return (
    <div className="grid mb-6">
      <div className=" text-center place-self-center">
        <div className="">
          <h1 className="text-4xl font-bold text-primary">
            付款已完成，感謝您的購買!
          </h1>
          <Separator className="my-4" />
          <p className="py-4 px-6 rounded-lg text-lg text-center leading-loose">
            <strong>{`我們將會盡快出貨，請留著訂單編號: ${id}，方便日後查詢狀態。`}</strong>
            <br />
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8 max-w-sm">
            <Link to="/products" className="grid w-full py-4">
              <MotionCard
                characterImg={characterImgB}
                titleImg={titleImg}
                coverImg={coverImg}
                text={"繼續購物"}
                className="place-self-center"
              />
            </Link>
            <Link to="/email" className="grid w-full py-4">
              <MotionCard
                characterImg={characterImg}
                titleImg={titleImg}
                coverImg={coverImg}
                text={"聯絡作者"}
                className="place-self-center"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
