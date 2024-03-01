import { Link } from "react-router-dom";
import titleImg from "@/assets/img/pngaaa.com-4472413.png";
import coverImg from "@/assets/img/pngaaa.com-209879.png";
import characterImg from "@/assets/img/pngwing.com.png";
import characterImgB from "@/assets/img/pngaaa.com-4472507.png"
import MotionCard from "@/components/front/MotionCard";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background grid">
      <div className=" text-center place-self-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">About</h1>
          <Separator className="my-2" />
          <p className="py-4 px-6 rounded-lg text-lg text-start leading-loose">
            <strong>此網站只供學術研究使用，並無任何商業用途。</strong>
            <br />
            這是一個購物車練習專案，除了建構前台的商品、購物車、訂單頁面，也有Admin後台管理工具:管理商品、訂單、優惠券，具有新增、編輯、刪除等功能。
            <br />
            因喜歡Don't
            Strave這款遊戲的美術風格，也想紀錄一些遊戲內常用的食譜，網站內的素材來源皆為網路上的免費素材。如有侵權請來信告知，將立即移除。
          </p>
          <div className="grid lg:grid-cols-2 gap-4 mt-24">
            <Link to="/products" className="grid w-full py-4">
              <MotionCard
                characterImg={characterImgB}
                titleImg={titleImg}
                coverImg={coverImg}
                text={"讓我點餐!"}
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
    </main>
  );
}
