import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ReusableCard({
    title,
    description,
    value,
    badgeText,
    badgeIcon: BadgeIcon,
    footerText,
    footerIcon: FooterIcon
}) {
    return (
        <Card className="@container/card">
            <CardHeader className="relative">
                <CardDescription>{description}</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {value}
                </CardTitle>
                {badgeText && (
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            {BadgeIcon && <BadgeIcon className="size-3" />}
                            {badgeText}
                        </Badge>
                    </div>
                )}
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                {footerText && (
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {footerText} {FooterIcon && <FooterIcon className="size-4" />}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}