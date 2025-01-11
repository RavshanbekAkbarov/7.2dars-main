function FormTextare({ label, placeholder, name, error, errorText }) {
  return (
    <label className="form-control mb-2">
      <div className="label">
        <span className="label-text text-white text-base">{label}</span>
      </div>
      <textarea
        className={`textarea textarea-bordered h-24 w-full ${
          error ? "textarea-error" : ""
        }`}
        placeholder={placeholder}
        name={name}
      ></textarea>
      {errorText && (
        <div className="label">
          <span className="label-text-alt text-red-500">{errorText}</span>
        </div>
      )}
    </label>
  );
}

export default FormTextare;
