"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface CustomApiListProps {
  entityName: string;
  entityIdName: string;
}

export const CustomApiList: React.FC<CustomApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.brandId}`;

  return (
    <>
      <ApiAlert title="GET SEARCHBOX" variant="public" description={`${baseUrl}/${entityName}`} />
      {/* <ApiAlert title="GET ONE PRODUCT" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} /> */}
      {/* <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
      <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} /> */}
    </>
  );
};
