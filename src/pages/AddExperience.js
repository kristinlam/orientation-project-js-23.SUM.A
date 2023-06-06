import "./AddExperience.css";
import { useState } from "react";
import axios from "axios";

const AddExperiencePage = () => {
  const defaultValues = {
    title: "",
    company: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
    logo: "",
  };

  const [experience, setExperience] = useState(defaultValues);
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const handleChange = (e) => {
    setExperience((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggle = () => {
    setIsCurrentlyWorking(!isCurrentlyWorking);
    if (!isCurrentlyWorking) {
      // Reset end date fields after toggling to currently working
      setExperience((prevState) => ({
        ...prevState,
        endMonth: "",
        endYear: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedExperience = formatExperience(experience);

    axios
      .post("http://127.0.0.1:5000/resume/experience", formattedExperience)
      .then((response) => {
        console.log("Response:", response.data);

        setExperience(defaultValues);
        setIsCurrentlyWorking(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const formatExperience = (experience) => {
    return {
      title: experience.title,
      company: experience.company,
      start_date: `${experience.startMonth} ${experience.startYear}`,
      end_date: isCurrentlyWorking
        ? "Present"
        : `${experience.endMonth} ${experience.endYear}`,
      description: experience.description,
      logo: experience.logo,
    };
  };

  const renderMonthOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month) => (
      <option key={month} value={month}>
        {month}
      </option>
    ));
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const renderedYearOptions = [];

    for (let i = 0; i <= 100; i++) {
      const year = currentYear - i;
      renderedYearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return renderedYearOptions;
  };

  return (
    <div className="experience__form">
      <h2>Add Experience</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={experience.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Company
          <input
            type="text"
            name="company"
            value={experience.company}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={isCurrentlyWorking}
            onChange={handleToggle}
          />
          I am currently working in this role
        </label>
        <label>
          Start Date
          <fieldset>
            <select
              name="startMonth"
              value={experience.startMonth}
              onChange={handleChange}
            >
              <option value="">Month</option>
              {renderMonthOptions()}
            </select>
            <select
              name="startYear"
              value={experience.startYear}
              onChange={handleChange}
            >
              <option value="">Year</option>
              {renderYearOptions()}
            </select>
          </fieldset>
        </label>
        <label>
          End Date
          <fieldset>
            <select
              name="endMonth"
              value={experience.endMonth}
              onChange={handleChange}
              disabled={isCurrentlyWorking}
            >
              <option value="">Month</option>
              {renderMonthOptions()}
            </select>
            <select
              name="endYear"
              value={experience.endYear}
              onChange={handleChange}
              disabled={isCurrentlyWorking}
            >
              <option value="">Year</option>
              {renderYearOptions()}
            </select>
          </fieldset>
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={experience.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Logo
          <input
            type="text"
            name="logo"
            value={experience.logo}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Experience</button>
      </form>
    </div>
  );
};

export default AddExperiencePage;