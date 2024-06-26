import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/BookingForm.css";

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [numberOfWheels, setNumberOfWheels] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [specificModel, setSpecificModel] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  // Check if the current step requires any fields to be filled
  const nextStep = () => {
    if (step === 1 && (!firstName || !lastName)) {
      alert('Please fill out First Name and Last Name');
      return;
    } else if (step === 2 && !numberOfWheels) {
      alert('Please select Number of Wheels');
      return;
    } else if (step === 3 && !vehicleType) {
      alert('Please select Vehicle Type');
      return;
    } else if (step === 4 && !specificModel) {
      alert('Please select a Specific Model');
      return;
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Send form data to backend
  const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);
  try {
    const formData = {
      firstName: firstName,
      lastName: lastName,
      numberOfWheels: numberOfWheels,
      vehicleType: vehicleType,
      specificModel: specificModel,
      startDate: startDate,
      endDate: endDate,
    };

    const response = await axios.post('https://vehicle-booking-backend-yp4t.onrender.com/booking/addBooking', formData);

    if (response.status === 201) {
      alert("Booking successful!");
      console.log('Booking created successfully:', response.data);
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.error('Error creating booking:', error);
    }
  } finally {
    setLoading(false); 
  }
};

  useEffect(() => {
    if (vehicleType !== '') {
      handleTypeChange(vehicleType); 
    }
  }, [vehicleType]);

  // Fetch vehicle types
  useEffect(() => {
    axios.get('https://vehicle-booking-backend-yp4t.onrender.com/vehicle/getVehicletypes')
      .then(response => {
        setVehicleTypes(response.data); 
      })
      .catch(error => {
        console.error('Error fetching vehicle types:', error);
      });
  }, []);

  // Fetch vehicle models based on selected type
  const handleTypeChange = async (selectedType) => {
      setVehicleType(selectedType);
  
      try {
        setLoading(true);
        const response = await axios.get(`https://vehicle-booking-backend-yp4t.onrender.com/vehicle/models/${selectedType}`);
        const models = response.data;
  
        // Filter out duplicate model options
        const uniqueModels = Array.from(new Set(models.map(model => model.model)))
          .map(model => models.find(m => m.model === model));
  
        setVehicleModels(uniqueModels);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching vehicle models:', error);
        setLoading(false);
      }
  };

  //End date must be after the start date
  const calculateMinEndDate = () => {
    if (!startDate) return today; 
    const nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + 1); 
    return nextDate.toISOString().split('T')[0];
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Step {step}</h2>
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step {step}</h2>
            <label>
              Number of Wheels:
              <br />
              <input
                type="radio"
                name="numberOfWheels"
                value="2"
                checked={numberOfWheels === '2'}
                onChange={(e) => setNumberOfWheels(e.target.value)}
              />{' '}
              2
              <span style={{ marginRight: '10px' }}></span>
              <input
                type="radio"
                name="numberOfWheels"
                value="4"
                checked={numberOfWheels === '4'}
                onChange={(e) => setNumberOfWheels(e.target.value)}
              />{' '}
              4
            </label>
            <button onClick={nextStep}>Next</button>
            <button onClick={prevStep}>Back</button>
          </div>
        );
    case 3:
      return (
        <div>
          <h2>Step {step}</h2>
          <label>
            Vehicle Type:
            <br />
            {vehicleTypes.map((type, index) => (
              <React.Fragment key={index}>
                <input
                  type="radio"
                  name="vehicleType"
                  value={type}
                  checked={vehicleType === type}
                  onChange={(e) => setVehicleType(e.target.value)}
                />{' '}
                {type}
                <span style={{ marginRight: '10px' }}></span>
              </React.Fragment>
            ))}
          </label>
          <button onClick={nextStep}>Next</button>
          <button onClick={prevStep}>Back</button>
        </div>
      );
      case 4:
        return (
          <div>
            <h2>Step {step}</h2>
            <label>
            Specific Model:
            <br />
            {loading ? (
              <p>Loading...</p>
            ) : (
              vehicleModels.map((model, index) => (
                <React.Fragment key={index}>
                  <input
                    type="radio"
                    name="specificModel"
                    value={model.model}
                    checked={specificModel === model.model}
                    onChange={(e) => setSpecificModel(e.target.value)}
                  />
                  {model.model}
                  <span style={{ marginRight: '10px' }}></span>
                </React.Fragment>
              ))
            )}
            </label>
            <button onClick={nextStep}>Next</button>
            <button onClick={prevStep}>Back</button>
          </div>
        );
      case 5:
        return (
          <div>
            <h2>Step {step}</h2>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                min={today}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                min={calculateMinEndDate()}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
            <button onClick={prevStep}>Back</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="booking-form-container">
     <h1>Vehicle Booking Form</h1>
     <form onSubmit={handleSubmit} className="booking-form">
      {renderStep()}
     </form>
  </div>
  );
};

export default BookingForm;