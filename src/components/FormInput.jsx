function FormInput({ type, label, name, placeholder }) {
  return (
    <label className="form-control w-full mb-3">
      <span className="label-text">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    </label>
  );
}
export default FormInput;
