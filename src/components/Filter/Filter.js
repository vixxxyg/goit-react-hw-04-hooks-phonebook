import s from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <>
    <div>
      <label htmlFor="filter">Find contacts by name</label>
    </div>
    <input
      className={s.fieldInput}
      type="text"
      id="filter"
      name="filter"
      value={value}
      onChange={onChange}
    />
  </>
);

export default Filter;
