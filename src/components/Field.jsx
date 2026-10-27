export default function Field({ id, label, error, as = 'input', className = '', ...props }) {
  const Tag = as
  const errId = `${id}-error`
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        className="field-input"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errId : undefined}
        {...props}
      />
      {error && (
        <p id={errId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
