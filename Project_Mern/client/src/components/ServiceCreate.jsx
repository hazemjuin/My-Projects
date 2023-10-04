import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CreateService() {
  const { transactionType } = useParams();
  const [formData, setFormData] = useState({
    transactionType: transactionType || 'sell',
    title: '',
    category: '',
    description: '',
    address: '',
    state: 'Ariana',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data here, e.g., make an API request
    console.log(formData);
  };

  return (
    <div>
      <h2>Create a New Service ({transactionType})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </label>
        </div>

        <div>
          <label>
            Category:
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
          </label>
        </div>

        <div>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </label>
        </div>

        <div>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
          </label>
        </div>

        <div>
          <label>
            State:
            <select name="state" value={formData.state} onChange={handleInputChange}>
              <option value="Ariana">Ariana</option>
              <option value="Beja">Beja</option>
              {/* Include other state options here */}
            </select>
          </label>
        </div>

        <div>
          <button type="submit">Create Service</button>
        </div>
      </form>
    </div>
  );
}

export default CreateService;
