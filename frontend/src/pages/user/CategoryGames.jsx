import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Form, InputGroup, Pagination } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const CategoryGames = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [pagination, setPagination] = useState({
    currentPage: parseInt(searchParams.get('page') || '1'),
    totalPages: 0,
    totalItems: 0
  });
  const limit = 8; // Products per page
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParams.get('search') || '');
  
  // Add debounce effect for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Wait for 500ms after last keystroke

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update useEffect dependency to use debouncedSearchTerm
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        
        // Fetch category details
        const categoryResponse = await axios.get(`${API_URL}/categories/${categoryId}`);
        setCategory(categoryResponse.data);
        
        // Fetch products for this category with search and pagination
        const productsResponse = await axios.get(`${API_URL}/products`, {
          params: {
            category_id: categoryId,
            search: debouncedSearchTerm,
            page: pagination.currentPage,
            limit: limit
          }
        });
        
        setProducts(productsResponse.data.products || []);
        setPagination({
          currentPage: productsResponse.data.currentPage,
          totalPages: productsResponse.data.totalPages,
          totalItems: productsResponse.data.totalItems
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching category products:', err);
        setError('Failed to load products for this category');
        setLoading(false);
      }
    };
    
    fetchCategoryProducts();
  }, [categoryId, debouncedSearchTerm, pagination.currentPage]);

  // Update search handlers
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPagination(prev => ({...prev, currentPage: 1}));
    setSearchParams({
      search: value,
      page: '1'
    });
  };

  // Remove handleSearchSubmit and update search bar JSX
  return (
    <Container className="py-4">
      <h1 className="mb-4">{category?.name || 'Category'} Games</h1>
      
      {/* Search Bar */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <InputGroup>
            <Form.Control
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search products"
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      
      {/* Results summary */}
      <Row className="mb-3">
        <Col>
          <p className="text-muted">
            {pagination.totalItems > 0 
              ? `Showing ${products.length} of ${pagination.totalItems} products` 
              : 'No products found'}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </Col>
      </Row>
      
      {products.length === 0 ? (
        <div className="alert alert-info">
          {searchTerm ? 'No products match your search.' : 'No products found in this category.'}
        </div>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm">
                  {product.image && (
                    <Card.Img 
                      variant="top" 
                      src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`} 
                      alt={product.name}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="text-truncate">{product.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-danger fw-bold">${product.priceSale}</span>
                      {Number(product.priceOrigin) > Number(product.priceSale) && (
                        <span className="text-muted text-decoration-line-through">${product.priceOrigin}</span>
                      )}
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top-0">
                    <Button variant="primary" className="w-100">Add to Cart</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <Pagination>{renderPaginationItems()}</Pagination>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default CategoryGames;