import React, { useState } from 'react';
import '../styles/Experts.css';

const CreateExpert = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    experience: '',
    fee: '',
    status: true,
    specialization_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'fee' || name === 'experience' ? Math.max(0, parseFloat(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      first_name: '',
      last_name: '',
      address: '',
      email: '',
      experience: '',
      fee: '',
      status: true,
      specialization_id: '',
    });
  };

  return (
    <section className="create-expert-page">
      <h1>Create an Expert</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-btn">Create a new Expert</button>
      </form>
    </section>
  );
};

export default CreateExpert;
