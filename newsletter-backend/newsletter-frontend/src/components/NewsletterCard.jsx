const NewsletterCard = ({ title, description, content, createdAt }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-600 text-sm">{content}</p>
      <p className="text-gray-400 text-xs mt-2">
        Posted on: {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NewsletterCard;
