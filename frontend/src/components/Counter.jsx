import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../features/counter/counterSlice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Card style={{ width: '18rem' }} className="mx-auto">
      <Card.Body>
        <Card.Title>Counter</Card.Title>
        <Card.Text>
          Count: {count}
        </Card.Text>
        <Button variant="primary" onClick={() => dispatch(increment())} className="me-2">
          Increment
        </Button>
        <Button variant="danger" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Counter; 