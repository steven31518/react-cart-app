import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
};

export default function CardWrap({
  children,
  title,
  description,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "w-[350px] bg-muted rounded-md border border-border",
        className
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
