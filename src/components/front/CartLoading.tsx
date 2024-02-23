import ReactLoading from "react-loading";
export default function CartLoading() {
  return (
    <div className="fixed flex justify-center items-center blur-[3px] opacity-80 z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm lg:max-w-lg">
      <ReactLoading type="spin" height={100} width={60} />
    </div>
  );
}
