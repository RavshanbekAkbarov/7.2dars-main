function FormTextare({ label, placeholder, name }) {
  return (
    <label className="form-control mb-2">
      <div className="label">
        <span className="label-text  text-white text-base">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-2"
        placeholder={placeholder}
        name={name}
      ></textarea>
    </label>
  );
}

export default FormTextare;
