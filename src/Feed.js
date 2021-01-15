const React, { useState, useEffect } = require('react');
const { observer } = require('mobx-react');
const { withRouter } = require('react-router-dom');
const Card = require('react-bootstrap/Card');
const Button = require('react-bootstrap/Button');
const yup = require('yup');
const { getFeedListing } = require('../requests');
const querystring = require('querystring');
require('./styles/Feed.css');

function Feed({ feedsStore, location }) {
  const [initialized, setInitialized] = useState(false);
  const [url, setUrl] = useState('');
  const [listings, setListings] = useState([]);
  const [data, setData] = useState({});
  const getListings = async url => {
    try {
      const response = await getFeedListing(url);
      setListings(response.data.items);
      setData(response.data.feed);
    } catch (ex) {
      console.log(ex);
    }
  };
  const openLink = url => {
    window.location.href = url;
  };
  useEffect(() => {
    if (!initialized) {
      const url = querystring.decode(location.search)['?url'];
      setUrl(url);
      getListings(url);
      setInitialized(true);
    }
  });
  return (
    <div className='feed'>
      <h1 className='center title'>
        <img src={data.image} /> {data.title}
      </h1>
      {listings.map((l, i) => {
        return (
          <Card key={i}>
            <Card.Title className='card-title'>{l.title}</Card.Title>
            <Card.Body>
              <p>{l.description}</p>
              <p>{l.content}</p>
              <Button variant='primary' onClick={openLink.bind(this, l.link)}>
                Open
              </Button>{' '}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
export default withRouter(observer(Feed));