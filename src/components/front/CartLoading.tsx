export default function CartLoading() {
  return (
    <div className="fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm lg:max-w-lg opacity-80">
      <div className="text-center text-lg my-auto w-32 ">
        <p className="opacity-100 text-white text-2xl">loading...</p>
      </div>
    </div>
  );
}
