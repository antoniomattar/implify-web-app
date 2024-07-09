export default function LoadingSkeleton() {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <MountainIcon className="h-12 w-12 text-black" />
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-[bounce_0.3s_ease-in-out_infinite] rounded-full bg-black" />
          <div className="h-2 w-2 animate-[bounce_0.3s_ease-in-out_0.1s_infinite] rounded-full bg-black" />
          <div className="h-2 w-2 animate-[bounce_0.3s_ease-in-out_0.2s_infinite] rounded-full bg-black" />
        </div>
      </div>
    </div>
    )
}
  
function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}