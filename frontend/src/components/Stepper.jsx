function Stepper({ currentStep, steps }) {
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium " +
              (index + 1 <= currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500")
            }
          >
            {index + 1}
          </div>
          <span
            className={
              "ml-2 text-sm " +
              (index + 1 <= currentStep ? "text-blue-600" : "text-gray-400")
            }
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div
              className={
                "w-12 h-0.5 mx-3 " +
                (index + 1 < currentStep ? "bg-blue-500" : "bg-gray-200")
              }
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
