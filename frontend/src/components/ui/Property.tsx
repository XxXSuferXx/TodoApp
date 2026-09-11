interface Property {
    title: string;
    price: number;
    city: string;
    bedrooms?: number;
    areaSqft?: number;
}

interface PropertyCardProps {
    property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
    <div className="text-xl font-medium">¥{property.price.toLocaleString()}</div>
    {property.bedrooms !== undefined && (
  <span className="flex items-center gap-1">
  </span>
)}
}