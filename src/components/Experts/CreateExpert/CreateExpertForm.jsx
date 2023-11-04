import React from 'react';
import PropTypes from 'prop-types';

const CreateExpertForm = ({ formData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} id="expert-form">
    <input
      type="text"
      name="first_name"
      required
      placeholder="First Name"
      value={formData.first_name}
      onChange={handleChange}
    />
    <input
      type="text"
      name="last_name"
      required
      placeholder="Last Name"
      value={formData.last_name}
      onChange={handleChange}
    />
    <input
      type="text"
      name="address"
      required
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
    />
    <input
      type="email"
      name="email"
      required
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
    />
    <input
      type="number"
      name="experience"
      required
      placeholder="Years of Experience (In years)"
      value={formData.experience}
      onChange={handleChange}
    />
    <input
      type="number"
      name="fee"
      required
      placeholder="Fee per visit (In dollars))"
      value={formData.fee}
      onChange={handleChange}
    />
    <label htmlFor="status">
      Availability:
      <input
        type="checkbox"
        name="status"
        checked={formData.status}
        onChange={handleChange}
      />
    </label>
    <select
      name="specialization_id"
      required
      value={formData.specialization_id}
      onChange={handleChange}
    >
      <option value="">Select Specialization</option>
      <option value="1">Electrical Engineer</option>
      <option value="2">Plumber</option>
      <option value="3">Carpenter</option>
      <option value="4">Painter</option>
      <option value="5">Mechanic</option>
      <option value="6">Architect</option>
      <option value="7">Interior Designer</option>
      <option value="8">Civil Engineer</option>
      <option value="9">Gardener</option>
    </select>
    <button type="submit" className="submit-btn">
      Create a new Expert
    </button>
  </form>
);

export default CreateExpertForm;

CreateExpertForm.propTypes = {
  formData: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    fee: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
    specialization_id: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
