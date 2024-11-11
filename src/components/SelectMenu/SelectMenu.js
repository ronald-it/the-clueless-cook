import Select from 'react-select';

export default function SelectMenu({ name, id, defaultValue, onChange, options, disabled }) {
  return (
    <Select
      name={name}
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      isDisabled={disabled}
      styles={{
        control: (baseStyles, { isDisabled }) => ({
          ...baseStyles,
          height: '3rem',
          fontWeight: 300,
          fontSize: '1rem',
          lineHeight: '1.5rem',
          opacity: isDisabled ? 0.5 : 1,
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
      }}
    />
  );
}
