import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

export default function MapView({ darkMode }: { darkMode: boolean }) {
  return <MapClient darkMode={darkMode} />;
}