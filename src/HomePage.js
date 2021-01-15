const React, { useState, useEffect } = require('react');
const { observer } = require('mobx-react');
const Card = require('react-bootstrap/Card');
const { Formik } = require('formik');
const Form = ('react-bootstrap/Form');
const Col = require('react-bootstrap/Col');
const Button = require('react-bootstrap/Button');
const yup = require('yup');
const { Redirect } = require('react-router-dom');
const querystring = require('querystring');
require('../styles/HomePage.css');

const schema = yup.object({
  name: yup.string().required('URL is required'),
  url: yup
    .string()
    .required('URL is required')
    .matches(
      /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
      'Invalid URL'
    ),
});

function HomePage({ feedsStore }) {
  const [initialized, setInitialized] = useState(false);
  const [redirectToFeed, setRedirectToFeed] = useState(false);
  const handleSubmit = async evt => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    feedsStore.feeds.push(evt);
    feedsStore.setFeeds(feedsStore.feeds);
    localStorage.setItem('feeds', JSON.stringify(feedsStore.feeds));
  };
  const setSelectedFeed = url => {
    feedsStore.setSelectedFeed(url);
    setRedirectToFeed(true);
  };
  const deleteFeed = index => {
    feedsStore.feeds.splice(index, 1);
    feedsStore.setFeeds(feedsStore.feeds);
    localStorage.setItem('feeds', JSON.stringify(feedsStore.feeds));
  };
  useEffect(() => {
    if (!initialized) {
      let rssFeeds = [];
      try {
        rssFeeds = JSON.parse(localStorage.getItem('feeds'));
        if (Array.isArray(rssFeeds)) {
          feedsStore.setFeeds(rssFeeds);
        }
      } catch (ex) {}
      setInitialized(true);
    }
  });
  if (redirectToFeed) {
    return (
      <Redirect to={`/feed?${querystring.encode({ url: feedsStore.feed })}`} />
    );
  }
  return (
    <div className='home-page'>
      <h1 className='center'>RSS Feeds</h1>
      <Formik validationSchema={schema} onSubmit={handleSubmit}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md='12' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={values.name || ''}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md='12' controlId='url'>
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type='text'
                  name='url'
                  placeholder='URL'
                  value={values.url || ''}
                  onChange={handleChange}
                  isInvalid={touched.url && errors.url}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.url}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type='submit'>Add</Button>
          </Form>
        )}
      </Formik>
      <br />
      {feedsStore.feeds.map((f, i) => {
        return (
          <Card key={i}>
            <Card.Title className='card-title'>{f.name}</Card.Title>
            <Card.Body>
              <p>{f.url}</p>
              <Button
                variant='primary'
                onClick={setSelectedFeed.bind(this, f.url)}
              >
                Open
              </Button>{' '}
              <Button variant='primary' onClick={deleteFeed.bind(this, i)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
export default observer(HomePage);