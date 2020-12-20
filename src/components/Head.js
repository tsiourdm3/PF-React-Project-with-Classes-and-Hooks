import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Head = (props) => {
    return(

        <div>
      <Jumbotron fluid className="jumb">
        <Container fluid >
          <h2 className="display-3">Welcome to CodeHub.Dashboard!</h2>
          <p className="lead">Manage everything and have fun!</p>
        </Container>
      </Jumbotron>
    </div>
        
    )
};

export default Head;
