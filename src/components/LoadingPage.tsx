import ReactLoading from "react-loading";

export default function LoadingPage() {
  return (
    <div className="grid h-screen w-full">
      <div className="place-self-center">
        <ReactLoading type="spin" height={100} width={60} />
      </div>
    </div>
  );
}
