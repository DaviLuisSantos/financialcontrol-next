import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
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
    footerIcon: FooterIcon,
}) {
    // Determinar o ícone de tendência e formatar o badgeText
    const isPositive = Number(badgeText) > 0;
    const isNegative = Number(badgeText) < 0;
    const TrendIcon = isPositive
        ? TrendingUpIcon
        : isNegative
        ? TrendingDownIcon
        : null;

    const formattedBadgeText = isPositive
        ? `+${badgeText}%`
        : `${badgeText}%`;

    // Definir a cor do Badge dinamicamente
    const badgeColorClass = isPositive
        ? "text-green-500 border-green-500"
        : isNegative
        ? "text-red-500 border-red-500"
        : "text-gray-500 border-gray-500";

    return (
        <Card className="@container/card">
            <CardHeader className="relative">
                <CardDescription>{description}</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {value}
                </CardTitle>
                {badgeText && (
                    <div className="absolute right-4 top-4">
                        <Badge
                            variant="outline"
                            className={`flex gap-1 rounded-lg text-xs ${badgeColorClass}`}
                        >
                            {TrendIcon && <TrendIcon className="size-3" />}
                            {formattedBadgeText}
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