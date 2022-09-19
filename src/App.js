import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
const App = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  
  console.log(data);
  React.useEffect(() => {
    const url = "https://run.mocky.io/v3/484016a8-3cdb-44ad-97db-3e5d20d84298";
    fetch(url)
      .then((response) => response.json())
      /* .then((data) => console.log(data))*/
      /* .then((response) => response.json())*/
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {

    if (data.length !== 0) {
      setIsLoading(false);
    }
    /* console.log(data);*/
  }, [data]);


  const dragStart = (e, position) => {
    dragItem.current = position;
    /*console.log(e.target.innerHTML);*/
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
   /* console.log(e.target.innerHTML);*/
  };

  const drop = (e) => {
    const copyListItems = [...data];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setData(copyListItems);
  };

  return (
    <>
      <div className="App">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item tabheading" role="presentation">
            <button className="btn btn-secondary active tab-buttons" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Promotions</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="btn btn-secondary tab-buttons" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">New Customers</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active all-promotions" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              data && data.map((results, index) => (
                <div className='all-promotions-box' onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={index}
                  draggable>
                  <h4>{results.name}</h4>
                  <p>{results.description}</p>
                </div>
              ))
            )}
          </div>
          <div className="tab-pane fade new-customer-box" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              data.map((results) => (
                <div className="card">
                  <img src={results.heroImageUrl} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h1>{results.name}</h1>
                    <p className="card-text">{results.description}</p>

                    <Button variant="outline-secondary" className='button-term-condition'>{results.termsAndConditionsButtonText}</Button>
                    <Button variant="secondary" className='button-join-now'>{results.joinNowButtonText}</Button>
                  </div>
                </div>
              ))
            )}            
          </div>
        </div>
      </div>
    </>
  );
};
export default App;