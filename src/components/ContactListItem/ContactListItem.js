import PropTypes from 'prop-types';

const ContactListItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <li>
      <p>
        {name}: {number}
      </p>{' '}
      <button type="button" onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactListItem;
