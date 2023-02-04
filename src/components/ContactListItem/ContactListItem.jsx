import { Item, Button } from './ContactListItem.styled';
import PropTypes from 'prop-types';

const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <Item>
      {name}: {number}
      <Button onClick={() => deleteContact(id)} type="button">
        Delete
      </Button>
    </Item>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
