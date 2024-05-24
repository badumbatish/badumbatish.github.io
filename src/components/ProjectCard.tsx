const ProjectCard: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 bg-gray-100 p-4">
                <h2 className="text-lg font-semibold mb-2">Column 1</h2>
                <p>This is the content for the first column.</p>
            </div>
            <div className="flex-1 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold mb-2">Column 2</h2>
                <p>This is the content for the second column.</p>
            </div>
        </div>
    );
};

export default ProjectCard;