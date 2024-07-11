import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Employee } from "@/lib/Employee";
import { useRouter } from "next/navigation";

export default function UserCard(props: Employee) {
  const router = useRouter();
  return (
    <div>
      <Card
        style={{ backgroundColor: props.color }}
        className="w-full max-w-md mx-auto hover:shadow-2xl transition-shadow"
      >
        <CardHeader className="bg-muted/20 p-6">
          <div className="flex flex-col items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {/* <AvatarImage src="/placeholder-user.jpg" /> */}
                <AvatarFallback>
                  {props.fname[0]}
                  {props.lname[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">
                    {props.fname} {props.lname}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">
                    {props.company}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">
                    {props.county}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <Button
            size="sm"
            onClick={() => router.push(`/employee/${props.id}`)}
          >
            View Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function BriefcaseIcon(props: any) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function BuildingIcon(props: any) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function FilePenIcon(props: any) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function MapPinIcon(props: any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
