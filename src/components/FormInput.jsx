function FormInput({ type, label, name, placeholder }) {
  return (
    <label className="form-control w-full mb-2 ">
      <span className="label-text  text-white text-base">{label}</span>
      <input
        label={label}
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full  "
      />
    </label>
  );
}
export default FormInput;
