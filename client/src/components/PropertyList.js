import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../services/api.js';
import PropertyFilters from './PropertyFilters';
import PropertyCard from './PropertyCard';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PropertyList = ({ isAdmin }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [filters, setFilters] = useState({
    selectedBHK: '',
    selectedArea: '',
    selectedTower: '',
    selectedFloor: '',
    selectedSociety: '',
    selectedCategory: ''
  });

  const [filterOptions, setFilterOptions] = useState({
    allBHKs: [],
    allAreas: [],
    allTowers: [],
    allFloors: [],
    allSocieties: [],
    allCategories: []
  });

  useEffect(() => {
    if (isAdmin) {
      const fetchPropertiesData = async () => {
        try {
          const data = await fetchProperties();
          if (Array.isArray(data)) {
            setItems(data);
            setFilteredItems(data);

            setFilterOptions({
              allBHKs: [...new Set(data.map(item => item.BHK))],
              allAreas: [...new Set(data.map(item => item.area))],
              allTowers: [...new Set(data.map(item => item.tower))],
              allFloors: [...new Set(data.map(item => item.floor))],
              allSocieties: [...new Set(data.map(item => item.society))],
              allCategories: [...new Set(data.map(item => item.category))]
            });
          }
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };

      fetchPropertiesData();
    }
  }, [isAdmin]);

  useEffect(() => {
    setFilteredItems(items.filter(item =>
      (filters.selectedBHK === '' || item.BHK === filters.selectedBHK) &&
      (filters.selectedArea === '' || item.area === filters.selectedArea) &&
      (filters.selectedTower === '' || item.tower === filters.selectedTower) &&
      (filters.selectedFloor === '' || item.floor === filters.selectedFloor) &&
      (filters.selectedSociety === '' || item.society === filters.selectedSociety) &&
      (filters.selectedCategory === '' || item.category === filters.selectedCategory)
    ));
  }, [filters, items]);

  const handleFilterChange = (filterName, filterValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: filterValue
    }));
  };

  return (
    <Container className="home-container">
      {isAdmin ? (
        <>
          <Row className="mb-4">
            <Col md={12}>
              <h1 className="text-center mb-4">Customer Interests</h1>
              <PropertyFilters
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
              />
            </Col>
          </Row>

          <Row>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Col md={4} key={item._id} className="mb-4">
                  <PropertyCard item={item} isAdmin={isAdmin} />
                </Col>
              ))
            ) : (
              <Col>
                <p>No properties available.</p>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <p>You do not have permission to view this page.</p>
      )}
    </Container>
  );
};

export default PropertyList;
