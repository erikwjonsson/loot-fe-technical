import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import '../cards/card.css'

const getImageContent = (imageUrl, imageText) => {
  return (
    <Fragment>
      <img className="card-image" src={imageUrl} alt="card-image" />
      <p>{imageText}</p>
      {/* <p>{title}</p> ...could be turned into a function */}
    </Fragment>
  );
};

/* REMOVE THIS PLACEHOLDER*/

const cardDetailsStyle = {
  width: "380px",
  height: "300px"
};

const cardDetails = {
  componentType: 'card-details',
  imageUrl: "src/components/cards/new_york.jpg",
  imageText: null,
  amountUsed: "£ 600.00",
  amountLimit: "£ 1000.00",
  title: "New York",
  description: "something something",
  showDetailsButton: true,
  progressBar: "40",
  progressFilledColor: "#f6cb47",
  endDate: "By 15th June 2018",
  cardStyle: cardDetailsStyle
};

const getCardContent = (
  amountUsed,
  amountLimit,
  endDate,
  showDetailsButton,
  getElement,
  getElementArgs
) => {
  return (
    <div className="content-container-card">
      {showDetailsButton && <div className="details-button">
        <Link to='/details' to={{ pathname: '/details', cardDetails:  {componentTyp: 'card-details', ...cardDetails}  }} >...</Link>
      </div>}
      <div className="amount-used">{amountUsed}</div>
      {getElement(amountLimit, ...getElementArgs)}
      {/* the mysterious element returned is a progress bar most of the time. */}
      <div className="end-date">{endDate}</div>
    </div>
  );
};

const getCardDetailsContent = (
  amountUsed,
  amountLimit,
  endDate,
  title,
  description
) => {
  return (
    <div className="content-container-details">
      <div className="card-details-content-top">
        {getButtonElement(buttonArguments)}
      </div>
      <div className="card-details-content-middle">
        <div className="card-details-content-left">
          <p className="title">{title}</p>
          <p className="description">{description}</p>
        </div>
        <div className="card-details-content-right">
          <p className="amount-used">{amountLimit}</p>
          <p className="amount-limit">/ {amountUsed}</p>
        </div>
      </div>
      <div className="card-details-content-bottom">
        <p className="end-date">{endDate}</p>
      </div>
    </div>
  );
};

const getProgressBar = (amountLimit, progressBar, progressFilledColor) => {
  return (
    <Fragment>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            style={{
              width: `${progressBar}%`,
              background: `${progressFilledColor}`
            }}
            className="progress"
          />
        </div>
        <div className="amount-limit">{amountLimit}</div>
      </div>
    </Fragment>
  );
};

const getButtonElement = () => {
  return <button type="btn" className="button">Release funds</button>
  ;
};

const buttonArguments = {};

class CardTemplate extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    const {
      componentType,
      title,
      imageUrl,
      imageText,
      amountUsed,
      amountLimit,
      showDetailsButton,
      progressBar,
      progressFilledColor,
      endDate,
      cardStyle
    } = this.props;

    return (
      <div className="card" style={cardStyle}>
        <div className="image-container">
          {getImageContent(imageUrl, imageText)}
        </div>

        {componentType === 'card-details' && getCardDetailsContent(
          amountUsed,
          amountLimit,
          endDate,
          "NEW YORK",
          "how we spendit"
        )}

        {componentType === 'card' && getCardContent(
            amountUsed,
            amountLimit,
            endDate,
            showDetailsButton,
            getProgressBar,
            [progressBar, progressFilledColor]
          )}
      </div>
    );
  }
}

export default CardTemplate;
