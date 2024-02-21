export default function CartLoading() {
  return (
    <div className="fixed flex justify-center items-center blur-sm z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm lg:max-w-lg opacity-80">
      <p className="text-white text-2xl blur-0">loading...</p>
    </div>
  );
}
