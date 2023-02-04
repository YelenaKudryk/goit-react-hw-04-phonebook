import { Label, Input } from './Filter.styled';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <>
      <Label>
        Find contacts by name
        <Input
          name="filter"
          type="text"
          placeholder="Filter contacts"
          value={value}
          onChange={onChange}
        />
      </Label>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
