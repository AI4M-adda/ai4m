import { componentConfigs } from "../../_lib/component-configs";
import ClientPageContent from "./_client_page_content";

export async function generateStaticParams() {
  return Object.keys(componentConfigs).map((id) => ({
    id: id,
  }));
}

interface ComponentPageProps {
  params: Promise<{ name: string }>;
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { name } = await params;
  return <ClientPageContent componentId={name} />;
}
