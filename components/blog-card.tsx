import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishDate?: string;
  date?: string;
  imageUrl?: string;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  category,
  publishDate,
  date,
  imageUrl,
}: BlogCardProps) {
  const displayDate = publishDate || date;
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        {imageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            {category && <Badge variant="secondary">{category}</Badge>}
            {displayDate && (
              <span className="text-xs text-muted-foreground">
                {new Date(displayDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-lg font-semibold leading-tight group-hover:text-primary">
            {title}
          </h3>
          {excerpt && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {excerpt}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
