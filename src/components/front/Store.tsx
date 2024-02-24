import { useState } from "react";
import { api } from "@/api";
import { transformCategory } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

export default function Store() {
  const { category } = useParams();
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["getProducts", category, page, { type: "client" }],
    queryFn: () =>
      api.client.getClientPageProducts(
        page.toString(),
        transformCategory(category ?? "")
      ),
    select: (data) => data,
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isSuccess) {
    return (
      <main>
        <section>
          <h1 className="text-3xl font-bold mb-4">
            {transformCategory(category ?? "")}
          </h1>
          <Separator className="mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-rows-[repeat(5,auto)] gap-x-4 gap-y-4 lg:gap-y-4">
            {data.products.map((product) => {
              return <ProductCard key={product.id} data={product} />;
            })}
          </div>
          {data.pagination.total_pages > 1 && (
            <div className="flex justify-end items-center space-x-2 p-4">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPage(1)}
                disabled={data.pagination.current_page === 1}
              >
                <span className="sr-only">Go to first page</span>
                <RxDoubleArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPage(data.pagination.current_page - 1)}
                disabled={!data.pagination.has_pre}
              >
                <span className="sr-only">Go to previous page</span>
                <RxChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: data.pagination.total_pages }).map(
                (_, i) => (
                  <Button
                    key={"page-" + i}
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setPage(i + 1)}
                    disabled={data.pagination.current_page === i + 1}
                  >
                    <span className="">{i + 1}</span>
                  </Button>
                )
              )}
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPage(data.pagination.current_page + 1)}
                disabled={!data.pagination.has_next}
              >
                <span className="sr-only">Go to next page</span>
                <RxChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPage(data.pagination.total_pages)}
                disabled={!data.pagination.has_next}
              >
                <span className="sr-only">Go to last page</span>
                <RxDoubleArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </section>
      </main>
    );
  }
}
