export default function AboutMeElement({title, lst}: { title: string; lst: string[] }) {
    return (
        <>
            <h3 className="text-lg font-bold">{title}</h3>
            <ul className="list-disc">
                {lst.map((description: string, index: number) =>
                    <li key={index}>{description}</li>
                )}
            </ul>
        </>
    )
}