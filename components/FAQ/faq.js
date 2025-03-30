import { useState } from "react";

const FAQ = ({items}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

//   const faqs = [
//     { question: "What happens to my current website?", answer: "Your current website remains unaffected. We ensure a smooth transition." },
//     { question: "How much can I customize my design?", answer: "You can fully customize your design to fit your needs." },
//     { question: "How long will this take?", answer: "The timeline depends on your project, but we work efficiently to meet deadlines." },
//   ];

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">FAQ's</h2>
      <div className="space-y-4">
        {items.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 pb-4"
          >
            <button
              className="flex justify-between items-center w-[300px] md:w-[600px] text-left md:text-2xl text:lg font-medium"
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              <span className={`transform transition-transform ${activeIndex === index ? "rotate-45" : "rotate-0"}`}>
                +
              </span>
            </button>
            {activeIndex === index && (
               <div
               className="mt-2 text-base font-light w-[300px] md:w-[600px] overflow-hidden "
               
             >
               <span className="md:text-2xl text:lg">{faq.answer}</span>
             </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
