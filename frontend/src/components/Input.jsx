function Input({ label, type, name, value, onChange, placeholder, required }) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
      )}
      <input
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default Input;
