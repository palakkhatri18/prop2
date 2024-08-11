import React from 'react';
import { Form, Col } from 'react-bootstrap';

const PropertyFilters = ({ filters, filterOptions, onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-container">
      <Form.Group as={Col} controlId="bhkFilter">
        <Form.Label>BHK:</Form.Label>
        <Form.Control
          as="select"
          name="selectedBHK"
          value={filters.selectedBHK}
          onChange={handleFilterChange}
        >
          <option value="">All BHKs</option>
          {filterOptions.allBHKs.map((bhk, index) => (
            <option key={index} value={bhk}>{bhk}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="areaFilter">
        <Form.Label>Area:</Form.Label>
        <Form.Control
          as="select"
          name="selectedArea"
          value={filters.selectedArea}
          onChange={handleFilterChange}
        >
          <option value="">All Areas</option>
          {filterOptions.allAreas.map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="towerFilter">
        <Form.Label>Tower:</Form.Label>
        <Form.Control
          as="select"
          name="selectedTower"
          value={filters.selectedTower}
          onChange={handleFilterChange}
        >
          <option value="">All Towers</option>
          {filterOptions.allTowers.map((tower, index) => (
            <option key={index} value={tower}>{tower}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="floorFilter">
        <Form.Label>Floor:</Form.Label>
        <Form.Control
          as="select"
          name="selectedFloor"
          value={filters.selectedFloor}
          onChange={handleFilterChange}
        >
          <option value="">All Floors</option>
          {filterOptions.allFloors.map((floor, index) => (
            <option key={index} value={floor}>{floor}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="societyFilter">
        <Form.Label>Society:</Form.Label>
        <Form.Control
          as="select"
          name="selectedSociety"
          value={filters.selectedSociety}
          onChange={handleFilterChange}
        >
          <option value="">All Societies</option>
          {filterOptions.allSocieties.map((society, index) => (
            <option key={index} value={society}>{society}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="categoryFilter">
        <Form.Label>Category:</Form.Label>
        <Form.Control
          as="select"
          name="selectedCategory"
          value={filters.selectedCategory}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          {filterOptions.allCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default PropertyFilters;
