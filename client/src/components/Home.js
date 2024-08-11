import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { fetchItems, addToCart } from '../services/api.js';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import '../css/Home.css';

const Home = ({ isAdmin, isAuthenticated }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // Filter states
  const [selectedBHK, setSelectedBHK] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTower, setSelectedTower] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedSociety, setSelectedSociety] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Unique values for filters
  const [allBHKs, setAllBHKs] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [allTowers, setAllTowers] = useState([]);
  const [allFloors, setAllFloors] = useState([]);
  const [allSocieties, setAllSocieties] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const data = await fetchItems();
        if (Array.isArray(data)) {
          setItems(data);
          setFilteredItems(data);

          setAllBHKs([...new Set(data.map((item) => item.BHK))]);
          setAllAreas([...new Set(data.map((item) => item.area))]);
          setAllTowers([...new Set(data.map((item) => item.tower))]);
          setAllFloors([...new Set(data.map((item) => item.floor))]);
          setAllSocieties([...new Set(data.map((item) => item.society))]);
          setAllCategories([...new Set(data.map((item) => item.category))]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItemsData();

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter(
        (item) =>
          (selectedBHK === '' || item.BHK === selectedBHK) &&
          (selectedArea === '' || item.area === selectedArea) &&
          (selectedTower === '' || item.tower === selectedTower) &&
          (selectedFloor === '' || item.floor === selectedFloor) &&
          (selectedSociety === '' || item.society === selectedSociety) &&
          (selectedCategory === '' || item.category === selectedCategory)
      )
    );
  }, [
    selectedBHK,
    selectedArea,
    selectedTower,
    selectedFloor,
    selectedSociety,
    selectedCategory,
    items,
  ]);

  const handleCartButtonClick = async (itemId) => {
    if (isAuthenticated && userId) {
      try {
        await addToCart(userId, itemId);
        alert('Item added to cart!');
        navigate('/cart'); // Redirect to cart page
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Item already in the cart');
      }
    } else {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  };

  return (
    <Container className="home-container">
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="text-center mb-4">Available Properties</h1>
          <div className="filter-container">
            <Row>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group controlId="bhkFilter">
                  <Form.Control
                    as="select"
                    className="form-select form-select-sm mb-3" // Apply Bootstrap classes
                    value={selectedBHK}
                    onChange={(e) => setSelectedBHK(e.target.value)}
                  >
                    <option value="">All BHKs</option>
                    {allBHKs.map((bhk, index) => (
                      <option key={index} value={bhk}>
                        {bhk}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group controlId="areaFilter">
                  <Form.Control
                    as="select"
                    className="form-select form-select-sm mb-3" // Apply Bootstrap classes
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    <option value="">All Areas</option>
                    {allAreas.map((area, index) => (
                      <option key={index} value={area}>
                        {area}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group controlId="towerFilter">
                  <Form.Control
                    as="select"
                    className="form-select form-select-sm mb-3" // Apply Bootstrap classes
                    value={selectedTower}
                    onChange={(e) => setSelectedTower(e.target.value)}
                  >
                    <option value="">All Towers</option>
                    {allTowers.map((tower, index) => (
                      <option key={index} value={tower}>
                        {tower}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group controlId="floorFilter">
                  <Form.Control
                    as="select"
                    className="form-select form-select-sm mb-3" // Apply Bootstrap classes
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                  >
                    <option value="">All Floors</option>
                    {allFloors.map((floor, index) => (
                      <option key={index} value={floor}>
                        {floor}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group controlId="societyFilter">
                  <Form.Control
                    as="select"
                    className="form-select form-select-sm mb-3" // Apply Bootstrap classes
                    value={selectedSociety}
                    onChange={(e) => setSelectedSociety(e.target.value)}
                  >
                    <option value="">All Societies</option>
                    {allSocieties.map((society, index) => (
                      <option key={index} value={society}>
                        {society}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group controlId="categoryFilter">
                  <Form.Control
                    as="select"
                    className="form-select form-select-sm mb-3" // Apply Bootstrap classes
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {allCategories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Col md={4} key={item._id} className="mb-4">
              <PropertyCard
                item={item}
                isAdmin={isAdmin}
                showAddToCart={true} // Show "Add to Cart" button only when rendering from Home page
                onAddToCart={handleCartButtonClick}
              />
            </Col>
          ))
        ) : (
          <Col md={12}>
            <p className="text-center">No items found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
