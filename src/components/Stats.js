import React, { useState, useEffect } from "react";
import StatsDataService from "../services/stats.services.js";
import { Card, Container, Row } from "react-bootstrap";

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    retrieveStats();
  }, []);


  const retrieveStats = () => {
    StatsDataService.getAll()
      .then(response => {
        setStats(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

    return (
      <Container fluid>
        <Row>
          {stats &&
            stats.map((stats) => (
              
                <Card body style={{margin: '1rem',marginTop: '30px', marginBottom: '30px',textAlign: 'center',flexDirection: 'row', width:'100%', flex: 4}} key={stats.id}>
                  <h4 className="card-title" style={{ textTransform: 'uppercase'}}> {stats.title}: <span className="card-text" style={{ fontSize:'18px', color:'red'}}>{stats.amount}</span></h4>
                </Card>
              
            ))}
        </Row>
      </Container>
    );
  }
export default Stats;
