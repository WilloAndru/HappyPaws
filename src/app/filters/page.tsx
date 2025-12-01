import { Suspense } from "react";
import FiltersClient from "./FiltersClient";

export default function Filters() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <FiltersClient />
    </Suspense>
  );
}
