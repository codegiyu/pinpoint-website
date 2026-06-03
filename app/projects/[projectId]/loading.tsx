export default function ProjectLoading() {
  return (
    <div className="min-h-[60vh] animate-pulse bg-gray-f2">
      <div className="h-[45vh] bg-gray-d9" />
      <div className="pinpoint-container py-10 space-y-4">
        <div className="h-8 w-2/3 max-w-md rounded bg-gray-d9" />
        <div className="h-4 w-full max-w-2xl rounded bg-gray-d9" />
        <div className="h-4 w-5/6 max-w-xl rounded bg-gray-d9" />
      </div>
    </div>
  );
}
