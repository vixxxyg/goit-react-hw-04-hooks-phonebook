import PropTypes from 'prop-types';
import s from './Section.module.css';

const Section = ({ title = '', children }) => {
  return (
    <div className={s.section}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
};

export default Section;
