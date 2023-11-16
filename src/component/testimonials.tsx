import Image from "next/image";

const Testimonials = () => {
    const testimonials = [
      {
        name: "John Doe",
        text: "I found this service incredibly easy to use and very affordable. Highly recommended!",
      },
      {
        name: "Jane Smith",
        text: "Creating a will was something I'd been putting off for years. This platform made it painless.",
      },
      {
        name: "David Johnson",
        text: "I can't believe how simple it was to create a legally binding will. Great experience!",
      },
    ];
  
    return (
      <section id="testimonials" className="bg-gray-100 py-16 text-center">
        <h2 className="text-2xl font-semibold underline">Testimonials</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md max-w-sm"
            >
                <Image src={'/people_image.jpg'} alt="image" width={100} height={100} className="rounded-full m-auto"/>
              <p className="text-gray-600 mt-2">{testimonial.text}</p>
              <p className="text-blue-600 font-semibold mt-4">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Testimonials;