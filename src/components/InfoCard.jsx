export default function InfoCard({ title, value, color = "#50fa7b" }) {
    return (
        <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className={`text-4xl font-bold text-[${color}]`} > {value}</p>
        </div>
    )
}