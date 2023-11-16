const Features = () => {
    const features = [
      {
        title: "Easy to Use",
        description: "Our platform is user-friendly and makes the will-making process simple.",
      },
      {
        title: "Legally Binding",
        description: "All wills created on our platform are legally binding and secure.",
      },
      {
        title: "Affordable Pricing",
        description: "We offer competitive pricing to make will-making accessible to all.",
      },
    ];
  
    return (
      <section id="features"className="bg-white py-16 text-center">
        <h2 className="text-2xl font-semibold underline">Key Features</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md max-w-sm"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Features;