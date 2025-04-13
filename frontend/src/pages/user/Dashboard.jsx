import React from 'react';
import Banner from './Partials/Banner';
import { Container } from 'react-bootstrap';

const Dashboard = () => {
    return (
        <Container fluid>
            <Banner />
            <div className="mt-4">
                <h1>Dashboard</h1>
            </div>
        </Container>
    )
}

export default Dashboard;