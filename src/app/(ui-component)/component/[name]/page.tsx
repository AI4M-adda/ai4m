import { componentConfigs, ComponentId } from "../../_lib/component-configs";
import ClientPageContent from "./_client_page_content";

export async function generateStaticParams() {
  return Object.keys(componentConfigs).map((id) => ({
    id: id,
  }));
}

interface ComponentPageProps {
  params: { name: string };
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const componentId = params.name as ComponentId;

  return <ClientPageContent componentId={componentId} />;
}
